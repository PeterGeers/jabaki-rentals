import React from 'react'
import { useTranslation } from 'react-i18next'
import { MetadataManager } from '../components/seo/MetadataManager'

const RedStudioPage: React.FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <MetadataManager studio="red" />
      <div style={{ padding: '2rem 0' }}>
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '2rem', color: '#FF385C' }}>
            Red Studio Hoofddorp
          </h1>
          <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: '1fr 1fr', alignItems: 'start' }}>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                {t('Stylish Studio with Rooftop Terrace')}
              </h2>
              <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
                {t('Experience modern comfort in our Red Studio, featuring a private rooftop terrace with stunning views. Perfect for business travelers and tourists visiting the Amsterdam area.')}
              </p>
              <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
                {t('Located in Hoofddorp, just minutes from Schiphol Airport, this stylish accommodation offers all the amenities you need for a comfortable stay.')}
              </p>
              
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem', marginTop: '2rem' }}>
                {t('Features')}
              </h3>
              <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
                <li>{t('Private rooftop terrace')}</li>
                <li>{t('Modern furnishing and amenities')}</li>
                <li>{t('Close to Schiphol Airport')}</li>
                <li>{t('Easy access to Amsterdam')}</li>
                <li>{t('Perfect for business travel')}</li>
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
                {t('Ready to experience the Red Studio? Check availability and book your stay.')}
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

export default RedStudioPage