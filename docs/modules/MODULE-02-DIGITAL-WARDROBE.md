# Module 2 — Digital Wardrobe

**Status:** ? Complete

## Overview
Enable users to photograph clothing items, have AI extract metadata, and manage a digital wardrobe. This is the foundation for all outfit/recommendation features.

## What was implemented

### Backend
- **Wardrobe CRUD**: `wardrobe/wardrobe.module.ts`, controller, service — list/create/get/patch/delete, wear count, favorites, filters/search.
- **Uploads**: UploadThing integration for images; upload endpoint returns image URL.
- **AI extraction**: `ai/ai.module.ts`, `ai.service.ts` — tries NVIDIA NIM first (if `NVIDIA_API_KEY` set), falls back to OpenAI, else manual. Vision prompts enforce strict JSON, correct category (pants/trousers/jeans/shorts/skirt ? bottom), specific subcategory name without category words, and best-guess color when visible. Sanitization normalizes/strips category words and lowercases colors.
- **Env**: Added `OPENAI_API_KEY`, `OPENAI_VISION_MODEL`, `NVIDIA_API_KEY`, `NVIDIA_BASE_URL`, `NVIDIA_VISION_MODEL`.

### Mobile
- **Wardrobe screen**: Grid/list, filters, search, favorites, pull-to-refresh.
- **Add Item flow**: 3 options (Take Photo/Choose from Gallery/Add Manually). Uploads to backend, shows loading while analyzing, displays AI draft. Simplified to required fields: Type (chips), Name, Color, Notes (optional). Validates required fields and blocks save until set. No Image URL input.
- **Item detail/edit**: Shows Name/Color/Notes upfront, collapsible "More details" for extras. Edit uses Type chips + Name + Color + Notes.

## Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/wardrobe` | GET | List items (filters: `category`, `color`, `formality`, `season`, `favorite`, `search`) |
| `/api/wardrobe` | POST | Create item (manual or confirmed AI draft) |
| `/api/wardrobe/:id` | GET | Get item |
| `/api/wardrobe/:id` | PATCH | Update item |
| `/api/wardrobe/:id` | DELETE | Delete item |
| `/api/wardrobe/:id/wear` | POST | Increment wear count |
| `/api/wardrobe/upload` | POST | Upload image ? get AI draft |

## Files changed (key)
- Backend: `src/app.module.ts`, `src/ai/*`, `src/wardrobe/*`, `src/uploads/*`, `.env`, `docs/dev/SETUP-AND-IMPL-PLAN.md`
- Mobile: `src/app/add-item.tsx`, `src/app/item/[id].tsx`, `src/app/(tabs)/wardrobe.tsx`, `src/lib/wardrobe.ts`, `src/lib/api.ts`, `src/types/api.ts`, `src/app/_layout.tsx`
- Docs: `docs/dev/SETUP-AND-IMPL-PLAN.md`, `docs/modules/MODULE-02-DIGITAL-WARDROBE.md`

## Notes
- Restart backend after changing `.env` (NVIDIA/OpenAI keys/models).
- If AI misclassifies, prompts/sanitizers in `backend/src/ai/ai.service.ts` and `mobile/src/lib/wardrobe.ts` can be tuned.
