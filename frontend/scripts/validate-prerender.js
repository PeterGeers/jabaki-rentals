#!/usr/bin/env node

// Build validation script for prerendered files
// This script runs after the build to validate that all static HTML files were generated correctly

const { PrerenderingService } = require('../dist/utils/PrerenderingService.js')
const path = require('path')

async function validateBuild() {
  console.log('🔍 Validating prerendered files...')
  
  const service = PrerenderingService.createDefault()
  const outputPath = path.join(__dirname, '..', 'dist')
  
  try {
    const result = await service.validateOutput(outputPath)
    const report = service.generateValidationReport(result)
    
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
if (require.main === module) {
  validateBuild()
}

module.exports = { validateBuild }