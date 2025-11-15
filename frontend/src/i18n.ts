import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
  en: {
    translation: {
      "Find your next stay": "Find your next stay",
      "Discover amazing places to stay in Amsterdam and surroundings": "Discover amazing places to stay in Amsterdam and surroundings",
      "Where are you going?": "Where are you going?",
      "Search": "Search",
      "Upcoming Events": "Upcoming Events",
      "All Listings": "All Listings",
      "Events & Attractions": "Events & Attractions",
      "Listings": "Listings",
      "Events": "Events",
      "Learn More": "Learn More",
      "Keukenhof Gardens": "Keukenhof Gardens",
      "Amsterdam Dance Event": "Amsterdam Dance Event",
      "Dutch F1 Grand Prix": "Dutch F1 Grand Prix",
      "Mysteryland": "Mysteryland",
      "Cozy Amsterdam Apartment": "Cozy Amsterdam Apartment",
      "Modern Haarlem House": "Modern Haarlem House",
      "Canal View Studio": "Canal View Studio",
      "Amsterdam Center": "Amsterdam Center",
      "Near Keukenhof": "Near Keukenhof",
      "Amsterdam": "Amsterdam",
      "night": "night"
    }
  },
  nl: {
    translation: {
      "Find your next stay": "Vind je volgende verblijf",
      "Discover amazing places to stay in Amsterdam and surroundings": "Ontdek geweldige plekken om te verblijven in Amsterdam en omgeving",
      "Where are you going?": "Waar ga je naartoe?",
      "Search": "Zoeken",
      "Upcoming Events": "Aankomende Evenementen",
      "All Listings": "Alle Accommodaties",
      "Events & Attractions": "Evenementen & Attracties",
      "Listings": "Accommodaties",
      "Events": "Evenementen",
      "Learn More": "Meer Info",
      "Keukenhof Gardens": "Keukenhof Tuinen",
      "Amsterdam Dance Event": "Amsterdam Dance Event",
      "Dutch F1 Grand Prix": "Nederlandse F1 Grand Prix",
      "Mysteryland": "Mysteryland",
      "Cozy Amsterdam Apartment": "Gezellig Amsterdam Appartement",
      "Modern Haarlem House": "Modern Haarlem Huis",
      "Canal View Studio": "Grachtzicht Studio",
      "Amsterdam Center": "Amsterdam Centrum",
      "Near Keukenhof": "Bij Keukenhof",
      "Amsterdam": "Amsterdam",
      "night": "nacht"
    }
  },
  de: {
    translation: {
      "Find your next stay": "Finden Sie Ihren nächsten Aufenthalt",
      "Discover amazing places to stay in Amsterdam and surroundings": "Entdecken Sie tolle Unterkünfte in Amsterdam und Umgebung",
      "Where are you going?": "Wohin reisen Sie?",
      "Search": "Suchen",
      "Upcoming Events": "Kommende Veranstaltungen",
      "All Listings": "Alle Unterkünfte",
      "Events & Attractions": "Veranstaltungen & Attraktionen",
      "Listings": "Unterkünfte",
      "Events": "Veranstaltungen",
      "Learn More": "Mehr erfahren",
      "Keukenhof Gardens": "Keukenhof Gärten",
      "Amsterdam Dance Event": "Amsterdam Dance Event",
      "Dutch F1 Grand Prix": "Niederländischer F1 Grand Prix",
      "Mysteryland": "Mysteryland",
      "Cozy Amsterdam Apartment": "Gemütliche Amsterdam Wohnung",
      "Modern Haarlem House": "Modernes Haarlem Haus",
      "Canal View Studio": "Grachtenblick Studio",
      "Amsterdam Center": "Amsterdam Zentrum",
      "Near Keukenhof": "Nähe Keukenhof",
      "Amsterdam": "Amsterdam",
      "night": "Nacht"
    }
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    detection: {
      order: ['navigator', 'htmlTag', 'path', 'subdomain'],
    },
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n