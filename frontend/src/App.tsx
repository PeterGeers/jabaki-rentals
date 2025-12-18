import { Routes, Route, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'

import imagesData from './data/images.json'
import GoodToKnowPage from './pages/GoodToKnowPage'
import RedStudioPage from './pages/RedStudioPage'
import GreenStudioPage from './pages/GreenStudioPage'
import GardenStudioPage from './pages/GardenStudioPage'
import { getGoogleImageUrl } from './utils/googleImages'
import { MetadataProvider } from './components/seo/MetadataManager'

function App() {
  const { t, i18n } = useTranslation()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  return (
    <MetadataProvider>
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
          flexDirection: window.innerWidth < 768 ? 'column' : 'row',
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '1rem 1.5rem',
          gap: '1rem'
        }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <LogoImage />
          </Link>
          <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link to="/" style={{ textDecoration: 'none', color: '#333', whiteSpace: 'nowrap' }}>{t('Home')}</Link>
            <Link to="/events" style={{ textDecoration: 'none', color: '#333', whiteSpace: 'nowrap' }}>{t('Events')}</Link>
            <Link to="/good-to-know" style={{ textDecoration: 'none', color: '#333', whiteSpace: 'nowrap' }}>{t('Good to know')}</Link>
            <select 
              value={i18n.language} 
              onChange={(e) => changeLanguage(e.target.value)}
              style={{ 
                padding: '0.5rem', 
                border: '1px solid #ccc', 
                borderRadius: '4px', 
                background: 'white', 
                cursor: 'pointer',
                marginLeft: '1rem',
                fontSize: '0.9rem'
              }}
            >
              <option value="en">🇬🇧 EN</option>
              <option value="nl">🇳🇱 NL</option>
              <option value="de">🇩🇪 DE</option>
            </select>
          </nav>
        </div>
      </header>
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/good-to-know" element={<GoodToKnowPage />} />
        <Route path="/red-studio" element={<RedStudioPage />} />
        <Route path="/green-studio" element={<GreenStudioPage />} />
        <Route path="/garden-studio" element={<GardenStudioPage />} />
      </Routes>
      
      <footer style={{
        background: '#333',
        color: 'white',
        padding: '2rem 0',
        marginTop: '3rem'
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ flex: '1', minWidth: '250px' }}>
            <p style={{ margin: '0', fontSize: '0.9rem' }}>
              Beemsterstraat 3, 2131 ZA Hoofddorp | Tel: +31621893861 | Email: <a href="mailto:peter@jabaki.nl" style={{ color: '#FF385C' }}>peter@jabaki.nl</a> | Website: <a href="https://www.jabaki.nl" target="_blank" rel="noopener noreferrer" style={{ color: '#FF385C' }}>www.jabaki.nl</a>
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <a href="https://www.facebook.com/JaBaKigastenverblijf/" target="_blank" rel="noopener noreferrer" style={{
              color: '#1877F2',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
    </MetadataProvider>
  )
}

const HomePage = () => {
  const { t } = useTranslation()
  return (
    <div>
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
      
      <section style={{ background: '#f7fafc', padding: '1rem 0' }}>
        <div className="container">
          <h2 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center' }}>
            {t('Check availability')}
          </h2>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <iframe 
              src="/guesty-widget.html" 
              title="Booking Widget"
              style={{ 
                flex: '1 1 600px', 
                height: '240px', 
                border: 'none', 
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
            />

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
    getGoogleImageUrl('1EJ1wo3qCWUzdUOoW5AYhZM1Fhz0vGJyW').then(url => {
      console.log('Logo URL:', url)
      setLogoUrl(url)
    })
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
      style={{ 
        maxHeight: '120px', 
        width: 'auto',
        height: 'clamp(40px, 6vw, 120px)'
      }}
      crossOrigin="anonymous"
      referrerPolicy="no-referrer"
    />
  )
}

const PreloadedImage = ({ imageUrl, name, imageName }: { imageUrl: string; name: string; imageName: string }) => {
  const [imageError, setImageError] = useState(false)
  
  if (!imageUrl) {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#666',
        fontSize: '1rem'
      }}>
        {imageName || 'No image'}
      </div>
    )
  }
  
  if (imageError) {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#666',
        fontSize: '1rem'
      }}>
        {imageName}
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
      onError={() => setImageError(true)}
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
  const [imageUrls, setImageUrls] = useState<{[key: string]: string}>({})
  const [imagesLoaded, setImagesLoaded] = useState(false)

  
  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }))
  }
  
  useEffect(() => {
    const loadAllImages = async () => {
      const imagesWithNames = getImagesWithNames()
      const urls: {[key: string]: string} = {}
      
      for (const [imageName, imageId] of imagesWithNames) {
        try {
          const url = await getGoogleImageUrl(imageId)
          urls[imageName] = url
        } catch (error) {
          console.error(`Failed to load image ${imageName}:`, error)
          urls[imageName] = ''
        }
      }
      
      setImageUrls(urls)
      setImagesLoaded(true)
    }
    
    loadAllImages()
  }, [id])
  
  // Autoplay functionality
  useEffect(() => {
    if (!autoplayEnabled || !imagesLoaded) return
    
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => {
        const imagesWithNames = getImagesWithNames()
        return (prev + 1) % imagesWithNames.length
      })
    }, 4000)
    
    return () => clearInterval(interval)
  }, [autoplayEnabled, imagesLoaded, id])
  
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
  const propertyImages = (imagesData.properties as any)[id] || {}
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
            {imagesLoaded && imagesWithNames.map(([imageName], index) => (
              <div 
                key={index} 
                style={{ 
                  width: '100%', 
                  height: '100%',
                  display: currentImageIndex === index ? 'block' : 'none'
                }}
              >
                <PreloadedImage imageUrl={imageUrls[imageName]} name={name} imageName={imageName} />
              </div>
            ))}
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
                setAutoplayEnabled(false)
                setCurrentImageIndex(index)
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
          

        </div>
      </Modal>
    </div>
  )
}

const F1Card = () => {
  return (
    <div className="card" style={{ background: 'linear-gradient(135deg, #e10600, #ff6600)', color: 'white', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'relative', zIndex: 2 }}>
        <h4 style={{ fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '0.5rem', color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
          Dutch F1 Grand Prix
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
  return (
    <div className="card" style={{ background: 'linear-gradient(135deg, #1a1a1a, #333333)', color: 'white', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'relative', zIndex: 2 }}>
        <h4 style={{ fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '0.5rem', color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
          Amsterdam Dance Event
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
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <div className="card" style={{ background: 'linear-gradient(135deg, #2d5016, #4a7c59)', color: 'white', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h4 style={{ fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '0.5rem', color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
            Keukenhof Gardens
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







export default App