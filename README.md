# crit

fullstack template with Express + Prisma + Next.js.

- **Backend**: Express + Prisma + PostgreSQL + JWT auth
- **Frontend**: Next.js
- **Docker Compose** for local development

GitHub repo: [git@github.com:DiegoGp227/crit.git](https://github.com/git@github.com:DiegoGp227/crit.git)

## Quick Start

```bash
# 1. Copy env vars and edit them
cp .env.example .env

# 2. Start PostgreSQL
docker compose up -d postgres

# 3. Backend
cd back
pnpm install
pnpm run prisma:migrate:init
pnpm run dev

# 4. Frontend (new terminal)
cd front
pnpm install
pnpm run dev
```

Or run everything with Docker:

```bash
docker compose up --build
```

## Documentation

Add project documentation here.
