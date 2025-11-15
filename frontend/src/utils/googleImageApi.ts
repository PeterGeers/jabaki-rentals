// Backend API function to generate lh3 URLs from Google Drive file IDs
export const generateLh3Url = async (fileId: string): Promise<string> => {
  try {
    const response = await fetch('/api/generate-lh3', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fileId }),
    })

    if (!response.ok) {
      throw new Error('Failed to generate lh3 URL')
    }

    const data = await response.json()
    return data.lh3_url
  } catch (error) {
    console.error('Error generating lh3 URL:', error)
    throw error
  }
}

// Direct lh3 URL generation (client-side fallback)
export const createLh3Url = (fileId: string, size: number = 800): string => {
  return `https://lh3.googleusercontent.com/d/${fileId}=w${size}-h${size}-c`
}