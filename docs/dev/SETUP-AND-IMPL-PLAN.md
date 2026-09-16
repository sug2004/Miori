# Miori — Setup & Implementation Plan

> Living document. Tracks current progress, setup instructions, and per-module implementation details.

---

## Table of Contents

1. [Current Status](#current-status)
2. [Prerequisites](#prerequisites)
3. [Project Setup](#project-setup)
4. [Module 1 — Foundation](#module-1--foundation) ✅ Complete
5. [Module 2 — Digital Wardrobe](#module-2--digital-wardrobe) 🚧 Next
6. [Module 3 — Outfit Studio](#module-3--outfit-studio) ⏳ Pending
7. [Module 4 — AI Stylist Chat](#module-4--ai-stylist-chat) ⏳ Pending
8. [Module 5 — Companion Layer](#module-5--companion-layer) ⏳ Optional v1
9. [Module 6 — Smart Shopping](#module-6--smart-shopping) ⏳ Optional v1

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
| Wardrobe CRUD + upload | ❌ Not started |
| Outfit generation logic | ❌ Not started |
| AI chat + LLM integration | ❌ Not started |
| Companion layer | ❌ Not started |
| Shopping / gap analysis | ❌ Not started |

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
- JWT strategy (passport-jwt, Bearer extraction), `JwtAuthGuard`, `@CurrentUser` decorator
- Password hashing with bcryptjs (10 rounds)

**Mobile:**
- Expo Router file-based routing with `Stack.Protected` auth gates
- Auth screens (sign-in, sign-up) with validation, error handling, loading states
- `AuthProvider` context: session restore, signIn/signUp/signOut
- Token persistence via `expo-secure-store` (native) / `localStorage` (web)
- Tab shell: Home / Wardrobe / Chat / Shop with native + web tab implementations
- Design system: Screen, FormField, PrimaryButton, AuthHero, ComingSoon, ThemedText
- Dark warm theme (orange accent, Spline Sans font)

### Test checklist

- [x] User can sign up with email + password
- [x] User can log in and receive JWT
- [x] Token persists across app restarts
- [x] `/auth/me` returns user profile when authenticated
- [x] Protected routes redirect to login when unauthenticated
- [x] Tab navigation works on native and web

---

## Module 2 — Digital Wardrobe

**Status:** 🚧 Not started (next up)

### Overview

Enable users to photograph clothing items, have AI extract metadata, and manage a digital wardrobe. This is the foundation for all outfit/recommendation features.

### Backend Tasks

#### 2.1 Upload Storage (UploadThing)

```bash
cd backend
npm install uploadthing @uploadthing/nest
```

- Configure UploadThing in a new `upload/upload.module.ts`
- Create upload endpoint that returns a signed URL
- Store the returned file URL in `wardrobe_items.image_url`

#### 2.2 Vision Model Integration

- New `ai/ai.module.ts` service wrapping a vision-capable LLM
- Endpoint: accepts image URL → calls vision API with structured prompt
- Prompt instructs model to return JSON:
  ```json
  {
    "category": "top",
    "subcategory": "t-shirt",
    "color": "navy",
    "secondaryColors": ["white"],
    "pattern": "solid",
    "material": "cotton",
    "fit": "regular",
    "styleTags": ["casual", "minimal"],
    "formality": "casual",
    "season": ["spring", "summer"]
  }
  ```
- Use LLM structured output / JSON mode to guarantee valid schema
- Return draft `WardrobeItem` to frontend for user confirmation

#### 2.3 Wardrobe CRUD API

New `wardrobe/wardrobe.module.ts`:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/wardrobe` | GET | List all items (with query filters: `?category=top&favorite=true`) |
| `/api/wardrobe` | POST | Create item (manual entry or confirm AI draft) |
| `/api/wardrobe/:id` | GET | Get single item detail |
| `/api/wardrobe/:id` | PATCH | Update metadata (user corrections) |
| `/api/wardrobe/:id` | DELETE | Soft or hard delete |
| `/api/wardrobe/upload` | POST | Upload image → get AI-extracted draft |

Query params for filtering: `category`, `color`, `formality`, `season`, `favorite`, `search`.

#### 2.4 Prisma Schema Changes

None needed — `wardrobe_items` table already has all required columns.

### Mobile Tasks

#### 2.5 Wardrobe Screen

Replace `wardrobe.tsx` ComingSoon with:

- **Grid view** (default): 2-column grid of item thumbnails
- **List view** toggle: horizontal rows with metadata
- **Filter bar**: category chips, color dots, search input
- **Sort**: recently added, most worn, favorites first

#### 2.6 Add Item Flow

- Camera/image picker (`expo-image-picker`)
- Send image to `/api/wardrobe/upload`
- Show loading state while AI processes
- Display draft card with AI-extracted fields (editable)
- User confirms → `POST /api/wardrobe` → item saved
- Show success feedback, return to grid

#### 2.7 Item Detail Screen

- Full-screen image
- Editable metadata fields (all attributes)
- Favorite toggle
- Wear count increment button
- Delete with confirmation
- "Style this" quick action (links to Module 3)

#### 2.8 Component Inventory

| Component | Purpose |
|-----------|---------|
| `WardrobeGrid` | 2-col masonry of item thumbnails |
| `WardrobeItemCard` | Single item thumbnail with category badge |
| `WardrobeFilters` | Filter chips + search bar |
| `AddItemSheet` | Bottom sheet: camera, gallery, or manual |
| `ItemDraftPreview` | AI-extracted metadata form (editable) |
| `ItemDetailScreen` | Full item view + edit mode |

### Done When

- [ ] User can photograph 20+ real clothing items
- [ ] AI correctly extracts color, category, pattern, material ~80% of the time
- [ ] User can correct any AI-extracted field before saving
- [ ] Wardrobe grid displays all items with working filters
- [ ] Item detail shows full metadata with edit capability
- [ ] Favorite and wear count features work

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
  └── src/shopping/      → (Module 6) Gap analysis + recommendations
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

### Key Rules

1. **LLM never invents clothing.** It only reasons over items in `wardrobe_items`.
2. **Always structured JSON output.** Never parse free-form LLM text for outfit data.
3. **Build modules in order.** Each module depends on the previous.
4. **Test after each module.** Stop, verify, then proceed.
