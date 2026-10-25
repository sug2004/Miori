# Module 3: Outfit Studio

## Overview
Module 3 adds AI-assisted outfit generation from the user's wardrobe with rules-based logic, occasion-aware suggestions, customization, and saved outfits.

## Backend (NestJS + Prisma)
- **Module**: `backend/src/outfit/outfit.module.ts` imports `PrismaModule`, `AuthModule`, `AiModule`
- **Controller**: `backend/src/outfit/outfit.controller.ts` (JWT protected)
  - `POST /api/outfits/generate` - Generate outfit suggestions
  - `POST /api/outfits/style-item` - Style suggestions for a single item
  - `GET /api/outfits` - List saved outfits
  - `POST /api/outfits` - Save outfit
  - `GET /api/outfits/:id` - Get outfit
  - `PATCH /api/outfits/:id` - Update outfit
  - `DELETE /api/outfits/:id` - Delete outfit
- **Service**: `backend/src/outfit/outfit.service.ts`
  - Rules-based generation (top+bottom+shoes required; dress+shoes valid)
  - Occasion-aware filtering (gym/work/college/fest/formal/date etc.)
  - Prefers favorites/recent items
  - Optional accessories/outerwear
  - Deterministic fallbacks if strict rules fail
- **DTOs**: `generate-outfit.dto.ts`, `style-item.dto.ts`, `create-outfit.dto.ts`, `update-outfit.dto.ts`

## Mobile (Expo Router + NativeWind)
- **Tab**: `mobile/src/app/(tabs)/outfits.tsx`
  - Suggest tab: occasion picker + custom event description + generate
  - Shows required items (top/bottom/dress/shoes) and optional (accessory/outerwear)
  - Customize/Save with loading states
  - Saved tab with delete
- **Customizer**: `mobile/src/app/outfit-customize.tsx`
  - Edit title/occasion/notes
  - Swap items by category
  - Save with loading animation
- **Types**: `mobile/src/types/api.ts` extended for outfits
- **API client**: `mobile/src/lib/api.ts` supports `remove` (DELETE)

## Features
- Occasion-aware suggestions from owned wardrobe only
- Custom event description
- Item swapping in customizer
- Save/delete outfits
- Loading states for all actions
- Tab resets on focus

## Notes
- AI timeouts increased for vision; falls back gracefully
- Suggestions prioritize relevant items by occasion
- Outfit requires valid structure (top+bottom+shoes or dress+shoes)
