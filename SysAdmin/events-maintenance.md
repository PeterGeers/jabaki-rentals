# Events Calendar Maintenance Guide

## Overview

- Events are stored in `frontend/src/data/events.ts`
- Translations are in `frontend/src/i18n.ts` (3 languages: EN, NL, DE)
- After changes, push to `main` branch → Amplify auto-deploys

## How to Add a New Event

### Step 1: Add event data to `frontend/src/data/events.ts`

Show the structure with a concrete example:

```typescript
{
  id: 'eventname-2028',        // unique id, used for translation keys
  year: 2028,                  // year for grouping
  startDate: '2028-04-27',     // ISO date for sorting within the year
  gradient: 'linear-gradient(135deg, #color1, #color2)',  // card background
  emoji: '🎉',                // decorative emoji
  url: 'https://...',         // external link for "More info" button
  hasDetails: true,           // set true if you want a details text line
  hasSubtitle: true,          // set true if you want a subtitle line
}
```

### Step 2: Add translations to `frontend/src/i18n.ts`

Add keys in ALL THREE language sections (en, nl, de):

```
"events.eventname-2028.title": "Event Name",
"events.eventname-2028.date": "27 April 2028",
"events.eventname-2028.location": "Amsterdam",
"events.eventname-2028.button": "More info",
"events.eventname-2028.details": "Optional details text",     // only if hasDetails: true
"events.eventname-2028.subtitle": "Optional subtitle text",  // only if hasSubtitle: true
```

### Step 3: Deploy

```bash
cd frontend
npm run build          # verify it builds
git add -A
git commit -m "events: add EventName 2028"
git push origin main   # triggers Amplify auto-deploy
```

## How to Remove a Past Event

1. Delete the event object from `frontend/src/data/events.ts`
2. Optionally remove the translation keys from `frontend/src/i18n.ts` (not strictly required but keeps things clean)
3. Commit and push

## How to Update an Event (date change, URL update)

1. Edit the relevant field in `frontend/src/data/events.ts`
2. If the displayed date text changes, update the `events.<id>.date` key in all 3 languages in `i18n.ts`
3. Commit and push

## Yearly Maintenance Checklist

At the start of each year:

1. Remove events from the previous year that have passed
2. Add confirmed events for the new year
3. Update estimated dates (marked with ~) when official dates are published
4. Verify all external URLs still work

## Available Gradient Colors (reuse from existing events)

| Color | Gradient | Used for |
|-------|----------|----------|
| Rainbow | `linear-gradient(45deg, #e40303, #ff8c00, #ffed00, #008018, #004cff, #732982)` | Pride |
| Pink | `linear-gradient(135deg, #FF69B4, #FF1493)` | Dahlia |
| Brown | `linear-gradient(135deg, #8B4513, #A0522D)` | Monumentendag |
| Blue | `linear-gradient(135deg, #0066CC, #004499)` | Dam tot Dam |
| Red | `linear-gradient(135deg, #DC143C, #B22222)` | Marathon |
| Dark | `linear-gradient(135deg, #1a1a1a, #333333)` | ADE |
| Green | `linear-gradient(135deg, #2d5016, #4a7c59)` | Keukenhof |
| Orange | `linear-gradient(135deg, #FF6B35, #F7931E)` | Koningsdag |
| Purple | `linear-gradient(135deg, #4B0082, #663399)` | Castlefest |
| Violet | `linear-gradient(135deg, #8B5CF6, #A855F7)` | Mysteryland |

## Current Events (as of August 2026)

### 2026 (6 events)

1. WorldPride Amsterdam — 25 Jul - 8 Aug
2. Dahlia Festival — 1 Aug - 11 Oct
3. Open Monumentendag — 12-13 Sep (40th edition)
4. NN Dam tot Damloop — 19-20 Sep (40th edition)
5. TCS Amsterdam Marathon — 17-18 Oct (50th edition)
6. Amsterdam Dance Event — 21-25 Oct (30th anniversary)

### 2027 (10 events)

7. Keukenhof — 18 Mar - 9 May
8. Koningsdag — 27 Apr
9. Amsterdam Pride — ~31 Jul - 8 Aug
10. Castlefest — 5-8 Aug
11. Mysteryland — Aug (dates TBD)
12. Dahlia Festival — ~Aug - Oct
13. Open Monumentendag — 11-12 Sep
14. NN Dam tot Damloop — ~18-19 Sep
15. TCS Amsterdam Marathon — ~17 Oct
16. Amsterdam Dance Event — ~Oct
