# MAC — MBM AI Cloud · Speaking Script
### FYP Presentation · May 2026 · Aaryan Choudhary · 23UCSE4002
> One slide ≈ 30 seconds. Total 10 slides ≈ 5 minutes. Speak slowly and clearly.

---

## SLIDE 1 — Title

> *Stand straight. Let the Globe animation play and finish before you click. Pause 2 seconds on the title slide before speaking.*

"Good morning everyone. My name is Aaryan Choudhary, roll number 23UCSE4002, and this is my Final Year Project —
**MAC, the MBM AI Cloud.**

MAC is a completely self-hosted artificial intelligence platform that we built and deployed on university hardware — running live right now on our campus network at IP address 10.10.12.115.
Every MBM student can open it in their browser, use powerful language models, search the web privately, and chat with their own documents — all for free, all on campus, with zero data ever leaving the university.

I built this under the guidance of Dr. Abhisek Gour, Professor of Computer Science. Let's get into it."

---

## SLIDE 2 — Problem Statement

> *Point to the two columns on screen.*

"Let me start with the problem we were trying to solve.

If you look at well-funded institutions — IITs, NITs, international universities — their students get unlimited GPT-4 access through institutional licenses, on-campus GPU clusters, API keys at zero cost, and all their academic data stays protected under institutional NDAs.

MBM University students had none of that. Zero institutional AI access of any kind. If a student wanted to use ChatGPT or Claude, they were personally paying between two thousand and four thousand rupees a month. That's a real financial barrier for many students here.

And beyond the money — there was a privacy problem nobody talked about: every research query, every assignment draft that a student submitted to OpenAI or Google was potentially being logged and used to train those companies' models. Students had zero sovereignty over their own academic work.

MAC was built to fix this."

---

## SLIDE 3 — What is MAC

> *Let the three pillars animate in.*

"So what is MAC exactly?

MAC stands for MBM AI Cloud. It is a sovereign AI infrastructure — completely self-hosted, running on a physical server inside our campus network.

Three core principles define it:

**Zero Cloud** — every single query, document, and conversation stays on university hardware. Nothing leaves the campus network. Not one byte goes to any external server.

**Zero Cost** — it is free for every MBM student. No subscription, no API limit, no paywall. Ever.

**Academic-First** — the features are designed around how students actually work: RAG over their own notes, private web search with no tracking, and multi-model AI chat with multiple LLMs running simultaneously.

It is accessible right now at http://10.10.12.115 on campus WiFi, and students can install it as a Progressive Web App on any device."

---

## SLIDE 4 — Architecture

> *Trace the diagram top to bottom as you speak.*

"Let me walk you through the architecture.

At the top we have student devices — any browser, any OS, mobile or desktop, over campus WiFi at our fixed IP.

Every request hits **Nginx** first. Nginx is our single entry point — it handles both port 80 for plain HTTP and port 443 for HTTPS with our self-signed SSL certificate. It does SSL termination, load balancing, and path-based routing.

From Nginx, requests split into three paths based on the URL:

- `/chat` goes to the **LLM Worker pool** — Llama 3, Mistral, and Phi-3, running under vLLM with round-robin load balancing.
- `/rag` goes to **Qdrant** on port 6333, our vector database, for semantic document search.
- `/search` goes to **SearXNG** on port 8080, our self-hosted meta-search engine that queries 70-plus search engines with zero tracking.

Below all of this sits **PostgreSQL 16** for user accounts, sessions, and chat history, and the **nomic-embed-text** embedding model for generating dense vectors for RAG."

---

## SLIDE 5 — Tech Stack Decision

> *Point to the comparison columns, especially the green "Final Choice" column.*

"One of the most important engineering decisions we made was the frontend framework choice.

We did not just pick Vanilla JavaScript from the start — we experimented with every major framework.

First we tried Svelte — great developer experience, but 150 kilobytes of bundle. Then React — 220 kilobytes. Vue 3 at 130 kilobytes. Even SvelteKit, which added server-side complexity we did not need.

The reason this matters: campus WiFi at 2.4 gigahertz under concurrent load — which is what you get when 50 students are connected simultaneously — delivers around 3 to 5 megabytes per second. A 220-kilobyte React bundle versus an 8-kilobyte Vanilla JavaScript page is a 27 times size difference. That is a difference every student feels when they load the app.

So we went with Vanilla JS. No build step, no version rot, no framework overhead. Just HTML, CSS, and JavaScript served directly by Nginx.

The backend is Python 3.11 with FastAPI 0.115, PostgreSQL 16 via SQLAlchemy for the database, vLLM for inference, and Docker Compose to orchestrate the entire stack."

---

## SLIDE 6 — Core Features

> *Scan the feature grid briefly, then highlight 3-4.*

"MAC has eight core features, let me highlight the key ones.

**Multi-LLM Chat** — students can switch between Llama 3, Mistral, and Phi-3 on the fly. All inference runs locally on campus hardware. No internet required.

**RAG — Chat with Documents** — upload a PDF, textbook, or notes. MAC chunks it, embeds it using nomic-embed-text, stores it in Qdrant's HNSW index, and when you ask a question, it retrieves the most semantically relevant chunks and augments the prompt — so the LLM answers from your actual document, with citations.

**Private Web Search** — SearXNG aggregates 70-plus search engines with zero tracking, zero cookies, zero user profiles.

**SSE Streaming** — responses appear word by word in real time using Server-Sent Events, with no latency overhead.

**PWA installable** — any student can install MAC as a native-feeling app on Android, iOS, Windows, or Mac — no app store required."

---

## SLIDE 7 — Workflow Diagram

> *Trace each branch left to right.*

"Let me show you what actually happens when a student sends a message.

The request hits Nginx, which routes it based on intent. There are three paths:

**Direct Chat** — the query goes straight to an available LLM worker from the round-robin pool. Response is streamed back via SSE.

**RAG path** — this is where it gets interesting. The query is first embedded into a dense vector using nomic-embed-text. Qdrant's HNSW index does an approximate nearest-neighbor search to find the top-K most semantically similar chunks from the student's uploaded documents. Those chunks are injected into the LLM's prompt as context — and the LLM answers grounded in the student's actual material.

**Web Search path** — SearXNG fetches live results from 70-plus search engines, the snippets are injected into the LLM's system prompt, and the model reasons over real-time information — eliminating hallucination on current facts.

All three paths converge at SSE streaming, delivering tokens to the browser in real time.

On the right you can see the RAG ingestion pipeline — upload, sliding-window chunking at 512 tokens with 20% overlap, embedding, Qdrant indexing, and PostgreSQL metadata storage."

---

## SLIDE 8 — Technical Challenges

> *Pause for emphasis on each challenge.*

"Building this on a campus WiFi network threw three hard problems at us that had no ready-made solutions.

**Challenge one — PWA requires HTTPS, but university WiFi runs HTTP.** Service Workers, which are mandatory for PWA installation, are blocked by browsers on any non-HTTPS origin. Our solution: we generated a self-signed X.509 SSL certificate using OpenSSL with a 4096-bit RSA key, configured Nginx on port 443 with it, and guided students to install the certificate in their device trust stores.

**Challenge two — HTTP and HTTPS coexistence.** Not every student could install the certificate. Forcing HTTPS-only would lock them out. So we configured Nginx with two parallel server blocks — one on port 80 serving the full app over plain HTTP, one on port 443 serving the HTTPS version enabling PWA install. The same FastAPI upstream serves both. No student is ever blocked.

**Challenge three — dynamic IP assignment.** The university WiFi router was assigning a new IP from its DHCP pool on every reconnect. Students could not bookmark the app. Our fix: we identified the server's hardware MAC address and configured a DHCP static lease on the router, permanently binding that MAC address to 10.10.12.115. That IP will survive every reboot and every router reset."

---

## SLIDE 9 — Algorithms

> *Reference the table, do not read every row — pick three.*

"Let me highlight the key algorithms and data structures under the hood.

**HNSW — Hierarchical Navigable Small World** — this is the graph index inside Qdrant that powers our semantic search. It delivers approximate nearest-neighbor lookup in sub-millisecond time regardless of how many vectors are stored. Brute-force cosine similarity over large document collections would be orders of magnitude slower.

**Sliding window chunking** — 512 tokens per chunk with 20% overlap. The overlap is critical: it ensures that context at chunk boundaries is never severed mid-sentence or mid-idea.

**vLLM with PagedAttention** — vLLM uses a paged memory management model borrowed from operating system virtual memory. It allows multiple concurrent prompts to share GPU memory without fragmentation, which is what enables us to serve many students simultaneously on our hardware.

**PostgreSQL 16 with SQLAlchemy async pool** — full ACID guarantees, concurrent multi-user writes, and structured relational storage for chat history with proper foreign-key relations between users, sessions, and messages.

**Round-robin LLM dispatch plus async queue** — requests are distributed fairly across the worker pool with an async request queue ensuring no single model instance is starved under concurrent load."

---

## SLIDE 10 — Future Scope

> *Speak with energy — this is the closing.*

"The foundation is solid. Here is where MAC goes next.

**MCP Tool Integration** — Model Context Protocol gives LLMs tools: file creation, code execution, API calls, form filling. Students would be able to ask MAC to write and run a Python script, or fill out a form on their behalf — exactly like Replit AI, but private, on-campus, and free.

**npm install mac** — we plan to publish MAC as an npm package so any institution, professor, or student union anywhere in India can spin up their own sovereign AI instance with a single command. Full Docker Compose, config wizard, auto-SSL included.

**Cloudflare Tunnel** — a zero-trust tunnel to expose MAC securely over the internet with permanent HTTPS URLs and personal API keys, so students can use it from home, in VS Code, on mobile data — anywhere on Earth.

**Multi-department rollout** — extending access beyond CSE using Qdrant collection namespaces for isolation, fine-tuning models on domain-specific academic content, and eventually open-sourcing the full stack so any university in India can deploy MAC in a weekend.

To close — every student at MBM University deserves the same AI tools as a student at MIT. MAC makes that possible. Free. Private. On-campus. Thank you."

---

> *After finishing, stand still. Do not rush. Wait for questions.*
