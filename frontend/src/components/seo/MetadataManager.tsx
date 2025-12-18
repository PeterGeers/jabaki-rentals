import React, { useEffect } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { getStudioMetadata, SEO_CONFIG } from '../../config/seo.config'

export interface StudioMetadata {
  title: string
  description: string
  canonical: string
  keywords: string[]
}

export interface MetadataManagerProps {
  studio: "red" | "green" | "garden"
}

export const MetadataManager: React.FC<MetadataManagerProps> = ({ studio }) => {
  const location = useLocation()
  const studioMetadata = getStudioMetadata(studio)
  
  if (!studioMetadata) {
    console.error(`No metadata found for studio: ${studio}`)
    return null
  }
  
  // Generate canonical URL based on current location
  const canonicalUrl = `${SEO_CONFIG.baseUrl}${location.pathname}`
  
  // Signal to prerenderer that metadata is ready
  useEffect(() => {
    // Longer delay to ensure Helmet has updated the DOM
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('prerender-ready'))
      }
    }, 500)
    
    return () => clearTimeout(timer)
  }, [studioMetadata, canonicalUrl])
  
  return (
    <Helmet>
      <title>{studioMetadata.title}</title>
      <meta name="description" content={studioMetadata.description} />
      <meta name="keywords" content={studioMetadata.keywords.join(', ')} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph metadata for social sharing */}
      <meta property="og:title" content={studioMetadata.title} />
      <meta property="og:description" content={studioMetadata.description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      
      {/* Twitter Card metadata */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={studioMetadata.title} />
      <meta name="twitter:description" content={studioMetadata.description} />
    </Helmet>
  )
}

// Provider wrapper component to be used at the app level
export const MetadataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <HelmetProvider>
      {children}
    </HelmetProvider>
  )
}