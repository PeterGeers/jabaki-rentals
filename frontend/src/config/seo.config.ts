// SEO Configuration interfaces and data structures
// Based on the design document specifications

export interface StudioConfig {
  id: "red" | "green" | "garden"
  name: string
  route: string
  metadata: {
    title: string
    description: string
    keywords: string[]
    features: string[]
  }
  seo: {
    priority: number
    changefreq: "daily" | "weekly" | "monthly"
  }
}

export interface SEOConfig {
  baseUrl: string
  studios: StudioConfig[]
  sitemap: {
    outputPath: string
    includeLastmod: boolean
  }
  prerender: {
    enabled: boolean
    outputDir: string
    routes: string[]
  }
}

// Studio configurations with complete metadata and SEO settings
export const STUDIO_CONFIGS: StudioConfig[] = [
  {
    id: "red",
    name: "Red Studio",
    route: "/red-studio",
    metadata: {
      title: "Red Studio Hoofddorp | Jabaki",
      description: "Stylish Red Studio in Hoofddorp with rooftop terrace. Modern accommodation near Schiphol Airport. Perfect for business travelers and tourists visiting Amsterdam.",
      keywords: ["red studio", "hoofddorp", "schiphol", "accommodation", "rooftop terrace", "modern", "business travel"],
      features: [
        "Private rooftop terrace",
        "Self service check-in",
        "Modern furnishing and amenities", 
        "Close to Schiphol Airport",
        "Easy access to Amsterdam",
        "Perfect for business travel"
      ]
    },
    seo: {
      priority: 0.8,
      changefreq: "weekly"
    }
  },
  {
    id: "green",
    name: "Green Studio", 
    route: "/green-studio",
    metadata: {
      title: "Green Studio Hoofddorp | Jabaki",
      description: "Modern Green Studio in Hoofddorp with terrace. Comfortable accommodation near Schiphol Airport and Amsterdam. Ideal for short and long stays.",
      keywords: ["green studio", "hoofddorp", "schiphol", "accommodation", "terrace", "modern", "comfortable"],
      features: [
        "Terrace",
        "Self service check-in",
        "Modern and comfortable furnishing",
        "Near Schiphol Airport", 
        "Quick access to Amsterdam",
        "Suitable for extended stays"
      ]
    },
    seo: {
      priority: 0.8,
      changefreq: "weekly"
    }
  },
  {
    id: "garden",
    name: "Garden Studio",
    route: "/garden-studio", 
    metadata: {
      title: "Garden Studio Hoofddorp | Privé Terras nabij Schiphol - Jabaki",
      description: "Cozy Garden Studio with beautiful private garden terrace near Schiphol Airport. Tranquil outdoor space perfect for relaxation. Garden, tuin, outdoor, privacy, terrace.",
      keywords: ["garden studio", "hoofddorp", "schiphol", "privé terras", "garden", "tuin", "outdoor", "tranquil", "privacy", "terrace"],
      features: [
        "Private garden terrace (privé terras)",
        "Outdoor seating and dining area",
        "Tranquil garden setting (tuin)",
        "Privacy and peaceful atmosphere", 
        "Perfect for outdoor relaxation",
        "Close to Schiphol Airport"
      ]
    },
    seo: {
      priority: 0.9, // Higher priority for unique garden feature
      changefreq: "weekly"
    }
  }
]

// Main SEO configuration object
export const SEO_CONFIG: SEOConfig = {
  baseUrl: "https://jabaki.nl",
  studios: STUDIO_CONFIGS,
  sitemap: {
    outputPath: "/sitemap.xml",
    includeLastmod: true
  },
  prerender: {
    enabled: true,
    outputDir: "dist",
    routes: STUDIO_CONFIGS.map(studio => studio.route)
  }
}

// Helper functions for accessing studio configurations
export const getStudioConfig = (studioId: "red" | "green" | "garden"): StudioConfig | undefined => {
  return STUDIO_CONFIGS.find(studio => studio.id === studioId)
}

export const getAllStudioRoutes = (): string[] => {
  return STUDIO_CONFIGS.map(studio => studio.route)
}

export const getStudioMetadata = (studioId: "red" | "green" | "garden") => {
  const config = getStudioConfig(studioId)
  return config?.metadata
}

export const getStudioSEOSettings = (studioId: "red" | "green" | "garden") => {
  const config = getStudioConfig(studioId)
  return config?.seo
}