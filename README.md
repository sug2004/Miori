# Miori — AI Fashion Companion

> An AI that knows how the user actually dresses. Digitizes their wardrobe, recommends outfits from what they own, explains why, flags gaps, and chats like an anime companion.

## Monorepo Structure

```
Miori/
├── backend/                      # NestJS API
│   ├── prisma/schema.prisma      # DB schema (users, wardrobe, outfits, chat, ...)
│   └── src/
│       ├── auth/                 # JWT signup / login / me
│       ├── prisma/               # Prisma client (global module)
│       ├── wardrobe/             # (Module 2) Wardrobe CRUD + upload + AI draft
│       ├── ai/                   # Vision + LLM integration
│       ├── outfit/               # (Module 3) Outfit generation + rules
│       ├── chat/                 # (Module 4) Conversations + messages
│       ├── companion/            # (Module 5) Character profiles
│       └── shopping/             # (Module 6) Gap analysis + recommendations
├── mobile/                       # Expo (React Native) app
│   └── src/
│       ├── app/                  # Expo Router file-based routes
│       ├── components/           # Reusable UI components
│       ├── lib/                  # API client, secure storage
│       ├── state/                # AuthProvider context
│       └── types/                # Shared TypeScript types
└── docs/                         # All documentation
    ├── README.md                 # Docs index
    ├── features.md               # Feature highlights
    ├── spec/                     # Master product spec
    ├── dev/                      # Setup & implementation plan
    └── modules/                  # Per-module docs
```

## Core Features

- **Digital Wardrobe** — photograph items (camera/gallery) or add manually → AI extracts category, name, color (with NVIDIA NIM preferred) → confirm/edit → browse grid/list with filters/favorites/wear tracking.
- **Outfit Generation** — pick an occasion → 3 outfits built only from owned items, with reasoning.
- **Style This Item** — any single item → multiple looks (Casual, Smart Casual, Date Night, ...).
- **AI Stylist Chat** — conversational stylist returning structured outfit cards from real wardrobe items.
- **Smart Shopping** (v1+) — wardrobe gap analysis + real product suggestions.
- **Companion Layer** (v1+) — anime character personality wrapping the stylist.

## Tech Stack

| Layer | Choice |
|-------|--------|
| Mobile | React Native + Expo (managed) + TypeScript |
| Navigation | Expo Router |
| Styling | NativeWind (Tailwind) |
| Backend | NestJS |
| Database | PostgreSQL + Prisma |
| Storage | UploadThing |
| Auth | JWT (SecureStore on device) |
| AI | NVIDIA NIM / OpenAI Vision with structured JSON output |

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm
- PostgreSQL database (e.g. [Neon](https://neon.tech) free tier)

### 1. Install dependencies

```bash
# backend
cd backend && npm install

# mobile
cd ../mobile && npm install
```

### 2. Configure environment

**backend/.env**
```env
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require
JWT_SECRET=<openssl rand -hex 32>
JWT_EXPIRES_IN=7d
PORT=3000
UPLOADTHING_TOKEN=sk_live_...
OPENAI_API_KEY=sk-...
OPENAI_VISION_MODEL=gpt-4o-mini
NVIDIA_API_KEY=nvapi-...
NVIDIA_BASE_URL=https://integrate.api.nvidia.com/v1
NVIDIA_VISION_MODEL=meta/llama-3.2-11b-vision-instruct
```

**mobile/.env**
```env
EXPO_PUBLIC_API_URL=http://localhost:3000/api
EXPO_PUBLIC_UPLOADTHING_APP_ID=...
```

### 3. Apply database migrations

```bash
cd backend
npx prisma generate
npx prisma migrate deploy
```

### 4. Run

```bash
# Terminal 1 — API on http://localhost:3000
cd backend && npm run start:dev

# Terminal 2 — mobile app
cd mobile && npx expo start
```

Scan the QR code with Expo Go, or press `i` / `a` for a simulator.

## Build Roadmap

| Module | Description | Status |
|--------|-------------|--------|
| 1 | Foundation — NestJS scaffold, Prisma schema, JWT auth, Expo tab shell | ✅ Complete |
| 2 | Digital Wardrobe — photo → AI metadata → confirm → browse | ✅ Complete |
| 3 | Outfit Studio — deterministic rule-based outfit generation | ⏳ Pending |
| 4 | AI Stylist Chat — LLM with structured JSON output | ⏳ Pending |
| 5 | Companion Layer (optional v1) | ⏳ Pending |
| 6 | Smart Shopping / Gap Analysis (optional v1) | ⏳ Pending |

## Documentation

- [Master spec](/docs/spec/fashion-companion-agent-spec.md) — stack, modules, DB schema, Definition of Done
- [Setup & implementation plan](/docs/dev/SETUP-AND-IMPL-PLAN.md) — step by step setup + per-module task breakdown
- [Feature highlights](/docs/features.md) — what each feature does and why it matters
- [Module 2 — Digital Wardrobe](/docs/modules/MODULE-02-DIGITAL-WARDROBE.md)
- [Module 3 — Outfit Studio](/docs/modules/MODULE-03-OUTFIT-STUDIO.md)

## API Overview

All routes are prefixed with `/api` (JWT required except `/auth/signup` and `/auth/login`).

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/signup` | POST | Create account |
| `/api/auth/login` | POST | Login → JWT |
| `/api/auth/me` | GET | Current user profile |
| `/api/wardrobe` | GET/POST | List / create wardrobe items |
| `/api/wardrobe/upload` | POST | Upload photo → AI-extracted draft |
| `/api/wardrobe/:id/wear` | POST | Increment wear count |
| `/api/outfits/generate` | POST | Generate outfits for an occasion |
| `/api/outfits/style-item` | POST | Multiple looks for a single item |
| `/api/conversations` | GET/POST | Chat conversations |
| `/api/conversations/:id/messages` | GET/POST | Chat messages |

## License

MIT