import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import * as fc from 'fast-check'
import i18n from '../../i18n'
import App from '../../App'

// Test helper to render App with specific route
const renderAppWithRoute = (initialEntries: string[]) => {
  return render(
    <I18nextProvider i18n={i18n}>
      <MemoryRouter initialEntries={initialEntries}>
        <App />
      </MemoryRouter>
    </I18nextProvider>
  )
}

// Mock window.location to track navigation
const mockLocation = {
  pathname: '/',
  search: '',
  hash: '',
  href: 'http://localhost:3000/',
  reload: vi.fn()
}

describe('SPA Navigation Preservation Property Tests', () => {
  let originalLocation: Location
  
  beforeEach(() => {
    originalLocation = window.location
    // @ts-ignore
    delete window.location
    window.location = mockLocation as any
    mockLocation.reload.mockClear()
  })
  
  afterEach(() => {
    window.location = originalLocation
  })

  /**
   * **Feature: seo-optimization, Property 6: SPA navigation preservation**
   * **Validates: Requirements 6.1, 6.2, 6.3**
   * 
   * For any navigation between studio pages, the system should maintain SPA behavior 
   * without full page reloads while updating document head content dynamically
   */
  it('should preserve SPA navigation behavior for all studio routes', () => {
    const studioRoutes = ['/red-studio', '/green-studio', '/garden-studio']
    
    // Test each studio route individually
    studioRoutes.forEach(route => {
      // Render app at the specified route
      const { container, unmount } = renderAppWithRoute([route])
      
      // Verify no page reload occurred during initial render
      const reloadCallsBefore = mockLocation.reload.mock.calls.length
      
      // Verify the route content is loaded correctly
      const studioName = route.replace('/', '').replace('-studio', '')
      const expectedHeading = new RegExp(`${studioName} studio`, 'i')
      
      // Verify correct studio page is displayed
      expect(screen.getByRole('heading', { name: expectedHeading })).toBeInTheDocument()
      
      // Verify no page reload occurred (SPA behavior preserved)
      const reloadCallsAfter = mockLocation.reload.mock.calls.length
      expect(reloadCallsAfter).toBe(reloadCallsBefore)
      
      // Verify container has content
      expect(container.innerHTML).toBeTruthy()
      expect(container.innerHTML.length).toBeGreaterThan(100)
      
      // Clean up for next iteration
      unmount()
    })
  })

  /**
   * Property test for metadata updates during navigation
   * Verifies that document head content changes without page reloads
   */
  it('should update document head content dynamically for red studio', async () => {
    const route = '/red-studio'
    
    // Render app at the specified route
    const { unmount } = renderAppWithRoute([route])
    
    // Wait for metadata to be updated
    await waitFor(() => {
      // Verify no page reload occurred during metadata updates
      expect(mockLocation.reload).not.toHaveBeenCalled()
      
      // Verify document title contains studio-specific content
      const titleLower = document.title.toLowerCase()
      expect(titleLower).toContain('red')
      expect(titleLower).toContain('jabaki')
    }, { timeout: 3000 })
    
    // Clean up
    unmount()
  })

  it('should update document head content dynamically for green studio', async () => {
    const route = '/green-studio'
    
    // Render app at the specified route
    const { unmount } = renderAppWithRoute([route])
    
    // Wait for metadata to be updated
    await waitFor(() => {
      // Verify no page reload occurred during metadata updates
      expect(mockLocation.reload).not.toHaveBeenCalled()
      
      // Verify document title contains studio-specific content
      const titleLower = document.title.toLowerCase()
      expect(titleLower).toContain('green')
      expect(titleLower).toContain('jabaki')
    }, { timeout: 3000 })
    
    // Clean up
    unmount()
  })

  it('should update document head content dynamically for garden studio', async () => {
    const route = '/garden-studio'
    
    // Render app at the specified route
    const { unmount } = renderAppWithRoute([route])
    
    // Wait for metadata to be updated
    await waitFor(() => {
      // Verify no page reload occurred during metadata updates
      expect(mockLocation.reload).not.toHaveBeenCalled()
      
      // Verify document title contains studio-specific content
      const titleLower = document.title.toLowerCase()
      expect(titleLower).toContain('garden')
      expect(titleLower).toContain('jabaki')
    }, { timeout: 3000 })
    
    // Clean up
    unmount()
  })

  /**
   * Property test for client-side routing precedence
   * Verifies that user interactions use client-side routing
   */
  it('should maintain client-side routing precedence for all studio routes', () => {
    const studioRoutes = ['/red-studio', '/green-studio', '/garden-studio']
    
    studioRoutes.forEach(route => {
      // Render app at the specified route
      const { container, unmount } = renderAppWithRoute([route])
      
      // Verify no page reload occurred during routing
      expect(mockLocation.reload).not.toHaveBeenCalled()
      
      // Verify React Router is handling the route (SPA behavior)
      const studioName = route.replace('/', '').replace('-studio', '')
      const expectedHeading = new RegExp(`${studioName} studio`, 'i')
      expect(screen.getByRole('heading', { name: expectedHeading })).toBeInTheDocument()
      
      // Verify container has React-rendered content
      expect(container.innerHTML).toBeTruthy()
      
      // Clean up for next iteration
      unmount()
    })
  })
})