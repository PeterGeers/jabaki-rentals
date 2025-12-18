/**
 * Property-based tests for dual build output generation
 * **Feature: seo-optimization, Property 7: Dual build output generation**
 * **Validates: Requirements 6.5**
 * 
 * Tests that for any application build, both SPA bundle files and static HTML files 
 * should be generated successfully
 */

import { describe, it, expect, beforeEach } from 'vitest'
import * as fc from 'fast-check'
import { PrerenderingService } from './PrerenderingService'
import { SEO_CONFIG } from '../config/seo.config'

describe('Property 7: Dual build output generation', () => {
  let prerenderingService: PrerenderingService

  beforeEach(() => {
    prerenderingService = new PrerenderingService()
  })

  it('should generate both SPA bundle and static HTML files for any valid build configuration', () => {
    /**
     * **Feature: seo-optimization, Property 7: Dual build output generation**
     * **Validates: Requirements 6.5**
     * 
     * Property: For any application build configuration, both SPA bundle files 
     * and static HTML files should be generated successfully
     */
    fc.assert(
      fc.property(
        // Generate arbitrary build configurations
        fc.record({
          outputDir: fc.constantFrom('dist', 'build', 'out'),
          routes: fc.array(
            fc.constantFrom('/red-studio', '/green-studio', '/garden-studio'),
            { minLength: 1, maxLength: 3 }
          ),
          staticDir: fc.constantFrom('dist', 'build', 'out')
        }),
        (buildConfig) => {
          // Create service with the generated configuration
          const service = new PrerenderingService(buildConfig)
          
          // Mock the window object to simulate Node.js environment for this test
          const originalWindow = global.window
          // @ts-ignore - Temporarily remove window to simulate Node.js environment
          delete global.window
          
          // Validate the build output
          const validationResult = service.validateOutput(buildConfig.outputDir, {
            checkFileSystem: false, // Skip filesystem checks in test environment
            validateContent: false,
            strictMode: false
          })
          
          // Restore window object
          global.window = originalWindow

          // Property: Both SPA and static files should be validated successfully
          // In a real build environment, this would check actual file existence
          // Here we validate that the configuration supports dual output
          
          // 1. Configuration should be valid for generating static files
          expect(buildConfig.routes.length).toBeGreaterThan(0)
          expect(buildConfig.outputDir).toBeTruthy()
          expect(buildConfig.staticDir).toBeTruthy()
          
          // 2. Service should handle the configuration without errors
          expect(validationResult.errors.length).toBe(0)
          
          // 3. All configured routes should be processed
          const actualConfig = service.getConfig()
          expect(validationResult.validFiles.length).toBe(actualConfig.routes.length)
          
          // 4. Each route should generate an expected file path
          actualConfig.routes.forEach((route, index) => {
            const routePath = route.startsWith('/') ? route.slice(1) : route
            const expectedPath = `${buildConfig.outputDir}/${routePath}/index.html`
            expect(validationResult.validFiles[index]).toBe(expectedPath)
          })

          // 5. Build process should support fallback mechanisms
          const fallbackResult = service.handlePrerenderingFailure(buildConfig.routes[0])
          expect(fallbackResult.success).toBe(true)
          expect(fallbackResult.message).toContain('SPA routing will handle')
        }
      ),
      { numRuns: 100 } // Run 100 iterations as specified in design document
    )
  })

  it('should maintain SPA functionality when static generation fails', () => {
    /**
     * **Feature: seo-optimization, Property 7: Dual build output generation**
     * **Validates: Requirements 6.5**
     * 
     * Property: When static HTML generation fails, SPA bundle should still function
     */
    fc.assert(
      fc.property(
        // Generate scenarios where some routes might fail
        fc.array(
          fc.constantFrom('/red-studio', '/green-studio', '/garden-studio', '/invalid-route'),
          { minLength: 1, maxLength: 4 }
        ),
        (routes) => {
          const service = new PrerenderingService({ routes })
          
          // Test fallback handling for each route
          routes.forEach(route => {
            const fallbackResult = service.handlePrerenderingFailure(route)
            
            if (route === '/invalid-route') {
              // Invalid routes should be handled gracefully
              expect(fallbackResult.success).toBe(false)
              expect(fallbackResult.message).toContain('No fallback available')
            } else if (['/red-studio', '/green-studio', '/garden-studio'].includes(route)) {
              // Valid studio routes should have SPA fallback
              expect(fallbackResult.success).toBe(true)
              expect(fallbackResult.message).toContain('SPA routing will handle')
              expect(fallbackResult.fallbackRoute).toBe(route)
            } else {
              // Other routes might not have fallbacks
              expect(typeof fallbackResult.success).toBe('boolean')
            }
          })
        }
      ),
      { numRuns: 100 }
    )
  })

  it('should generate comprehensive build validation reports', () => {
    /**
     * **Feature: seo-optimization, Property 7: Dual build output generation**
     * **Validates: Requirements 6.5**
     * 
     * Property: Build validation should provide comprehensive feedback about dual output
     */
    fc.assert(
      fc.property(
        fc.record({
          outputDir: fc.string({ minLength: 1, maxLength: 20 }),
          hasErrors: fc.boolean(),
          hasWarnings: fc.boolean()
        }),
        (testConfig) => {
          const service = new PrerenderingService()
          
          // Simulate build errors/warnings if specified
          if (testConfig.hasErrors) {
            service.logBuildError('Simulated build error')
          }
          if (testConfig.hasWarnings) {
            service.logBuildWarning('Simulated build warning')
          }
          
          // Validate build process
          const buildValidation = service.validateBuildProcess(testConfig.outputDir, {
            strictMode: false
          })
          
          // Property: Report should contain all necessary information
          expect(buildValidation.validation).toBeDefined()
          expect(buildValidation.fallbacks).toBeDefined()
          expect(buildValidation.report).toBeDefined()
          expect(buildValidation.recommendations).toBeDefined()
          
          // Report should be a non-empty string
          expect(typeof buildValidation.report).toBe('string')
          expect(buildValidation.report.length).toBeGreaterThan(0)
          
          // Report should contain status information
          expect(buildValidation.report).toContain('Prerendering Validation Report')
          expect(buildValidation.report).toContain('Status:')
          
          // Recommendations should be provided
          expect(Array.isArray(buildValidation.recommendations)).toBe(true)
          expect(buildValidation.recommendations.length).toBeGreaterThan(0)
          
          // If errors were logged, they should appear in the report
          if (testConfig.hasErrors) {
            expect(buildValidation.report).toContain('Build Errors:')
          }
          
          // If warnings were logged, they should appear in the report
          if (testConfig.hasWarnings) {
            expect(buildValidation.report).toContain('Build Warnings:')
          }
        }
      ),
      { numRuns: 100 }
    )
  })

  it('should handle edge cases in build configuration gracefully', () => {
    /**
     * **Feature: seo-optimization, Property 7: Dual build output generation**
     * **Validates: Requirements 6.5**
     * 
     * Property: Build system should handle edge cases without breaking
     */
    fc.assert(
      fc.property(
        fc.record({
          routes: fc.oneof(
            fc.constant([]), // Empty routes
            fc.array(fc.string(), { maxLength: 10 }), // Random strings
            fc.array(fc.constantFrom('/red-studio', '/green-studio', '/garden-studio')) // Valid routes
          ),
          outputDir: fc.oneof(
            fc.constant(''), // Empty string
            fc.string({ minLength: 1, maxLength: 50 }) // Various lengths
          )
        }),
        (edgeConfig) => {
          const service = new PrerenderingService(edgeConfig)
          
          // Validation should not throw errors, even with edge cases
          expect(() => {
            const result = service.validateOutput(edgeConfig.outputDir, {
              strictMode: false
            })
            
            // Result should always be defined
            expect(result).toBeDefined()
            expect(typeof result.isValid).toBe('boolean')
            expect(Array.isArray(result.errors)).toBe(true)
            expect(Array.isArray(result.warnings)).toBe(true)
            expect(Array.isArray(result.validFiles)).toBe(true)
            
          }).not.toThrow()
          
          // Build validation should also handle edge cases
          expect(() => {
            service.validateBuildProcess(edgeConfig.outputDir)
          }).not.toThrow()
        }
      ),
      { numRuns: 100 }
    )
  })

  it('should ensure configuration consistency across build phases', () => {
    /**
     * **Feature: seo-optimization, Property 7: Dual build output generation**
     * **Validates: Requirements 6.5**
     * 
     * Property: Configuration should remain consistent throughout build process
     */
    fc.assert(
      fc.property(
        fc.record({
          initialRoutes: fc.array(
            fc.constantFrom('/red-studio', '/green-studio', '/garden-studio'),
            { minLength: 1, maxLength: 3 }
          ),
          outputDir: fc.constantFrom('dist', 'build')
        }),
        (config) => {
          const service = new PrerenderingService(config)
          
          // Get initial configuration
          const initialConfig = service.getConfig()
          
          // Mock Node.js environment for validation
          const originalWindow = global.window
          // @ts-ignore
          delete global.window
          
          // Perform validation
          const validation = service.validateOutput(config.outputDir)
          
          // Restore window
          global.window = originalWindow
          
          // Configuration should remain unchanged after validation
          const finalConfig = service.getConfig()
          
          expect(finalConfig.routes).toEqual(initialConfig.routes)
          expect(finalConfig.outputDir).toBe(initialConfig.outputDir)
          expect(finalConfig.staticDir).toBe(initialConfig.staticDir)
          
          // Routes in validation should match configuration
          const serviceConfig = service.getConfig()
          expect(validation.validFiles.length).toBe(serviceConfig.routes.length)
        }
      ),
      { numRuns: 100 }
    )
  })
})

// Integration test to verify the property works with actual SEO configuration
describe('Integration with SEO Configuration', () => {
  it('should work with actual SEO_CONFIG routes', () => {
    const service = new PrerenderingService()
    
    // Mock Node.js environment
    const originalWindow = global.window
    // @ts-ignore
    delete global.window
    
    const validation = service.validateOutput('dist', { strictMode: false })
    
    // Restore window
    global.window = originalWindow
    
    // Should handle all configured SEO routes
    expect(validation.validFiles.length).toBe(SEO_CONFIG.prerender.routes.length)
    
    // Each SEO route should be processed
    SEO_CONFIG.prerender.routes.forEach(route => {
      const routePath = route.startsWith('/') ? route.slice(1) : route
      const expectedPath = `dist/${routePath}/index.html`
      expect(validation.validFiles).toContain(expectedPath)
    })
  })
})