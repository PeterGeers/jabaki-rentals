import React from 'react'
import { useTranslation } from 'react-i18next'
import { MetadataManager } from '../components/seo/MetadataManager'

const GardenStudioPage: React.FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <MetadataManager studio="garden" />
      <div style={{ padding: '2rem 0' }}>
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '2rem', color: '#2d5016' }}>
            Garden Studio Hoofddorp | Privé Terras nabij Schiphol
          </h1>
          <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: '1fr 1fr', alignItems: 'start' }}>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                {t('Cozy Studio with Beautiful Private Garden Terrace')}
              </h2>
              <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
                {t('Escape to tranquility in our Garden Studio, featuring a beautiful private garden terrace (privé terras). Perfect for those seeking outdoor space, privacy, and a peaceful retreat near Schiphol Airport.')}
              </p>
              <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
                {t('This unique accommodation combines the comfort of modern amenities with the serenity of a private garden (tuin). Ideal for guests who appreciate outdoor living and natural surroundings.')}
              </p>
              
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem', marginTop: '2rem' }}>
                {t('Garden Features')}
              </h3>
              <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
                <li>{t('Private garden terrace (privé terras)')}</li>
                <li>{t('Outdoor seating and dining area')}</li>
                <li>{t('Tranquil garden setting (tuin)')}</li>
                <li>{t('Privacy and peaceful atmosphere')}</li>
                <li>{t('Perfect for outdoor relaxation')}</li>
                <li>{t('Close to Schiphol Airport')}</li>
              </ul>
            </div>
            
            <div style={{ 
              background: '#f8f9fa', 
              padding: '2rem', 
              borderRadius: '8px',
              border: '1px solid #e9ecef'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                {t('Book Your Garden Retreat')}
              </h3>
              <p style={{ marginBottom: '1.5rem', color: '#666' }}>
                {t('Ready to enjoy your private garden terrace? Check availability and book your peaceful stay.')}
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

export default GardenStudioPage