# Miori (AI Fashion Companion) — Agent Build Spec (MVP)

> Feed this file directly to a coding agent (Claude Code, Cursor, etc.) as the working spec. Build strictly in module order. Do not start a module until the previous one is functionally testable.

## 0. Stack (locked — do not deviate)

| Layer | Choice |
|---|---|
| Mobile | React Native + Expo (managed) + TypeScript |
| Navigation | Expo Router |
| Styling | NativeWind |
| Backend | NestJS |
| DB | PostgreSQL + Prisma |
| Storage | UploadThing (free tier — swap to S3-compatible later if scale needs it) |
| Auth | JWT (cookie or secure storage on device) |
| AI | LLM API (structured JSON output) + Vision model for clothing detection |
| Vector search | Skip for MVP (pgvector later if needed) |

## 1. Product Vision (one line)

An AI that knows how the user actually dresses — digitizes their wardrobe, recommends outfits from what they own, explains why, flags gaps, and later suggests real products. The anime companion is a UI/personality skin on top — not the core engine.

## 2. Build Order — Modules

Build and fully test each module before moving to the next. Modules 5 and 6 are optional for v1 — see note at bottom.

### Module 1 — Foundation
- NestJS API scaffold, PostgreSQL + Prisma schema, JWT auth (signup/login)
- Expo app scaffold, Expo Router tab shell: Home / Wardrobe / Chat / Shopping
- Connect app to API, store token securely on device
- **Done when:** user can sign up, log in, stay logged in, hit one protected API route from the app

### Module 2 — Digital Wardrobe
- DB tables: `wardrobe_items` (see schema below)
- Upload flow: photo → backend → vision model extracts attributes → draft item → user confirms/edits → saved
- Wardrobe screens: grid/list view, filter by category, item detail, edit metadata
- **Done when:** user can add 20+ real items via photo and browse/edit them

### Module 3 — Outfit Studio
- Deterministic compatibility logic first (rules: color, formality, occasion, season) — **no LLM yet**
- Mode A: generate outfit from wardrobe for a given occasion
- Mode C: "style this item" → multiple looks (Casual, Smart Casual, Date Night, etc.)
- Save/favorite outfits
- **Done when:** user picks an occasion and gets 3 outfits built only from owned items, with a reason shown

### Module 4 — AI Stylist Chat
- Chat endpoint: inject wardrobe + style profile + conversation context into LLM prompt
- LLM must return **structured JSON** (outfit objects), not free text — UI renders cards from JSON
- Chat screen with card rendering (reuse Outfit Studio card component)
- **Done when:** user can type "what should I wear to X" and get a real outfit built from their wardrobe with reasoning

### Module 5 — Companion Layer (optional for v1)
- Character presentation, personality config, greetings
- Companion can trigger wardrobe/outfit/shopping UI from conversation
- Build this last — it's polish, not core function

### Module 6 — Smart Shopping / Gap Analysis (optional for v1)
- Analyze wardrobe → identify missing versatile pieces
- AI recommendation → web product search → product cards → external retailer link
- No marketplace, no payments, no custom model

## 3. Core DB Schema (starting point)

```
users
user_profiles
style_preferences
wardrobe_items
  - id, user_id, image_url, category, subcategory, color, secondary_colors,
    pattern, material, fit, style_tags, formality, season, brand,
    purchase_date, price, favorite, wear_count, notes
outfits
outfit_items
conversations
messages
shopping_recommendations
character_profiles
```

## 4. AI Architecture (all modules)

```
Frontend (Expo)
  → Backend API (NestJS)
  → AI Orchestrator
  → context: user profile + wardrobe + style preferences + conversation history
  → LLM / Vision model
  → structured JSON response
  → UI cards
```

Rule: the LLM never invents clothing. It only reasons over what's actually in the wardrobe table. Always ask for structured JSON output, never rely on parsing free-form text.

## 5. Explicitly Out of Scope (v1)

Social features, public profiles, followers, marketplace, payments, full e-commerce, AR try-on, 3D avatar, custom-trained models, iOS+Android simultaneous native builds, multiple companion characters.

## 6. Definition of Done (v1)

One user can: create a style profile → add 20+ items by photo → correct AI-extracted metadata → ask what to wear → get outfits from real owned items → save/favorite → style a single item → see wardrobe gaps → get purchase suggestions → chat with the companion while it opens wardrobe/outfit/shopping UI → see it all summarized on one dashboard.

---

**Agent instructions:** Build Modules 1–4 as the real MVP. Treat 5 and 6 as a stretch phase after 1–4 are working end-to-end. At the end of each module, stop and produce a short test checklist before starting the next.
