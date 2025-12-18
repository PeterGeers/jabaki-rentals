#!/usr/bin/env node

// Build validation script for prerendered files
// This script runs after the build to validate that all static HTML files were generated correctly

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Studio routes that should be prerendered
const STUDIO_ROUTES = ['/red-studio', '/green-studio', '/garden-studio']

class PrerenderValidator {
  constructor(outputDir) {
    this.outputDir = outputDir
  }

  validateOutput() {
    const result = {
      isValid: true,
      missingFiles: [],
      validFiles: [],
      errors: []
    }

    try {
      // Check if output directory exists
      if (!fs.existsSync(this.outputDir)) {
        result.isValid = false
        result.errors.push(`Output directory does not exist: ${this.outputDir}`)
        return result
      }

      // Validate each route has a corresponding static HTML file
      for (const route of STUDIO_ROUTES) {
        const routePath = route.startsWith('/') ? route.slice(1) : route
        const expectedFilePath = path.join(this.outputDir, routePath, 'index.html')
        
        if (fs.existsSync(expectedFilePath)) {
          // Validate file content
          const content = fs.readFileSync(expectedFilePath, 'utf-8')
          
          if (this.validateHTMLContent(content, route)) {
            result.validFiles.push(expectedFilePath)
          } else {
            result.isValid = false
            result.errors.push(`Invalid HTML content in ${expectedFilePath}`)
          }
        } else {
          result.isValid = false
          result.missingFiles.push(expectedFilePath)
        }
      }

      // Check main index.html exists
      const mainIndexPath = path.join(this.outputDir, 'index.html')
      if (fs.existsSync(mainIndexPath)) {
        result.validFiles.push(mainIndexPath)
      } else {
        result.isValid = false
        result.missingFiles.push(mainIndexPath)
      }

    } catch (error) {
      result.isValid = false
      result.errors.push(`Validation error: ${error.message}`)
    }

    return result
  }

  validateHTMLContent(content, route) {
    // Check for basic HTML structure
    if (!content.includes('<!DOCTYPE html>') || !content.includes('<html')) {
      return false
    }

    // Check for required head elements - title is always present
    if (!content.includes('<title>')) {
      return false
    }

    // Check for studio-specific content based on route (main validation)
    if (route.includes('red-studio')) {
      return content.includes('Red Studio Hoofddorp') && content.includes('rooftop terrace')
    } else if (route.includes('green-studio')) {
      return content.includes('Green Studio Hoofddorp') && content.includes('scenic views')
    } else if (route.includes('garden-studio')) {
      return content.includes('Garden Studio Hoofddorp') && content.includes('privé terras')
    }

    return true
  }

  generateReport(validationResult) {
    const lines = []
    
    lines.push('=== Prerendering Validation Report ===')
    lines.push(`Status: ${validationResult.isValid ? 'PASSED' : 'FAILED'}`)
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

    if (validationResult.errors.length > 0) {
      lines.push('✗ Errors:')
      validationResult.errors.forEach(error => {
        lines.push(`  - ${error}`)
      })
      lines.push('')
    }

    lines.push(`Total Routes: ${STUDIO_ROUTES.length}`)
    lines.push(`Valid Files: ${validationResult.validFiles.length}`)
    lines.push(`Missing Files: ${validationResult.missingFiles.length}`)
    lines.push(`Errors: ${validationResult.errors.length}`)

    return lines.join('\n')
  }
}

async function validateBuild() {
  console.log('🔍 Validating prerendered files...')
  
  const outputPath = path.join(__dirname, '..', 'dist')
  const validator = new PrerenderValidator(outputPath)
  
  try {
    const result = validator.validateOutput()
    const report = validator.generateReport(result)
    
    console.log(report)
    
    if (result.isValid) {
      console.log('✅ Prerendering validation passed!')
      process.exit(0)
    } else {
      console.log('❌ Prerendering validation failed!')
      process.exit(1)
    }
  } catch (error) {
    console.error('❌ Validation script error:', error.message)
    process.exit(1)
  }
}

// Run validation if this script is executed directly
validateBuild()

export { PrerenderValidator, validateBuild }