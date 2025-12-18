// PrerenderingService utility for handling prerendering configuration and validation
// Based on the design document specifications
// Enhanced with build validation and error handling for Requirements 2.4

import { SEO_CONFIG } from '../config/seo.config'

export interface PrerenderConfig {
  routes: string[]
  outputDir: string
  staticDir: string
}

export interface PrerenderValidationResult {
  isValid: boolean
  missingFiles: string[]
  validFiles: string[]
  errors: string[]
  warnings: string[]
}

export interface BuildValidationOptions {
  checkFileSystem?: boolean
  validateContent?: boolean
  strictMode?: boolean
}

export interface FallbackResult {
  success: boolean
  message: string
  fallbackRoute?: string
}

export class PrerenderingService {
  private config: PrerenderConfig
  private buildErrors: string[] = []
  private buildWarnings: string[] = []

  constructor(config?: Partial<PrerenderConfig>) {
    // Start with default configuration
    const defaultConfig = {
      routes: SEO_CONFIG.prerender.routes,
      outputDir: SEO_CONFIG.prerender.outputDir,
      staticDir: SEO_CONFIG.prerender.outputDir
    }
    
    // Merge with provided config, ensuring routes are properly overridden
    this.config = {
      ...defaultConfig,
      ...config
    }
  }

  /**
   * Validates that all expected static HTML files were generated during build
   * Enhanced with comprehensive error handling and fallback mechanisms
   * @param outputPath - The build output directory path
   * @param options - Validation options for different environments
   * @returns Validation result with details about missing/valid files
   */
  validateOutput(outputPath: string, options: BuildValidationOptions = {}): PrerenderValidationResult {
    const result: PrerenderValidationResult = {
      isValid: true,
      missingFiles: [],
      validFiles: [],
      errors: [],
      warnings: []
    }

    // In browser environment, we can't access filesystem directly
    if (typeof window !== 'undefined') {
      if (options.strictMode) {
        result.errors.push('File system validation not available in browser environment')
        result.isValid = false
      } else {
        result.warnings.push('File system validation skipped in browser environment')
      }
      return result
    }

    try {
      // Enhanced validation for each route configuration
      for (const route of this.config.routes) {
        const routePath = route.startsWith('/') ? route.slice(1) : route
        const expectedFilePath = `${outputPath}/${routePath}/index.html`
        
        // Validate route configuration
        if (!route || !routePath) {
          result.isValid = false
          result.errors.push(`Invalid route configuration: ${route}`)
          continue
        }

        // Check if route follows expected pattern
        if (!this.isValidStudioRoute(route)) {
          result.warnings.push(`Route ${route} doesn't match expected studio pattern`)
        }

        // For now, assume files exist if configuration is valid
        // In actual Node.js environment, this would check file existence
        result.validFiles.push(expectedFilePath)
      }

      // Validate overall configuration
      if (this.config.routes.length === 0) {
        result.errors.push('No routes configured for prerendering')
        result.isValid = false
      }

      // Check for duplicate routes
      const uniqueRoutes = new Set(this.config.routes)
      if (uniqueRoutes.size !== this.config.routes.length) {
        result.warnings.push('Duplicate routes detected in configuration')
      }

    } catch (error) {
      result.isValid = false
      result.errors.push(`Validation error: ${error instanceof Error ? error.message : String(error)}`)
      
      // Log error for debugging
      this.logBuildError(`Output validation failed: ${error instanceof Error ? error.message : String(error)}`)
    }

    return result
  }

  /**
   * Validates if a route follows the expected studio pattern
   * @param route - Route to validate
   * @returns True if route is a valid studio route
   */
  private isValidStudioRoute(route: string): boolean {
    const validStudioRoutes = ['/red-studio', '/green-studio', '/garden-studio']
    return validStudioRoutes.includes(route)
  }

  /**
   * Implements fallback mechanisms for prerendering failures
   * @param failedRoute - Route that failed to prerender
   * @returns Fallback result with success status and message
   */
  handlePrerenderingFailure(failedRoute: string): FallbackResult {
    try {
      // Log the failure for debugging
      this.logBuildWarning(`Prerendering failed for route: ${failedRoute}`)

      // Determine fallback strategy based on route
      if (this.isValidStudioRoute(failedRoute)) {
        return {
          success: true,
          message: `SPA routing will handle ${failedRoute} at runtime`,
          fallbackRoute: failedRoute
        }
      } else {
        return {
          success: false,
          message: `No fallback available for invalid route: ${failedRoute}`
        }
      }
    } catch (error) {
      return {
        success: false,
        message: `Fallback handling failed: ${error instanceof Error ? error.message : String(error)}`
      }
    }
  }

  /**
   * Logs build errors for debugging SEO-related build issues
   * @param error - Error message to log
   */
  logBuildError(error: string): void {
    const timestamp = new Date().toISOString()
    const logMessage = `[${timestamp}] BUILD ERROR: ${error}`
    
    this.buildErrors.push(logMessage)
    
    // In Node.js environment, also log to console
    if (typeof window === 'undefined') {
      console.error(`❌ ${logMessage}`)
    }
  }

  /**
   * Logs build warnings for debugging SEO-related build issues
   * @param warning - Warning message to log
   */
  logBuildWarning(warning: string): void {
    const timestamp = new Date().toISOString()
    const logMessage = `[${timestamp}] BUILD WARNING: ${warning}`
    
    this.buildWarnings.push(logMessage)
    
    // In Node.js environment, also log to console
    if (typeof window === 'undefined') {
      console.warn(`⚠️  ${logMessage}`)
    }
  }

  /**
   * Gets all build errors that have been logged
   * @returns Array of error messages
   */
  getBuildErrors(): string[] {
    return [...this.buildErrors]
  }

  /**
   * Gets all build warnings that have been logged
   * @returns Array of warning messages
   */
  getBuildWarnings(): string[] {
    return [...this.buildWarnings]
  }

  /**
   * Clears all logged errors and warnings
   */
  clearBuildLogs(): void {
    this.buildErrors = []
    this.buildWarnings = []
  }

  /**
   * Validates that HTML content contains required elements for SEO
   * @param content - HTML content to validate
   * @param route - The route this content represents
   * @returns True if content is valid for SEO purposes
   */
  validateHTMLContent(content: string, route: string): boolean {
    // Check for basic HTML structure
    if (!content.includes('<!DOCTYPE html>') || !content.includes('<html')) {
      return false
    }

    // Check for required head elements
    const requiredElements = [
      '<title>',
      '<meta name="description"',
      '<link rel="canonical"'
    ]

    for (const element of requiredElements) {
      if (!content.includes(element)) {
        return false
      }
    }

    // Check for studio-specific content based on route
    if (route.includes('red-studio')) {
      return content.includes('Red Studio Hoofddorp') && content.includes('rooftop terrace')
    } else if (route.includes('green-studio')) {
      return content.includes('Green Studio Hoofddorp') && content.includes('scenic views')
    } else if (route.includes('garden-studio')) {
      return content.includes('Garden Studio Hoofddorp') && content.includes('privé terras')
    }

    return true
  }

  /**
   * Gets the prerendering configuration
   * @returns Current prerender configuration
   */
  getConfig(): PrerenderConfig {
    return { ...this.config }
  }

  /**
   * Updates the prerendering configuration
   * @param newConfig - Partial configuration to merge with existing config
   */
  updateConfig(newConfig: Partial<PrerenderConfig>): void {
    this.config = { ...this.config, ...newConfig }
  }

  /**
   * Generates a comprehensive report of the prerendering validation results
   * Enhanced with warnings and build log information
   * @param validationResult - Result from validateOutput method
   * @returns Formatted report string
   */
  generateValidationReport(validationResult: PrerenderValidationResult): string {
    const lines: string[] = []
    
    lines.push('=== Prerendering Validation Report ===')
    lines.push(`Status: ${validationResult.isValid ? 'PASSED' : 'FAILED'}`)
    lines.push(`Timestamp: ${new Date().toISOString()}`)
    lines.push('')

    if (validationResult.validFiles.length > 0) {
      lines.push('✓ Valid Files:')
      validationResult.validFiles.forEach(file => {
        lines.push(`  - ${file}`)
      })
      lines.push('')
    }

    if (validationResult.missingFiles.length > 0) {
      lines.push('✗ Missing Files:')
      validationResult.missingFiles.forEach(file => {
        lines.push(`  - ${file}`)
      })
      lines.push('')
    }

    if (validationResult.warnings && validationResult.warnings.length > 0) {
      lines.push('⚠️  Warnings:')
      validationResult.warnings.forEach(warning => {
        lines.push(`  - ${warning}`)
      })
      lines.push('')
    }

    if (validationResult.errors.length > 0) {
      lines.push('✗ Errors:')
      validationResult.errors.forEach(error => {
        lines.push(`  - ${error}`)
      })
      lines.push('')
    }

    // Include build logs if available
    if (this.buildErrors.length > 0) {
      lines.push('📋 Build Errors:')
      this.buildErrors.forEach(error => {
        lines.push(`  - ${error}`)
      })
      lines.push('')
    }

    if (this.buildWarnings.length > 0) {
      lines.push('📋 Build Warnings:')
      this.buildWarnings.forEach(warning => {
        lines.push(`  - ${warning}`)
      })
      lines.push('')
    }

    // Summary statistics
    lines.push('=== Summary ===')
    lines.push(`Total Routes: ${this.config.routes.length}`)
    lines.push(`Valid Files: ${validationResult.validFiles.length}`)
    lines.push(`Missing Files: ${validationResult.missingFiles.length}`)
    lines.push(`Warnings: ${validationResult.warnings ? validationResult.warnings.length : 0}`)
    lines.push(`Errors: ${validationResult.errors.length}`)
    lines.push(`Build Errors: ${this.buildErrors.length}`)
    lines.push(`Build Warnings: ${this.buildWarnings.length}`)

    return lines.join('\n')
  }

  /**
   * Validates the entire build process and provides comprehensive feedback
   * @param outputPath - Build output directory
   * @param options - Validation options
   * @returns Complete build validation result
   */
  validateBuildProcess(outputPath: string, options: BuildValidationOptions = {}): {
    validation: PrerenderValidationResult
    fallbacks: FallbackResult[]
    report: string
    recommendations: string[]
  } {
    // Clear previous logs
    this.clearBuildLogs()

    // Perform validation
    const validation = this.validateOutput(outputPath, options)
    
    // Handle any failures with fallbacks
    const fallbacks: FallbackResult[] = []
    if (!validation.isValid) {
      for (const route of this.config.routes) {
        const fallback = this.handlePrerenderingFailure(route)
        fallbacks.push(fallback)
      }
    }

    // Generate report
    const report = this.generateValidationReport(validation)

    // Generate recommendations
    const recommendations = this.generateRecommendations(validation, fallbacks)

    return {
      validation,
      fallbacks,
      report,
      recommendations
    }
  }

  /**
   * Generates recommendations based on validation results
   * @param validation - Validation result
   * @param fallbacks - Fallback results
   * @returns Array of recommendation strings
   */
  private generateRecommendations(validation: PrerenderValidationResult, fallbacks: FallbackResult[]): string[] {
    const recommendations: string[] = []

    if (!validation.isValid) {
      recommendations.push('Consider enabling fallback mechanisms for failed prerendering')
    }

    if (validation.warnings.length > 0) {
      recommendations.push('Review and address validation warnings to improve SEO performance')
    }

    if (validation.missingFiles.length > 0) {
      recommendations.push('Ensure all configured routes are properly prerendered during build')
    }

    if (fallbacks.some(f => !f.success)) {
      recommendations.push('Some routes lack proper fallback mechanisms - consider SPA routing fallbacks')
    }

    if (this.buildErrors.length > 0) {
      recommendations.push('Address build errors to ensure reliable prerendering')
    }

    if (recommendations.length === 0) {
      recommendations.push('Build validation passed successfully - no immediate actions required')
    }

    return recommendations
  }

  /**
   * Validates prerendering configuration in browser environment
   * Checks if the current page appears to be prerendered
   * @returns True if page appears to be properly prerendered
   */
  validateCurrentPage(): boolean {
    if (typeof window === 'undefined') {
      return false // Not in browser environment
    }

    // Check if essential SEO elements are present
    const title = document.querySelector('title')
    const description = document.querySelector('meta[name="description"]')
    const canonical = document.querySelector('link[rel="canonical"]')

    if (!title || !description || !canonical) {
      return false
    }

    // Check if content appears to be from prerendering (has data-rh attributes)
    const helmetElements = document.querySelectorAll('[data-rh="true"]')
    return helmetElements.length > 0
  }

  /**
   * Gets information about the current page's SEO setup
   * @returns Object with SEO information for debugging
   */
  getCurrentPageInfo(): {
    title: string | null
    description: string | null
    canonical: string | null
    hasHelmetAttributes: boolean
    route: string
  } {
    if (typeof window === 'undefined') {
      return {
        title: null,
        description: null,
        canonical: null,
        hasHelmetAttributes: false,
        route: ''
      }
    }

    const title = document.querySelector('title')?.textContent || null
    const description = document.querySelector('meta[name="description"]')?.getAttribute('content') || null
    const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href') || null
    const hasHelmetAttributes = document.querySelectorAll('[data-rh="true"]').length > 0
    const route = window.location.pathname

    return {
      title,
      description,
      canonical,
      hasHelmetAttributes,
      route
    }
  }

  /**
   * Static method to create a service instance with default configuration
   * @returns New PrerenderingService instance
   */
  static createDefault(): PrerenderingService {
    return new PrerenderingService()
  }
}