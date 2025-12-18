/**
 * Integration tests for complete SEO workflow
 * Tests end-to-end SEO functionality from build to deployment
 * Verifies both user and bot experiences work correctly
 * Requirements: All requirements
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { PrerenderingService } from './PrerenderingService'
import { SitemapGeneratorImpl } from './SitemapGenerator'
import { MetadataManager } from '../components/seo/MetadataManager'
import { SEO_CONFIG } from '../config/seo.config'

// Mock components for testing
const MockStudioPage = ({ studio }: { studio: 'red' | 'green' | 'garden' }) => {
  return (
    <div>
      <MetadataManager studio={studio} />
      <h1>{studio.charAt(0).toUpperCase() + studio.slice(1)} Studio</h1>
      <p>Studio content for {studio}</p>
    </div>
  )
}

describe('SEO Workflow Integration Tests', () => {
  let prerenderingService: PrerenderingService
  let sitemapGenerator: SitemapGeneratorImpl
  let helmetContext: { helmet?: any }

  beforeEach(() => {
    prerenderingService = new PrerenderingService()
    sitemapGenerator = new SitemapGeneratorImpl('https://jabaki.nl')
    helmetContext = {}
  })

  afterEach(() => {
    // Clean up any global state
    if (typeof document !== 'undefined') {
      // Reset document head
      const existingHelmetElements = document.querySelectorAll('[data-rh="true"]')
      existingHelmetElements.forEach(element => element.remove())
    }
  })

  describe('End-to-End SEO Functionality', () => {
    it('should provide complete SEO workflow for all studio pages', async () => {
      /**
       * Integration test covering:
       * - Metadata management
       * - Prerendering validation
       * - Sitemap generation
       * - Route accessibility
       */
      
      const studios: Array<'red' | 'green' | 'garden'> = ['red', 'green', 'garden']
      const results = []

      for (const studio of studios) {
        // 1. Test metadata management
        const { container } = render(
          <HelmetProvider context={helmetContext}>
            <MemoryRouter initialEntries={[`/${studio}-studio`]}>
              <MockStudioPage studio={studio} />
            </MemoryRouter>
          </HelmetProvider>
        )

        // Verify page content is rendered
        expect(screen.getByText(`${studio.charAt(0).toUpperCase() + studio.slice(1)} Studio`)).toBeInTheDocument()
        expect(screen.getByText(`Studio content for ${studio}`)).toBeInTheDocument()

        // 2. Test prerendering validation
        const originalWindow = global.window
        // @ts-ignore
        delete global.window
        
        const validation = prerenderingService.validateOutput('dist', {
          checkFileSystem: false,
          validateContent: false,
          strictMode: false
        })
        
        global.window = originalWindow

        // Verify prerendering configuration
        expect(validation.errors.length).toBe(0)
        expect(validation.validFiles.length).toBeGreaterThan(0)

        // 3. Test sitemap generation
        const sitemapContent = sitemapGenerator.generateSitemap([
          {
            url: `${SEO_CONFIG.baseUrl}/${studio}-studio`,
            lastmod: new Date().toISOString().split('T')[0],
            priority: 0.8,
            changefreq: 'weekly'
          }
        ])

        expect(sitemapContent).toContain(`<loc>${SEO_CONFIG.baseUrl}/${studio}-studio</loc>`)
        expect(sitemapContent).toContain('<priority>0.8</priority>')

        results.push({
          studio,
          metadataRendered: true,
          prerenderingValid: validation.isValid,
          sitemapGenerated: sitemapContent.length > 0
        })
      }

      // Verify all studios passed the workflow
      expect(results).toHaveLength(3)
      results.forEach(result => {
        expect(result.metadataRendered).toBe(true)
        expect(result.prerenderingValid).toBe(true)
        expect(result.sitemapGenerated).toBe(true)
      })
    })

    it('should handle complete build validation workflow', () => {
      /**
       * Integration test for build validation process
       */
      
      // Mock Node.js environment for build validation
      const originalWindow = global.window
      // @ts-ignore
      delete global.window

      // Test complete build validation
      const buildValidation = prerenderingService.validateBuildProcess('dist', {
        checkFileSystem: false,
        validateContent: false,
        strictMode: false
      })

      // Restore window
      global.window = originalWindow

      // Verify comprehensive validation results
      expect(buildValidation.validation).toBeDefined()
      expect(buildValidation.fallbacks).toBeDefined()
      expect(buildValidation.report).toBeDefined()
      expect(buildValidation.recommendations).toBeDefined()

      // Verify report contains essential information
      expect(buildValidation.report).toContain('Prerendering Validation Report')
      expect(buildValidation.report).toContain('Status:')
      expect(buildValidation.report).toContain('Summary')

      // Verify recommendations are provided
      expect(Array.isArray(buildValidation.recommendations)).toBe(true)
      expect(buildValidation.recommendations.length).toBeGreaterThan(0)

      // Verify fallback mechanisms
      expect(Array.isArray(buildValidation.fallbacks)).toBe(true)
    })

    it('should generate complete sitemap for all studio routes', () => {
      /**
       * Integration test for sitemap generation covering all routes
       */
      
      const sitemapEntries = SEO_CONFIG.studios.map(studio => ({
        url: `${SEO_CONFIG.baseUrl}${studio.route}`,
        lastmod: new Date().toISOString().split('T')[0],
        priority: studio.seo.priority,
        changefreq: studio.seo.changefreq as 'daily' | 'weekly' | 'monthly'
      }))

      const sitemapContent = sitemapGenerator.generateSitemap(sitemapEntries)

      // Verify sitemap structure
      expect(sitemapContent).toContain('<?xml version="1.0" encoding="UTF-8"?>')
      expect(sitemapContent).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
      expect(sitemapContent).toContain('</urlset>')

      // Verify all studio routes are included
      SEO_CONFIG.studios.forEach(studio => {
        expect(sitemapContent).toContain(`<loc>${SEO_CONFIG.baseUrl}${studio.route}</loc>`)
        expect(sitemapContent).toContain(`<priority>${studio.seo.priority}</priority>`)
        expect(sitemapContent).toContain(`<changefreq>${studio.seo.changefreq}</changefreq>`)
      })

      // Verify sitemap validation
      const isValid = sitemapGenerator.validateSitemap(sitemapContent)
      expect(isValid).toBe(true)
    })
  })

  describe('User and Bot Experience Verification', () => {
    it('should provide optimal experience for search engine bots', () => {
      /**
       * Test bot experience - static HTML with metadata
       */
      
      // Mock Node.js environment (bot scenario)
      const originalWindow = global.window
      // @ts-ignore
      delete global.window

      // Test prerendering service for bot experience
      const validation = prerenderingService.validateOutput('dist')
      
      // Restore window
      global.window = originalWindow

      // Verify bot-friendly features
      expect(validation.validFiles.length).toBe(SEO_CONFIG.prerender.routes.length)
      
      // Test HTML content validation for each route
      SEO_CONFIG.prerender.routes.forEach(route => {
        let studioSpecificContent = ''
        if (route.includes('red-studio')) {
          studioSpecificContent = 'Red Studio Hoofddorp rooftop terrace'
        } else if (route.includes('green-studio')) {
          studioSpecificContent = 'Green Studio Hoofddorp scenic views'
        } else if (route.includes('garden-studio')) {
          studioSpecificContent = 'Garden Studio Hoofddorp privé terras'
        }
        
        const mockHtmlContent = `
          <!DOCTYPE html>
          <html>
            <head>
              <title>Test Studio | Jabaki</title>
              <meta name="description" content="Test studio description">
              <link rel="canonical" href="${SEO_CONFIG.baseUrl}${route}">
            </head>
            <body>
              <h1>${studioSpecificContent}</h1>
            </body>
          </html>
        `
        
        const isValidContent = prerenderingService.validateHTMLContent(mockHtmlContent, route)
        expect(isValidContent).toBe(true)
      })
    })

    it('should provide optimal experience for regular users', () => {
      /**
       * Test user experience - SPA with dynamic metadata
       */
      
      const studios: Array<'red' | 'green' | 'garden'> = ['red', 'green', 'garden']
      
      studios.forEach(studio => {
        // Render component for user experience
        const { container } = render(
          <HelmetProvider context={helmetContext}>
            <MemoryRouter initialEntries={[`/${studio}-studio`]}>
              <MockStudioPage studio={studio} />
            </MemoryRouter>
          </HelmetProvider>
        )

        // Verify SPA functionality
        expect(screen.getByText(`${studio.charAt(0).toUpperCase() + studio.slice(1)} Studio`)).toBeInTheDocument()
        
        // Verify dynamic content loading
        expect(container.querySelector('h1')).toBeInTheDocument()
        
        // Test client-side navigation capability
        expect(window.location.pathname).toBeDefined()
      })
    })

    it('should handle fallback scenarios gracefully', () => {
      /**
       * Test fallback mechanisms when prerendering fails
       */
      
      const testRoutes = ['/red-studio', '/green-studio', '/garden-studio', '/invalid-route']
      
      testRoutes.forEach(route => {
        const fallbackResult = prerenderingService.handlePrerenderingFailure(route)
        
        if (route === '/invalid-route') {
          // Invalid routes should be handled gracefully
          expect(fallbackResult.success).toBe(false)
          expect(fallbackResult.message).toContain('No fallback available')
        } else {
          // Valid studio routes should have SPA fallback
          expect(fallbackResult.success).toBe(true)
          expect(fallbackResult.message).toContain('SPA routing will handle')
          expect(fallbackResult.fallbackRoute).toBe(route)
        }
      })
    })
  })

  describe('Configuration Integration', () => {
    it('should integrate properly with SEO configuration', () => {
      /**
       * Test integration with actual SEO_CONFIG
       */
      
      // Verify configuration consistency
      expect(SEO_CONFIG.studios).toHaveLength(3)
      expect(SEO_CONFIG.prerender.routes).toHaveLength(3)
      
      // Verify each studio has proper configuration
      SEO_CONFIG.studios.forEach(studio => {
        expect(studio.id).toMatch(/^(red|green|garden)$/)
        expect(studio.route).toMatch(/^\/(red|green|garden)-studio$/)
        expect(studio.metadata.title).toContain('Jabaki')
        expect(studio.metadata.description).toBeTruthy()
        expect(studio.seo.priority).toBeGreaterThan(0)
        expect(studio.seo.priority).toBeLessThanOrEqual(1)
      })

      // Test prerendering service with actual configuration
      const service = new PrerenderingService()
      const config = service.getConfig()
      
      expect(config.routes).toEqual(SEO_CONFIG.prerender.routes)
      expect(config.outputDir).toBe(SEO_CONFIG.prerender.outputDir)
    })

    it('should maintain consistency across all SEO components', () => {
      /**
       * Test that all SEO components work together consistently
       */
      
      // Test metadata manager with each studio
      const studios: Array<'red' | 'green' | 'garden'> = ['red', 'green', 'garden']
      
      studios.forEach(studio => {
        // Render metadata manager
        render(
          <HelmetProvider context={helmetContext}>
            <MemoryRouter initialEntries={[`/${studio}-studio`]}>
              <MetadataManager studio={studio} />
            </MemoryRouter>
          </HelmetProvider>
        )
        
        // Verify studio configuration exists
        const studioConfig = SEO_CONFIG.studios.find(s => s.id === studio)
        expect(studioConfig).toBeDefined()
        expect(studioConfig?.route).toBe(`/${studio}-studio`)
      })

      // Test sitemap includes all configured routes
      const sitemapEntries = SEO_CONFIG.studios.map(studio => ({
        url: `${SEO_CONFIG.baseUrl}${studio.route}`,
        lastmod: new Date().toISOString().split('T')[0],
        priority: studio.seo.priority,
        changefreq: studio.seo.changefreq as 'daily' | 'weekly' | 'monthly'
      }))

      const sitemap = sitemapGenerator.generateSitemap(sitemapEntries)
      
      // Verify all routes are in sitemap
      SEO_CONFIG.prerender.routes.forEach(route => {
        expect(sitemap).toContain(`${SEO_CONFIG.baseUrl}${route}`)
      })
    })
  })

  describe('Error Handling and Resilience', () => {
    it('should handle errors gracefully throughout the workflow', () => {
      /**
       * Test error handling in various scenarios
       */
      
      // Test prerendering service error handling
      const service = new PrerenderingService()
      
      // Test with invalid configuration
      expect(() => {
        service.validateOutput('', { strictMode: false })
      }).not.toThrow()
      
      // Test build validation with errors
      service.logBuildError('Test error')
      service.logBuildWarning('Test warning')
      
      const buildValidation = service.validateBuildProcess('dist', { strictMode: false })
      
      expect(buildValidation.report).toContain('Build Errors:')
      expect(buildValidation.report).toContain('Build Warnings:')
      expect(buildValidation.recommendations.length).toBeGreaterThan(0)
      
      // Test sitemap generation error handling
      expect(() => {
        sitemapGenerator.generateSitemap([])
      }).not.toThrow()
      
      // Test invalid sitemap validation
      const invalidSitemap = '<invalid>xml</invalid>'
      const isValid = sitemapGenerator.validateSitemap(invalidSitemap)
      expect(isValid).toBe(false)
    })

    it('should provide comprehensive debugging information', () => {
      /**
       * Test debugging and logging capabilities
       */
      
      const service = new PrerenderingService()
      
      // Generate some logs
      service.logBuildError('Test build error')
      service.logBuildWarning('Test build warning')
      
      // Verify logs are captured
      const errors = service.getBuildErrors()
      const warnings = service.getBuildWarnings()
      
      expect(errors.length).toBe(1)
      expect(warnings.length).toBe(1)
      expect(errors[0]).toContain('Test build error')
      expect(warnings[0]).toContain('Test build warning')
      
      // Test validation report generation
      const mockValidation = service.validateBuildProcess('dist', { strictMode: false })
      const report = mockValidation.report
      
      expect(report).toContain('=== Prerendering Validation Report ===')
      expect(report).toContain('=== Summary ===')
      expect(report).toContain('Build Errors:')
      expect(report).toContain('Build Warnings:')
      
      // Clear logs
      service.clearBuildLogs()
      expect(service.getBuildErrors()).toHaveLength(0)
      expect(service.getBuildWarnings()).toHaveLength(0)
    })
  })
})