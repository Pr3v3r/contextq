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