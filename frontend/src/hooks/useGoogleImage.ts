import { useState, useEffect } from 'react'

interface UseGoogleImageResult {
  imageUrl: string
  loading: boolean
  error: string | null
}

export const useGoogleImage = (fileId: string): UseGoogleImageResult => {
  const [imageUrl, setImageUrl] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchImage = async () => {
      if (!fileId) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const response = await fetch(`/api/google-image/${fileId}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch image')
        }
        
        const data = await response.json()
        setImageUrl(data.lh3_url || data.url)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load image')
        setImageUrl('/placeholder.jpg')
      } finally {
        setLoading(false)
      }
    }

    fetchImage()
  }, [fileId])

  return { imageUrl, loading, error }
}