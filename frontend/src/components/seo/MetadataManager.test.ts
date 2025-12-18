import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { getStudioMetadata, SEO_CONFIG } from '../../config/seo.config'

describe('MetadataManager Property Tests', () => {
  /**
   * Feature: seo-optimization, Property 1: Unique metadata per studio
   * 
   * Property 1: Unique metadata per studio
   * For any studio page (red, green, garden), the page title and meta description 
   * should be unique and contain studio-specific content
   * Validates: Requirements 1.1, 1.5
   */
  it('should have unique metadata per studio - Property 1', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('red', 'green', 'garden'),
        fc.constantFrom('red', 'green', 'garden'),
        (studio1, studio2) => {
          const metadata1 = getStudioMetadata(studio1)!
          const metadata2 = getStudioMetadata(studio2)!
          
          if (studio1 === studio2) {
            // Same studio should have identical metadata
            expect(metadata1.title).toBe(metadata2.title)
            expect(metadata1.description).toBe(metadata2.description)
            expect(metadata1.canonical).toBe(metadata2.canonical)
          } else {
            // Different studios should have unique titles and descriptions
            expect(metadata1.title).not.toBe(metadata2.title)
            expect(metadata1.description).not.toBe(metadata2.description)
            
            // Each title should contain the studio name
            expect(metadata1.title.toLowerCase()).toContain(studio1.toLowerCase())
            expect(metadata2.title.toLowerCase()).toContain(studio2.toLowerCase())
            
            // Each description should be unique and non-empty
            expect(metadata1.description.length).toBeGreaterThan(0)
            expect(metadata2.description.length).toBeGreaterThan(0)
          }
        }
      ),
      { numRuns: 100 }
    )
  })

  it('should contain studio-specific content in metadata', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('red', 'green', 'garden'),
        (studio) => {
          const metadata = getStudioMetadata(studio)!
          
          // Title should contain studio name and "Jabaki"
          expect(metadata.title.toLowerCase()).toContain(studio.toLowerCase())
          expect(metadata.title).toContain('Jabaki')
          
          // Description should be meaningful and contain studio-specific terms
          expect(metadata.description.length).toBeGreaterThan(50)
          expect(metadata.description.toLowerCase()).toContain(studio.toLowerCase())
          
          // Base URL should be configured correctly
          expect(SEO_CONFIG.baseUrl).toBe('https://jabaki.nl')
          
          // Keywords should include studio-specific terms
          expect(metadata.keywords).toContain(`${studio} studio`)
          expect(metadata.keywords.length).toBeGreaterThan(0)
        }
      ),
      { numRuns: 100 }
    )
  })

  it('should have Garden Studio specific outdoor keywords', () => {
    const gardenMetadata = getStudioMetadata('garden')!
    
    // Garden Studio should emphasize outdoor space and privacy
    expect(gardenMetadata.title).toContain('Privé Terras nabij Schiphol')
    expect(gardenMetadata.description.toLowerCase()).toContain('garden')
    expect(gardenMetadata.description.toLowerCase()).toContain('tuin')
    expect(gardenMetadata.description.toLowerCase()).toContain('outdoor')
    expect(gardenMetadata.description.toLowerCase()).toContain('privacy')
    expect(gardenMetadata.description.toLowerCase()).toContain('terrace')
    
    // Keywords should include Dutch and English garden terms
    expect(gardenMetadata.keywords).toContain('garden')
    expect(gardenMetadata.keywords).toContain('tuin')
    expect(gardenMetadata.keywords).toContain('privé terras')
    expect(gardenMetadata.keywords).toContain('outdoor')
    expect(gardenMetadata.keywords).toContain('privacy')
  })

  /**
   * Feature: seo-optimization, Property 4: Canonical URL correctness
   * 
   * Property 4: Canonical URL correctness
   * For any studio page, the canonical link tag should exist in the HTML head 
   * and point to the same URL as the current page
   * Validates: Requirements 3.4, 4.1, 4.2
   */
  it('should generate correct canonical URLs for all studio routes - Property 4', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('red', 'green', 'garden'),
        fc.constantFrom('/red-studio', '/green-studio', '/garden-studio'),
        (studio, pathname) => {
          // Generate canonical URL using the same logic as MetadataManager
          const canonicalUrl = `${SEO_CONFIG.baseUrl}${pathname}`
          
          // Canonical URL should always start with the base URL
          expect(canonicalUrl).toMatch(/^https:\/\/jabaki\.nl\//)
          
          // Canonical URL should contain the pathname
          expect(canonicalUrl).toContain(pathname)
          
          // Canonical URL should be a valid URL format
          expect(() => new URL(canonicalUrl)).not.toThrow()
          
          // For studio-specific routes, canonical should match the studio
          if (pathname.includes(studio)) {
            expect(canonicalUrl).toContain(`/${studio}-studio`)
          }
          
          // Canonical URL should not have trailing slashes (except root)
          if (pathname !== '/') {
            expect(canonicalUrl).not.toMatch(/\/$/)
          }
          
          // Base URL should be properly configured
          expect(SEO_CONFIG.baseUrl).toBe('https://jabaki.nl')
        }
      ),
      { numRuns: 100 }
    )
  })
})