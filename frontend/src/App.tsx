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
            <LogoImage />
          </Link>
          <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
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



const EventsPage = () => {
  const { t } = useTranslation()
  return (
    <div style={{ padding: '2rem 0' }}>
      <div className="container">
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>
          {t('Events & Attractions')}
        </h2>
        <div className="grid grid-3">
          <KeukenhofCard />
          <KeukenhofShowsCard />
          <KoningsdagCard />
          <PrideCard />
          <CastlefestCard />
          <WorldPrideCard />
          <F1Card />
          <MonumentendagCard />
          <DamTotDamCard />
          <DahliaCard />
          <MarathonCard />
          <ADECard />
          <MysterylandCard />
        </div>
      </div>
    </div>
  )
}

const LogoImage = () => {
  const [logoUrl, setLogoUrl] = useState('')
  
  useEffect(() => {
    fetch('/api/google-image/1EJ1wo3qCWUzdUOoW5AYhZM1Fhz0vGJyW')
      .then(res => res.json())
      .then(data => setLogoUrl(data.lh3_url))
      .catch(() => setLogoUrl(''))
  }, [])
  
  if (!logoUrl) {
    return (
      <div style={{
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#FF385C',
        fontFamily: 'Arial, sans-serif'
      }}>
        JaBaKi
      </div>
    )
  }
  
  return (
    <img 
      src={logoUrl}
      alt="JaBaKi Logo" 
      style={{ maxHeight: '120px', width: 'auto' }}
      crossOrigin="anonymous"
      referrerPolicy="no-referrer"
    />
  )
}

const CarouselImage = ({ imageId, name, imageName }: { imageId: string; name: string; imageName: string }) => {
  const [imageUrl, setImageUrl] = useState('')
  
  useEffect(() => {
    fetch(`/api/google-image/${imageId}`)
      .then(res => res.json())
      .then(data => setImageUrl(data.lh3_url))
      .catch(() => setImageUrl(''))
  }, [imageId])
  
  if (!imageUrl) {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#666'
      }}>
        Loading...
      </div>
    )
  }
  
  return (
    <img 
      src={imageUrl}
      alt={`${name} ${imageName}`}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        display: 'block'
      }}
      crossOrigin="anonymous"
      referrerPolicy="no-referrer"
    />
  )
}

const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => {
  if (!isOpen) return null
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }} onClick={onClose}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '24px',
        maxWidth: '600px',
        maxHeight: '80vh',
        overflow: 'auto',
        position: 'relative'
      }} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: 'none',
          border: 'none',
          fontSize: '24px',
          cursor: 'pointer',
          color: '#666'
        }}>×</button>
        {children}
      </div>
    </div>
  )
}

const CollapsibleSection = ({ title, children, isOpen, onToggle }: { title: string; children: React.ReactNode; isOpen: boolean; onToggle: () => void }) => (
  <div style={{ marginBottom: '16px' }}>
    <h3 
      onClick={onToggle}
      style={{ 
        color: '#333', 
        marginBottom: '8px', 
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      {title}
      <span style={{ fontSize: '18px', transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
    </h3>
    {isOpen && <div>{children}</div>}
  </div>
)

const AccommodationCard = ({ id, name, description }: { id: string; name: string; description: string }) => {
  const { t } = useTranslation()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [autoplayEnabled, setAutoplayEnabled] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [openSections, setOpenSections] = useState<{[key: string]: boolean}>({})
  const swiperRef = useRef(null)
  
  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }))
  }
  
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
                <CarouselImage imageId={imageId} name={name} imageName={imageName} />
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
            <div
              style={{ 
                width: '100%', 
                height: '100%', 
                backgroundColor: '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#666',
                fontSize: '1rem'
              }}
            >
              {localizedNoImage}
            </div>
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
      <button 
        onClick={() => setShowModal(true)}
        style={{
          background: '#FF385C',
          color: 'white',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '14px'
        }}
      >
        More Info
      </button>
      
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div>
          <h2 style={{ color: '#FF385C', marginBottom: '16px' }}>{t(`${id}.title`)}</h2>
          
          <CollapsibleSection 
            title={t(`${id}.description.title`)} 
            isOpen={openSections.description} 
            onToggle={() => toggleSection('description')}
          >
            <p style={{ marginBottom: '16px' }}>{t(`${id}.description.text`)}</p>
          </CollapsibleSection>
          
          <CollapsibleSection 
            title={t(`${id}.space.title`)} 
            isOpen={openSections.space} 
            onToggle={() => toggleSection('space')}
          >
            <p style={{ marginBottom: '16px' }}>{t(`${id}.space.text1`)}</p>
            <p style={{ marginBottom: '16px' }}>{t(`${id}.space.text2`)}</p>
            <p style={{ marginBottom: '16px' }}>{t(`${id}.space.text3`)}</p>
            <p style={{ marginBottom: '16px' }}>{t(`${id}.space.text4`)}</p>
            <p style={{ marginBottom: '16px' }}>{t(`${id}.space.text5`)}</p>
          </CollapsibleSection>
          
          <CollapsibleSection 
            title={t(`${id}.access.title`)} 
            isOpen={openSections.access} 
            onToggle={() => toggleSection('access')}
          >
            <p style={{ marginBottom: '16px' }}>{t(`${id}.access.text`)}</p>
          </CollapsibleSection>
          
          <CollapsibleSection 
            title={t(`${id}.neighborhood.title`)} 
            isOpen={openSections.neighborhood} 
            onToggle={() => toggleSection('neighborhood')}
          >
            <p style={{ marginBottom: '16px' }}>{t(`${id}.neighborhood.text`)}</p>
          </CollapsibleSection>
          
          <CollapsibleSection 
            title={t(`${id}.children.title`)} 
            isOpen={openSections.children} 
            onToggle={() => toggleSection('children')}
          >
            <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
              <li>{t(`${id}.children.item1`)}</li>
              <li>{t(`${id}.children.item2`)}</li>
              <li>{t(`${id}.children.item3`)}</li>
              <li>{t(`${id}.children.item4`)}</li>
              <li>{t(`${id}.children.item5`)}</li>
              <li>{t(`${id}.children.item6`)}</li>
              <li>{t(`${id}.children.item7`)}</li>
              <li>{t(`${id}.children.item8`)}</li>
            </ul>
          </CollapsibleSection>
          
          <CollapsibleSection 
            title={t(`${id}.transport.title`)} 
            isOpen={openSections.transport} 
            onToggle={() => toggleSection('transport')}
          >
            <p style={{ marginBottom: '16px' }}>{t(`${id}.transport.text`)}</p>
          </CollapsibleSection>
          
          <CollapsibleSection 
            title={t(`${id}.checkin.title`)} 
            isOpen={openSections.checkin} 
            onToggle={() => toggleSection('checkin')}
          >
            <p style={{ marginBottom: '0' }}>{t(`${id}.checkin.text`)}</p>
          </CollapsibleSection>
        </div>
      </Modal>
    </div>
  )
}

const F1Card = () => {
  const { t } = useTranslation()
  return (
    <div className="card" style={{ background: 'linear-gradient(135deg, #e10600, #ff6600)', color: 'white', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'relative', zIndex: 2 }}>
        <h4 style={{ fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '0.5rem', color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
          {t('Dutch F1 Grand Prix')}
        </h4>
        <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>21, 22 & 23 augustus 2026</p>
        <p style={{ fontSize: '0.85rem', marginBottom: '0.5rem', color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>Circuit Zandvoort</p>
        <p style={{ fontSize: '0.8rem', marginBottom: '1rem', color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>Wachtlijst tickets beschikbaar</p>
        <button 
          onClick={() => window.open('https://dutchgp.com/tickets-2026/', '_blank')}
          style={{
            background: '#FF385C',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          Tickets 2026
        </button>
      </div>
      <div style={{ position: 'absolute', top: '-20px', right: '-20px', fontSize: '4rem', opacity: 0.15, zIndex: 1 }}>🏎️</div>
    </div>
  )
}

const ADECard = () => {
  const { t } = useTranslation()
  return (
    <div className="card" style={{ background: 'linear-gradient(135deg, #1a1a1a, #333333)', color: 'white', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'relative', zIndex: 2 }}>
        <h4 style={{ fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '0.5rem', color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
          {t('Amsterdam Dance Event')}
        </h4>
        <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: '#ffd700', textShadow: '1px 1px 2px rgba(0,0,0,0.3)', fontWeight: 'bold' }}>30-jarig jubileum!</p>
        <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>21 - 25 oktober 2026</p>
        <p style={{ fontSize: '0.85rem', marginBottom: '0.5rem', color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>Amsterdam • Wereldwijd toonaangevend</p>
        <p style={{ fontSize: '0.8rem', marginBottom: '1rem', color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>Dance-industrie evenement</p>
        <button 
          onClick={() => window.open('https://amsterdam-dance-event.nl', '_blank')}
          style={{
            background: '#FF385C',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          Meer info
        </button>
      </div>
      <div style={{ position: 'absolute', top: '-20px', right: '-20px', fontSize: '4rem', opacity: 0.15, zIndex: 1 }}>🎵</div>
    </div>
  )
}

const KeukenhofCard = () => {
  const { t } = useTranslation()
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <div className="card" style={{ background: 'linear-gradient(135deg, #2d5016, #4a7c59)', color: 'white', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h4 style={{ fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '0.5rem', color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
            {t('Keukenhof Gardens')}
          </h4>
          <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>19 maart - 10 mei 2026</p>
          <p style={{ fontSize: '0.85rem', marginBottom: '0.5rem', color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>Lisse • 15 min van JaBaKi</p>
          <p style={{ fontSize: '0.8rem', marginBottom: '1rem', color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>7 miljoen bloembollen • 32 hectare tulpen</p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={() => window.open('https://keukenhof.nl', '_blank')}
              style={{
                background: '#FF385C',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold'
              }}
            >
              Tickets kopen
            </button>
            <button 
              onClick={() => setShowModal(true)}
              style={{
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: '1px solid white',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold'
              }}
            >
              Bloemenshows
            </button>
          </div>
        </div>
        <div style={{ position: 'absolute', top: '-20px', right: '-20px', fontSize: '4rem', opacity: 0.15, zIndex: 1 }}>🌷</div>
      </div>
      
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div>
          <h2 style={{ color: '#2d5016', marginBottom: '16px' }}>Bloemenshows in jubilerende Keukenhof</h2>
          <p style={{ marginBottom: '16px' }}>Tot en met 12 mei biedt Keukenhof prachtige bloemenshows.</p>
          
          <h3 style={{ color: '#2d5016', marginBottom: '8px' }}>Beatrix paviljoen:</h3>
          <p style={{ marginBottom: '16px' }}>Anthurium- en Orchideeënshow: donderdag 21 maart t/m zondag 12 mei</p>
          
          <h3 style={{ color: '#2d5016', marginBottom: '8px' }}>Oranje Nassau paviljoen:</h3>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li>Tulpen- en Hyacintenshow: donderdag 21 t/m dinsdag 26 maart</li>
            <li>Freesia- en Chrysantenshow: donderdag 28 maart t/m dinsdag 2 april</li>
            <li>Rozenshow: donderdag 4 april t/m dinsdag 9 april</li>
            <li>Narcissen- en Bijzondere Bolgewassenshow: donderdag 11 april t/m dinsdag 16 april</li>
            <li>Alstroemeria- en Callashow: donderdag 18 april t/m dinsdag 23 april</li>
            <li>Lisianthus-, Gerbera- en Callashow: donderdag 25 april t/m dinsdag 30 april</li>
            <li>Anjer- en Zomerbloemenshow: donderdag 2 mei t/m zondag 12 mei</li>
          </ul>
          
          <h3 style={{ color: '#2d5016', marginBottom: '8px' }}>Willem-Alexander paviljoen:</h3>
          <p style={{ marginBottom: '16px' }}>Diverse bloemen- en plantenshows, amaryllis, Bol op Pot, kamer- en vaste planten: donderdag 21 maart t/m zondag 12 mei</p>
          
          <button 
            onClick={() => window.open('https://keukenhof.nl/nl/nieuws/bloemenshows-in-jubilerende-keukenhof-hebben-verrassend-decor-en-afwisselende-kalender/', '_blank')}
            style={{
              background: '#FF385C',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold'
            }}
          >
            Meer info
          </button>
        </div>
      </Modal>
    </>
  )
}

const MysterylandCard = () => {
  const { t } = useTranslation()
  return (
    <div className="card" style={{ background: 'linear-gradient(135deg, #8B5CF6, #A855F7)', color: 'white', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'relative', zIndex: 2 }}>
        <h4 style={{ fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '0.5rem', color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
          Mysteryland 2027
        </h4>
        <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.3)', fontStyle: 'italic' }}>Tomorrow is a mystery</p>
        <p style={{ fontSize: '0.8rem', marginBottom: '1rem', color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>Pre-register for 2027</p>
        <button 
          onClick={() => window.open('https://www.mysteryland.nl/', '_blank')}
          style={{
            background: '#FF385C',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          Pre-register
        </button>
      </div>
      <div style={{ position: 'absolute', top: '-20px', right: '-20px', fontSize: '4rem', opacity: 0.15, zIndex: 1 }}>🎭</div>
    </div>
  )
}

const KoningsdagCard = () => {
  const { t } = useTranslation()
  return (
    <div className="card" style={{ background: 'linear-gradient(135deg, #FF6B35, #F7931E)', color: 'white', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'relative', zIndex: 2 }}>
        <h4 style={{ fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '0.5rem', color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
          Koningsdag
        </h4>
        <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>Maandag 27 april 2026</p>
        <p style={{ fontSize: '0.8rem', marginBottom: '1rem', color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>Koningsnacht op zondag 26 april</p>
        <button 
          onClick={() => window.open('https://www.amsterdam.nl/koningsdag/', '_blank')}
          style={{
            background: '#FF385C',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          Meer info
        </button>
      </div>
      <div style={{ position: 'absolute', top: '-20px', right: '-20px', fontSize: '4rem', opacity: 0.15, zIndex: 1 }}>👑</div>
    </div>
  )
}

const PrideCard = () => {
  const { t } = useTranslation()
  return (
    <div className="card" style={{ background: 'linear-gradient(135deg, #e40303, #ff8c00, #ffed00, #008018, #004cff, #732982)', color: 'white', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'relative', zIndex: 2 }}>
        <h4 style={{ fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '0.5rem', color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
          Amsterdam Pride
        </h4>
        <p style={{ fontSize: '0.9rem', marginBottom: '1rem', color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>8 t/m 29 juli 2026</p>
        <button 
          onClick={() => window.open('https://www.pride.amsterdam/', '_blank')}
          style={{
            background: '#FF385C',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          Meer info
        </button>
      </div>
      <div style={{ position: 'absolute', top: '-20px', right: '-20px', fontSize: '4rem', opacity: 0.2, zIndex: 1 }}>🏳️‍🌈</div>
    </div>
  )
}

const WorldPrideCard = () => {
  const { t } = useTranslation()
  return (
    <div className="card" style={{ background: 'linear-gradient(45deg, #e40303, #ff8c00, #ffed00, #008018, #004cff, #732982)', color: 'white', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'relative', zIndex: 2 }}>
        <h4 style={{ fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '0.5rem', color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
          WorldPride
        </h4>
        <p style={{ fontSize: '0.9rem', marginBottom: '1rem', color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>25 juli t/m 8 augustus 2026</p>
        <button 
          onClick={() => window.open('https://www.worldpride2026.com/', '_blank')}
          style={{
            background: '#FF385C',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          Meer info
        </button>
      </div>
      <div style={{ position: 'absolute', top: '-20px', right: '-20px', fontSize: '4rem', opacity: 0.25, zIndex: 1 }}>🌍🏳️🌈</div>
    </div>
  )
}

const MonumentendagCard = () => {
  const { t } = useTranslation()
  return (
    <div className="card" style={{ background: 'linear-gradient(135deg, #8B4513, #A0522D)', color: 'white', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'relative', zIndex: 2 }}>
        <h4 style={{ fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '0.5rem', color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
          Open Monumentendag
        </h4>
        <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>12 en 13 september 2026</p>
        <p style={{ fontSize: '0.8rem', marginBottom: '1rem', color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>Duizenden monumenten gratis toegankelijk</p>
        <button 
          onClick={() => window.open('https://www.openmonumentendag.nl/', '_blank')}
          style={{
            background: '#FF385C',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          Meer info
        </button>
      </div>
      <div style={{ position: 'absolute', top: '-20px', right: '-20px', fontSize: '4rem', opacity: 0.15, zIndex: 1 }}>🏰</div>
    </div>
  )
}

const DamTotDamCard = () => {
  const { t } = useTranslation()
  return (
    <div className="card" style={{ background: 'linear-gradient(135deg, #0066CC, #004499)', color: 'white', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'relative', zIndex: 2 }}>
        <h4 style={{ fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '0.5rem', color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
          NN Dam tot Damloop
        </h4>
        <p style={{ fontSize: '0.9rem', marginBottom: '1rem', color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>19 en 20 september 2026</p>
        <button 
          onClick={() => window.open('https://www.damloop.nl/', '_blank')}
          style={{
            background: '#FF385C',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          Meer info
        </button>
      </div>
      <div style={{ position: 'absolute', top: '-20px', right: '-20px', fontSize: '4rem', opacity: 0.15, zIndex: 1 }}>🏃</div>
    </div>
  )
}

const MarathonCard = () => {
  const { t } = useTranslation()
  return (
    <div className="card" style={{ background: 'linear-gradient(135deg, #DC143C, #B22222)', color: 'white', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'relative', zIndex: 2 }}>
        <h4 style={{ fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '0.5rem', color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
          Amsterdam Marathon
        </h4>
        <p style={{ fontSize: '0.9rem', marginBottom: '1rem', color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>18 oktober 2026</p>
        <button 
          onClick={() => window.open('https://www.tcsamsterdammarathon.nl/', '_blank')}
          style={{
            background: '#FF385C',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          Meer info
        </button>
      </div>
      <div style={{ position: 'absolute', top: '-20px', right: '-20px', fontSize: '4rem', opacity: 0.15, zIndex: 1 }}>🏅</div>
    </div>
  )
}

const CastlefestCard = () => {
  const { t } = useTranslation()
  return (
    <div className="card" style={{ background: 'linear-gradient(135deg, #4B0082, #663399)', color: 'white', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'relative', zIndex: 2 }}>
        <h4 style={{ fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '0.5rem', color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
          Castlefest
        </h4>
        <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>30 juli - 2 augustus 2026</p>
        <p style={{ fontSize: '0.8rem', marginBottom: '1rem', color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>Fantasy festival bij Kasteel Keukenhof</p>
        <button 
          onClick={() => window.open('https://www.castlefest.nl/', '_blank')}
          style={{
            background: '#FF385C',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          Meer info
        </button>
      </div>
      <div style={{ position: 'absolute', top: '-20px', right: '-20px', fontSize: '4rem', opacity: 0.15, zIndex: 1 }}>🏰⚔️</div>
    </div>
  )
}

const DahliaCard = () => {
  const { t } = useTranslation()
  return (
    <div className="card" style={{ background: 'linear-gradient(135deg, #FF69B4, #FF1493)', color: 'white', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'relative', zIndex: 2 }}>
        <h4 style={{ fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '0.5rem', color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
          Dahlia Festival Bollenstreek
        </h4>
        <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>Tot 12 oktober 2026</p>
        <p style={{ fontSize: '0.8rem', marginBottom: '1rem', color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>Prachtige dahlia showtuinen</p>
        <button 
          onClick={() => window.open('https://www.bollenstreek.nl/dahlia-festival/', '_blank')}
          style={{
            background: '#FF385C',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          Meer info
        </button>
      </div>
      <div style={{ position: 'absolute', top: '-20px', right: '-20px', fontSize: '4rem', opacity: 0.15, zIndex: 1 }}>🌸</div>
    </div>
  )
}

const KeukenhofShowsCard = () => {
  const { t } = useTranslation()
  return (
    <div className="card" style={{ background: 'linear-gradient(135deg, #FF6B9D, #E91E63)', color: 'white', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'relative', zIndex: 2 }}>
        <h4 style={{ fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '0.5rem', color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
          Keukenhof Bloemenshows
        </h4>
        <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>Tot 12 mei 2026</p>
        <p style={{ fontSize: '0.8rem', marginBottom: '1rem', color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>Verrassend decor en afwisselende kalender</p>
        <button 
          onClick={() => window.open('https://keukenhof.nl/nl/nieuws/bloemenshows-in-jubilerende-keukenhof-hebben-verrassend-decor-en-afwisselende-kalender/', '_blank')}
          style={{
            background: '#FF385C',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          Meer info
        </button>
      </div>
      <div style={{ position: 'absolute', top: '-20px', right: '-20px', fontSize: '4rem', opacity: 0.15, zIndex: 1 }}>🌺</div>
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



export default App