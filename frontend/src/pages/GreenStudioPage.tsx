import React from 'react'
import { useTranslation } from 'react-i18next'
import { MetadataManager } from '../components/seo/MetadataManager'

const GreenStudioPage: React.FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <MetadataManager studio="green" />
      <div style={{ padding: '2rem 0' }}>
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '2rem', color: '#4a7c59' }}>
            Green Studio Hoofddorp
          </h1>
          <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: '1fr 1fr', alignItems: 'start' }}>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                {t('Modern Studio with Scenic Views')}
              </h2>
              <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
                {t('Discover comfort and tranquility in our Green Studio, offering scenic views and modern amenities. Ideal for both short and extended stays near Amsterdam.')}
              </p>
              <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
                {t('Conveniently located in Hoofddorp with easy access to Schiphol Airport and Amsterdam city center. Perfect for leisure and business travelers.')}
              </p>
              
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem', marginTop: '2rem' }}>
                {t('Features')}
              </h3>
              <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
                <li>{t('Scenic views from windows')}</li>
                <li>{t('Modern and comfortable furnishing')}</li>
                <li>{t('Near Schiphol Airport')}</li>
                <li>{t('Quick access to Amsterdam')}</li>
                <li>{t('Suitable for extended stays')}</li>
              </ul>
            </div>
            
            <div style={{ 
              background: '#f8f9fa', 
              padding: '2rem', 
              borderRadius: '8px',
              border: '1px solid #e9ecef'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                {t('Book Your Stay')}
              </h3>
              <p style={{ marginBottom: '1.5rem', color: '#666' }}>
                {t('Ready to experience the Green Studio? Check availability and book your stay.')}
              </p>
              <iframe 
                src="/guesty-widget.html" 
                title="Booking Widget"
                style={{ 
                  width: '100%', 
                  height: '300px', 
                  border: 'none', 
                  borderRadius: '8px'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default GreenStudioPage