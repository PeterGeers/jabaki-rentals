#!/usr/bin/env node

/**
 * Build validation script for SEO optimization
 * Validates that both SPA bundle and static HTML files are properly generated
 * Requirements: 2.4 - Build validation and error handling
 */

import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { existsSync, readFileSync, readdirSync, statSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Configuration
const BUILD_DIR = join(__dirname, '..', 'dist')
const EXPECTED_ROUTES = ['/red-studio', '/green-studio', '/garden-studio']
const REQUIRED_SPA_FILES = ['index.html', 'assets']

class BuildValidator {
  constructor() {
    this.errors = []
    this.warnings = []
    this.validFiles = []
  }

  /**
   * Main validation function
   */
  async validate() {
    console.log('🔍 Starting build validation...')
    console.log(`📁 Build directory: ${BUILD_DIR}`)

    // Check if build directory exists
    if (!existsSync(BUILD_DIR)) {
      this.errors.push('Build directory does not exist')
      return this.generateReport()
    }

    // Validate SPA files
    this.validateSPAFiles()

    // Validate prerendered files
    this.validatePrerenderFiles()

    // Validate file contents
    await this.validateFileContents()

    return this.generateReport()
  }

  /**
   * Validates that SPA files are present
   */
  validateSPAFiles() {
    console.log('📦 Validating SPA bundle files...')

    for (const file of REQUIRED_SPA_FILES) {
      const filePath = join(BUILD_DIR, file)
      if (existsSync(filePath)) {
        this.validFiles.push(filePath)
        console.log(`✅ Found: ${file}`)
      } else {
        this.errors.push(`Missing SPA file: ${file}`)
        console.log(`❌ Missing: ${file}`)
      }
    }

    // Check for main index.html
    const mainIndex = join(BUILD_DIR, 'index.html')
    if (existsSync(mainIndex)) {
      const content = readFileSync(mainIndex, 'utf-8')
      if (content.includes('<div id="root">')) {
        console.log('✅ Main index.html contains React root element')
      } else {
        this.warnings.push('Main index.html may not be properly configured for React')
      }
    }
  }

  /**
   * Validates that prerendered HTML files are present
   */
  validatePrerenderFiles() {
    console.log('🏗️  Validating prerendered files...')

    for (const route of EXPECTED_ROUTES) {
      const routePath = route.startsWith('/') ? route.slice(1) : route
      const htmlFile = join(BUILD_DIR, routePath, 'index.html')
      
      if (existsSync(htmlFile)) {
        this.validFiles.push(htmlFile)
        console.log(`✅ Found prerendered: ${route}`)
      } else {
        // Check if route directory exists but no index.html
        const routeDir = join(BUILD_DIR, routePath)
        if (existsSync(routeDir)) {
          this.warnings.push(`Route directory exists but no index.html: ${route}`)
        } else {
          this.warnings.push(`No prerendered files for route: ${route} (will fallback to SPA)`)
        }
      }
    }
  }

  /**
   * Validates the content of HTML files for SEO requirements
   */
  async validateFileContents() {
    console.log('📄 Validating HTML content...')

    // Validate main SPA file
    const mainIndex = join(BUILD_DIR, 'index.html')
    if (existsSync(mainIndex)) {
      this.validateHTMLContent(mainIndex, 'main')
    }

    // Validate prerendered files
    for (const route of EXPECTED_ROUTES) {
      const routePath = route.startsWith('/') ? route.slice(1) : route
      const htmlFile = join(BUILD_DIR, routePath, 'index.html')
      
      if (existsSync(htmlFile)) {
        this.validateHTMLContent(htmlFile, route)
      }
    }
  }

  /**
   * Validates individual HTML file content
   */
  validateHTMLContent(filePath, route) {
    try {
      const content = readFileSync(filePath, 'utf-8')
      
      // Check for basic HTML structure
      if (!content.includes('<!DOCTYPE html>')) {
        this.warnings.push(`${route}: Missing DOCTYPE declaration`)
      }

      // Check for required SEO elements
      const requiredElements = [
        { element: '<title>', name: 'title' },
        { element: 'meta name="description"', name: 'description' },
        { element: 'rel="canonical"', name: 'canonical link' }
      ]

      for (const { element, name } of requiredElements) {
        if (content.includes(element)) {
          console.log(`✅ ${route}: Has ${name}`)
        } else {
          if (route === 'main') {
            // Main SPA file might not have all SEO elements (they're added dynamically)
            this.warnings.push(`${route}: Missing ${name} (may be added dynamically)`)
          } else {
            this.errors.push(`${route}: Missing required ${name}`)
          }
        }
      }

      // Check for studio-specific content in prerendered files
      if (route !== 'main') {
        this.validateStudioContent(content, route)
      }

    } catch (error) {
      this.errors.push(`Failed to read ${filePath}: ${error.message}`)
    }
  }

  /**
   * Validates studio-specific content
   */
  validateStudioContent(content, route) {
    const studioChecks = {
      '/red-studio': ['Red Studio', 'rooftop terrace'],
      '/green-studio': ['Green Studio', 'scenic views'],
      '/garden-studio': ['Garden Studio', 'privé terras']
    }

    const expectedContent = studioChecks[route]
    if (expectedContent) {
      for (const text of expectedContent) {
        if (content.includes(text)) {
          console.log(`✅ ${route}: Contains "${text}"`)
        } else {
          this.warnings.push(`${route}: Missing expected content "${text}"`)
        }
      }
    }
  }

  /**
   * Generates validation report
   */
  generateReport() {
    const report = {
      success: this.errors.length === 0,
      errors: this.errors,
      warnings: this.warnings,
      validFiles: this.validFiles,
      summary: {
        totalFiles: this.validFiles.length,
        errorCount: this.errors.length,
        warningCount: this.warnings.length
      }
    }

    console.log('\n=== Build Validation Report ===')
    console.log(`Status: ${report.success ? '✅ PASSED' : '❌ FAILED'}`)
    console.log(`Valid Files: ${report.summary.totalFiles}`)
    console.log(`Errors: ${report.summary.errorCount}`)
    console.log(`Warnings: ${report.summary.warningCount}`)

    if (this.errors.length > 0) {
      console.log('\n❌ Errors:')
      this.errors.forEach(error => console.log(`  - ${error}`))
    }

    if (this.warnings.length > 0) {
      console.log('\n⚠️  Warnings:')
      this.warnings.forEach(warning => console.log(`  - ${warning}`))
    }

    if (report.success) {
      console.log('\n🎉 Build validation completed successfully!')
      console.log('Both SPA bundle and prerendered files are properly generated.')
    } else {
      console.log('\n💥 Build validation failed!')
      console.log('Please address the errors above before deploying.')
    }

    return report
  }
}

// Run validation if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const validator = new BuildValidator()
  validator.validate()
    .then(report => {
      process.exit(report.success ? 0 : 1)
    })
    .catch(error => {
      console.error('❌ Validation script failed:', error)
      process.exit(1)
    })
}

export { BuildValidator }