# Implementation Plan

- [x] 1. Set up SEO dependencies and configuration

  - Install react-helmet-async, vite-plugin-prerender, and fast-check packages
  - Create SEO configuration file with studio metadata definitions
  - Configure Vite build process to include prerendering plugin
  - _Requirements: 1.1, 2.2, 6.5_

- [x] 2. Implement metadata management system

- [x] 2.1 Create MetadataManager component with react-helmet-async

  - Build reusable component that accepts studio type and renders appropriate metadata
  - Implement studio-specific title and description logic
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_

- [x] 2.2 Write property test for metadata uniqueness

  - **Property 1: Unique metadata per studio**
  - **Validates: Requirements 1.1, 1.5**

- [x] 2.3 Create studio configuration data structure

  - Define TypeScript interfaces for StudioConfig and SEOConfig
  - Implement configuration object with all three studios' metadata
  - _Requirements: 1.2, 1.3, 1.4, 1.6_

- [x] 2.4 Write unit tests for specific studio metadata

  - Test exact title formats for Red, Green, and Garden studios
  - Verify Garden Studio includes "Privé Terras nabij Schiphol" and outdoor keywords
  - _Requirements: 1.2, 1.3, 1.4, 1.6_

- [x] 3. Implement canonical URL system

- [x] 3.1 Add canonical link generation to MetadataManager

  - Implement canonical URL logic that points to current page URL
  - Integrate with React Router to get current route
  - _Requirements: 3.4, 4.1, 4.2_

- [x] 3.2 Write property test for canonical URL correctness

  - **Property 4: Canonical URL correctness**
  - **Validates: Requirements 3.4, 4.1, 4.2**

- [x] 3.3 Write unit tests for studio route accessibility

  - Test that /red-studio, /green-studio, and /garden-studio routes serve content
  - _Requirements: 3.1, 3.2, 3.3_

- [x] 4. Set up prerendering for static HTML generation

- [x] 4.1 Configure vite-plugin-prerender for studio routes

  - Set up prerendering configuration for all three studio paths
  - Configure output directory and static file generation
  - _Requirements: 2.1, 2.2, 2.3, 2.5_

- [x] 4.2 Implement PrerenderingService utility

  - Create service class to handle prerendering configuration and validation
  - Add build-time validation for generated static files
  - _Requirements: 2.2, 2.5_

- [x] 4.3 Write property test for static HTML generation completeness

  - **Property 2: Static HTML generation completeness**
  - **Validates: Requirements 2.2, 2.5**

- [x] 4.4 Write property test for content consistency

  - **Property 3: Content consistency between static and dynamic**
  - **Validates: Requirements 2.1, 2.3**

- [x] 5. Checkpoint - Ensure all tests pass

  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Implement sitemap generation

- [x] 6.1 Create SitemapGenerator utility class

  - Build XML sitemap generator with proper protocol compliance
  - Include all studio URLs with lastmod dates and priority values
  - _Requirements: 5.1, 5.2, 5.3, 5.5_

- [x] 6.2 Integrate sitemap generation into build process

  - Add sitemap generation to Vite build configuration
  - Ensure sitemap.xml is created in public directory during build
  - _Requirements: 5.1, 5.2_

- [x] 6.3 Write property test for sitemap completeness and validity

  - **Property 5: Sitemap completeness and validity**
  - **Validates: Requirements 5.1, 5.2, 5.3, 5.5**

- [x] 6.4 Write unit tests for sitemap XML structure

  - Test that generated sitemap contains all three studio URLs
  - Verify XML format compliance with sitemap protocol
  - _Requirements: 5.2, 5.3, 5.5_

- [ ] 7. Integrate SEO components with existing React Router

- [x] 7.1 Update studio route components to use MetadataManager

  - Modify Red, Green, and Garden studio components to include metadata
  - Ensure metadata updates happen on route changes
  - _Requirements: 6.1, 6.2, 6.3_

- [x] 7.2 Configure React Router for SEO-friendly URLs

  - Verify existing routes work with new SEO enhancements
  - Ensure client-side routing precedence for user interactions
  - _Requirements: 6.1, 6.2_

- [x] 7.3 Write property test for SPA navigation preservation

  - **Property 6: SPA navigation preservation**
  - **Validates: Requirements 6.1, 6.2, 6.3**

- [x] 8. Implement build process enhancements

- [x] 8.1 Update Vite configuration for dual output generation

  - Configure build to generate both SPA bundle and static HTML files
  - Add error handling for prerendering failures
  - _Requirements: 6.5, 2.4_

- [x] 8.2 Add build validation and error handling

  - Implement fallback mechanisms for prerendering failures
  - Add logging for debugging SEO-related build issues
  - _Requirements: 2.4_

- [x] 8.3 Write property test for dual build output generation

  - **Property 7: Dual build output generation**
  - **Validates: Requirements 6.5**

- [x] 8.4 Write integration tests for complete SEO workflow

  - Test end-to-end SEO functionality from build to deployment
  - Verify both user and bot experiences work correctly
  - _Requirements: All requirements_

- [x] 9. Final checkpoint - Ensure all tests pass

  - Ensure all tests pass, ask the user if questions arise.
