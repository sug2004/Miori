# Miori — Feature Highlights

## Core Features (MVP)

### 1. Digital Wardrobe
Photograph any clothing item → AI automatically extracts color, pattern, material, fit, category, and season. User confirms or corrects before saving. Browse wardrobe in grid/list view with filters and search.

### 2. Outfit Generation
Pick an occasion (date night, work, casual) → get 3 complete outfits built **only from items you own**. Each outfit comes with a plain-English reasoning explaining why the combination works.

### 3. "Style This Item"
Pick any single item from your wardrobe → get multiple looks for it (Casual, Smart Casual, Date Night, etc.). See how one piece fits into different styles.

### 4. AI Stylist Chat
Free-form conversation with a personal stylist. Ask "what should I wear to a wedding?" → get structured outfit cards built from your actual wardrobe. Chat remembers your style profile and history.

### 5. Smart Shopping (v1+)
Wardrobe gap analysis identifies missing versatile pieces → suggests real products from retailers with links. No marketplace, no payments — just product cards with reasoning.

### 6. AI Style Psychology & Inspiration Feed (Post-MVP)
Miori builds a living Style Map from your preferences, wardrobe edits, saved looks, and conversations — capturing aesthetics, colors, silhouettes, occasions, and emotional drivers. The map powers a Pinterest-style feed of AI-generated clothing and outfit concepts, each explaining why it fits you. The map is always visible, editable, and deletable.

---

## Why Each Feature Matters

| Problem | Feature | How It Solves It |
|---------|---------|------------------|
| "I have clothes but forget what I own" | Digital Wardrobe | Visual inventory you can browse and filter |
| "I waste time deciding what to wear" | Outfit Generation | Instant outfits from your actual closet |
| "I don't know how to match pieces" | Style This Item | Shows proven combinations for any piece |
| "I want personalized advice" | AI Stylist Chat | Conversational stylist that knows your wardrobe |
| "My wardrobe feels incomplete" | Smart Shopping | Identifies gaps, suggests real purchases |
| "I want inspiration that actually gets me" | AI Style Psychology & Feed | Learns your taste map, generates a personalized Pinterest-style concept feed |

---

## Key Design Principles

**Only real items.** The AI never invents clothing. Every recommendation uses items already in your wardrobe.

**Structured responses.** Outfit recommendations always return structured JSON (not free text), so the UI renders interactive cards — not just paragraphs.

**User-corrected AI.** AI extracts metadata from photos, but the user always has final say. Edit any field before saving.

**Transparent personalization.** The Style Map behind the inspiration feed is always visible, editable, and deletable — style psychology is inferred from app actions only and is never used for clinical claims.

**Companion layer.** An anime-styled character wraps the stylist features with personality, but the engine underneath is pure fashion logic + LLM reasoning.

---

## Future Features (Post-MVP)

- **Companion Personality** — character greetings, expressions, triggered UI from conversation
- **Style Profile** — track evolving taste over time, detect wardrobe trends
- **Outfit History** — what you wore, when, with wear analytics
- **Seasonal Suggestions** — proactive alerts when season shifts and wardrobe needs refreshing
- **Social (out of scope v1)** — sharing outfits, community styling
