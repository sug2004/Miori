# Miori — Setup & Implementation Plan

> Living document. Tracks current progress, setup instructions, and per-module implementation details.

---

## Table of Contents

1. [Current Status](#current-status)
2. [Prerequisites](#prerequisites)
3. [Project Setup](#project-setup)
4. [Module 1 — Foundation](#module-1--foundation) ✅ Complete
5. [Module 2 — Digital Wardrobe](#module-2--digital-wardrobe) ✅ Complete
6. [Module 3 — Outfit Studio](#module-3--outfit-studio) ⏳ Pending
7. [Module 4 — AI Stylist Chat](#module-4--ai-stylist-chat) ⏳ Pending
8. [Module 5 — Companion Layer](#module-5--companion-layer) ⏳ Optional v1
9. [Module 6 — Smart Shopping](#module-6--smart-shopping) ⏳ Optional v1
10. [Module 7 — AI Style Psychology & Inspiration Feed](#module-7--ai-style-psychology--inspiration-feed) ⏳ Post-MVP

---

## Current Status

| Area | Status |
|------|--------|
| Backend scaffold (NestJS) | ✅ Done |
| Prisma schema + migration | ✅ Done (10 tables, all applied) |
| JWT auth (signup/login/me) | ✅ Done |
| Mobile scaffold (Expo + Router) | ✅ Done |
| Tab shell + auth screens | ✅ Done |
| Auth state (token + context) | ✅ Done |
| Design system components | ✅ Done |
| Profile, edit profile + settings | ✅ Done |
| Side drawer navigation | ✅ Done |
| Wardrobe CRUD + upload + AI draft | ✅ Done |
| Wardrobe CRUD + upload | ❌ Not started |
| Outfit generation logic | ❌ Not started |
| AI chat + LLM integration | ❌ Not started |
| Companion layer | ❌ Not started |
| Shopping / gap analysis | ❌ Not started |
| AI style psychology map + inspiration feed | ❌ Not started |

---

## Prerequisites

- **Node.js** ≥ 18 (tested with 20+)
- **pnpm** or **npm** (both lockfiles present; project uses npm)
- **PostgreSQL** database (Neon recommended — free tier works)
- **Expo CLI** (`npx expo` or global install)
- Xcode (iOS) / Android Studio (Android) for native testing
- A vision-capable LLM API key (e.g. OpenAI, Anthropic, Google Gemini)
- A file storage service (UploadThing for MVP)

---

## Project Setup

### 1. Clone & Install

```bash
git clone <repo-url> Miori
cd Miori

# Backend
cd backend
cp .env.example .env   # fill in DATABASE_URL, JWT_SECRET, etc.
npm install

# Mobile
cd ../mobile
npm install
```

### 2. Environment Variables

#### `backend/.env`

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string (Neon pooler) | `postgresql://user:pass@ep-xxx.neon.tech/db?sslmode=require` |
| `JWT_SECRET` | Random string for JWT signing | `openssl rand -hex 32` |
| `JWT_EXPIRES_IN` | Token lifetime | `7d` |
| `PORT` | API listen port | `3000` |
| `OPENAI_API_KEY` | Optional; enables AI vision extraction | `sk-...` |
| `OPENAI_VISION_MODEL` | Vision model for wardrobe extraction | `gpt-4o-mini` |
| `NVIDIA_API_KEY` | Optional; NVIDIA NIM vision model (used first if set) | `nvapi-...` |
| `NVIDIA_BASE_URL` | NVIDIA NIM base URL | `https://integrate.api.nvidia.com/v1` |
| `NVIDIA_VISION_MODEL` | NVIDIA vision model | `meta/llama-3.2-11b-vision-instruct` |

#### `mobile/.env` (create if needed)

| Variable | Description | Example |
|----------|-------------|---------|
| `EXPO_PUBLIC_API_URL` | Backend API base URL | `http://localhost:3000/api` |

### 3. Database Setup

```bash
cd backend

# Generate Prisma client
npx prisma generate

# Apply migrations (if fresh DB)
npx prisma migrate deploy

# Or reset entire DB
npx prisma migrate reset --force
```

Current schema tables: `users`, `user_profiles`, `style_preferences`, `wardrobe_items`, `outfits`, `outfit_items`, `conversations`, `messages`, `shopping_recommendations`, `character_profiles`.

### 4. Start Dev Servers

```bash
# Terminal 1 — Backend
cd backend
npm run start:dev
# Runs on http://localhost:3000

# Terminal 2 — Mobile
cd mobile
npx expo start
# Scan QR with Expo Go or press i/a for simulator
```

### 5. Verify Module 1

```bash
# Signup
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get profile (use token from login)
curl http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer <token>"
```

---

## Module 1 — Foundation

**Status:** ✅ Complete

### What was built

**Backend:**
- NestJS app with global `/api` prefix, CORS, ValidationPipe
- Prisma 7 module (global, auto-connect/disconnect) with PostgreSQL adapter
- Auth module: `POST /auth/signup`, `POST /auth/login`, `GET /auth/me`
- Profile module: `GET /profile`, `PATCH /profile`, `POST /profile/avatar`, `GET|PUT /profile/style-preferences`
- JWT strategy (passport-jwt, Bearer extraction), `JwtAuthGuard`, `@CurrentUser` decorator
- Password hashing with bcryptjs (10 rounds)

**Mobile:**
- Expo Router file-based routing with `Stack.Protected` auth gates
- Auth screens (sign-in, sign-up) with validation, error handling, loading states
- `AuthProvider` context: session restore, signIn/signUp/signOut, updateUser
- Token persistence via `expo-secure-store` (native) / `localStorage` (web)
- Tab shell: Home / Wardrobe / Chat / Shop with native + web tab implementations
- Side drawer navigation + Home dashboard
- Profile screen with live wardrobe/outfit counts, edit profile (photo upload + bio), settings, sign out
- Design system: Screen, FormField, PrimaryButton, AuthHero, AuthLayout, UserAvatar, DrawerMenu, ComingSoon, ThemedText
- Dark warm theme (orange accent, Spline Sans font)

### Test checklist

- [x] User can sign up with email + password
- [x] User can log in and receive JWT
- [x] Token persists across app restarts
- [x] `/auth/me` returns user profile when authenticated
- [x] Protected routes redirect to login when unauthenticated
- [x] Tab navigation works on native and web
- [x] User can view profile stats, edit name/bio, and upload an avatar
- [x] Drawer navigation and sign-out work

---

## Module 2 — Digital Wardrobe

**Status:** ✅ Complete

### What was built

**Backend:**
- `WardrobeModule`: `GET|POST /wardrobe`, `GET|PATCH|DELETE /wardrobe/:id`, `POST /wardrobe/upload`, `POST /wardrobe/:id/wear`
- `AiModule`: vision extraction via OpenAI (configurable) with safe fallback when no key is present
- `UploadsModule`: image validation + UploadThing upload
- DTO validation, user-scoped access, JSON array normalization, filtering/sorting/search
- Unit tests for wardrobe service

**Mobile:**
- Wardrobe tab: grid/list toggle, search, category chips, favorites, sort
- Add Item: camera/gallery or manual → upload → AI draft → editable form → save
- Item detail: image, metadata, edit, favorite, wear count, delete
- Shared types/components + protected routes

### Test checklist

- [x] User can upload a photo and get an AI draft
- [x] User can save/correct and add items to wardrobe
- [x] Wardrobe grid/list displays items with working filters
- [x] Item detail shows metadata with edit capability
- [x] Favorite and wear count features work
- [x] Items are user-scoped and deletable

---

## Module 3 — Outfit Studio

**Status:** ⏳ Pending

### Overview

Generate outfit combinations from the user's wardrobe using **deterministic rules** (no LLM yet). Two modes: occasion-based generation and single-item styling.

### Backend Tasks

#### 3.1 Compatibility Engine (Rules-Based)

New `outfit/outfit.service.ts` — pure logic, no AI:

```
Rules:
- Color harmony: avoid clashing, prefer complementary/neutral pairings
- Formality match: all items within ±1 formality level
- Occasion filter: items tagged with relevant season/occasion
- Category coverage: at least one top + one bottom + (optional) shoes/accessory
- Season overlap: items share at least one season tag
```

#### 3.2 Outfit Generation

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/outfits/generate` | POST | Body: `{ occasion: "date_night", count: 3 }` → returns 3 outfits |
| `/api/outfits/style-item` | POST | Body: `{ wardrobeItemId, looks: ["casual","smart"] }` → outfits per look |
| `/api/outfits` | GET | List saved outfits |
| `/api/outfits` | POST | Save an outfit (title, items, occasion) |
| `/api/outfits/:id` | DELETE | Delete saved outfit |

#### 3.3 Outfit Data Structure

```json
{
  "id": "...",
  "title": "Smart Casual Friday",
  "occasion": "smart_casual",
  "items": [
    { "wardrobeItemId": "...", "position": 0, "role": "top" },
    { "wardrobeItemId": "...", "position": 1, "role": "bottom" },
    { "wardrobeItemId": "...", "position": 2, "role": "shoes" }
  ],
  "reasoning": "Navy chinos pair with the white Oxford shirt for a polished but relaxed look. The brown leather shoes tie the earth tones together."
}
```

#### 3.4 Reasoning Generation

For MVP reasoning, use template strings based on rules matched:
- "The [color] [item] complements the [color] [item] through [harmony type]."
- "This combination works for [occasion] because [formality match]."

LLM-generated reasoning comes in Module 4.

### Mobile Tasks

#### 3.5 Outfit Studio Screen

Add an "Outfit" tab or integrate into Wardrobe tab:

- **Occasion picker**: scrollable chips (Casual, Smart Casual, Business, Date Night, Workout, Formal)
- **Generate button**: calls API, shows loading skeleton
- **Outfit cards**: horizontal scroll of outfit combinations
- Each card shows: item thumbnails in a layout, title, reasoning text
- **Save/favorite** button on each outfit

#### 3.6 "Style This Item" Mode

From item detail screen → "Style this" button:
- API returns multiple looks for that item
- Each look is a different formality/occasion combo
- User can browse and save

#### 3.7 Component Inventory

| Component | Purpose |
|-----------|---------|
| `OccasionPicker` | Horizontal chip selector |
| `OutfitCard` | Outfit display (items + reasoning) |
| `OutfitGrid` | Item thumbnails in outfit layout |
| `StyleItemView` | Multiple looks for one item |
| `GenerateButton` | CTA with loading state |

### Done When

- [ ] User picks an occasion → gets 3 outfits from owned items
- [ ] Each outfit has a reasoning explanation
- [ ] "Style this item" shows 2+ looks for any single item
- [ ] User can save/favorite outfits
- [ ] All outfits use only items from the user's wardrobe
- [ ] No outfit repeats the same item twice

---

## Module 4 — AI Stylist Chat

**Status:** ⏳ Pending

### Overview

Free-form chat where the LLM recommends outfits from the user's wardrobe, returns structured JSON (not free text), and the UI renders outfit cards inline.

### Backend Tasks

#### 4.1 Conversation API

New `chat/chat.module.ts`:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/conversations` | GET | List user's conversations |
| `/api/conversations` | POST | Create new conversation |
| `/api/conversations/:id/messages` | GET | Get message history |
| `/api/conversations/:id/messages` | POST | Send user message → get AI response |

#### 4.2 AI Orchestrator

New `ai/ai.service.ts` — the core orchestrator:

```
Input to LLM:
1. System prompt: "You are a personal stylist. You have access to the user's wardrobe.
   Recommend outfits using ONLY items in their wardrobe. Always return structured JSON."
2. User profile + style preferences (from DB)
3. Wardrobe items (formatted list with attributes)
4. Conversation history (last N messages)
5. User's current message

Output from LLM:
{
  "response": "Here are three options for your dinner date...",
  "outfits": [
    {
      "title": "Classic Date Night",
      "items": [{ "wardrobeItemId": "...", "role": "top" }, ...],
      "reasoning": "..."
    }
  ]
}
```

#### 4.3 LLM Integration Details

- Use structured JSON output mode (OpenAI `response_format: json_schema`, Anthropic tool use, etc.)
- Schema validation on response (reject if malformed)
- Retry logic (1 retry on malformed response)
- Model recommendation: GPT-4o-mini or Claude 3.5 Haiku (fast, cheap, good at structured output)
- Token budget: system prompt (~2k) + wardrobe (~3k for 50 items) + history (~2k) = well within limits

#### 4.4 Message Storage

Messages stored as JSON `content` field:
- User messages: `{ "text": "what should I wear to a wedding?" }`
- Assistant messages: `{ "text": "...", "outfits": [...] }`

### Mobile Tasks

#### 4.5 Chat Screen

Replace `chat.tsx` ComingSoon with:

- **Conversation list** (when no active conversation)
- **Chat view**: message bubbles, auto-scroll, input bar
- **Outfit cards in messages**: render outfit objects as interactive cards
- Tap outfit card → full-screen outfit detail
- "Save outfit" action on each card
- Typing indicator while AI processes

#### 4.6 Card Rendering

Reuse `OutfitCard` from Module 3 — the data structure is identical. The chat UI just needs to detect `outfits` in assistant messages and render them.

#### 4.7 Component Inventory

| Component | Purpose |
|-----------|---------|
| `ChatScreen` | Full chat view with message list |
| `MessageBubble` | Individual message (user or assistant) |
| `OutfitCardInline` | Compact outfit card inside chat |
| `ChatInput` | Text input + send button |
| `ConversationList` | List of past conversations |
| `TypingIndicator` | Animated dots while AI responds |

### Done When

- [ ] User types "what should I wear to X" and gets real outfits from their wardrobe
- [ ] Response includes structured outfit cards (not just text)
- [ ] Reasoning is shown for each outfit
- [ ] Conversation history persists
- [ ] Chat handles edge cases ("I don't have anything for that" when wardrobe is thin)
- [ ] Response time < 5 seconds

---

## Module 5 — Companion Layer

**Status:** ⏳ Optional for v1

### Overview

Anime-style character presentation wrapping the stylist functionality. Adds personality, greetings, and character-driven UI interactions.

### Tasks

- Character profile CRUD (name, personality, greeting, avatar)
- Companion triggers wardrobe/outfit/shopping UI from conversation
- Personality config (tone, expressions, catchphrases)
- Greeting messages on app open
- Visual character avatar in chat

**Note:** Build this last. It's polish, not core function.

---

## Module 6 — Smart Shopping / Gap Analysis

**Status:** ⏳ Optional for v1

### Overview

Analyze wardrobe gaps and recommend real products from external retailers.

### Tasks

- Wardrobe gap analysis (missing versatile pieces by category)
- Product search integration (web scraping or affiliate API)
- Product cards with images, prices, retailer links
- Recommendation reasoning ("You have no neutral shoes — these white sneakers are versatile")
- Shopping list view

**Note:** No marketplace, no payments, no custom model. External links only.

---

## Module 7 — AI Style Psychology & Inspiration Feed

**Status:** ⏳ Post-MVP (requires Modules 2–4 data)

### Overview

Build a living **Style Map** from the user's stated preferences, wardrobe, saved looks, and stylist conversations. The map captures *why* the user likes what they like (aesthetic drivers, emotional needs, occasions, silhouettes, colors, materials, price sensitivity) and becomes the ranking foundation for a Pinterest-style inspiration feed of generated clothing/outfit concepts.

This is style psychology, **not clinical or mental-health inference**. The user can inspect, correct, export, and delete the map at any time.

### The Style Map structure

Store as a graph plus an embedding, not a flat list:

```json
{
  "version": 1,
  "confidence": 0.72,
  "aestheticNodes": [
    { "id": "minimal", "label": "Minimal", "weight": 0.82, "evidence": ["chat:42", "outfit:12"] },
    { "id": "old-money", "label": "Old Money", "weight": 0.41, "evidence": ["item:8"] }
  ],
  "attributeAffinities": {
    "colors": [{ "value": "navy", "weight": 0.9 }],
    "silhouettes": [{ "value": "relaxed", "weight": 0.7 }],
    "materials": [{ "value": "linen", "weight": 0.6 }],
    "formality": [{ "value": "smart-casual", "weight": 0.75 }],
    "patterns": [{ "value": "solid", "weight": 0.85 }]
  },
  "psychologicalDrivers": [
    { "id": "confidence", "label": "Feels confident", "weight": 0.8 },
    { "id": "comfort", "label": "Comfort-first", "weight": 0.65 },
    { "id": "self-expression", "label": "Creative expression", "weight": 0.5 }
  ],
  "occasionVectors": [
    { "occasion": "work", "formality": 0.7, "colorBias": ["navy", "grey"], "weight": 0.8 },
    { "occasion": "date-night", "formality": 0.5, "colorBias": ["black", "earth"], "weight": 0.4 }
  ],
  "edges": [
    { "from": "minimal", "to": "navy", "relation": "prefers_color", "weight": 0.8 },
    { "from": "comfort", "to": "relaxed", "relation": "drives_silhouette", "weight": 0.7 }
  ],
  "signals": [
    { "source": "wardrobe", "count": 24, "lastUpdated": "2026-10-01T00:00:00Z" },
    { "source": "chat", "count": 18, "lastUpdated": "2026-10-01T00:00:00Z" }
  ],
  "embedding": [0.021, -0.114, "..."]
}
```

### Data sources and weights

| Source | Example signal | Suggested weight |
|--------|----------------|------------------|
| Onboarding / style preferences | chosen tags, goals, budget | High |
| Wardrobe metadata | colors, categories, formality, materials | High |
| User corrections | edits to AI-extracted metadata | Very high |
| Saved/favorited outfits | repeated combinations | High |
| Wear counts | items actually worn | Medium |
| Chat conversations | requests, reactions, rejections | Medium |
| Inspiration feed feedback | save / dismiss / dwell | Medium |
| Shopping saves | intent signals | Low |

### Backend Tasks

#### 7.1 Schema

New tables (keep raw evidence separate from inference):

| Table | Purpose |
|-------|---------|
| `style_maps` | One per user: version, JSON graph, confidence, embedding, updatedAt |
| `style_map_signals` | Append-only evidence log (`source`, `refId`, `signal`, `weight`, `createdAt`) |
| `inspiration_concepts` | Generated concept title, prompt, image URL, attributes, style-map snapshot |
| `inspiration_feedback` | `SAVED` / `DISMISSED` / `VIEWED` per user + concept |

Add `pgvector` only if semantic retrieval is needed; otherwise rank with weighted attribute matching.

#### 7.2 Derivation pipeline

```
New signal (wardrobe edit, outfit save, chat turn, feed reaction)
  → append to style_map_signals
  → debounce/queue rebuild (e.g. after N signals or on app open)
  → normalize + aggregate weights
  → optional LLM pass: infer aesthetic labels, psychological drivers, contradictions
  → merge into graph (never discard user-confirmed nodes)
  → recompute embedding
  → persist new style_maps version
```

- Deterministic aggregation first; LLM only for labels/reasoning.
- Every inferred node must keep `evidence` references.
- Decay old weights slowly so taste can evolve.
- Rebuild is idempotent and versioned.

#### 7.3 API

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/style-map` | GET | Current map + confidence + last rebuild |
| `/api/style-map/rebuild` | POST | Force rebuild from signals |
| `/api/style-map/nodes/:id` | PATCH | User confirms/corrects/removes a node |
| `/api/style-map/signals` | POST | Record explicit feedback signal |
| `/api/inspiration/feed` | GET | Paginated Pinterest-style concepts ranked by map |
| `/api/inspiration/concepts/:id` | GET | Concept detail + why-it-fits reasoning |
| `/api/inspiration/concepts/:id/feedback` | POST | Save / dismiss / view |
| `/api/inspiration/regenerate` | POST | Regenerate feed for a chosen occasion/mood |

#### 7.4 Concept generation

- Combine top style-map nodes with seasonal trends and occasion vectors.
- Generate concept metadata (title, palette, silhouette, material, reasoning).
- Image generation is optional and must be labeled as AI concept art — do not present it as owned clothing.
- Cache concepts; regenerate only when the map changes materially.
- Feed ranking: map affinity (60%) + novelty (20%) + diversity (15%) + feedback history (5%).

### Mobile Tasks

#### 7.5 Screens

- **Style Map**: readable graph/list of aesthetics, drivers, colors, occasions; confidence badges; edit/remove.
- **Inspiration Feed**: 2-column masonry (Pinterest-style), pull-to-refresh, save/dismiss actions.
- **Concept Detail**: full image, palette, attributes, "Why this fits you" based on map evidence.
- **Privacy controls** in Settings: view map, reset map, opt out of psychology inference, delete signals.

#### 7.6 Components

| Component | Purpose |
|-----------|---------|
| `StyleMapView` | Graph/list visualization of nodes and edges |
| `StyleNodeCard` | Editable node with confidence + evidence count |
| `InspirationMasonry` | Infinite-scroll Pinterest-style grid |
| `ConceptCard` | Concept image + palette + save/dismiss |
| `WhyThisFits` | Human-readable reasoning from map nodes |
| `StyleMapPrivacyPanel` | Inspect / correct / reset / delete |

### Privacy and safety rules

1. Style psychology is inferred, editable, and deletable — never hidden from the user.
2. Never make clinical, diagnostic, or sensitive-trait claims (health, sexuality, politics, etc.).
3. Keep evidence tied to app actions only; no third-party scraping of the user's social profiles.
4. Opt-out disables inference and feed personalization without breaking core styling features.
5. Inspiration concepts are AI-generated ideas, not real owned items; shopping links must be labeled.

### Done When

- [ ] User can view a Style Map with confidence scores and evidence counts
- [ ] Wardrobe edits, saved outfits, and chat turns update the map
- [ ] User can correct or remove inferred nodes and reset the map
- [ ] Inspiration feed is ranked by the map and supports save/dismiss
- [ ] Concept detail explains why it fits using map evidence
- [ ] Opt-out stops inference and personalization
- [ ] Rebuild is idempotent, versioned, and does not duplicate nodes

---

## Architecture Reference

```
mobile/Expo App
  ├── src/app/           → Expo Router file-based routes
  ├── src/components/    → Reusable UI components
  ├── src/lib/           → API client, storage, utilities
  ├── src/state/         → React contexts (auth, etc.)
  └── src/types/         → TypeScript types

backend/NestJS API
  ├── src/auth/          → JWT auth (signup, login, me)
  ├── src/prisma/        → Prisma client (global module)
  ├── src/wardrobe/      → (Module 2) Wardrobe CRUD + upload
  ├── src/ai/            → (Module 2/4) Vision + LLM integration
  ├── src/outfit/        → (Module 3) Outfit generation + rules
  ├── src/chat/          → (Module 4) Conversations + messages
  ├── src/companion/     → (Module 5) Character profiles
  ├── src/shopping/      → (Module 6) Gap analysis + recommendations
  ├── src/style-map/     → (Module 7) Style Map derivation + signals
  └── src/inspiration/   → (Module 7) Concept generation + feed ranking
```

### AI Data Flow (Module 4+)

```
User message
  → POST /api/conversations/:id/messages
  → Chat service loads: user profile, wardrobe, style prefs, history
  → AI Orchestrator builds prompt with all context
  → LLM API call (structured JSON output)
  → Validate response schema
  → Save to messages table
  → Return structured response to frontend
  → Frontend renders text + outfit cards
```

### Style Map Data Flow (Module 7+)

```
Signal (wardrobe edit / outfit save / chat turn / feed reaction)
  → POST /api/style-map/signals (or recorded internally)
  → style_map_signals append-only log
  → debounced rebuild
  → deterministic aggregation + optional LLM labeling pass
  → versioned style_maps graph + embedding
  → GET /api/inspiration/feed ranks generated concepts
  → SAVE / DISMISS feedback feeds back into the map
```

### Key Rules

1. **LLM never invents clothing.** It only reasons over items in `wardrobe_items`.
2. **Always structured JSON output.** Never parse free-form LLM text for outfit data.
3. **Build modules in order.** Each module depends on the previous.
4. **Test after each module.** Stop, verify, then proceed.
5. **Style psychology stays transparent.** The Style Map is inferred only from app actions, never hidden, and always user-editable and deletable.
