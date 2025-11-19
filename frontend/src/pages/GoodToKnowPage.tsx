import React from 'react'
import { useTranslation } from 'react-i18next'

const GoodToKnowPage = () => {
  const { t } = useTranslation()

  return (
    <div style={{ padding: '2rem 0' }}>
      <div className="container">
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '2rem', textAlign: 'center' }}>
          {t('Good to know')}
        </h1>
        
        <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          
          {/* Amenities */}
          <div className="card">
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#FF385C' }}>
              {t('Amenities')}
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, lineHeight: '1.6' }}>
              <li style={{ marginBottom: '0.5rem' }}>• {t('Free WiFi')}</li>
              <li style={{ marginBottom: '0.5rem' }}>• {t('Smart TV with streaming services')}</li>
              <li style={{ marginBottom: '0.5rem' }}>• {t('Fully equipped kitchen')}</li>
              <li style={{ marginBottom: '0.5rem' }}>• {t('Air conditioning & Heating')}</li>
              <li style={{ marginBottom: '0.5rem' }}>• {t('Fresh towels & linens')}</li>
              <li style={{ marginBottom: '0.5rem' }}>• {t('Shampoo & body wash')}</li>
              <li style={{ marginBottom: '0.5rem' }}>• {t('Coffee and tea provided')}</li>
              <li style={{ marginBottom: '0.5rem' }}>• {t('Washer & dryer from the owner can be used')}</li>
            </ul>
          </div>

          {/* Transportation */}
          <div className="card">
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#FF385C' }}>
              {t('Transportation')}
            </h3>
            <div style={{ lineHeight: '1.6' }}>
              <p style={{ marginBottom: '1rem', fontWeight: 'bold' }}>
                How to get to or from JaBaKi Studios, Beemsterstraat 3, 2131 ZA Hoofddorp
              </p>
              <p style={{ marginBottom: '1rem' }}>
                The most up to date information can be found using Google Maps selecting JaBaKi and any location as the two locations to travel between. Actual lines, time and prices for Public transport can be found by <a href="https://9292.nl" target="_blank" rel="noopener noreferrer" style={{ color: '#FF385C' }}>9292.nl</a>. This is a Dutch site for public transport.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>• Free parking available</li>
                <li style={{ marginBottom: '0.5rem' }}>• Hoofddorp Train station is 2.7 km away</li>
                <li style={{ marginBottom: '0.5rem' }}>• The nearest bus stop is 550 meters away</li>
                <li style={{ marginBottom: '0.5rem' }}>• Bus stops are on different distances</li>
              </ul>
              <p>
                <a href="https://www.google.com/maps/place/JaBaKi+gast+verblijven/@52.3090045,4.6933934,16z/data=!3m1!4b1!4m10!3m9!1s0x47c5e7aae3b561c9:0xdbc8d46eee18133a!5m3!1s2025-11-24!4m1!1i2!8m2!3d52.3090012!4d4.6959683!16s%2Fg%2F11g691f8w_?entry=ttu&g_ep=EgoyMDI1MTExNi4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" style={{ color: '#FF385C', textDecoration: 'underline' }}>
                  View on Google Maps
                </a>
              </p>
            </div>
          </div>

          {/* Local Tips */}
          <div className="card">
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#FF385C' }}>
              {t('Local Tips')}
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, lineHeight: '1.6' }}>
              <li style={{ marginBottom: '0.5rem' }}>• {t('Supermarket 5 minutes walk')}</li>
              <li style={{ marginBottom: '0.5rem' }}>• {t('Restaurants nearby')}</li>
              <li style={{ marginBottom: '0.5rem' }}>• {t('Beach 14 km and 50 minutes by bike')}</li>
              <li style={{ marginBottom: '0.5rem' }}>• {t('Our bike can be used based on availability')}</li>
              <li style={{ marginBottom: '0.5rem' }}>• {t('Bike rentals available in Hoofddorp')}</li>
            </ul>
          </div>

          {/* Check-in/Check-out */}
          <div className="card">
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#FF385C' }}>
              {t('Check-in & Check-out')}
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, lineHeight: '1.6' }}>
              <li style={{ marginBottom: '0.5rem' }}>• {t('Check-in: 15:00 - 22:00')}</li>
              <li style={{ marginBottom: '0.5rem' }}>• {t('Check-out: before 11:00')}</li>
              <li style={{ marginBottom: '0.5rem' }}>• {t('Self check-in with key box')}</li>
            </ul>
          </div>

          {/* House Rules */}
          <div className="card">
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#FF385C' }}>
              {t('House Rules')}
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, lineHeight: '1.6' }}>
              <li style={{ marginBottom: '0.5rem' }}>• {t('No smoking inside')}</li>
              <li style={{ marginBottom: '0.5rem' }}>• {t('No parties or events')}</li>
              <li style={{ marginBottom: '0.5rem' }}>• {t('Quiet hours: 22:00 - 08:00')}</li>
              <li style={{ marginBottom: '0.5rem' }}>• {t('Maximum occupancy as listed')}</li>
            </ul>
          </div>

          {/* Emergency */}
          <div className="card">
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#FF385C' }}>
              {t('Noodgeval')}
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, lineHeight: '1.6' }}>
              <li style={{ marginBottom: '0.5rem' }}>• {t('Medisch: 112')}</li>
              <li style={{ marginBottom: '0.5rem' }}>• {t('Brand: 112')}</li>
              <li style={{ marginBottom: '0.5rem' }}>• {t('Politie: 112 of 0900-8844')}</li>
              <li style={{ marginBottom: '0.5rem' }}>• {t('Gastheer contact 24/7 beschikbaar')}</li>
              <li style={{ marginBottom: '0.5rem' }}>• {t('Ziekenhuis 10 minuten rijden')}</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  )
}

export default GoodToKnowPage