# Requirements Document

## Introduction

The EventsPage on the JaBaKi website currently has two problems: (1) there is a dead/unused `src/pages/EventsPage.tsx` file that is never rendered — the actual events are hardcoded as individual card components inside `App.tsx`, and (2) all 12 event cards have their content (Dutch text, dates, links) hardcoded directly in JSX with no i18n support. This spec addresses cleaning up dead code, removing the discontinued Dutch F1 Grand Prix and past 2026 events, and refactoring the events system into a data-driven, multilingual architecture where events are defined in a data file, rendered by a reusable component, grouped by year, and sorted by start date.

## Glossary

- **Dead code**: Source files or components that are never imported or rendered in the application
- **Event card**: A UI component displaying information about a local event/attraction near JaBaKi
- **i18n**: Internationalization — translating UI text into multiple languages (en, nl, de)
- **Data-driven**: Event content defined in a structured data file rather than hardcoded in JSX

## Requirements

### Requirement 1: Remove dead code and discontinued/past events

**User Story:** As a developer, I want unused event-related code removed, so that the codebase is clean and there is no confusion about where events are defined.

#### Acceptance Criteria

1. WHEN the project is built, THE file `src/pages/EventsPage.tsx` SHALL no longer exist (it is unused dead code)
2. WHEN App.tsx is reviewed, THERE SHALL be no unused imports referencing deleted page files
3. WHEN the refactoring is complete, THE 12 individual event card components SHALL be replaced by a single reusable EventCard component
4. WHEN the refactoring is complete, THE F1Card SHALL be removed entirely (Dutch F1 Grand Prix is discontinued)
5. WHEN the refactoring is complete, PAST 2026 events (Keukenhof 2026, Koningsdag 2026, Castlefest 2026) SHALL be removed as they have already taken place

### Requirement 2: Data-driven event architecture

**User Story:** As a developer, I want events defined in a structured data file so that adding, removing, or updating events does not require modifying component code.

#### Acceptance Criteria

1. WHEN a new event needs to be added, IT SHALL only require adding an entry to the events data file and corresponding translation keys to `src/i18n.ts`
2. WHEN events are rendered, THEY SHALL be grouped by year with a year heading
3. WHEN events are rendered within a year, THEY SHALL be sorted by `startDate` in ascending order (earliest first)
4. WHEN an event is defined, IT SHALL have at minimum: `id`, `year`, `startDate`, `gradient`, `emoji`, `url`, and i18n key references for title, date, location, and button label
5. WHEN the events data file is reviewed, IT SHALL be located at `src/data/events.ts`

### Requirement 3: Reusable EventCard component

**User Story:** As a developer, I want a single reusable EventCard component that renders any event from the data file, so there is no code duplication.

#### Acceptance Criteria

1. WHEN an event is rendered, THE EventCard component SHALL display the title, date, location, details (if present), and a button linking to the external URL
2. WHEN an event has a `modal` field, THE EventCard SHALL render a secondary button that opens a modal with translated content
3. WHEN rendered, THE EventCard SHALL apply the event's gradient background and emoji decoration
4. WHEN rendered, THE EventCard SHALL maintain the current visual style (card shape, text shadows, button styles, emoji positioning)

### Requirement 4: Full i18n support for all events

**User Story:** As a website visitor, I want all event cards to display in my selected language (EN/NL/DE), so that I can understand the event details regardless of language preference.

#### Acceptance Criteria

1. WHEN any event card is rendered, IT SHALL use `useTranslation()` from react-i18next for all user-visible text
2. WHEN the language is set to Dutch, ALL event cards SHALL display Dutch content
3. WHEN the language is set to English, ALL event cards SHALL display properly translated English equivalents
4. WHEN the language is set to German, ALL event cards SHALL display properly translated German equivalents

### Requirement 5: Event list

**User Story:** As a visitor, I want to see upcoming events relevant to my stay near JaBaKi.

#### Acceptance Criteria

The events page SHALL display the following events, grouped by year and sorted by start date:

**2026 (remaining events after Aug 20, 2026 + WorldPride special edition):**

1. WorldPride Amsterdam 2026 — 25 juli - 8 augustus 2026 (kept as special historic edition)
2. Dahlia Festival Bollenstreek — 1 augustus - 11 oktober 2026
3. Open Monumentendag — 12 & 13 september 2026 (40e editie)
4. NN Dam tot Damloop — 19 & 20 september 2026 (40e editie)
5. TCS Amsterdam Marathon — 17 & 18 oktober 2026 (50e editie)
6. Amsterdam Dance Event (ADE) — 21 - 25 oktober 2026 (30e editie)

**2027 (all recurring events):**

7. Keukenhof Gardens — 18 maart - 9 mei 2027
8. Koningsdag — 27 april 2027
9. Amsterdam Pride — ~31 juli - 8 augustus 2027 (estimated, Canal Parade = first Saturday of August)
10. Castlefest — 5 - 8 augustus 2027
11. Mysteryland — augustus 2027 (exact dates TBD, returning after 2026 break)
12. Dahlia Festival Bollenstreek — ~augustus - oktober 2027 (estimated, annual)
13. Open Monumentendag — 11 & 12 september 2027 (2nd full weekend of September)
14. NN Dam tot Damloop — ~18 & 19 september 2027 (estimated, penultimate weekend of September)
15. TCS Amsterdam Marathon — ~17 oktober 2027 (estimated, 3rd weekend of October)
16. Amsterdam Dance Event (ADE) — ~oktober 2027 (estimated, mid-October)

Note: Events marked with ~ have estimated dates based on recurring annual patterns. These can be updated when official dates are published.

### Requirement 6: Translation keys follow project conventions

**User Story:** As a developer, I want translation keys to follow a consistent naming pattern for maintainability.

#### Acceptance Criteria

1. WHEN adding event translation keys, THEY SHALL use dotted notation: `events.<id>.title`, `events.<id>.date`, etc.
2. WHEN translations are added, THEY SHALL be placed in `src/i18n.ts` in all three language sections (en, nl, de)
3. WHEN an event recurs across years, EACH year SHALL have its own event entry with a unique id (e.g., `keukenhof-2027`, `dahlia-2026`, `dahlia-2027`)
