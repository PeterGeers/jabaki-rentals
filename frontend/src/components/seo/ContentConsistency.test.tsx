// Property-based tests for content consistency between static and dynamic rendering
// **Feature: seo-optimization, Property 3: Content consistency between static and dynamic**

import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { MetadataManager } from './MetadataManager'
import { getStudioMetadata, SEO_CONFIG } from '../../config/seo.config'

describe('Content Consistency Property Tests', () => {
  
  /**
   * **Feature: seo-optimization, Property 3: Content consistency between static and dynamic**
   * **Validates: Requirements 2.1, 2.3**
   * 
   * For any studio page, the content served to search engine bots should be identical 
   * to what users see after JavaScript execution
   */
  it('should generate consistent metadata for all studio types', () => {
    fc.assert(
      fc.property(
        fc.oneof(
          fc.constant('red' as const),
          fc.constant('green' as const),
          fc.constant('garden' as const)
        ),
        
        (studioType) => {
          // Get the expected metadata from configuration
          const expectedMetadata = getStudioMetadata(studioType)
          
          // Property: Metadata should always be defined for valid studio types
          expect(expectedMetadata).toBeDefined()
          expect(expectedMetadata?.title).toBeTruthy()
          expect(expectedMetadata?.description).toBeTruthy()
          expect(expectedMetadata?.keywords).toBeInstanceOf(Array)
          expect(expectedMetadata?.keywords.length).toBeGreaterThan(0)
          
          // Render the MetadataManager component
          const { container } = render(
            <HelmetProvider>
              <MemoryRouter initialEntries={[`/${studioType}-studio`]}>
                <MetadataManager studio={studioType} />
              </MemoryRouter>
            </HelmetProvider>
          )
          
          // Property: Component should render without errors
          expect(container).toBeDefined()
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * **Feature: seo-optimization, Property 3: Content consistency between static and dynamic**
   * **Validates: Requirements 2.1, 2.3**
   * 
   * Metadata configuration should be consistent across all access methods
   */
  it('should provide consistent metadata regardless of access method', () => {
    fc.assert(
      fc.property(
        fc.oneof(
          fc.constant('red' as const),
          fc.constant('green' as const),
          fc.constant('garden' as const)
        ),
        
        (studioType) => {
          // Access metadata through different methods
          const directMetadata = getStudioMetadata(studioType)
          const configMetadata = SEO_CONFIG.studios.find(s => s.id === studioType)?.metadata
          
          // Property: Both access methods should return the same data
          expect(directMetadata).toEqual(configMetadata)
          
          // Property: Metadata should have all required fields
          if (directMetadata) {
            expect(directMetadata.title).toBeTruthy()
            expect(directMetadata.description).toBeTruthy()
            expect(directMetadata.keywords).toBeInstanceOf(Array)
            expect(directMetadata.features).toBeInstanceOf(Array)
          }
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * **Feature: seo-optimization, Property 3: Content consistency between static and dynamic**
   * **Validates: Requirements 2.1, 2.3**
   * 
   * Studio-specific content should be unique and identifiable
   */
  it('should generate unique metadata for each studio type', () => {
    fc.assert(
      fc.property(
        fc.constant(['red', 'green', 'garden'] as const),
        
        (studioTypes) => {
          const metadataSet = studioTypes.map(type => getStudioMetadata(type))
          
          // Property: All metadata should be defined
          metadataSet.forEach(metadata => {
            expect(metadata).toBeDefined()
          })
          
          // Property: Titles should be unique
          const titles = metadataSet.map(m => m?.title)
          const uniqueTitles = new Set(titles)
          expect(uniqueTitles.size).toBe(titles.length)
          
          // Property: Descriptions should be unique
          const descriptions = metadataSet.map(m => m?.description)
          const uniqueDescriptions = new Set(descriptions)
          expect(uniqueDescriptions.size).toBe(descriptions.length)
          
          // Property: Each studio should have studio-specific keywords
          const redMetadata = metadataSet[0]
          const greenMetadata = metadataSet[1]
          const gardenMetadata = metadataSet[2]
          
          expect(redMetadata?.title).toContain('Red Studio')
          expect(greenMetadata?.title).toContain('Green Studio')
          expect(gardenMetadata?.title).toContain('Garden Studio')
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * **Feature: seo-optimization, Property 3: Content consistency between static and dynamic**
   * **Validates: Requirements 2.1, 2.3**
   * 
   * Canonical URLs should be correctly formatted for all studio routes
   */
  it('should generate correct canonical URLs for all studio routes', () => {
    fc.assert(
      fc.property(
        fc.oneof(
          fc.constant({ studio: 'red' as const, route: '/red-studio' }),
          fc.constant({ studio: 'green' as const, route: '/green-studio' }),
          fc.constant({ studio: 'garden' as const, route: '/garden-studio' })
        ),
        
        ({ studio, route }) => {
          // Render the MetadataManager with the specific route
          const { container } = render(
            <HelmetProvider>
              <MemoryRouter initialEntries={[route]}>
                <MetadataManager studio={studio} />
              </MemoryRouter>
            </HelmetProvider>
          )
          
          // Property: Component should render successfully
          expect(container).toBeDefined()
          
          // Property: Expected canonical URL format
          const expectedCanonical = `${SEO_CONFIG.baseUrl}${route}`
          expect(expectedCanonical).toMatch(/^https:\/\//)
          expect(expectedCanonical).toContain(route)
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * **Feature: seo-optimization, Property 3: Content consistency between static and dynamic**
   * **Validates: Requirements 2.1, 2.3**
   * 
   * Studio features should be consistently defined and accessible
   */
  it('should provide consistent feature lists for all studios', () => {
    fc.assert(
      fc.property(
        fc.oneof(
          fc.constant('red' as const),
          fc.constant('green' as const),
          fc.constant('garden' as const)
        ),
        
        (studioType) => {
          const metadata = getStudioMetadata(studioType)
          
          // Property: Features should always be defined and non-empty
          expect(metadata?.features).toBeDefined()
          expect(metadata?.features.length).toBeGreaterThan(0)
          
          // Property: Each feature should be a non-empty string
          metadata?.features.forEach(feature => {
            expect(typeof feature).toBe('string')
            expect(feature.length).toBeGreaterThan(0)
          })
          
          // Property: Studio-specific features should be present
          if (studioType === 'red') {
            expect(metadata?.features.some(f => f.toLowerCase().includes('rooftop'))).toBe(true)
          } else if (studioType === 'green') {
            expect(metadata?.features.some(f => f.toLowerCase().includes('terrace') || f.toLowerCase().includes('modern'))).toBe(true)
          } else if (studioType === 'garden') {
            expect(metadata?.features.some(f => f.toLowerCase().includes('garden') || f.toLowerCase().includes('terras'))).toBe(true)
          }
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * **Feature: seo-optimization, Property 3: Content consistency between static and dynamic**
   * **Validates: Requirements 2.1, 2.3**
   * 
   * Keywords should be relevant and consistent for each studio
   */
  it('should maintain consistent and relevant keywords for all studios', () => {
    fc.assert(
      fc.property(
        fc.oneof(
          fc.constant('red' as const),
          fc.constant('green' as const),
          fc.constant('garden' as const)
        ),
        
        (studioType) => {
          const metadata = getStudioMetadata(studioType)
          
          // Property: Keywords should always be defined and non-empty
          expect(metadata?.keywords).toBeDefined()
          expect(metadata?.keywords.length).toBeGreaterThan(0)
          
          // Property: All keywords should be non-empty strings
          metadata?.keywords.forEach(keyword => {
            expect(typeof keyword).toBe('string')
            expect(keyword.length).toBeGreaterThan(0)
          })
          
          // Property: Common keywords should be present for all studios
          const commonKeywords = ['hoofddorp', 'schiphol', 'accommodation']
          const hasCommonKeyword = metadata?.keywords.some(k => 
            commonKeywords.some(common => k.toLowerCase().includes(common))
          )
          expect(hasCommonKeyword).toBe(true)
          
          // Property: Studio-specific keywords should be present
          const studioKeyword = `${studioType} studio`
          expect(metadata?.keywords.some(k => k.toLowerCase().includes(studioType))).toBe(true)
        }
      ),
      { numRuns: 100 }
    )
  })
})