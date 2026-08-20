# Implementation Plan

- [ ] 1. Remove dead code and discontinued events

  - Delete `frontend/src/pages/EventsPage.tsx` (unused file)
  - Remove the `F1Card` component from App.tsx (discontinued)
  - Remove past 2026 event components that won't be migrated: KeukenhofCard (2026 season over), KoningsdagCard (2026 passed), CastlefestCard (2026 passed), PrideCard (merged into WorldPride)
  - Verify `npm run build` succeeds
  - _Requirements: 1.1, 1.2, 1.4, 1.5_

- [ ] 2. Create event data file with all 16 events

  - Create `frontend/src/data/events.ts` with the `EventData` interface and full event array
  - Include 6 events for 2026 (WorldPride, Dahlia, Monumentendag, Dam tot Dam, Marathon, ADE)
  - Include 10 events for 2027 (Keukenhof, Koningsdag, Pride, Castlefest, Mysteryland, Dahlia, Monumentendag, Dam tot Dam, Marathon, ADE)
  - Each entry has: id, year, startDate, gradient, emoji, url, and optional flags
  - _Requirements: 2.1, 2.4, 2.5, 5_

- [ ] 3. Add all event translation keys to i18n.ts

  - Add `events.*` namespace keys for all 16 events in `en`, `nl`, and `de` sections
  - For 2026 events: Dutch text matches current hardcoded values from App.tsx
  - For 2027 events: provide translations based on confirmed/estimated event info
  - Include WorldPride 2026 special content
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 6.1, 6.2, 6.3_

- [ ] 4. Create reusable EventCard component

  - Create `frontend/src/components/EventCard.tsx`
  - Implement card rendering with gradient background, emoji, title, date, location, details, subtitle, buttons
  - Support optional modal (secondary button + modal dialog)
  - Use `useTranslation()` for all text via `events.<id>.*` keys
  - Match current visual style (card shape, text shadows, button colors, emoji positioning)
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 4.1_

- [ ] 5. Replace EventsPage in App.tsx with data-driven version

  - Replace the local EventsPage component in App.tsx
  - Import events from `src/data/events.ts` and EventCard from `src/components/EventCard`
  - Group events by year with year headings
  - Sort events within each year by `startDate` ascending
  - Remove all old individual card components (WorldPrideCard, ADECard, MonumentendagCard, DamTotDamCard, DahliaCard, MarathonCard, MysterylandCard)
  - _Requirements: 1.3, 2.2, 2.3_

- [ ] 6. Verify build, lint, and visual output

  - Run `npm run build` to confirm TypeScript compiles and Vite builds successfully
  - Run `npm run lint` to confirm no ESLint errors
  - Verify the events page shows 2026 section (6 events) and 2027 section (10 events)
  - Verify events are sorted by start date within each year
  - Verify language switching works for all cards
  - _Requirements: 2.2, 2.3, 4.2, 4.3, 4.4_

