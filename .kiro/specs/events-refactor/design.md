# Events Refactor Design Document

## Overview

This design replaces the current 12 hardcoded event card components in App.tsx with a data-driven architecture. Events are defined in a TypeScript data file (`src/data/events.ts`), rendered by a single reusable `EventCard` component, grouped by year, and sorted by start date within each year. All user-visible text uses i18n translation keys for full EN/NL/DE support. The final page shows 6 events for 2026 and 10 events for 2027 (16 total).

## Architecture

```
Before:
  App.tsx → 12 individual card components (F1Card, KeukenhofCard, ADECard, etc.)
            Each with hardcoded Dutch text, inline styles, and unique JSX
  src/pages/EventsPage.tsx (dead code, never imported)

After:
  src/data/events.ts           → Structured event data (16 entries for 2026+2027)
  src/components/EventCard.tsx → Single reusable card component
  App.tsx                      → EventsPage reads from data, groups by year, sorts by startDate
  src/i18n.ts                  → Translation keys under events.* namespace (en/nl/de)
  src/pages/EventsPage.tsx     → DELETED
```

## Data Model

### Event interface (`src/data/events.ts`)

```typescript
export interface EventData {
  /** Unique identifier, used as i18n key prefix: events.<id>.* */
  id: string
  /** Year the event takes place */
  year: number
  /** ISO date string for sorting within a year (e.g., '2026-09-12') */
  startDate: string
  /** CSS gradient for the card background */
  gradient: string
  /** Emoji displayed as decoration */
  emoji: string
  /** External URL for the primary button */
  url: string
  /** Optional: secondary button that opens a modal */
  modal?: {
    contentKey: string
  }
  /** Optional: event has a subtitle line (e.g., ADE "30-jarig jubileum!") */
  hasSubtitle?: boolean
  /** Optional: event has extra detail text */
  hasDetails?: boolean
}
```

### Full event data (16 entries)

```typescript
export const events: EventData[] = [
  // ===== 2026 =====
  {
    id: 'worldpride-2026',
    year: 2026,
    startDate: '2026-07-25',
    gradient: 'linear-gradient(45deg, #e40303, #ff8c00, #ffed00, #008018, #004cff, #732982)',
    emoji: '🌍🏳️‍🌈',
    url: 'https://www.pride.amsterdam/',
    hasDetails: true,
  },
  {
    id: 'dahlia-2026',
    year: 2026,
    startDate: '2026-08-01',
    gradient: 'linear-gradient(135deg, #FF69B4, #FF1493)',
    emoji: '🌸',
    url: 'https://bollenstreek.nl/dahlia-festival/',
    hasDetails: true,
  },
  {
    id: 'monumentendag-2026',
    year: 2026,
    startDate: '2026-09-12',
    gradient: 'linear-gradient(135deg, #8B4513, #A0522D)',
    emoji: '🏰',
    url: 'https://www.openmonumentendag.nl/',
    hasDetails: true,
  },
  {
    id: 'damtotdam-2026',
    year: 2026,
    startDate: '2026-09-19',
    gradient: 'linear-gradient(135deg, #0066CC, #004499)',
    emoji: '🏃',
    url: 'https://www.damloop.nl/',
    hasSubtitle: true,
  },
  {
    id: 'marathon-2026',
    year: 2026,
    startDate: '2026-10-17',
    gradient: 'linear-gradient(135deg, #DC143C, #B22222)',
    emoji: '🏅',
    url: 'https://www.tcsamsterdammarathon.nl/',
    hasSubtitle: true,
  },
  {
    id: 'ade-2026',
    year: 2026,
    startDate: '2026-10-21',
    gradient: 'linear-gradient(135deg, #1a1a1a, #333333)',
    emoji: '🎵',
    url: 'https://amsterdam-dance-event.nl',
    hasSubtitle: true,
  },
  // ===== 2027 =====
  {
    id: 'keukenhof-2027',
    year: 2027,
    startDate: '2027-03-18',
    gradient: 'linear-gradient(135deg, #2d5016, #4a7c59)',
    emoji: '🌷',
    url: 'https://keukenhof.nl',
    hasDetails: true,
  },
  {
    id: 'koningsdag-2027',
    year: 2027,
    startDate: '2027-04-27',
    gradient: 'linear-gradient(135deg, #FF6B35, #F7931E)',
    emoji: '👑',
    url: 'https://www.amsterdam.nl/koningsdag/',
    hasDetails: true,
  },
  {
    id: 'pride-2027',
    year: 2027,
    startDate: '2027-07-31',
    gradient: 'linear-gradient(135deg, #e40303, #ff8c00, #ffed00, #008018, #004cff, #732982)',
    emoji: '🏳️‍🌈',
    url: 'https://www.pride.amsterdam/',
  },
  {
    id: 'castlefest-2027',
    year: 2027,
    startDate: '2027-08-05',
    gradient: 'linear-gradient(135deg, #4B0082, #663399)',
    emoji: '🏰⚔️',
    url: 'https://www.castlefest.nl/',
    hasDetails: true,
  },
  {
    id: 'mysteryland-2027',
    year: 2027,
    startDate: '2027-08-27',
    gradient: 'linear-gradient(135deg, #8B5CF6, #A855F7)',
    emoji: '🎭',
    url: 'https://www.mysteryland.nl/',
    hasSubtitle: true,
  },
  {
    id: 'dahlia-2027',
    year: 2027,
    startDate: '2027-08-01',
    gradient: 'linear-gradient(135deg, #FF69B4, #FF1493)',
    emoji: '🌸',
    url: 'https://bollenstreek.nl/dahlia-festival/',
    hasDetails: true,
  },
  {
    id: 'monumentendag-2027',
    year: 2027,
    startDate: '2027-09-11',
    gradient: 'linear-gradient(135deg, #8B4513, #A0522D)',
    emoji: '🏰',
    url: 'https://www.openmonumentendag.nl/',
    hasDetails: true,
  },
  {
    id: 'damtotdam-2027',
    year: 2027,
    startDate: '2027-09-18',
    gradient: 'linear-gradient(135deg, #0066CC, #004499)',
    emoji: '🏃',
    url: 'https://www.damloop.nl/',
  },
  {
    id: 'marathon-2027',
    year: 2027,
    startDate: '2027-10-17',
    gradient: 'linear-gradient(135deg, #DC143C, #B22222)',
    emoji: '🏅',
    url: 'https://www.tcsamsterdammarathon.nl/',
  },
  {
    id: 'ade-2027',
    year: 2027,
    startDate: '2027-10-20',
    gradient: 'linear-gradient(135deg, #1a1a1a, #333333)',
    emoji: '🎵',
    url: 'https://amsterdam-dance-event.nl',
  },
]
```

## Components

### EventCard (`src/components/EventCard.tsx`)

A single reusable component that renders any event:

```typescript
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { EventData } from '../data/events'

interface EventCardProps {
  event: EventData
}

const EventCard = ({ event }: EventCardProps) => {
  const { t } = useTranslation()
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div className="card" style={{
        background: event.gradient,
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h4 style={{ fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '0.5rem', color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
            {t(`events.${event.id}.title`)}
          </h4>
          {event.hasSubtitle && (
            <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: '#ffd700', textShadow: '1px 1px 2px rgba(0,0,0,0.3)', fontWeight: 'bold' }}>
              {t(`events.${event.id}.subtitle`)}
            </p>
          )}
          <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
            {t(`events.${event.id}.date`)}
          </p>
          <p style={{ fontSize: '0.85rem', marginBottom: '0.5rem', color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
            {t(`events.${event.id}.location`)}
          </p>
          {event.hasDetails && (
            <p style={{ fontSize: '0.8rem', marginBottom: '1rem', color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
              {t(`events.${event.id}.details`)}
            </p>
          )}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => window.open(event.url, '_blank')}
              style={{
                background: '#FF385C',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold'
              }}
            >
              {t(`events.${event.id}.button`)}
            </button>
            {event.modal && (
              <button
                onClick={() => setShowModal(true)}
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  border: '1px solid white',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}
              >
                {t(`events.${event.id}.secondaryButton`)}
              </button>
            )}
          </div>
        </div>
        <div style={{ position: 'absolute', top: '-20px', right: '-20px', fontSize: '4rem', opacity: 0.15, zIndex: 1 }}>
          {event.emoji}
        </div>
      </div>

      {event.modal && showModal && (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          {/* Render translated modal content from events.<id>.modal.* keys */}
        </Modal>
      )}
    </>
  )
}

export default EventCard
```

### EventsPage (in App.tsx)

```typescript
import { events } from './data/events'
import EventCard from './components/EventCard'

const EventsPage = () => {
  const { t } = useTranslation()
  const years = [...new Set(events.map(e => e.year))].sort((a, b) => a - b)

  return (
    <div style={{ padding: '2rem 0' }}>
      <div className="container">
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>
          {t('Events & Attractions')}
        </h2>
        {years.map(year => {
          const yearEvents = events
            .filter(e => e.year === year)
            .sort((a, b) => a.startDate.localeCompare(b.startDate))
          return (
            <section key={year} style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>{year}</h3>
              <div className="grid grid-3">
                {yearEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
```

## Translation Key Structure

```
events.<id>.title           — Event name
events.<id>.date            — Display date string
events.<id>.location        — Location line
events.<id>.details         — Extra detail (optional, when hasDetails=true)
events.<id>.subtitle        — Subtitle/tagline (optional, when hasSubtitle=true)
events.<id>.button          — Primary button label
events.<id>.secondaryButton — Secondary button label (optional, when modal exists)
events.<id>.modal.title     — Modal heading
events.<id>.modal.*         — Additional modal content
```

## Event Data Sources (verified August 2026)

| Event ID | Source | Date Status |
|----------|--------|-------------|
| worldpride-2026 | pride.amsterdam | Confirmed: 25 Jul - 8 Aug 2026 |
| dahlia-2026 | bollenstreek.nl | Confirmed: 1 Aug - 11 Oct 2026 |
| monumentendag-2026 | openmonumentendag.nl | Confirmed: 12-13 Sep 2026 (40th) |
| damtotdam-2026 | damloop.nl | Confirmed: 19-20 Sep 2026 (40th) |
| marathon-2026 | tcsamsterdammarathon.nl | Confirmed: 17-18 Oct 2026 (50th) |
| ade-2026 | amsterdam-dance-event.nl | Confirmed: 21-25 Oct 2026 (30th) |
| keukenhof-2027 | keukenhof.nl | Confirmed: 18 Mar - 9 May 2027 |
| koningsdag-2027 | — | Fixed date: 27 Apr 2027 |
| pride-2027 | gayout.com/iamsterdam.com | Estimated: ~31 Jul - 8 Aug 2027 |
| castlefest-2027 | castlefest.nl | Confirmed: 5-8 Aug 2027 |
| mysteryland-2027 | mysteryland.nl | Confirmed returning, dates TBD |
| dahlia-2027 | — | Estimated: ~Aug - Oct 2027 |
| monumentendag-2027 | — | Estimated: 11-12 Sep 2027 |
| damtotdam-2027 | — | Estimated: ~18-19 Sep 2027 |
| marathon-2027 | hardlopen.nl | Estimated: ~17 Oct 2027 |
| ade-2027 | — | Estimated: ~Oct 2027 |

## Dead Code Removal

- Delete `frontend/src/pages/EventsPage.tsx`
- Remove all 12 individual card components from App.tsx
- Remove past/discontinued events: F1Card, KeukenhofCard (2026), KoningsdagCard (2026), CastlefestCard (2026)

## Constraints

- Visual appearance of event cards must match the current design (gradients, emojis, card layout, button styles)
- All translations must cover EN, NL, and DE
- External URLs are stored in the data file (not translated)
- Events within a year are always sorted by `startDate` ascending
- Estimated 2027 dates can be updated later when confirmed — only requires editing `events.ts` and `i18n.ts`
