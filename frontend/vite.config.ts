import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import prerender from '@prerenderer/rollup-plugin'
import { SEO_CONFIG } from './src/config/seo.config'
import { createSitemapPlugin } from './src/utils/vite-sitemap-plugin'

export default defineConfig({
  plugins: [
    react(),
    // Sitemap generation plugin for SEO
    createSitemapPlugin(),
    // Prerendering plugin for static HTML generation with enhanced error handling
    prerender({
      routes: SEO_CONFIG.prerender.routes,
      renderer: '@prerenderer/renderer-puppeteer',
      rendererOptions: {
        // Wait for content to load before capturing - increased for React Helmet
        renderAfterTime: 3000,
        // Wait for React Helmet to update the document head
        renderAfterDocumentEvent: 'prerender-ready',
        // Ensure all async content is loaded
        renderAfterElementExists: 'h1',
        // Headless mode for CI/CD compatibility
        headless: true,
        // Viewport settings for consistent rendering
        viewport: {
          width: 1280,
          height: 720
        },
        // Additional options for better reliability
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        // Enhanced error handling for prerendering failures
        handleRequestError: (error: Error, route: string) => {
          console.warn(`⚠️  Prerendering failed for route ${route}:`, error.message)
          console.log(`📝 Fallback: SPA routing will handle ${route} at runtime`)
          // Return null to skip this route instead of failing the entire build
          return null
        }
      },
      // Enhanced post-processing with error handling
      postProcess: (renderedRoute: any) => {
        try {
          // Validate that we have valid HTML content
          if (!renderedRoute.html || typeof renderedRoute.html !== 'string') {
            console.warn(`⚠️  Invalid HTML content for route ${renderedRoute.route}`)
            return null
          }

          // Clean up any development-specific content
          renderedRoute.html = renderedRoute.html.replace(
            /<script[^>]*>[\s\S]*?<\/script>/gi,
            (match: string) => {
              // Keep essential scripts but remove development tools
              if (match.includes('vite') || match.includes('hmr')) {
                return ''
              }
              return match
            }
          )

          // Validate essential SEO elements are present
          const hasTitle = renderedRoute.html.includes('<title>')
          const hasDescription = renderedRoute.html.includes('meta name="description"')
          const hasCanonical = renderedRoute.html.includes('rel="canonical"')

          if (!hasTitle || !hasDescription || !hasCanonical) {
            console.warn(`⚠️  Missing SEO elements in ${renderedRoute.route}:`, {
              title: hasTitle,
              description: hasDescription,
              canonical: hasCanonical
            })
          }

          console.log(`✅ Successfully prerendered: ${renderedRoute.route}`)
          return renderedRoute
        } catch (error) {
          console.error(`❌ Post-processing failed for ${renderedRoute.route}:`, error)
          // Return the original route to avoid breaking the build
          return renderedRoute
        }
      }
    })
  ],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
  build: {
    // Enhanced build configuration for dual output generation
    outDir: 'dist',
    // Generate source maps for debugging
    sourcemap: true,
    // Use default minification
    minify: true,
    // Ensure both SPA and static files are properly generated
    rollupOptions: {
      output: {
        // Organize output files for better structure
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || []
          const ext = info[info.length - 1]
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext || '')) {
            return `assets/images/[name]-[hash][extname]`
          }
          if (/css/i.test(ext || '')) {
            return `assets/css/[name]-[hash][extname]`
          }
          return `assets/[name]-[hash][extname]`
        }
      },
      // Handle build errors gracefully
      onwarn: (warning, warn) => {
        // Suppress certain warnings that don't affect functionality
        if (warning.code === 'UNUSED_EXTERNAL_IMPORT') {
          return
        }
        if (warning.code === 'CIRCULAR_DEPENDENCY') {
          console.warn('⚠️  Circular dependency detected:', warning.message)
          return
        }
        // Use default warning handler for other warnings
        warn(warning)
      }
    },
    // Enhanced error handling during build
    reportCompressedSize: false, // Disable to speed up build
    // Ensure build doesn't fail on warnings
    emptyOutDir: true
  },
  // Enhanced logging for build process
  logLevel: 'info',
  // Custom build hooks for validation
  define: {
    // Add build-time constants for debugging
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    __SEO_ROUTES__: JSON.stringify(SEO_CONFIG.prerender.routes)
  }
})