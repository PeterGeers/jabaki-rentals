/**
 * Get Google image URL from backend API
 */
export async function getGoogleImageUrl(fileId: string): Promise<string> {
  try {
    // Use AWS Lambda API Gateway endpoint
    const apiUrl = import.meta.env.PROD 
      ? 'https://hvdwz13oi7.execute-api.eu-west-1.amazonaws.com/Prod'
      : ''
    
    const response = await fetch(`${apiUrl}/api/google-image/${fileId}`)
    const data = await response.json()
    return data.url
  } catch (error) {
    console.error('Error fetching image URL:', error)
    return ''
  }
}