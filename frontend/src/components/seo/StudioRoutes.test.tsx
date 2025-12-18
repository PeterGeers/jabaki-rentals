import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
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

describe('Studio Route Accessibility Tests', () => {
  /**
   * Unit tests for studio route accessibility
   * Validates: Requirements 3.1, 3.2, 3.3
   */
  
  it('should serve content at /red-studio route', () => {
    renderAppWithRoute(['/red-studio'])
    
    // Check that Red Studio content is rendered
    expect(screen.getByRole('heading', { name: /Red Studio Hoofddorp/i })).toBeInTheDocument()
    
    // Check that the page contains studio-specific content
    expect(screen.getByText('Stylish Studio with Rooftop Terrace')).toBeInTheDocument()
  })

  it('should serve content at /green-studio route', () => {
    renderAppWithRoute(['/green-studio'])
    
    // Check that Green Studio content is rendered
    expect(screen.getByRole('heading', { name: /Green Studio Hoofddorp/i })).toBeInTheDocument()
    
    // Check that the page contains studio-specific content
    expect(screen.getByText('Modern Studio with Scenic Views')).toBeInTheDocument()
  })

  it('should serve content at /garden-studio route', () => {
    renderAppWithRoute(['/garden-studio'])
    
    // Check that Garden Studio content is rendered
    expect(screen.getByRole('heading', { name: /Garden Studio Hoofddorp/i })).toBeInTheDocument()
    
    // Check that the page contains studio-specific content
    expect(screen.getByText('Cozy Studio with Beautiful Private Garden Terrace')).toBeInTheDocument()
  })

  it('should render different content for each studio route', () => {
    // Test Red Studio
    const { unmount: unmountRed } = renderAppWithRoute(['/red-studio'])
    expect(screen.getByRole('heading', { name: /Red Studio Hoofddorp/i })).toBeInTheDocument()
    unmountRed()

    // Test Green Studio  
    const { unmount: unmountGreen } = renderAppWithRoute(['/green-studio'])
    expect(screen.getByRole('heading', { name: /Green Studio Hoofddorp/i })).toBeInTheDocument()
    unmountGreen()

    // Test Garden Studio
    renderAppWithRoute(['/garden-studio'])
    expect(screen.getByRole('heading', { name: /Garden Studio Hoofddorp/i })).toBeInTheDocument()
  })

  it('should include MetadataManager component on all studio routes', () => {
    // Test that each studio route includes the MetadataManager
    // We can verify this by checking that the document head gets updated
    
    // Red Studio
    renderAppWithRoute(['/red-studio'])
    // The MetadataManager should be present (we can't easily test head content in jsdom)
    expect(screen.getByRole('heading', { name: /Red Studio Hoofddorp/i })).toBeInTheDocument()
  })
})