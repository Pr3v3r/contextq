# ContextQ — Session Log

A running learning diary for building ContextQ, June 23 – July 21, 2026.

---

## Day 1 — June 23, 2026
**Task completed:** Project scaffold

**Concepts learned:**
- Next.js App Router: file-based routing with React Server Components by default, layouts via `layout.tsx`, route groups with `()` for organization without URL impact
- Absolute imports: `@/*` path alias in `tsconfig.json` maps to `src/`, TypeScript rewrites these at compile time so you never write relative paths
- `src/` directory: clean separation between application code and project config files
- Tailwind v4 syntax: uses `@import "tailwindcss"` instead of old directive syntax

**Bugs faced + how fixed:**
- None. Clean scaffold.

**Interview questions I can now answer:**
- What is the Next.js App Router and how does it differ from Pages Router?
- What does a path alias in `tsconfig.json` do and why use it?
- Why structure a Next.js project with a `src/` directory?

---

## Day 2 — June 24, 2026
**Task completed:** NextAuth Google OAuth

**Concepts learned:**
- NextAuth v5 architecture: `auth.ts` (config) + `[...nextauth]/route.ts` (HTTP handlers) + `middleware.ts` (route protection)
- OAuth flow: Google redirect → callback → session cookie → protected access
- Catch-all routes `[...param]`: matches all sub-paths under a segment
- Server Actions (`"use server"`): run server-side functions from form submissions
- Defence in depth: middleware + page-level `auth()` check as two separate locks
- `!!` operator: converts any value to boolean (`null` → `false`, object → `true`)
- Middleware matcher: regex negative lookahead to skip static assets
- Sessions live in cookies — clearing cookies ends the session

**Bugs faced + how fixed:**
- Google Cloud UI glitch on consent screen creation — refreshed page, resource was already created

**Interview questions I can now answer:**
- How does OAuth work end to end?
- What is a Server Action in Next.js and why use it?
- What is the difference between middleware protection and page-level auth check?
- What happens to a session when a user clears their cookies?
- Why does NextAuth use a catch-all route?

---

## Day 3 — June 25, 2026
**Task completed:** Docker + PostgreSQL + Prisma + NextAuth adapter

**Concepts learned:**
- Docker containers: running PostgreSQL in a container instead of installing locally, `-e` for env vars, `-p` for port mapping, `-d` for detached mode
- Prisma ORM: schema-first database management, models map to tables
- Prisma 7 breaking change: URL moved from `schema.prisma` to `prisma.config.ts`, requires explicit adapter (`@prisma/adapter-pg`) instead of built-in drivers
- Database migrations: versioned SQL scripts that keep all environments in sync
- Three NextAuth models: User (identity), Account (OAuth provider link), Session (active login) — separated for multi-provider and multi-device support
- `globalThis` Prisma pattern: prevents multiple PrismaClient instances during Next.js hot reloads in development
- cuid vs integer IDs: random unguessable IDs are safer for web apps
- Next.js 16: `middleware.ts` renamed to `proxy.ts`

**Bugs faced + how fixed:**
- Prisma 7 rejected `url` in `schema.prisma` → moved to `prisma.config.ts`
- PrismaClient initialization error → passed adapter directly to PrismaClient constructor in `src/lib/prisma.ts`
- Next.js 16 deprecated `middleware.ts` → renamed to `src/proxy.ts`

**Interview questions I can now answer:**
- What is a database migration and why use migration files?
- What is an ORM and why use it over raw SQL?
- Why separate User, Account, Session into three tables?
- What is the `globalThis` pattern for Prisma in Next.js?
- Why use cuid over auto-increment integer IDs?

---

## Day 4 — June 29, 2026
**Task completed:** File upload UI with drag and drop, PDF validation, local storage

**Concepts learned:**
- Drag and drop browser events: `dragenter`, `dragover`, `dragleave`, `drop` — `preventDefault()` on `dragover` stops browser from opening file directly
- Server Component → Client Component boundary: functions are not serializable, cannot be passed as props across the boundary
- Wrapper pattern: `UploadSection` (client) wraps `FileUpload` (client) so `DashboardPage` (server) doesn't need to pass any functions
- FormData API: how to construct multipart form data in the browser for file uploads
- ArrayBuffer → Buffer conversion: browser gives ArrayBuffer, Node.js `writeFile` needs Buffer, `Buffer.from()` bridges the gap
- File naming with `Date.now()`: prevents filename collisions on disk
- JWT session strategy: stateless sessions stored in cookies, no database round trip needed on every request
- Next.js 16 `proxy.ts`: replacement for `middleware.ts`, named export instead of default for route protection

**Bugs faced + how fixed:**
- `@auth/prisma-adapter` incompatible with Prisma 7 database sessions → switched to JWT session strategy in `auth.ts`
- Server Component passing function prop to Client Component → created `UploadSection` wrapper component that owns state and callbacks
- Next.js 16 `proxy.ts` not protecting routes with `auth()` wrapper → manually checked session cookie for route protection
- Hydration mismatch warning → caused by browser extension injecting attributes, not a real bug

**Interview questions I can now answer:**
- Why can't functions be passed from Server to Client Components?
- What is the drag and drop event sequence in the browser?
- Why use `Date.now()` or UUID for uploaded filenames?
- What is JWT session strategy vs database session strategy?
- What does `preventDefault()` do on a `dragover` event?

---

## Day 5 — June 30, 2026
**Task completed:** Dashboard shell — sidebar, document list, responsive layout, custom theme

**Concepts learned:**
- Empty state design: handling "no data yet" as a valid UI state, not an error,
  critical for new user experience even when testing with hardcoded mock data
- flex-1 vs fixed width: sidebar uses w-64 (fixed, never changes), main uses
  flex-1 (grows/shrinks to fill remaining space) in a flex container
- CSS custom properties (variables) for theming: --background, --foreground,
  --primary, --primary-foreground swap automatically between light/dark via
  @media (prefers-color-scheme: dark)
- --primary-foreground as separate variable: button text color must invert
  alongside button background color to stay readable in both themes
- next/font/google (Inter): self-hosts font at build time, no runtime request
  to Google, no layout shift, vs old <link> tag approach which causes FOUT
- Tailwind translate-x-full / -translate-x-full: used for sliding sidebar
  off-screen on mobile and back on toggle
- prefers-color-scheme media query vs manual theme toggle: media query is
  automatic OS-level detection with zero JS; manual toggle requires state,
  localStorage persistence, and care to avoid flash-of-wrong-theme on load

**Bugs faced + how fixed:**
- Forgot to actually update component files with new theme colors after
  defining CSS variables — had to manually swap zinc-* classes to
  foreground/background/surface/primary/muted across Sidebar, DocumentList,
  dashboard page
- Home page (/) had no logic to redirect logged-in users to /dashboard —
  added auth() check and redirect
- Missing space caused two Tailwind classes to merge into one invalid class
  (rounded-lgbg-surface) — silently failed to apply, caught by review

**Interview questions I can now answer:**
- Why design empty states even when testing with mock data?
- What's the difference between flex-1 and a fixed width in a flex container?
- Why does a button's text color need to be a separate CSS variable from its
  background color?
- How does next/font/google improve performance over a standard <link> tag?
- What's the engineering difference between an automatic OS-based theme and
  a manual toggle button?

---

## Day 6 — July 7, 2026
**Task completed:** FastAPI scaffold, health endpoint, Docker Compose with FastAPI + ChromaDB

**Concepts learned:**
- FastAPI: Python web framework for building APIs, needs Uvicorn as the ASGI
  server to actually run and listen for requests
- Docker Compose: orchestrates multiple services together with one command,
  defines dependencies between services (FastAPI depends_on ChromaDB)
- Docker volumes: bind mounts (./backend:/app) sync local code into container
  for hot reload; named volumes (chroma_data) persist data across container
  restarts
- Docker internal networking: containers talk to each other using service names
  as hostnames (chromadb:8000), not localhost — localhost inside a container
  refers to itself
- Port mapping: 8001:8000 means Mac sees port 8001, container uses 8000
  internally; container-to-container traffic uses the internal port directly
- CORS middleware: browser blocks cross-origin requests by default (Same-Origin
  Policy), CORS tells FastAPI to allow requests from localhost:3000
- Dockerfile layer caching: COPY requirements.txt before COPY . . so package
  installs are cached and only re-run when requirements change, not on every
  code change
- Switched from OpenAI to Gemini API: free tier, no billing, same RAG pipeline
  logic, just different API calls

**Bugs faced + how fixed:**
- ChromaDB image pull timing out repeatedly → pulled image separately with
  docker pull first, then ran docker compose up --build

**Interview questions I can now answer:**
- What does Docker Compose do and why use it over separate docker run commands?
- What is the difference between a bind mount and a named volume?
- Why do containers use service names instead of localhost to communicate?
- What is CORS and why does a browser enforce it?
- What is an ASGI server and why does FastAPI need one?

**What to pick up next session (Day 7):**
- PDF processing endpoint in FastAPI — receive uploaded PDF, chunk with
  LangChain RecursiveCharacterTextSplitter, log chunks to console

  ## Day 7 — July 8, 2026
**Task completed:** PDF processing endpoint — text extraction + chunking

**Concepts learned:**
- pypdf: extracts raw text from PDFs page by page, skips images entirely
- io.BytesIO: wraps raw bytes in a file-like interface so libraries like pypdf
  can read uploaded files directly from memory without saving to disk first
- RecursiveCharacterTextSplitter: splits text into overlapping chunks,
  chunk_size=1000 characters, chunk_overlap=200 so boundary sentences
  aren't cut in half and lose meaning
- Why chunking: context window limits + relevance — sending only relevant
  chunks gives sharper answers than dumping the entire document
- LangChain package restructure: RecursiveCharacterTextSplitter moved from
  langchain.text_splitter to langchain_text_splitters in newer versions
- Docker cache gotcha: if requirements.txt appears unchanged to Docker,
  pip install layer is cached and new packages aren't installed — need
  --no-cache flag to force full rebuild
- Page metadata in chunks: we prefix each page's text with [Page N] so
  later we can show users which page the answer came from (citations)

**Bugs faced + how fixed:**
- ModuleNotFoundError: langchain.text_splitter → updated import to
  langchain_text_splitters, forced --no-cache rebuild
- Docker kept using cached pip install layer despite requirements.txt change →
  used docker compose build --no-cache to bypass cache

**Interview questions I can now answer:**
- What is chunking and why is it necessary for RAG?
- What does chunk_overlap do and why is it important?
- Why use io.BytesIO instead of saving the file to disk first?
- How does Docker layer caching work and when does it cause problems?

**What to pick up next session (Day 8):**
- Gemini embeddings — embed each chunk, store in ChromaDB with
  document_id and page metadata

  ## Day 8 — July 11, 2026
**Task completed:** Gemini embeddings + ChromaDB storage

**Concepts learned:**
- Embeddings: vectors of numbers representing semantic meaning of text.
  Semantically similar text produces numerically close vectors. This is
  how similarity search works — closest vector = most relevant chunk.
- google-genai package: new replacement for deprecated google-generativeai.
  Client initialized with api_key and http_options for API version control.
- gemini-embedding-001: correct embedding model name for our API account.
  Always verify available models via client.models.list() instead of guessing.
- chromadb.HttpClient: connects to separate ChromaDB container over HTTP,
  vs chromadb.Client() which is in-memory and loses data on restart
- get_or_create_collection: idempotent — safe to call every time, creates
  collection on first call, fetches on subsequent calls. Same as mkdir -p.
- collection.add(): stores documents, embeddings, ids, and metadata together.
  IDs are unique per chunk (document_id_chunk_0, document_id_chunk_1 etc.)
  Metadata stores document_id and chunk_index for filtering later.
- Docker hot reload: volume mount means code changes reflect instantly
  in container without rebuild — only rebuild needed when requirements change.

**Bugs faced + how fixed:**
- google.generativeai deprecated → switched to google.genai package
- text-embedding-004 model not found → ran client.models.list() inside
  container to find correct model name: gemini-embedding-001
- api_version v1beta doesn't support embedding model → forced v1 via
  http_options={"api_version": "v1"}
- chroma_client NameError → variable name conflict between client instances,
  renamed to gemini_client and chroma_client explicitly

**Interview questions I can now answer:**
- What is an embedding and how does semantic similarity search work?
- Why use chromadb.HttpClient instead of chromadb.Client()?
- What does collection.add() store and why do we need metadata?
- Why rename google-generativeai to google-genai?

**What to pick up next session (Day 9):**
- Query endpoint — embed the user's question, similarity search ChromaDB,
  return top 5 most relevant chunks as JSON

  ## Day 9 — July 11, 2026
**Task completed:** Query endpoint — semantic similarity search

**Concepts learned:**
- Query flow: embed question → similarity search ChromaDB → return top N chunks
  This is the retrieval half of RAG — generation comes next session
- collection.query(): takes query_embeddings, n_results, and optional where
  filter. Returns documents, metadatas, and distances sorted by relevance
- Distance in vector search: how far apart two vectors are numerically.
  Small distance = semantically similar. Results sorted ascending by distance
  so first result is always most relevant
- where_filter: lets us scope search to a specific document_id so a user
  only gets chunks from their own document, not everyone's
- Testing in isolation: built and verified retrieval before adding generation
  layer — each piece tested independently before combining

**Bugs faced + how fixed:**
- None today

**Interview questions I can now answer:**
- What does similarity search actually do under the hood?
- What is distance in the context of vector search?
- Why filter by document_id in the query?
- Why test retrieval separately before adding the LLM generation step?

**What to pick up next session (Day 10):**
- Connect Next.js to FastAPI — upload triggers full pipeline end to end,
  confirm chunks stored in ChromaDB from the UI

  ## Day 10 — July 13, 2026
**Task completed:** Next.js connected to FastAPI, full upload pipeline end to end

**Concepts learned:**
- Next.js API route as proxy: upload route saves file to disk AND forwards
  it to FastAPI in the same request, returns combined response to frontend
- FormData reconstruction: can't forward the original request FormData —
  must reconstruct using new Blob([buffer]) after reading the file into memory
- TypeScript interface updates: when a callback's return type changes,
  must update the interface in every component that uses it
- Duplicate interface error: TypeScript doesn't allow two interfaces with
  the same name in the same file — delete the old one when updating
- Full RAG ingestion pipeline: browser → Next.js API → FastAPI →
  pypdf (extract) → LangChain (chunk) → Gemini (embed) → ChromaDB (store)

**Bugs faced + how fixed:**
- Infinite GET /dashboard requests → cleared .next cache with rm -rf .next
- Two FileUploadProps interfaces causing type error → deleted the old one
- onUploadComplete passing string instead of object → updated callback
  to pass full UploadResult object with filename, document_id, total_chunks

**Interview questions I can now answer:**
- How does Next.js act as a proxy between the frontend and FastAPI?
- Why can't you forward FormData directly from one HTTP request to another?
- What is the complete data ingestion flow in a RAG system?

**What to pick up next session (Day 11):**
- Q&A endpoint in FastAPI — take top chunks from ChromaDB, construct
  prompt, call Gemini, return answer (non-streaming first)

  ## Day 11 & 12 — July 13-14, 2026
**Task completed:** Q&A endpoint + streaming via Server-Sent Events

**Concepts learned:**
- Server-Sent Events (SSE): server keeps HTTP connection open and sends
  chunks of data as they're ready. Client receives each chunk immediately
  instead of waiting for the full response.
- StreamingResponse in FastAPI: wraps an async generator function,
  sets media_type="text/event-stream", keeps connection alive
- yield vs return: yield turns a function into a generator — pauses execution,
  sends one value, resumes when next value is needed. return sends everything
  at once and closes the function.
- async generator: combines async (non-blocking) with yield (streaming).
  FastAPI can handle other requests while waiting for Gemini's next chunk.
- ReadableStream + getReader(): browser API to consume a streaming response
  chunk by chunk. Each .read() call returns the next available bytes.
- TextDecoder: converts raw bytes (Uint8Array) from network into a JS string
- SSE format: each event is "data: {json}\n\n". We parse each line,
  skip non-data lines, parse JSON, extract text, append to UI
- [DONE] sentinel: custom signal we send to tell the client the stream is over
- Chat state in React: messages array grows as user sends and AI responds.
  Last message content is updated incrementally as stream chunks arrive.
  Chat resets on page refresh — persistence comes Day 14.

**Bugs faced + how fixed:**
- Gemini rate limit (429) on generate_content — daily free tier quota exhausted.
  Code is correct, just need to wait for quota reset overnight.
- gemini_clients typo → gemini_client (no s)
- generate(). period instead of comma → generate(),

## Day 13 & 14 — July 15-17, 2026
**Task completed:** Streaming verified, conversation history with Postgres

**Concepts learned:**
- generate_content_stream with async for: proper async streaming from Gemini,
  chunks arrive in batches on free tier but architecture is correct
- gemini-flash-latest: the model string that actually works on this account
- useEffect with dependency array: runs on mount and whenever dependency
  changes — used to reload chat history when document switches
- upsert vs create: upsert is idempotent — safe to call even if record exists,
  prevents unique constraint errors on re-upload
- JWT session user ID: not included by default, must add via callbacks in
  auth.ts — jwt callback stores it in token, session callback exposes it
- TypeScript module augmentation: declare module "next-auth" to extend
  Session type with custom fields like user.id
- Message persistence flow: save user message before streaming, accumulate
  full answer in fullAnswer variable, save assistant message after stream ends
- Document ID mismatch: FastAPI prefixes filename with Date.now() creating
  the document_id, must use this exact string everywhere consistently

**Bugs faced + how fixed:**
- session.user.id undefined → added jwt and session callbacks to auth.ts
- Multiple user records from sign-out/sign-in → cleaned database, re-uploaded
- Document not found 404 → document_id in dashboard was missing timestamp
  prefix, updated to match what FastAPI actually generates
- Messages saving but not loading → GET was finding wrong document record
  due to mismatched documentId strings

**Interview questions I can now answer:**
- How do you persist chat history in a RAG application?
- Why use upsert instead of create for document records?
- How do you add custom fields to NextAuth JWT sessions?
- What is TypeScript module augmentation and when do you use it?

**What to pick up next session (Day 15):**
- Document vaults — fetch real documents from Postgres, show in sidebar
  and document list, clicking a document loads its chat history

  ## Day 15 — July 18, 2026
**Task completed:** Document vaults — real documents from Postgres

**Concepts learned:**
- SessionProvider: required wrapper for useSession hook in Client Components.
  Goes in layout.tsx so it wraps the entire app.
- useSession vs auth(): useSession is for Client Components (needs
  SessionProvider), auth() is for Server Components (direct call, no wrapper)
- Conditional rendering: ChatInterface only renders when a document is
  selected — no selected doc = no context = no point showing chat
- Lifting state up: selectedDoc state lives in DashboardPage (parent) so
  both DocumentList and ChatInterface can share it. DocumentList updates it,
  ChatInterface reads it.
- orderBy createdAt desc: most recently uploaded document appears first,
  standard UX pattern for document lists
- Real data replacing mock data: DocumentList now fetches from /api/documents
  instead of hardcoded array. Empty state still works for new users.

**Bugs faced + how fixed:**
- useSession must be wrapped in SessionProvider → added SessionProvider to
  layout.tsx wrapping all children

**Interview questions I can now answer:**
- What is the difference between useSession and auth() in Next.js?
- Why does useSession need a SessionProvider?
- What does "lifting state up" mean and when do you use it?
- Why render ChatInterface conditionally based on selected document?

**What to pick up next session (Day 16):**
- Error handling everywhere — failed uploads, API timeouts, empty states,
  loading skeletons on every async action