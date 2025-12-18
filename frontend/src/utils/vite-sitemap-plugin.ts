// Vite plugin for sitemap generation during build process
// Integrates SitemapGenerator with Vite build pipeline

import type { Plugin } from 'vite'
import { writeFileSync, mkdirSync } from 'fs'
import { dirname, join } from 'path'
import { SitemapGeneratorImpl, type SitemapEntry } from './SitemapGenerator'
import { SEO_CONFIG } from '../config/seo.config'

export interface SitemapPluginOptions {
  baseUrl: string
  outputPath: string
  entries: SitemapEntry[]
}

/**
 * Vite plugin that generates sitemap.xml during build process
 * Ensures sitemap is created in the public directory
 */
export function sitemapPlugin(options?: Partial<SitemapPluginOptions>): Plugin {
  const config = {
    baseUrl: options?.baseUrl || SEO_CONFIG.baseUrl,
    outputPath: options?.outputPath || 'sitemap.xml',
    entries: options?.entries || SitemapGeneratorImpl.createEntriesFromStudios(SEO_CONFIG.studios)
  }

  return {
    name: 'vite-sitemap-generator',
    apply: 'build', // Only run during build, not dev
    
    // Generate sitemap after build is complete
    writeBundle(outputOptions) {
      try {
        const generator = new SitemapGeneratorImpl(config.baseUrl)
        const sitemapContent = generator.generateSitemap(config.entries)
        
        // Determine output directory
        const outDir = outputOptions.dir || 'dist'
        const sitemapPath = join(outDir, config.outputPath)
        
        // Ensure directory exists
        mkdirSync(dirname(sitemapPath), { recursive: true })
        
        // Write sitemap file
        writeFileSync(sitemapPath, sitemapContent, 'utf-8')
        
        console.log(`✓ Sitemap generated: ${sitemapPath}`)
        console.log(`  - ${config.entries.length} URLs included`)
        console.log(`  - Base URL: ${config.baseUrl}`)
        
      } catch (error) {
        console.error('Failed to generate sitemap:', error)
        // Don't fail the build if sitemap generation fails
        // This provides graceful degradation as specified in error handling
      }
    }
  }
}

/**
 * Helper function to create sitemap plugin with default SEO config
 */
export function createSitemapPlugin(): Plugin {
  return sitemapPlugin({
    baseUrl: SEO_CONFIG.baseUrl,
    outputPath: SEO_CONFIG.sitemap.outputPath.startsWith('/') 
      ? SEO_CONFIG.sitemap.outputPath.slice(1) 
      : SEO_CONFIG.sitemap.outputPath,
    entries: SitemapGeneratorImpl.createEntriesFromStudios(SEO_CONFIG.studios)
  })
}