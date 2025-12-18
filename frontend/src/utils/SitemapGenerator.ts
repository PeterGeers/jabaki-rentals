// Sitemap Generator utility class
// Generates XML sitemap with proper protocol compliance
// Based on design document specifications

export interface SitemapEntry {
  url: string
  lastmod: string
  priority: number
  changefreq: "daily" | "weekly" | "monthly"
}

export interface SitemapGenerator {
  generateSitemap(entries: SitemapEntry[]): string
  writeSitemapFile(content: string, outputPath: string): void
}

export class SitemapGeneratorImpl implements SitemapGenerator {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl
  }

  /**
   * Generates XML sitemap content from sitemap entries
   * Follows sitemap protocol standards
   */
  generateSitemap(entries: SitemapEntry[]): string {
    const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>'
    const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
    const urlsetClose = '</urlset>'

    const urlEntries = entries.map(entry => {
      const fullUrl = entry.url.startsWith('http') ? entry.url : `${this.baseUrl}${entry.url}`
      
      return `  <url>
    <loc>${this.escapeXml(fullUrl)}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
  </url>`
    }).join('\n')

    return [xmlHeader, urlsetOpen, urlEntries, urlsetClose].join('\n')
  }

  /**
   * Writes sitemap content to file system
   * Used during build process
   */
  writeSitemapFile(_content: string, _outputPath: string): void {
    // This method will be implemented in the build integration
    // For now, it serves as the interface definition
    throw new Error('writeSitemapFile should be implemented in build process')
  }

  /**
   * Escapes XML special characters to ensure valid XML
   */
  private escapeXml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;')
  }



  /**
   * Validates sitemap XML content for proper structure
   */
  validateSitemap(content: string): boolean {
    try {
      // Basic XML structure validation
      if (!content.includes('<?xml version="1.0" encoding="UTF-8"?>')) {
        return false
      }
      
      if (!content.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')) {
        return false
      }
      
      if (!content.includes('</urlset>')) {
        return false
      }
      
      // Check for basic URL structure if URLs exist
      if (content.includes('<url>')) {
        if (!content.includes('<loc>') || !content.includes('</loc>')) {
          return false
        }
      }
      
      return true
    } catch (error) {
      return false
    }
  }

  /**
   * Creates sitemap entries from studio configurations
   */
  static createEntriesFromStudios(studios: Array<{
    route: string
    seo: { priority: number; changefreq: "daily" | "weekly" | "monthly" }
  }>): SitemapEntry[] {
    const currentDate = new Date().toISOString().split('T')[0] // YYYY-MM-DD format
    
    return studios.map(studio => ({
      url: studio.route,
      lastmod: currentDate,
      priority: studio.seo.priority,
      changefreq: studio.seo.changefreq
    }))
  }
}