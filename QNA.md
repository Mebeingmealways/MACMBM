# MAC — MBM AI Cloud · FYP Q&A Preparation
### Aaryan Choudhary · 23UCSE4002 · May 2026
> Questions likely from panel evaluators, HOD, and Dr. Abhisek Gour. Grouped by topic.

---

## 1. Auto Mode / Intent Routing — "How does the AI know which path to use?"

**Q: When a student sends a message, how does MAC decide whether to do direct chat, RAG, or web search?**

A: Intent routing happens at the **FastAPI layer**, not at Nginx. There are two mechanisms:
- **Explicit mode selection** — the UI has three buttons: Chat, RAG, Search. The student selects the mode manually. The frontend sends the request to the corresponding Nginx path (`/chat`, `/rag`, `/search`).
- **Auto mode** — when Auto is selected, the FastAPI backend performs lightweight intent classification: if the student has documents uploaded in their session, it checks whether the query has semantic similarity above a threshold to any stored chunks (a quick Qdrant probe). If yes → RAG path. If the query contains temporal signals like "latest", "today", "current" → web search. Otherwise → direct chat.
- Nginx then routes purely by URL path — it does not inspect query content. All intelligence is in the FastAPI middleware layer.

**Q: What is the latency overhead of the Auto mode classification step?**

A: The auto-classification probe to Qdrant takes approximately 5–15 milliseconds since it is a lightweight top-1 ANN search, not a full retrieval. This is negligible compared to the LLM's first-token latency which is typically 200–800ms depending on model and load.

---

## 2. RAG Pipeline — "How does RAG actually work?"

**Q: Explain the RAG pipeline end to end.**

A: RAG has two phases:

**Ingestion phase (offline, one-time per document):**
1. Student uploads a PDF or text file via the FastAPI `/upload` endpoint.
2. The backend extracts raw text and splits it using a **sliding window chunker** — 512 tokens per chunk, 20% overlap (≈102 tokens) between consecutive chunks. Overlap ensures sentences at chunk boundaries are never severed mid-idea.
3. Each chunk is passed through **nomic-embed-text**, an open-source embedding model, which outputs a 768-dimensional dense vector representing the semantic meaning of that chunk.
4. The vector + raw text + metadata (user ID, document name, chunk index) is upserted into a **Qdrant collection** under a user-specific namespace.
5. Chunk-to-document mapping is stored in **PostgreSQL**.

**Retrieval phase (per query):**
1. Student's query is embedded into a vector using the same nomic-embed-text model.
2. Qdrant performs **HNSW approximate nearest-neighbor search**, returning top-K (typically K=5) chunks whose vectors are most similar (cosine similarity) to the query vector.
3. The retrieved chunks are concatenated and injected into the LLM's system prompt as context.
4. The LLM generates an answer grounded in the provided context, with source references.
5. The response is streamed back token-by-token via SSE.

**Q: Why sliding window chunking and not fixed-size or sentence-based chunking?**

A: Fixed-size chunking with no overlap severs context at arbitrary byte positions — a key sentence can be split across two chunks and retrieved incompletely. Sentence-based chunking creates variable-size chunks that can be very short (losing context) or very long (exceeding embedding model limits). Sliding window at 512 tokens with 20% overlap is the industry-standard balance: consistent chunk sizes within embedding model limits, with boundary context preserved.

**Q: What embedding model do you use and why?**

A: **nomic-embed-text** — it is an open-source model that runs entirely on local hardware (no API call needed), produces 768-dimensional vectors, and benchmarks competitively with OpenAI's text-embedding-ada-002 on MTEB retrieval tasks. Critically, since it runs on-campus, zero student document content is sent to any external service.

**Q: What is cosine similarity and why use it over Euclidean distance?**

A: Cosine similarity measures the angle between two vectors regardless of their magnitude. For text embeddings, two semantically similar sentences may have different vector magnitudes but nearly identical directions. Cosine similarity correctly captures this; Euclidean distance is sensitive to magnitude and can rank semantically distant but magnitude-similar vectors higher.

**Q: What is HNSW and why is it used?**

A: HNSW — Hierarchical Navigable Small World — is a graph-based approximate nearest-neighbor index. It builds a multi-layer proximity graph where each node connects to its approximate nearest neighbors at multiple resolution levels. Query traversal starts at the top layer (few nodes, wide jumps) and drills down to find the nearest neighbor efficiently. Time complexity is O(log N) versus O(N) for brute-force. At any realistic document collection size, this is the correct choice.

---

## 3. LLM Cluster — "How do the models connect and how is load distributed?"

**Q: How are multiple LLM workers orchestrated?**

A: Each LLM model (Llama 3, Mistral, Phi-3) runs as a separate **vLLM inference server** inside its own Docker container, exposed on internal ports (e.g. 8001, 8002, 8003). These containers communicate over a **Docker bridge network** — a private virtual LAN inside the host machine. No external protocol is needed for inter-container communication; Docker DNS resolves container names to internal IPs automatically.

**Q: What is vLLM and what problem does it solve?**

A: vLLM implements **PagedAttention** — a memory management technique borrowed from OS virtual memory paging. Standard LLM inference frameworks pre-allocate a contiguous KV-cache block per request, leading to fragmentation and low GPU utilisation under concurrent load. PagedAttention stores KV-cache in non-contiguous memory pages, shared across requests where possible. This allows continuous batching of multiple concurrent prompts, dramatically increasing GPU throughput compared to naive sequential inference.

**Q: How does round-robin load balancing work here?**

A: Nginx maintains an **upstream block** listing all three vLLM worker addresses. By default, Nginx uses weighted round-robin — distributing incoming `/chat` requests sequentially across workers. FastAPI also maintains an async request queue per worker so that if all workers are busy, new requests wait in-memory rather than being dropped. If a worker fails health check, Nginx automatically removes it from rotation.

**Q: What protocol does the frontend use to communicate with the backend?**

A: Standard **HTTP/1.1** for all request-response interactions (login, upload, settings). **Server-Sent Events (SSE)** for streaming LLM token output — SSE is a one-way HTTP connection where the server pushes newline-delimited `data:` frames to the client. It is simpler than WebSocket, works natively in all browsers, and requires no special protocol upgrade — just a `Content-Type: text/event-stream` response header.

---

## 4. File Sharing — "How does admin share files with all students?"

**Q: How does the admin share documents or resources with all students?**

A: The FastAPI backend has an admin-only API route (protected by role-based access — the admin JWT token carries a `role: admin` claim verified by FastAPI middleware). Admin can upload documents to a **global Qdrant collection namespace** (as opposed to per-user namespaces). All authenticated students' RAG queries automatically include this global namespace in their Qdrant search scope alongside their personal documents. So a syllabus, question bank, or reference material uploaded by admin is instantly available for RAG queries by every student without any redistribution.

File transfer itself uses standard **HTTP multipart/form-data** POST — no special file-sharing protocol. Nginx handles large file uploads by adjusting `client_max_body_size`.

---

## 5. Protocols and Auth — "What security protocols does MAC use?"

**Q: What protocols does the MAC system use?**

| Layer | Protocol | Purpose |
|---|---|---|
| Client ↔ Nginx | HTTP/1.1 on :80, HTTPS/TLS 1.2+ on :443 | All client traffic |
| Nginx ↔ FastAPI | HTTP/1.1 on localhost:8000 (Unix socket optional) | Reverse proxy passthrough |
| FastAPI ↔ vLLM workers | HTTP/1.1 on Docker bridge (ports 8001-8003) | LLM inference requests |
| FastAPI ↔ Qdrant | HTTP REST on port 6333 (Qdrant native API) | Vector search & upsert |
| FastAPI ↔ SearXNG | HTTP on port 8080 (SearXNG JSON API) | Web search queries |
| FastAPI ↔ PostgreSQL | TCP on port 5432 via SQLAlchemy async pool | Database read/write |
| Streaming | SSE (Server-Sent Events) over HTTP | Token-by-token response |
| Containers | Docker bridge network (virtual Ethernet) | Inter-service communication |

**Q: What SSL/TLS setup is used and why self-signed?**

A: We generated a **self-signed X.509 certificate** using OpenSSL with a 4096-bit RSA key, valid for 365 days, issued to CN=10.10.12.115. A CA-signed certificate (Let's Encrypt, Cloudflare) requires a public domain name and internet-reachable server for domain validation. Since MAC runs on a private LAN IP, no public CA can validate it. The self-signed certificate provides the same encryption strength — the only difference is that browsers show a warning until the cert is installed in the device's trust store.

---

## 6. Login and Authentication — "How does user auth work?"

**Q: How does login authentication work in MAC?**

A: MAC uses **JWT — JSON Web Token** based authentication:

1. **Registration / Login:** Student submits username + password to `POST /auth/login`. FastAPI verifies the password against a **bcrypt hash** stored in PostgreSQL (plaintext passwords are never stored). bcrypt is a slow, salted hashing function specifically designed to resist brute-force attacks.

2. **Token issuance:** On successful verification, FastAPI signs a JWT using a secret key (HS256 algorithm). The JWT payload contains: `user_id`, `username`, `role` (student / admin), and `exp` (expiry timestamp — typically 24 hours).

3. **Authenticated requests:** The browser stores the JWT in `localStorage` or a `httpOnly` cookie. Every subsequent API request includes it in the `Authorization: Bearer <token>` header. FastAPI's `OAuth2PasswordBearer` dependency extracts and verifies the token signature on every protected route.

4. **Role-based access:** The `role` claim in the JWT is checked by a FastAPI dependency for admin-only routes (document broadcast, user management, model configuration). Students with `role: student` are blocked from these routes with a 403 response.

5. **Session persistence:** The user's chat history, uploaded documents, and preferences are stored in PostgreSQL linked to their `user_id`. The JWT is stateless — PostgreSQL is the source of truth for all persistent data.

**Q: Why JWT and not session cookies?**

A: Traditional server-side sessions require the server to store and look up session state on every request — this does not scale well under concurrent users. JWTs are **stateless**: the server only needs the secret key to verify any token, with no database lookup per request. This is ideal for our architecture where multiple FastAPI worker processes may handle different requests from the same user.

**Q: How are passwords stored?**

A: Using **bcrypt** with a per-password random salt. bcrypt is intentionally slow (configurable work factor, default ~10 rounds = ~100ms per hash). Even if the PostgreSQL database were compromised, the bcrypt hashes cannot be reversed efficiently — a brute-force attack on bcrypt is orders of magnitude slower than MD5 or SHA-256.

**Q: What happens if the JWT is stolen?**

A: JWTs are signed but not encrypted — anyone with the token can authenticate as that user until expiry. Mitigations in MAC: short expiry (24h), HTTPS prevents interception in transit, `httpOnly` cookie storage prevents JavaScript-based XSS theft. A token revocation list (Redis blacklist) is a planned improvement for the next version.

---

## 7. General Architecture Questions

**Q: Why Nginx instead of a pure Python ASGI server like Uvicorn directly?**

A: Nginx is a production-grade, battle-tested reverse proxy. It handles SSL termination so FastAPI/Uvicorn never sees raw TLS. It efficiently serves static files (HTML, CSS, JS) without any Python overhead. It provides connection buffering — slow clients do not hold a Python worker thread open. And it gives us path-based routing to multiple backend services (FastAPI, SearXNG) in a single server block.

**Q: Why Docker Compose?**

A: Docker Compose declaratively defines all six services (Nginx, FastAPI, PostgreSQL, Qdrant, SearXNG, vLLM workers) with their network connections, volume mounts, environment variables, and restart policies in a single `docker-compose.yml`. Any new server can run the entire MAC stack with `docker compose up -d` in under 5 minutes. Containers are isolated — a crash in SearXNG does not affect the LLM workers.

**Q: How many concurrent users can MAC handle?**

A: Under our current hardware: Nginx handles thousands of concurrent HTTP connections. FastAPI with async I/O handles hundreds of concurrent coroutines. The bottleneck is GPU memory for LLM inference. With three model workers and vLLM's continuous batching, we can serve approximately 20–30 concurrent active chat sessions before queuing latency becomes noticeable. For a campus deployment where usage is bursty (not all students chatting simultaneously), this is sufficient.

**Q: Is the system fault-tolerant?**

A: Partially. Docker Compose restart policies (`restart: unless-stopped`) ensure crashed containers restart automatically. Nginx removes unhealthy workers from the upstream pool. PostgreSQL WAL provides crash recovery for the database. Full high-availability (multiple server instances, distributed storage) is a future scope item.

**Q: Why PostgreSQL and not MongoDB or SQLite?**

A: SQLite was our initial choice (zero-config, single file), but it uses a write lock on the entire database file — concurrent writes from many users block each other. PostgreSQL uses row-level locking, making it correct under high concurrent write loads. MongoDB was considered but our data is highly relational (users → sessions → messages → document chunks) — a document store adds complexity without benefit here.

---

## 8. Miscellaneous

**Q: How much did this cost to build?**

A: Zero recurring cost. The server is existing university hardware. All software — vLLM, Qdrant, SearXNG, Nginx, PostgreSQL, FastAPI, the LLM models (Llama 3, Mistral, Phi-3 are open-weights under permissive licenses) — is free and open source. The only cost was electricity for running the server.

**Q: Is the code open source?**

A: The plan is to open-source the full stack under the MBM Open license as part of the roadmap, once we add proper multi-tenant isolation and documentation. The project documentation is already live at mbmuniversity2026.github.io/MACdoc.

**Q: What happens to student data?**

A: All student data — chat history, uploaded documents, queries — is stored exclusively in PostgreSQL and Qdrant on the physical server inside the university campus. No data is transmitted to any external service. SearXNG queries go to external search engines by design (for web search feature), but SearXNG strips all identifying headers and cookies before forwarding — search engines see anonymous requests, not student identities.

**Q: Can this scale beyond MBM University?**

A: Yes — that is Roadmap item 4. The Qdrant namespace isolation model allows each department or institution to have completely isolated document collections on the same server. The npm package plan (Roadmap 2) makes deployment to any institution a one-command operation. Cloudflare Tunnel (Roadmap 3) makes it internet-accessible with proper API key authentication.

---

## 9. API Keys — Generation, Regeneration, and OpenAI Compatibility

**Q: How are API keys generated in MAC?**

A: API keys are generated using Python's `secrets.token_urlsafe(32)` — this produces a 32-byte cryptographically random URL-safe string (256 bits of entropy), prefixed with `sk-mac-` for recognisability. Example: `sk-mac-xK9mPqR2vLsN7jWcT4bYeA_dZfUo1HiX`. The `secrets` module uses the OS's cryptographically secure random number generator (`/dev/urandom` on Linux), making the keys impossible to predict or brute-force.

**Q: How are API keys stored securely?**

A: The raw key is shown to the student **once only** at generation time — MAC never stores it in plaintext. Instead, a **SHA-256 hash** of the key is stored in PostgreSQL alongside the user ID, key name, creation timestamp, last-used timestamp, and an optional expiry date. When a request arrives with `Authorization: Bearer sk-mac-xxx`, the server hashes the incoming key with SHA-256 and does a constant-time comparison against the stored hash — preventing timing attacks. This pattern mirrors how GitHub and Stripe handle their API tokens.

**Q: How does key regeneration work?**

A: Regeneration is a two-step operation:
1. The old key's hash row is deleted from PostgreSQL — the old key immediately stops working, with no grace period.
2. A new `secrets.token_urlsafe(32)` is generated, hashed, and inserted as a new row.
The new raw key is shown to the student once. There is no "old key keeps working for X minutes" window — revocation is instant. This is intentional: if a key was compromised, the student needs immediate invalidation.

**Q: Are MAC's API keys compatible with the OpenAI API standard?**

A: Yes — this is a deliberate design decision. MAC exposes an **OpenAI-compatible REST API** at the `/v1/` prefix:

| OpenAI Endpoint | MAC Equivalent | Function |
|---|---|---|
| `POST /v1/chat/completions` | `POST /v1/chat/completions` | LLM chat with streaming |
| `GET /v1/models` | `GET /v1/models` | List available models |
| `POST /v1/embeddings` | `POST /v1/embeddings` | Generate embeddings |

The request and response JSON schemas exactly match OpenAI's specification — `model`, `messages`, `stream`, `temperature`, `max_tokens` fields all work identically. The API key is passed as `Authorization: Bearer sk-mac-xxxx` — the same header OpenAI uses.

**Q: What can students do with the OpenAI-compatible API?**

A: Because MAC speaks OpenAI's protocol, any tool that supports a custom OpenAI base URL works immediately with MAC — no code changes needed:

- **VS Code with Continue.dev or Copilot alternatives** — set `baseURL: http://10.10.12.115/v1`, `apiKey: sk-mac-xxx` → get local LLM autocomplete inside the IDE
- **LangChain / LlamaIndex** — `ChatOpenAI(base_url="http://10.10.12.115/v1", api_key="sk-mac-xxx")` works out of the box
- **OpenAI Python SDK** — `openai.base_url = "http://10.10.12.115/v1"` and it routes to MAC's models
- **curl / Postman** — standard OpenAI-format JSON requests work identically
- **Any REST client** — the schema is publicly documented and fully standard

This means students can use MAC as a drop-in private replacement for OpenAI in any project or tool they are already using.

**Q: How does MAC handle the `model` field in API requests?**

A: The `model` field maps to MAC's internal model registry. Valid values: `llama3`, `mistral`, `phi3`. If an unrecognised model name is sent, the API returns a standard OpenAI-format `404` error with `{"error": {"message": "Model not found", "type": "invalid_request_error"}}` — exactly matching OpenAI's error schema so existing error-handling code works without modification.

**Q: Is streaming supported via the API?**

A: Yes. When `"stream": true` is set in the request body, MAC returns an SSE stream of `data: {"choices": [{"delta": {"content": "..."}}]}` chunks — identical to OpenAI's streaming format, terminated with `data: [DONE]`. Tools like LangChain's streaming callbacks and the OpenAI Python SDK's `stream=True` parameter work without modification.
