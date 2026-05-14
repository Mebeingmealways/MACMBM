/* MBM AI Cloud — Final Year Project 2026 · Aaryan Choudhary */
window.SLIDES = [

/* ══════════════════════════════════════════════════════════════
   SLIDE 1 — TITLE
══════════════════════════════════════════════════════════════ */
`<div class="si" style="display:flex;align-items:center;gap:64px;min-height:80vh">

  <!-- LEFT: Identity -->
  <div style="flex:1;min-width:0">
    <div class="an mac-logo"><img src="./logonew.png" alt="MAC"></div>
    <div class="an sec-tag">Final Year Project &nbsp;·&nbsp; May 2026</div>
    <h1 class="an s-h1 grad-text" style="font-size:clamp(3.6rem,7.5vw,6.2rem);margin-bottom:8px">MBM AI Cloud</h1>
    <div class="an" style="font:500 clamp(1rem,1.8vw,1.25rem)/1.5 'JetBrains Mono',monospace;color:rgba(0,210,255,.65);margin-bottom:28px;letter-spacing:.03em">MAC &nbsp;— &nbsp;Sovereign AI Infrastructure</div>
    <p class="an s-lead" style="margin-bottom:28px">
      A self-hosted, on-campus AI platform giving every MBM University student
      free access to LLMs, semantic search, and private web intelligence —
      with zero cloud dependency and zero monthly cost.
    </p>
    <div class="an pill-row" style="margin-top:0">
      <span class="pill p1">SELF-HOSTED</span>
      <span class="pill p2">ZERO COST</span>
      <span class="pill p3">PRIVACY-FIRST</span>
      <span class="pill p4">ON-CAMPUS</span>
    </div>
    <div class="an" style="display:flex;flex-wrap:wrap;gap:7px;margin-top:14px">
      ${[
        {l:'Python 3.11',c:'#3b82f6'},
        {l:'FastAPI 0.115',c:'#06b6d4'},
        {l:'PostgreSQL 16',c:'#336791'},
        {l:'vLLM · inference',c:'#7c3aed'},
        {l:'Docker Compose',c:'#2496ed'},
        {l:'Nginx',c:'#009639'},
        {l:'Qdrant',c:'#ff3366'},
      ].map(b=>`<span style="font:.62rem/1 'JetBrains Mono';padding:4px 10px;border-radius:20px;
        background:${b.c}22;color:${b.c};border:1px solid ${b.c}44">${b.l}</span>`).join('')}
    </div>
  </div>

  <!-- RIGHT: Credits card -->
  <div style="flex:0 0 320px">
    <div class="an gc" style="padding:32px;display:flex;flex-direction:column;gap:20px">
      <div>
        <div style="font:.65rem/1 'JetBrains Mono';letter-spacing:.14em;text-transform:uppercase;color:var(--te3);margin-bottom:8px">PRESENTED BY</div>
        <div class="pres">
          <div class="pname">Aaryan Choudhary</div>
          <div class="proll">23UCSE4002</div>
          <div class="pdept">
            Dept. of Computer Science &amp; Engineering<br>
            MBM University, Jodhpur
          </div>
        </div>
      </div>
      <div style="height:1px;background:rgba(255,255,255,.06)"></div>
      <div>
        <div style="font:.65rem/1 'JetBrains Mono';letter-spacing:.14em;text-transform:uppercase;color:var(--te3);margin-bottom:8px">UNDER SUPERVISION OF</div>
        <div style="font:700 .95rem/1.3 'Inter';color:var(--tex);margin-bottom:4px">Dr. Abhisek Gour</div>
        <div style="font:.82rem/1.55 'Inter';color:var(--te2)">
          Professor, Computer Science &amp; Engineering<br>
          MBM University, Jodhpur
        </div>
      </div>
      <div style="height:1px;background:rgba(255,255,255,.06)"></div>
      <div style="display:flex;align-items:center;justify-content:space-between">
        <span class="chip">Live at 10.10.12.115</span>
        <span style="font:.72rem/1 'JetBrains Mono';color:var(--te3)">May 2026</span>
      </div>
    </div>
  </div>
</div>`,


/* ══════════════════════════════════════════════════════════════
   SLIDE 2 — PROBLEM STATEMENT
══════════════════════════════════════════════════════════════ */
`<div class="si">
  <div class="an sec-tag">01 · Problem Statement</div>
  <h2 class="an s-h2">The AI Access Gap</h2>
  <p class="an s-lead" style="margin-bottom:24px">
    Students at well-funded institutions have free, institutional AI access as a given.
    MBM University students had none of that — and their academic work was at risk.
  </p>

  <div class="an g2" style="gap:18px;margin-bottom:18px">
    <!-- Left: funded institutions -->
    <div class="gc gc-grn">
      <div style="font:.68rem/1 'JetBrains Mono';letter-spacing:.14em;text-transform:uppercase;color:var(--grn);margin-bottom:14px">FUNDED INSTITUTIONS</div>
      <ul style="list-style:none;display:flex;flex-direction:column;gap:10px">
        ${[
          'Unlimited GPT-4 / Claude via institutional license',
          'On-campus GPU clusters for research',
          'API keys subsidized — students pay ₹0',
          'Academic data stays under institutional NDA',
          'Copilot, Gemini bundled into every IDE',
        ].map(t=>`<li style="display:flex;gap:10px;font:.9rem/1.5 'Inter';color:var(--te2)">
          <span style="color:var(--grn);font-weight:700;flex:0 0 14px">✓</span>${t}</li>`).join('')}
      </ul>
    </div>
    <!-- Right: MBM before MAC -->
    <div class="gc">
      <div style="font:.68rem/1 'JetBrains Mono';letter-spacing:.14em;text-transform:uppercase;color:var(--te3);margin-bottom:14px">MBM UNIVERSITY · BEFORE MAC</div>
      <ul style="list-style:none;display:flex;flex-direction:column;gap:10px">
        ${[
          'Zero institutional AI access of any kind',
          '₹2,000–₹4,000/month personal subscription cost',
          'Academic research uploaded to cloud servers',
          'Zero control over where student data goes',
          'Assignments potentially training foreign models',
        ].map(t=>`<li style="display:flex;gap:10px;font:.9rem/1.5 'Inter';color:var(--te2)">
          <span style="color:#f87171;font-weight:700;flex:0 0 14px">✗</span>${t}</li>`).join('')}
      </ul>
    </div>
  </div>

  <div class="an cl warm">
    <div class="cl-head">⚠ &nbsp;The Hidden Privacy Cost Nobody Talked About</div>
    <div class="cl-body">Every research query, assignment draft, and idea submitted to OpenAI, Google, or Anthropic
    is potentially logged, reviewed, and used to improve their models. Students had zero on-campus alternative —
    and zero sovereignty over their own academic work. MAC was built to fix this.</div>
  </div>
</div>`,


/* ══════════════════════════════════════════════════════════════
   SLIDE 3 — WHAT IS MAC
══════════════════════════════════════════════════════════════ */
`<div class="si" style="text-align:center">
  <div class="an sec-tag" style="justify-content:center">02 · The Solution</div>
  <h2 class="an s-h2 grad-warm">MBM AI Cloud</h2>
  <p class="an s-lead" style="margin:0 auto 32px">
    A completely self-hosted AI platform running on university hardware,
    accessible via campus WiFi — zero cloud dependency, zero cost, full data sovereignty.
    Built in-house by students, for students.
  </p>

  <div class="an g3" style="text-align:left;margin-bottom:22px">
    <div class="gc">
      <div class="ficon" style="background:rgba(0,210,255,.1);color:var(--c)">🔒</div>
      <div class="ftitle">Zero Cloud</div>
      <div class="fbody">Every query, document, and conversation stays on campus hardware.
      Nothing leaves the university network. Ever. No third-party can access student data.</div>
    </div>
    <div class="gc gc-warm">
      <div class="ficon" style="background:rgba(217,116,73,.12);color:#f59e0b">₹ 0</div>
      <div class="ftitle">Zero Cost</div>
      <div class="fbody">Free for every MBM student. No subscriptions, no API limits, no paywalls.
      Not now, not ever. Built for academia, not for revenue.</div>
    </div>
    <div class="gc gc-pink">
      <div class="ficon" style="background:rgba(231,60,150,.1);color:var(--pink)">🎓</div>
      <div class="ftitle">Academic-First</div>
      <div class="fbody">RAG over your own notes, private web search, multi-LLM chat —
      all tuned around how students actually study, research, and write.</div>
    </div>
  </div>

  <div class="an hl" style="text-align:center;font-size:1.05rem;font-weight:500">
    📡 &nbsp; Live at &nbsp;<code>http://10.10.12.115</code>&nbsp; · &nbsp;Campus WiFi Only &nbsp;·&nbsp; Install as PWA on any device
  </div>
</div>`,


/* ══════════════════════════════════════════════════════════════
   SLIDE 4 — SYSTEM ARCHITECTURE
══════════════════════════════════════════════════════════════ */
`<div class="si">
  <div class="an sec-tag">03 · Architecture</div>
  <h2 class="an s-h2" style="margin-bottom:22px">System Architecture</h2>

  <!-- ── Architecture Diagram ── -->
  <div class="an arch">

    <!-- Client layer -->
    <div class="a-row">
      <div class="a-node a-client" style="max-width:560px">
        <div class="a-nt">📱 &nbsp; Student Devices &nbsp;—&nbsp; Browser · Installed PWA · Any OS</div>
        <div class="a-ns">Chrome · Firefox · Safari · Mobile · Desktop</div>
      </div>
    </div>

    <!-- WiFi connector -->
    <div class="a-vconn">
      <div class="a-vline"></div>
      <div class="a-vlbl">Campus WiFi · HTTP/HTTPS · 10.10.12.115</div>
      <div class="a-vline"></div>
    </div>

    <!-- Nginx layer -->
    <div class="a-row">
      <div class="a-node a-nginx" style="max-width:560px">
        <div class="a-nt">⚡ &nbsp; Nginx &nbsp;—&nbsp; Reverse Proxy &amp; Gateway</div>
        <div class="a-ns">:80 HTTP + :443 HTTPS &nbsp;·&nbsp; SSL Termination &nbsp;·&nbsp; Load Balancing &nbsp;·&nbsp; Path Routing</div>
        <span class="a-nc">Single Entry Point</span>
      </div>
    </div>

    <!-- 3-way split labels -->
    <div class="a-split">
      <div class="a-scol">
        <div class="a-vl-c"></div>
        <div class="a-slbl a-slbl-c">/chat</div>
        <div class="a-vl-c"></div>
      </div>
      <div class="a-scol">
        <div class="a-vl-g"></div>
        <div class="a-slbl a-slbl-g">/rag</div>
        <div class="a-vl-g"></div>
      </div>
      <div class="a-scol">
        <div class="a-vl-p"></div>
        <div class="a-slbl a-slbl-p">/search</div>
        <div class="a-vl-p"></div>
      </div>
    </div>

    <!-- Services row -->
    <div class="a-row" style="align-items:flex-start">
      <div class="a-node a-llm">
        <div class="a-nt">🧠 LLM Workers</div>
        <div class="a-ns">Llama 3 · Mistral · Phi-3</div>
        <span class="a-nc">Round-Robin Pool</span>
      </div>
      <div class="a-node a-qdr">
        <div class="a-nt">🔷 Qdrant :6333</div>
        <div class="a-ns">Vector DB · HNSW · Semantic</div>
        <span class="a-nc">RAG Store</span>
      </div>
      <div class="a-node a-srx">
        <div class="a-nt">🔍 SearXNG :8080</div>
        <div class="a-ns">Meta Search · 70+ Engines</div>
        <span class="a-nc">Private Search</span>
      </div>
    </div>

    <!-- Storage row connectors + nodes -->
    <div style="display:flex;width:100%;gap:10px;padding:4px 0 0">
      <div style="flex:1;display:flex;flex-direction:column;align-items:center">
        <div class="a-vl-c" style="height:12px"></div>
      </div>
      <div style="flex:1;display:flex;flex-direction:column;align-items:center">
        <div class="a-vl-g" style="height:12px"></div>
      </div>
      <div style="flex:1"></div>
    </div>
    <div class="a-row" style="gap:10px">
      <div class="a-node a-db">
        <div class="a-nt">🐘 PostgreSQL 16</div>
        <div class="a-ns">Users · Sessions · Chat History</div>
      </div>
      <div class="a-node a-db">
        <div class="a-nt">📐 Embedding Model</div>
        <div class="a-ns">nomic-embed-text · Dense Vectors</div>
      </div>
      <div style="flex:1"></div>
    </div>
  </div>
</div>`,


/* ══════════════════════════════════════════════════════════════
   SLIDE 5 — TECH STACK DECISION
══════════════════════════════════════════════════════════════ */
`<div class="si">
  <div class="an sec-tag">04 · Engineering Decisions</div>
  <h2 class="an s-h2">Why Vanilla JS Won</h2>
  <p class="an s-lead" style="margin-bottom:22px">
    We experimented with every major frontend framework.
    Over campus WiFi, every kilobyte of bundle directly becomes latency felt by every student.
  </p>

  <!-- Tech comparison table -->
  <div class="an tc" style="margin-bottom:18px">
    ${[
      {name:'Svelte',badge:'Attempt 1',chosen:false,pros:['Reactive','Great DX'],cons:['~150 KB bundle','~1.2s on 2.4GHz WiFi','Build step on every change']},
      {name:'React',badge:'Attempt 2',chosen:false,pros:['Huge ecosystem','Team familiarity'],cons:['~220 KB bundle','~1.8s on WiFi','Heavy hydration cost']},
      {name:'Vue 3',badge:'Attempt 3',chosen:false,pros:['Smaller than React','Composition API'],cons:['~130 KB bundle','~1.0s on WiFi','Still too heavy for LAN']},
      {name:'SvelteKit',badge:'Attempt 4',chosen:false,pros:['SSR support','File routing'],cons:['~180 KB+server','Added infra complexity','Overkill for LAN-only']},
      {name:'Vanilla JS',badge:'Final Choice',chosen:true,pros:['~8 KB total','< 0.1s on WiFi','No build step','No version rot'],cons:['Manual DOM state','No reactive system']},
    ].map(f=>`
    <div class="tc-col${f.chosen?' chosen':''}">
      ${f.chosen?'<div class="tc-ck">✓ FINAL CHOICE</div>':''}
      <div class="tc-badge">${f.badge}</div>
      <div class="tc-name${f.chosen?' chosen':''}">${f.name}</div>
      ${f.pros.map(p=>`<div class="tc-item pro">${p}</div>`).join('')}
      ${f.cons.map(c=>`<div class="tc-item con">${c}</div>`).join('')}
    </div>`).join('')}
  </div>

  <div class="an hl">
    ⚡ &nbsp; Key insight: campus WiFi at 2.4GHz under concurrent load delivers ~3–5 MB/s.
    A 220 KB React bundle vs an <code>8 KB</code> Vanilla page is a <strong style="color:var(--c)">27× size difference</strong>
    — felt by every student simultaneously. Backend: <strong style="color:var(--c)">Python 3.11 · FastAPI 0.115 · PostgreSQL 16 · vLLM · Docker Compose</strong>
  </div>
</div>`,


/* ══════════════════════════════════════════════════════════════
   SLIDE 6 — CORE FEATURES
══════════════════════════════════════════════════════════════ */
`<div class="si">
  <div class="an sec-tag">05 · Platform Features</div>
  <h2 class="an s-h2" style="margin-bottom:24px">Core Features of MBM AI Cloud</h2>

  <div class="an g4">
    ${[
      {icon:'🧠',c:'rgba(0,210,255,.1)',tc:'var(--c)',    title:'Multi-LLM Chat',   body:'Switch between Llama 3, Mistral, Phi-3 on the fly. All run locally. No internet needed for inference.'},
      {icon:'🔍',c:'rgba(0,229,147,.1)',tc:'var(--grn)', title:'Private Web Search',body:'SearXNG aggregates 70+ search engines — zero tracking, no cookies, no profiles. Ever.'},
      {icon:'📄',c:'rgba(217,116,73,.12)',tc:'#f59e0b',  title:'RAG · Chat with Docs',body:'Upload PDFs, notes, textbooks. HNSW finds relevant chunks. Answers with citations.'},
      {icon:'⚡',c:'rgba(231,60,150,.1)',tc:'var(--pink)', title:'SSE Streaming',    body:'Real-time token streaming via Server-Sent Events. Answers appear word-by-word instantly.'},
      {icon:'💬',c:'rgba(99,102,241,.1)',tc:'#818cf8',   title:'Conversation Memory',body:'Multi-turn context window. Sessions and full chat history persist in PostgreSQL 16. Resume any chat later.'},
      {icon:'👥',c:'rgba(0,210,255,.08)',tc:'var(--c)',   title:'Multi-User Concurrent',body:'Nginx + worker queue serves all campus students simultaneously via round-robin.'},
      {icon:'📱',c:'rgba(217,116,73,.1)',tc:'#f59e0b',   title:'PWA — Installable', body:'Install as a native-feeling app on Android, iOS, Windows, Mac. No app store needed.'},
      {icon:'🌐',c:'rgba(0,229,147,.08)',tc:'var(--grn)', title:'Search-Fused AI',  body:'Combine live SearXNG results with LLM reasoning for grounded, source-cited answers.'},
    ].map(f=>`
    <div class="gc" style="padding:22px 20px">
      <div class="ficon" style="background:${f.c};color:${f.tc}">${f.icon}</div>
      <div class="ftitle">${f.title}</div>
      <div class="fbody">${f.body}</div>
    </div>`).join('')}
  </div>
</div>`,


/* ══════════════════════════════════════════════════════════════
   SLIDE 7 — SYSTEM WORKFLOW DIAGRAM
══════════════════════════════════════════════════════════════ */
`<div class="si">
  <div class="an sec-tag">06 · System Workflow</div>
  <h2 class="an s-h2" style="margin-bottom:22px">Request Flow — Three Paths</h2>

  <div class="an" style="display:flex;gap:28px;align-items:flex-start;width:100%">

    <!-- Left: flow diagram -->
    <div style="flex:1;min-width:0">
      <div class="wf">
        <!-- User -->
        <div class="wf-node wn-u" style="min-width:200px">
          <div class="wn-t">👤 Student Query</div>
          <div class="wn-s">Natural language question</div>
        </div>
        <div class="wf-av"></div>
        <!-- Nginx router -->
        <div class="wf-node wn-r" style="min-width:200px">
          <div class="wn-t">⚡ Nginx Router</div>
          <div class="wn-s">Path-based intent routing</div>
        </div>

        <!-- 3 branches -->
        <div class="wf-branches" style="margin-top:6px">
          <!-- Branch 1: Direct Chat -->
          <div class="wf-branch">
            <div class="wf-blbl">Direct Chat</div>
            <div class="wf-node wn-llm">
              <div class="wn-t">🧠 LLM Worker</div>
              <div class="wn-s">Llama / Mistral</div>
            </div>
          </div>
          <!-- Branch 2: RAG -->
          <div class="wf-branch">
            <div class="wf-blbl">RAG Search</div>
            <div class="wf-node wn-qdr">
              <div class="wn-t">🔷 Qdrant HNSW</div>
              <div class="wn-s">ANN vector search</div>
            </div>
            <div class="wf-bl"></div>
            <div class="wf-node wn-qdr" style="border-color:rgba(0,210,255,.18)!important;background:rgba(0,210,255,.04)!important">
              <div class="wn-t" style="color:var(--c)">Top-K Chunks</div>
              <div class="wn-s">Context injection</div>
            </div>
            <div class="wf-bl"></div>
            <div class="wf-node wn-llm">
              <div class="wn-t">🧠 LLM + Context</div>
              <div class="wn-s">Augmented prompt</div>
            </div>
          </div>
          <!-- Branch 3: Web Search -->
          <div class="wf-branch">
            <div class="wf-blbl">Web Search</div>
            <div class="wf-node wn-srx">
              <div class="wn-t">🔍 SearXNG</div>
              <div class="wn-s">70+ engines · private</div>
            </div>
            <div class="wf-bl"></div>
            <div class="wf-node wn-srx" style="border-color:rgba(0,210,255,.18)!important;background:rgba(0,210,255,.04)!important">
              <div class="wn-t" style="color:var(--c)">Web Snippets</div>
              <div class="wn-s">Ground truth context</div>
            </div>
            <div class="wf-bl"></div>
            <div class="wf-node wn-llm">
              <div class="wn-t">🧠 LLM + Results</div>
              <div class="wn-s">Cited reasoning</div>
            </div>
          </div>
        </div>

        <!-- Convergence -->
        <div class="wf-av" style="margin-top:8px"></div>
        <div class="wf-node wn-resp" style="min-width:200px">
          <div class="wn-t">📡 SSE Response Stream</div>
          <div class="wn-s">Real-time tokens → Browser</div>
        </div>
      </div>
    </div>

    <!-- Right: RAG ingestion pipeline -->
    <div style="flex:0 0 270px;display:flex;flex-direction:column;gap:12px">
      <div style="font:.65rem/1 'JetBrains Mono';letter-spacing:.12em;text-transform:uppercase;color:var(--te3);margin-bottom:4px">RAG · Ingestion Phase</div>
      ${[
        {c:'rgba(0,210,255,.07)',bc:'rgba(0,210,255,.2)',tc:'var(--c)',    n:'1',t:'Upload PDF / Text',   s:'Student document'},
        {c:'rgba(99,102,241,.06)',bc:'rgba(99,102,241,.2)',tc:'#818cf8', n:'2',t:'Sliding Window Chunker',s:'512 tok · 20% overlap'},
        {c:'rgba(217,116,73,.06)',bc:'rgba(217,116,73,.2)',tc:'#fb923c', n:'3',t:'Embedding Model',      s:'nomic-embed-text'},
        {c:'rgba(0,229,147,.05)',bc:'rgba(0,229,147,.2)',tc:'var(--grn)', n:'4',t:'Qdrant HNSW Index',   s:'Vector stored'},
        {c:'rgba(51,103,145,.08)',bc:'rgba(51,103,145,.3)',tc:'#6db3e8',    n:'5',t:'PostgreSQL Metadata',s:'Chunk → doc map · user ownership'},
      ].map(r=>`
      <div style="display:flex;align-items:flex-start;gap:12px">
        <div style="flex:0 0 26px;height:26px;border-radius:50%;background:${r.c};border:1px solid ${r.bc};
          display:flex;align-items:center;justify-content:center;font:700 .7rem/1 'JetBrains Mono';color:${r.tc}">${r.n}</div>
        <div style="flex:1">
          <div style="font:600 .84rem/1.3 'Inter';color:var(--tex)">${r.t}</div>
          <div style="font:.73rem/1.4 'JetBrains Mono';color:var(--te3);margin-top:2px">${r.s}</div>
        </div>
      </div>`).join('')}
    </div>
  </div>
</div>`,


/* ══════════════════════════════════════════════════════════════
   SLIDE 8 — TECHNICAL CHALLENGES
══════════════════════════════════════════════════════════════ */
`<div class="si">
  <div class="an sec-tag">07 · Technical Challenges</div>
  <h2 class="an s-h2">The Hard Problems We Solved</h2>
  <p class="an s-lead" style="margin-bottom:24px">
    Campus WiFi environments presented unique engineering challenges — none of which had ready-made solutions.
  </p>

  <div class="an cl" style="border-left-color:var(--c)">
    <div class="cl-head">🔐 &nbsp; Challenge 1 &mdash; PWA Requires HTTPS, WiFi Runs HTTP</div>
    <div class="cl-body">Service Workers (mandatory for PWA install) are browser-blocked on HTTP origins.
    University WiFi is HTTP-only. <strong style="color:var(--tex)">Solution:</strong> Generated a self-signed X.509 SSL certificate
    with OpenSSL, configured Nginx on :443 with this cert, and guided students to install it in their device trust stores.</div>
    <div class="cl-fix">openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes -subj "/CN=10.10.12.115"
nginx: ssl_certificate /etc/ssl/cert.pem;  ssl_certificate_key /etc/ssl/key.pem;</div>
  </div>

  <div class="an cl warm">
    <div class="cl-head">🌐 &nbsp; Challenge 2 &mdash; HTTP + HTTPS Dual Support Without Breaking Anyone</div>
    <div class="cl-body">Not all devices trust custom SSL certs. Forcing HTTPS-only would lock out students who hadn't installed the cert.
    <strong style="color:var(--tex)">Solution:</strong> Nginx configured with two <code style="font-family:monospace;color:var(--warm);background:rgba(217,116,73,.08);padding:1px 6px;border-radius:4px">server{}</code> blocks —
    one on :80 (plain HTTP, full app), one on :443 (HTTPS, enables PWA install).
    No student is ever blocked. Both routes hit the same backend upstream.</div>
  </div>

  <div class="an cl pink">
    <div class="cl-head">📡 &nbsp; Challenge 3 &mdash; Router Assigns Random IPs from DHCP Pool Daily</div>
    <div class="cl-body">The university WiFi router assigned a different IPv4 address from its pool on every reconnect.
    Students couldn't bookmark the app. <strong style="color:var(--tex)">Solution:</strong> Identified the server's hardware MAC address,
    then configured a <strong style="color:var(--tex)">DHCP static lease</strong> on the router — binding
    <code style="font-family:monospace;color:var(--pink);background:rgba(231,60,150,.08);padding:1px 6px;border-radius:4px">MAC address → 10.10.12.115</code> permanently.
    Every MBM student now bookmarks the same IP forever.</div>
  </div>
</div>`,


/* ══════════════════════════════════════════════════════════════
   SLIDE 9 — ALGORITHMS & DATA STRUCTURES
══════════════════════════════════════════════════════════════ */
`<div class="si">
  <div class="an sec-tag">08 · Algorithms &amp; Methods</div>
  <h2 class="an s-h2" style="margin-bottom:22px">Under the Hood</h2>

  <div class="an" style="overflow-x:auto;border:1px solid rgba(0,210,255,.1);border-radius:16px">
    <table class="mt">
      <thead>
        <tr>
          <th>Component</th>
          <th>Algorithm / Method</th>
          <th>Reason for Choice</th>
        </tr>
      </thead>
      <tbody>
        ${[
          ['Semantic Search',   'Cosine Similarity on dense vector embeddings (nomic-embed-text)',        'Captures meaning and intent — not just keyword overlap'],
          ['RAG Retrieval',     'Approximate Nearest Neighbor — HNSW graph index (Qdrant)',              'Sub-millisecond ANN search; beats brute-force at any vector count'],
          ['Document Chunking', 'Sliding window, 512 tokens, 20% overlap',                               'Preserves context at chunk boundaries — nothing gets severed mid-idea'],
          ['LLM Load Balancing','Round-robin across worker pool + async request queue',                   'Fair distribution; no single model instance is starved under concurrent load'],
          ['Response Streaming','Server-Sent Events (SSE) — chunked transfer encoding',                  'Lowest-overhead streaming; works natively over both HTTP and HTTPS'],
          ['Web Search → AI',  'SearXNG snippet injection into LLM system prompt',                       'Grounds the model in real-time data; eliminates hallucination on current facts'],
          ['Session Storage',   'PostgreSQL 16 via SQLAlchemy ORM — async connection pool',             'Full ACID, concurrent multi-user writes, structured chat history with relations'],
          ['LLM Inference',    'vLLM — PagedAttention + continuous batching on GPU workers',            'Maximises GPU memory utilisation; serves multiple concurrent prompts efficiently'],
          ['IP Persistence',   'DHCP static lease — MAC address → fixed IP binding on router',          'Guarantees 10.10.12.115 survives reboots and router DHCP pool resets'],
        ].map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}
      </tbody>
    </table>
  </div>

  <div class="an hl" style="margin-top:16px">
    The core RAG stack — <strong style="color:var(--c)">embed → HNSW ANN → top-K retrieval → prompt augmentation</strong> — delivers
    semantically accurate answers over student documents with sub-200ms retrieval latency on campus hardware.
  </div>
</div>`,


/* ══════════════════════════════════════════════════════════════
   SLIDE 10 — FUTURE SCOPE
══════════════════════════════════════════════════════════════ */
`<div class="si">
  <div class="an sec-tag">09 · Future Roadmap</div>
  <h2 class="an s-h2 grad-warm" style="margin-bottom:10px">What's Next for MAC</h2>
  <p class="an s-lead" style="margin-bottom:28px">
    The foundation is solid. These four expansions will turn MAC from a campus AI into
    an institution-grade AI platform — and eventually, a tool any university in India can deploy.
  </p>

  <div class="an rm">
    <div class="rmi">
      <div class="rmi-num">ROADMAP 01</div>
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
        <span style="font-size:1.4rem">🔧</span>
        <div class="rmi-title">MCP Tool Integration — Agentic AI</div>
      </div>
      <div class="rmi-body">
        Integrate the Model Context Protocol (MCP) into MAC's LLMs, giving them tools:
        file creation, code execution, web forms, API calls. Students could ask MAC to
        "write and run my Python script" or "fill this form" — like Replit AI, but private and on-campus.
      </div>
      <div style="margin-top:12px"><span class="chip">MCP</span> <span class="chip-warm">Agentic</span></div>
    </div>

    <div class="rmi">
      <div class="rmi-num">ROADMAP 02</div>
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
        <span style="font-size:1.4rem">📦</span>
        <div class="rmi-title">npm install mac — One-Command Deploy</div>
      </div>
      <div class="rmi-body">
        Publish MAC as an npm package so any institution, professor, or student union
        can spin up their own sovereign AI instance with a single command.
        Full Docker compose, config wizard, and auto-SSL included.
      </div>
      <div style="margin-top:12px"><span class="chip" style="font-family:'JetBrains Mono',monospace">npm install mac</span></div>
    </div>

    <div class="rmi">
      <div class="rmi-num">ROADMAP 03</div>
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
        <span style="font-size:1.4rem">🌍</span>
        <div class="rmi-title">Cloudflare Tunnel — Use MAC Anywhere</div>
      </div>
      <div class="rmi-body">
        Set up a Cloudflare Tunnel (zero-trust, no port-forwarding) to expose MAC securely
        over the internet. Students get a permanent HTTPS URL and personal API keys —
        so MAC works in VS Code, from home, on mobile data, anywhere on Earth.
      </div>
      <div style="margin-top:12px"><span class="chip">Cloudflare Tunnel</span> <span class="chip-grn">API Keys</span></div>
    </div>

    <div class="rmi">
      <div class="rmi-num">ROADMAP 04</div>
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
        <span style="font-size:1.4rem">🏛</span>
        <div class="rmi-title">Multi-Department &amp; Institution Rollout</div>
      </div>
      <div class="rmi-body">
        Extend access beyond CSE: each department gets isolated document collections via Qdrant namespaces.
        Fine-tune models on domain-specific academic content (law, medicine, engineering).
        Long-term: open-source the full stack so any university in India can deploy MAC in a weekend.
      </div>
      <div style="margin-top:12px"><span class="chip-warm">Multi-tenant</span> <span class="chip-pink">Open Source</span></div>
    </div>
  </div>

  <!-- Closing statement -->
  <div class="an" style="text-align:center;margin-top:22px">
    <div style="font:700 1.15rem/1.4 'Inter';color:var(--tex);margin-bottom:6px">
      "Every student at MBM deserves the same AI tools as a student at MIT."
    </div>
    <div style="font:.88rem/1 'JetBrains Mono';color:var(--te3)">
      MAC makes that possible &nbsp;·&nbsp; free &nbsp;·&nbsp; private &nbsp;·&nbsp; on-campus
    </div>
  </div>
</div>`,

]; /* end SLIDES */
