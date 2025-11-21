import { vi } from 'vitest'
import { getGoogleImageUrl } from './googleImages'

// Mock fetch
global.fetch = vi.fn()

describe('getGoogleImageUrl', () => {
  it('should return Google Drive URL for valid file ID', async () => {
    const mockResponse = {
      url: 'https://lh3.googleusercontent.com/d/test123'
    }
    
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as Response)

    const result = await getGoogleImageUrl('test123')
    expect(result).toBe('https://lh3.googleusercontent.com/d/test123')
  })

  it('should return empty string on error', async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'))

    const result = await getGoogleImageUrl('invalid')
    expect(result).toBe('')
  })
})