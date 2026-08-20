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
