import { Routes, Route, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useEffect, useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import imagesData from './data/images.json'

function App() {
  const { t, i18n } = useTranslation()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <header style={{ 
        borderBottom: '1px solid #e2e8f0', 
        background: 'white', 
        position: 'sticky', 
        top: 0, 
        zIndex: 1000 
      }}>
        <div className="container" style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '1rem 1.5rem' 
        }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <img 
              src="https://lh3.googleusercontent.com/d/1EJ1wo3qCWUzdUOoW5AYhZM1Fhz0vGJyW" 
              alt="JaBaKi Logo" 
              style={{ maxHeight: '120px', width: 'auto' }}
            />
          </Link>
          <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <Link to="/listings" style={{ textDecoration: 'none', color: '#333' }}>{t('Listings')}</Link>
            <Link to="/events" style={{ textDecoration: 'none', color: '#333' }}>{t('Events')}</Link>
            <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '1rem' }}>
              <button onClick={() => changeLanguage('en')} style={{ padding: '0.25rem 0.5rem', border: '1px solid #ccc', borderRadius: '4px', background: 'white', cursor: 'pointer' }}>EN</button>
              <button onClick={() => changeLanguage('nl')} style={{ padding: '0.25rem 0.5rem', border: '1px solid #ccc', borderRadius: '4px', background: 'white', cursor: 'pointer' }}>NL</button>
              <button onClick={() => changeLanguage('de')} style={{ padding: '0.25rem 0.5rem', border: '1px solid #ccc', borderRadius: '4px', background: 'white', cursor: 'pointer' }}>DE</button>
            </div>
          </nav>
        </div>
      </header>
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/listings" element={<ListingsPage />} />
        <Route path="/events" element={<EventsPage />} />
      </Routes>
    </div>
  )
}

const HomePage = () => {
  const { t } = useTranslation()
  return (
    <div>
      <section style={{ background: '#f7fafc', padding: '1rem 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
            {t('Check availability')}
          </h2>
          <p style={{ fontSize: '1.25rem', color: '#666', marginBottom: '0.5rem' }}>
            {t('of our accommodations on your desired dates')}
          </p>
          <iframe 
            src="/guesty-widget.html" 
            title="Booking Widget"
            style={{ 
              width: '100%', 
              maxWidth: '600px', 
              height: '240px', 
              border: 'none', 
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              margin: '0 auto'
            }}
          />
        </div>
      </section>
      
      <section style={{ padding: '2rem 0' }}>
        <div className="container">
          <h3 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            {t('Our Accommodations')}
          </h3>
          <div className="grid grid-3">
            <AccommodationCard id="gardenhouse" name={t('Garden House')} description={t('Cozy house with beautiful garden terrace')} />
            <AccommodationCard id="green-studio" name={t('Green Studio')} description={t('Modern studio with scenic views')} />
            <AccommodationCard id="red-studio" name={t('Red Studio')} description={t('Stylish studio with rooftop terrace')} />
          </div>
        </div>
      </section>
    </div>
  )
}

const ListingsPage = () => {
  const { t } = useTranslation()
  return (
    <div style={{ padding: '2rem 0' }}>
      <div className="container">
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>
          {t('All Listings')}
        </h2>
        <div className="grid grid-3">
          <ListingCard title={t('Cozy Amsterdam Apartment')} location={t('Amsterdam Center')} price={120} />
          <ListingCard title={t('Modern Haarlem House')} location={t('Near Keukenhof')} price={95} />
          <ListingCard title={t('Canal View Studio')} location={t('Amsterdam')} price={85} />
        </div>
      </div>
    </div>
  )
}

const EventsPage = () => {
  const { t } = useTranslation()
  return (
    <div style={{ padding: '2rem 0' }}>
      <div className="container">
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>
          {t('Events & Attractions')}
        </h2>
        <div className="grid grid-3">
          <EventCard title={t('Keukenhof Gardens')} date="Mar - May 2024" />
          <EventCard title={t('Amsterdam Dance Event')} date="Oct 2024" />
          <EventCard title={t('Dutch F1 Grand Prix')} date="Aug 2024" />
          <EventCard title={t('Mysteryland')} date="Aug 2024" />
        </div>
      </div>
    </div>
  )
}

const AccommodationCard = ({ id, name, description }: { id: string; name: string; description: string }) => {
  const { t } = useTranslation()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [autoplayEnabled, setAutoplayEnabled] = useState(true)
  const swiperRef = useRef(null)
  
  const getImagesWithNames = () => {
    // Use stable id for lookup so translations don't affect which images load
    if (id === 'gardenhouse') return Object.entries(imagesData.properties.gardenhouse)
    if (id === 'green-studio') return Object.entries(imagesData.properties['green-studio'])
    if (id === 'red-studio') return Object.entries(imagesData.properties['red-studio'])
    return []
  }
  
  const imagesWithNames = getImagesWithNames()
  const currentImageName = imagesWithNames[currentImageIndex]?.[0] || ''
  const localizedNoImage = t('no-image') || 'No image'
  const propertyImages = imagesData.properties[id] || {}
  const warnings: string[] = []
  if (!('voordeur' in propertyImages)) {
    // Prefer localized text if available
    warnings.push(`${t(name)}: ${t('voordeur') || 'voordeur'} niet zichtbaar`)
  }
  
  return (
      <div className="card" style={{ maxWidth: '100%', width: '100%' }}>
      <div style={{ 
        width: '100%',
        borderRadius: '8px', 
        marginBottom: '1rem',
        overflow: 'hidden',
        position: 'relative',
        height: 'min(500px, 60vh)',
        maxHeight: '500px'
      }}>
        {imagesWithNames.length > 0 ? (
          <div style={{ width: '100%', height: '100%', maxWidth: '100%', overflow: 'hidden' }}>
              <Swiper
              modules={[Autoplay]}
              autoplay={autoplayEnabled ? { 
                delay: 4000, 
                disableOnInteraction: false
              } : false}
              loop={true}
              className={`accommodation-swiper-${id}`}
              style={{ height: '100%', width: '100%', maxWidth: '100%' }}
              onSlideChange={(swiper) => setCurrentImageIndex(typeof swiper.realIndex === 'number' ? swiper.realIndex : (swiper.activeIndex % (imagesWithNames.length || 1)))}
              onSwiper={(swiper) => { swiperRef.current = swiper }}
              speed={300}
              allowTouchMove={true}
            >
            {imagesWithNames.map(([imageName, imageId], index) => (
              <SwiperSlide key={index} style={{ width: '100%', height: '100%' }}>
                <img 
                  src={`https://lh3.googleusercontent.com/d/${imageId}=s0`}
                  alt={`${name} ${imageName}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Debug: warn if no images */}
          {imagesWithNames.length === 0 && console.warn(`Accommodation ${id} has no images`) }
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', gap: '5px' }}>
            {imagesWithNames.map((_, index) => (
              <div
                key={index}
                onClick={() => {
                  if (swiperRef.current) swiperRef.current.slideToLoop(index)
                }}
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: currentImageIndex === index ? '#FF385C' : '#ccc',
                  cursor: 'pointer',
                  transition: 'background 0.3s'
                }}
              />
            ))}
          </div>
          </div>
        ) : (
          <div style={{ width: '100%', height: '100%', maxWidth: '100%', overflow: 'hidden' }}>
            <img
              src="/placeholder.jpg"
              alt={localizedNoImage}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        )}
      </div>
      {imagesWithNames.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0', gap: '8px' }}>
          {imagesWithNames.map((_, index) => (
            <div
              key={index}
              onClick={() => {
                if (swiperRef.current) {
                  setAutoplayEnabled(false)
                  swiperRef.current.slideToLoop(index)
                }
              }}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: currentImageIndex === index ? '#FF385C' : '#ddd',
                cursor: 'pointer',
                border: '1px solid #999'
              }}
            />
          ))}
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <h4 style={{ fontWeight: 'bold', fontSize: '1.125rem', margin: 0 }}>
          {name}
        </h4>
        <span style={{ fontSize: '0.875rem', color: '#888', fontStyle: 'italic' }}>
          {currentImageName ? t(currentImageName) : localizedNoImage}
        </span>
      </div>
      {warnings.length > 0 && (
        <div style={{ color: '#b91c1c', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
          {warnings.map((w, i) => (
            <div key={i}>{w}</div>
          ))}
        </div>
      )}
      <p style={{ color: '#666', marginBottom: '1rem' }}>{description}</p>
    </div>
  )
}

const EventCard = ({ title, date }: { title: string; date: string }) => {
  const { t } = useTranslation()
  return (
    <div className="card">
      <h4 style={{ fontWeight: 'bold', fontSize: '1.125rem', marginBottom: '0.5rem' }}>
        {title}
      </h4>
      <p style={{ color: '#666', marginBottom: '1rem' }}>{date}</p>
      <button className="btn btn-primary">{t('Learn More')}</button>
    </div>
  )
}

const ListingCard = ({ title, location, price }: { title: string; location: string; price: number }) => {
  const { t } = useTranslation()
  return (
    <div className="card" style={{ cursor: 'pointer' }}>
      <div style={{ 
        height: '200px', 
        background: '#f0f0f0', 
        borderRadius: '8px', 
        marginBottom: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#666'
      }}>
        Image Placeholder
      </div>
      <h4 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{title}</h4>
      <p style={{ color: '#666', marginBottom: '0.5rem' }}>{location}</p>
      <p style={{ fontWeight: 'bold' }}>€{price} <span style={{ fontWeight: 'normal' }}>{t('night')}</span></p>
    </div>
  )
}

export default App