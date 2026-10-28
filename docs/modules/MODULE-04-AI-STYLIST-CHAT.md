# MODULE-04: AI STYLIST CHAT (Mio - Multi-Agent + RAG)

## Goal
Turn Mio from a rule-based waifu into an actionable AI stylist that actually understands the user's wardrobe, reasons like a real stylist, and gives specific, shoppable suggestions using only items they own (or smart gap advice).

## Problem with current approach
- Rule-based replies (keyword checks) -> repetitive and unhelpful
- Only passes a tiny summary (`context` string) with top 20 items
- Doesn't reason across full wardrobe, outfits, preferences
- Can't adapt to occasion/vibe/body/style goals
- Doesn't follow up or give concrete item picks by name/category/color

## Solution: Multi-Agent + RAG
Treat Mio as an orchestrator with specialized sub-agents and retrieval over the user's closet.

### Agents
| Agent | Purpose | Notes |
|---|---|---|
| `RouterAgent` | Classify intent (styling, critique, shopping, general) | Decide which agents to run |
| `WardrobeRAGAgent` | Retrieve relevant items from wardrobe by occasion/vibe/weather/goal | Uses filters + scoring (favorites, recency, formality) |
| `StylistAgent` | Compose outfits using retrieved items with reasoning | Must use real `wardrobeItem` IDs + explain why |
| `OccasionPlanner` | Translate vague requests ("movie night with friends") into concrete outfit rules | Considers dress code, comfort, layering |
| `ShoppingAdvisor` | Find gaps only if wardrobe can't satisfy | Suggest specific categories/colors to buy, avoid generic lists |
| `MemoryAgent` | Track stated preferences/likes/dislikes across session | Keep in context, respect them |
| `CritiqueAgent` | Give honest feedback on ideas/user photos/descriptions | Supportive but actionable |

### RAG Strategy
- **Source of truth**: `WardrobeItem`, `Outfit`, `StylePreferences`, `Conversation/Message` history
- **Index fields**: `id`, `imageUrl`, `category`, `subcategory`, `color`, `secondaryColors`, `pattern`, `material`, `fit`, `styleTags`, `formality`, `season`, `favorite`, `wearCount`, `notes`, `status`
- **Retrieval**: Hybrid
  - Keyword + tag match (occasion/vibe/colors)
  - Scoring: `favorite` (+), `wearCount` (balanced), recency, formality fit
  - Filter: prefer `SAVED` items, avoid overused? configurable
  - Context window: top 12-15 most relevant per turn (not 20 random)
- **Injection**: Compact structured JSON in system/user context with IDs so agent can reference actual items

### Orchestration Flow
1. **User message** -> RouterAgent classifies
2. **RAG** -> WardrobeRAGAgent pulls relevant items + past outfits + prefs
3. **Plan** -> Stylist/Occasion agents reason
4. **Answer** -> Return actionable advice: top outfit(s), reasoning, tips, swap ideas
5. **Memory** -> Update session memory with preferences

### Tooling (future)
Expose tools to agent: `getWardrobe(filters)`, `getSavedOutfits()`, `suggestFromStudioRules()`, `findGaps()`

## Implementation Plan

### Phase 1: Backend Core (Now)
- [x] Basic chat + Mio persona
- [ ] Upgrade `ChatService` to use `AiService` (NVIDIA/OpenAI) with multi-agent system prompt
- [ ] Build rich wardrobe retriever (`buildWardrobeContext`) with scoring
- [ ] Inject conversation history (last 8-10 messages)
- [ ] Enforce "use only my wardrobe" + cite item details
- [ ] Add router logic in prompt (classify + act)

### Phase 2: RAG + Memory
- [ ] Add `WardrobeRetriever` util (scoring/filtering)
- [ ] Pull `StylePreferences` into context
- [ ] Session memory summary (style likes/dislikes/colors/brands)
- [ ] Smarter occasion parsing

### Phase 3: Mobile Polish
- [ ] Show suggested item chips (tap to view wardrobe item)
- [ ] "Build this outfit" -> link to Outfit Studio
- [ ] Typing indicator + reasoning feel
- [ ] Quick prompts

### Phase 4: Optional Upgrades
- [ ] Embeddings (pgvector) for semantic search
- [ ] Image-aware styling (if user uploads outfit photo)
- [ ] Weather integration

## Prompting Strategy
System prompt must enforce:
- Act as expert fashion stylist who knows user's exact wardrobe
- Never suggest items user doesn't own unless explicitly asked for shopping gaps
- Always give concrete suggestions: "Try [Category: X, Color: Y, ...]" referencing actual items
- Be warm but practical
- Ask clarifying questions only if truly missing critical info
- Give 1-2 solid outfits max, with reasoning + easy swaps

## Files to touch
- `backend/src/chat/chat.service.ts` - orchestration + RAG + AI call
- `backend/src/chat/chat.module.ts` - ensure deps (AiModule, PrismaModule)
- `backend/src/ai/ai.service.ts` - reuse
- `docs/modules/MODULE-04-AI-STYLIST-CHAT.md` - this doc
- `mobile/src/app/(tabs)/chat.tsx` - UX later

## Success Criteria
- Given "movie night with friends", Mio suggests specific items from wardrobe with reasoning
- References actual categories/colors/IDs
- Doesn't hallucinate random brands unless in wardrobe
- Feels like talking to a stylist who actually looked in closet
- Actionable enough to wear immediately

## Notes
Start simple with smart retrieval + strong system prompt + AI call. Add true multi-agent loop incrementally.
