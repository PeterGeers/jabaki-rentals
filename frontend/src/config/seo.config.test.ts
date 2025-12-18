import { describe, it, expect } from 'vitest'
import { 
  STUDIO_CONFIGS, 
  SEO_CONFIG, 
  getStudioConfig, 
  getStudioMetadata, 
  getAllStudioRoutes 
} from './seo.config'

describe('SEO Configuration Unit Tests', () => {
  describe('Studio Metadata Validation', () => {
    it('should have exact title format for Red Studio', () => {
      const redStudio = getStudioConfig('red')
      expect(redStudio).toBeDefined()
      expect(redStudio!.metadata.title).toBe('Red Studio Hoofddorp | Jabaki')
    })

    it('should have exact title format for Green Studio', () => {
      const greenStudio = getStudioConfig('green')
      expect(greenStudio).toBeDefined()
      expect(greenStudio!.metadata.title).toBe('Green Studio Hoofddorp | Jabaki')
    })

    it('should have exact title format for Garden Studio with Privé Terras', () => {
      const gardenStudio = getStudioConfig('garden')
      expect(gardenStudio).toBeDefined()
      expect(gardenStudio!.metadata.title).toBe('Garden Studio Hoofddorp | Privé Terras nabij Schiphol - Jabaki')
      
      // Verify it includes the required "Privé Terras nabij Schiphol" text
      expect(gardenStudio!.metadata.title).toContain('Privé Terras nabij Schiphol')
    })

    it('should have Garden Studio with outdoor keywords in description', () => {
      const gardenMetadata = getStudioMetadata('garden')
      expect(gardenMetadata).toBeDefined()
      
      const description = gardenMetadata!.description.toLowerCase()
      
      // Verify Garden Studio includes outdoor keywords as specified in requirements
      expect(description).toContain('garden')
      expect(description).toContain('tuin')
      expect(description).toContain('outdoor')
      expect(description).toContain('privacy')
      expect(description).toContain('terrace')
      expect(description).toContain('tranquil')
    })

    it('should have Garden Studio with outdoor keywords in keyword array', () => {
      const gardenMetadata = getStudioMetadata('garden')
      expect(gardenMetadata).toBeDefined()
      
      const keywords = gardenMetadata!.keywords
      
      // Verify Garden Studio includes both Dutch and English outdoor terms
      expect(keywords).toContain('garden')
      expect(keywords).toContain('tuin')
      expect(keywords).toContain('privé terras')
      expect(keywords).toContain('outdoor')
      expect(keywords).toContain('privacy')
      expect(keywords).toContain('terrace')
      expect(keywords).toContain('tranquil')
    })
  })

  describe('Studio Configuration Structure', () => {
    it('should have all three studios configured', () => {
      expect(STUDIO_CONFIGS).toHaveLength(3)
      
      const studioIds = STUDIO_CONFIGS.map(studio => studio.id)
      expect(studioIds).toContain('red')
      expect(studioIds).toContain('green')
      expect(studioIds).toContain('garden')
    })

    it('should have correct route paths for all studios', () => {
      const routes = getAllStudioRoutes()
      expect(routes).toContain('/red-studio')
      expect(routes).toContain('/green-studio')
      expect(routes).toContain('/garden-studio')
    })

    it('should have SEO priority and changefreq for all studios', () => {
      STUDIO_CONFIGS.forEach(studio => {
        expect(studio.seo.priority).toBeGreaterThan(0)
        expect(studio.seo.priority).toBeLessThanOrEqual(1)
        expect(['daily', 'weekly', 'monthly']).toContain(studio.seo.changefreq)
      })
    })

    it('should have Garden Studio with higher priority due to unique features', () => {
      const gardenStudio = getStudioConfig('garden')
      const redStudio = getStudioConfig('red')
      const greenStudio = getStudioConfig('green')
      
      expect(gardenStudio!.seo.priority).toBeGreaterThanOrEqual(redStudio!.seo.priority)
      expect(gardenStudio!.seo.priority).toBeGreaterThanOrEqual(greenStudio!.seo.priority)
    })
  })

  describe('SEO Configuration', () => {
    it('should have correct base URL', () => {
      expect(SEO_CONFIG.baseUrl).toBe('https://jabaki.nl')
    })

    it('should include all studio routes in prerender configuration', () => {
      expect(SEO_CONFIG.prerender.routes).toContain('/red-studio')
      expect(SEO_CONFIG.prerender.routes).toContain('/green-studio')
      expect(SEO_CONFIG.prerender.routes).toContain('/garden-studio')
    })

    it('should have sitemap configuration', () => {
      expect(SEO_CONFIG.sitemap.outputPath).toBe('/sitemap.xml')
      expect(SEO_CONFIG.sitemap.includeLastmod).toBe(true)
    })

    it('should have prerendering enabled', () => {
      expect(SEO_CONFIG.prerender.enabled).toBe(true)
      expect(SEO_CONFIG.prerender.outputDir).toBe('dist')
    })
  })

  describe('Helper Functions', () => {
    it('should return undefined for invalid studio ID', () => {
      // @ts-expect-error Testing invalid input
      const invalidStudio = getStudioConfig('invalid')
      expect(invalidStudio).toBeUndefined()
    })

    it('should return metadata for valid studio IDs', () => {
      const redMetadata = getStudioMetadata('red')
      const greenMetadata = getStudioMetadata('green')
      const gardenMetadata = getStudioMetadata('garden')
      
      expect(redMetadata).toBeDefined()
      expect(greenMetadata).toBeDefined()
      expect(gardenMetadata).toBeDefined()
      
      expect(redMetadata!.title).toContain('Red Studio')
      expect(greenMetadata!.title).toContain('Green Studio')
      expect(gardenMetadata!.title).toContain('Garden Studio')
    })
  })
})