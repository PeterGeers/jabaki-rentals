// Property-based tests for SitemapGenerator
// Tests sitemap completeness and validity across different configurations

import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { SitemapGeneratorImpl, SitemapEntry } from './SitemapGenerator'
import { SEO_CONFIG } from '../config/seo.config'

describe('SitemapGenerator Property Tests', () => {
  
  /**
   * **Feature: seo-optimization, Property 5: Sitemap completeness and validity**
   * **Validates: Requirements 5.1, 5.2, 5.3, 5.5**
   * 
   * For any build process, the generated sitemap.xml should contain all studio URLs 
   * with proper lastmod dates, priority values, and valid XML format compliant 
   * with sitemap protocol standards
   */
  it('should generate complete and valid sitemap for any studio configuration', () => {
    // Generator for valid studio configurations
    const studioConfigArb = fc.record({
      route: fc.oneof(
        fc.constant('/red-studio'),
        fc.constant('/green-studio'), 
        fc.constant('/garden-studio'),
        fc.string({ minLength: 1 }).map(s => `/${s.replace(/[^a-zA-Z0-9-]/g, '-')}`)
      ),
      seo: fc.record({
        priority: fc.float({ min: 0, max: 1 }),
        changefreq: fc.oneof(
          fc.constant('daily' as const),
          fc.constant('weekly' as const),
          fc.constant('monthly' as const)
        )
      })
    })

    // Generator for base URLs
    const baseUrlArb = fc.oneof(
      fc.constant('https://jabaki.nl'),
      fc.constant('https://example.com'),
      fc.webUrl()
    )

    fc.assert(
      fc.property(
        fc.array(studioConfigArb, { minLength: 1, maxLength: 10 }),
        baseUrlArb,
        (studios, baseUrl) => {
          // Create sitemap entries from studio configurations
          const entries = SitemapGeneratorImpl.createEntriesFromStudios(studios)
          const generator = new SitemapGeneratorImpl(baseUrl)
          
          // Generate sitemap
          const sitemap = generator.generateSitemap(entries)
          
          // Property 1: Sitemap should be valid XML
          expect(sitemap).toMatch(/^<\?xml version="1\.0" encoding="UTF-8"\?>/)
          expect(sitemap).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
          expect(sitemap).toContain('</urlset>')
          
          // Property 2: All studio URLs should be included (with proper XML escaping)
          studios.forEach(studio => {
            const expectedUrl = baseUrl.endsWith('/') 
              ? `${baseUrl.slice(0, -1)}${studio.route}`
              : `${baseUrl}${studio.route}`
            
            // Escape the expected URL for XML comparison
            const escapedUrl = expectedUrl
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&apos;')
            
            expect(sitemap).toContain(`<loc>${escapedUrl}</loc>`)
          })
          
          // Property 3: All entries should have required sitemap fields
          entries.forEach(entry => {
            expect(sitemap).toContain(`<priority>${entry.priority.toFixed(1)}</priority>`)
            expect(sitemap).toContain(`<changefreq>${entry.changefreq}</changefreq>`)
            expect(sitemap).toContain(`<lastmod>${entry.lastmod}</lastmod>`)
          })
          
          // Property 4: XML should be well-formed (no unescaped characters in content)
          // Check that special characters in URLs are properly escaped
          const urlContent = sitemap.match(/<loc>(.*?)<\/loc>/g) || []
          urlContent.forEach(url => {
            const urlText = url.replace(/<\/?loc>/g, '')
            // Should not contain unescaped special characters
            expect(urlText).not.toMatch(/[<>"'](?![a-z]+;)/)
            // Ampersands should be escaped unless they're part of an entity
            expect(urlText).not.toMatch(/&(?![a-z]+;)/)
          })
          
          // Property 5: Number of URL entries should match input
          const urlMatches = sitemap.match(/<url>/g)
          expect(urlMatches).toHaveLength(studios.length)
        }
      ),
      { numRuns: 100 } // Run 100 iterations as specified in design document
    )
  })

  /**
   * Property test for XML escaping correctness
   * Ensures special characters are properly escaped in URLs
   */
  it('should properly escape XML special characters in URLs', () => {
    const specialCharArb = fc.string().filter(s => /[<>&"']/.test(s))
    
    fc.assert(
      fc.property(
        specialCharArb,
        fc.float({ min: 0, max: 1 }),
        fc.oneof(fc.constant('daily'), fc.constant('weekly'), fc.constant('monthly')),
        (urlPart, priority, changefreq) => {
          const entry: SitemapEntry = {
            url: `/test-${urlPart}`,
            lastmod: '2024-01-01',
            priority,
            changefreq: changefreq as 'daily' | 'weekly' | 'monthly'
          }
          
          const generator = new SitemapGeneratorImpl('https://example.com')
          const sitemap = generator.generateSitemap([entry])
          
          // Should not contain unescaped special characters in URL content
          const urlContent = sitemap.match(/<loc>(.*?)<\/loc>/g) || []
          urlContent.forEach(url => {
            const urlText = url.replace(/<\/?loc>/g, '')
            expect(urlText).not.toMatch(/[<>"'](?![a-z]+;)/)
            expect(urlText).not.toMatch(/&(?![a-z]+;)/)
          })
          
          // Should contain properly escaped versions
          if (urlPart.includes('<')) expect(sitemap).toContain('&lt;')
          if (urlPart.includes('>')) expect(sitemap).toContain('&gt;')
          if (urlPart.includes('&')) expect(sitemap).toContain('&amp;')
          if (urlPart.includes('"')) expect(sitemap).toContain('&quot;')
          if (urlPart.includes("'")) expect(sitemap).toContain('&apos;')
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property test using actual SEO configuration
   * Validates that the real studio configuration produces valid sitemap
   */
  it('should generate valid sitemap for actual SEO configuration', () => {
    const entries = SitemapGeneratorImpl.createEntriesFromStudios(SEO_CONFIG.studios)
    const generator = new SitemapGeneratorImpl(SEO_CONFIG.baseUrl)
    const sitemap = generator.generateSitemap(entries)
    
    // Should contain all three studio routes
    expect(sitemap).toContain('https://jabaki.nl/red-studio')
    expect(sitemap).toContain('https://jabaki.nl/green-studio') 
    expect(sitemap).toContain('https://jabaki.nl/garden-studio')
    
    // Should be valid XML format
    expect(sitemap).toMatch(/^<\?xml version="1\.0" encoding="UTF-8"\?>/)
    expect(sitemap).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
    expect(sitemap).toContain('</urlset>')
    
    // Should have exactly 3 URL entries
    const urlMatches = sitemap.match(/<url>/g)
    expect(urlMatches).toHaveLength(3)
    
    // Should include all required fields for each entry
    SEO_CONFIG.studios.forEach(studio => {
      expect(sitemap).toContain(`<priority>${studio.seo.priority.toFixed(1)}</priority>`)
      expect(sitemap).toContain(`<changefreq>${studio.seo.changefreq}</changefreq>`)
    })
  })
})

describe('SitemapGenerator Unit Tests', () => {
  
  /**
   * Unit test: Generated sitemap contains all three studio URLs
   * Requirements: 5.2, 5.3, 5.5
   */
  it('should contain all three studio URLs in sitemap', () => {
    const entries = SitemapGeneratorImpl.createEntriesFromStudios(SEO_CONFIG.studios)
    const generator = new SitemapGeneratorImpl(SEO_CONFIG.baseUrl)
    const sitemap = generator.generateSitemap(entries)
    
    // Test that all three specific studio URLs are present
    expect(sitemap).toContain('<loc>https://jabaki.nl/red-studio</loc>')
    expect(sitemap).toContain('<loc>https://jabaki.nl/green-studio</loc>')
    expect(sitemap).toContain('<loc>https://jabaki.nl/garden-studio</loc>')
  })

  /**
   * Unit test: XML format compliance with sitemap protocol
   * Requirements: 5.2, 5.3, 5.5
   */
  it('should generate XML compliant with sitemap protocol', () => {
    const entries = SitemapGeneratorImpl.createEntriesFromStudios(SEO_CONFIG.studios)
    const generator = new SitemapGeneratorImpl(SEO_CONFIG.baseUrl)
    const sitemap = generator.generateSitemap(entries)
    
    // Test XML declaration
    expect(sitemap).toMatch(/^<\?xml version="1\.0" encoding="UTF-8"\?>/)
    
    // Test sitemap namespace
    expect(sitemap).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
    expect(sitemap).toContain('</urlset>')
    
    // Test URL structure for each entry
    entries.forEach(() => {
      expect(sitemap).toMatch(/<url>\s*<loc>.*<\/loc>\s*<lastmod>.*<\/lastmod>\s*<changefreq>.*<\/changefreq>\s*<priority>.*<\/priority>\s*<\/url>/s)
    })
  })

  /**
   * Unit test: Proper lastmod date format
   * Requirements: 5.3, 5.5
   */
  it('should include proper lastmod dates in YYYY-MM-DD format', () => {
    const entries = SitemapGeneratorImpl.createEntriesFromStudios(SEO_CONFIG.studios)
    const generator = new SitemapGeneratorImpl(SEO_CONFIG.baseUrl)
    const sitemap = generator.generateSitemap(entries)
    
    // Test that lastmod dates are in correct format
    const lastmodMatches = sitemap.match(/<lastmod>(.*?)<\/lastmod>/g)
    expect(lastmodMatches).toHaveLength(3)
    
    lastmodMatches?.forEach(match => {
      const date = match.replace(/<\/?lastmod>/g, '')
      expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    })
  })

  /**
   * Unit test: Priority values are properly formatted
   * Requirements: 5.3, 5.5
   */
  it('should include priority values with one decimal place', () => {
    const entries = SitemapGeneratorImpl.createEntriesFromStudios(SEO_CONFIG.studios)
    const generator = new SitemapGeneratorImpl(SEO_CONFIG.baseUrl)
    const sitemap = generator.generateSitemap(entries)
    
    // Test priority format for each studio
    expect(sitemap).toContain('<priority>0.8</priority>') // Red and Green studios
    expect(sitemap).toContain('<priority>0.9</priority>') // Garden studio (higher priority)
    
    // Test that all priorities are formatted with one decimal
    const priorityMatches = sitemap.match(/<priority>(.*?)<\/priority>/g)
    expect(priorityMatches).toHaveLength(3)
    
    priorityMatches?.forEach(match => {
      const priority = match.replace(/<\/?priority>/g, '')
      expect(priority).toMatch(/^\d\.\d$/)
    })
  })

  /**
   * Unit test: Changefreq values are valid
   * Requirements: 5.3, 5.5
   */
  it('should include valid changefreq values', () => {
    const entries = SitemapGeneratorImpl.createEntriesFromStudios(SEO_CONFIG.studios)
    const generator = new SitemapGeneratorImpl(SEO_CONFIG.baseUrl)
    const sitemap = generator.generateSitemap(entries)
    
    // Test that all studios have weekly changefreq as configured
    const changefreqMatches = sitemap.match(/<changefreq>(.*?)<\/changefreq>/g)
    expect(changefreqMatches).toHaveLength(3)
    
    changefreqMatches?.forEach(match => {
      const changefreq = match.replace(/<\/?changefreq>/g, '')
      expect(['daily', 'weekly', 'monthly']).toContain(changefreq)
    })
    
    // All studios are configured with weekly changefreq
    expect(sitemap).toContain('<changefreq>weekly</changefreq>')
  })

  /**
   * Unit test: Base URL handling with and without trailing slash
   * Requirements: 5.2
   */
  it('should handle base URLs with and without trailing slash', () => {
    const entries = [{ 
      url: '/test-studio', 
      lastmod: '2024-01-01', 
      priority: 0.8, 
      changefreq: 'weekly' as const 
    }]
    
    // Test with trailing slash
    const generatorWithSlash = new SitemapGeneratorImpl('https://example.com/')
    const sitemapWithSlash = generatorWithSlash.generateSitemap(entries)
    expect(sitemapWithSlash).toContain('<loc>https://example.com/test-studio</loc>')
    
    // Test without trailing slash
    const generatorWithoutSlash = new SitemapGeneratorImpl('https://example.com')
    const sitemapWithoutSlash = generatorWithoutSlash.generateSitemap(entries)
    expect(sitemapWithoutSlash).toContain('<loc>https://example.com/test-studio</loc>')
  })

  /**
   * Unit test: Empty entries array handling
   * Requirements: 5.2
   */
  it('should handle empty entries array gracefully', () => {
    const generator = new SitemapGeneratorImpl('https://example.com')
    const sitemap = generator.generateSitemap([])
    
    // Should still generate valid XML structure
    expect(sitemap).toContain('<?xml version="1.0" encoding="UTF-8"?>')
    expect(sitemap).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
    expect(sitemap).toContain('</urlset>')
    
    // Should not contain any URL entries
    expect(sitemap).not.toContain('<url>')
  })
})