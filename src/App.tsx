import { Routes, Route, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

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
      <section style={{ background: '#f7fafc', padding: '5rem 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            {t('Find your next stay')}
          </h2>
          <p style={{ fontSize: '1.25rem', color: '#666', marginBottom: '2rem' }}>
            {t('Discover amazing places to stay in Amsterdam and surroundings')}
          </p>
          <div style={{ 
            background: 'white', 
            padding: '0.5rem', 
            borderRadius: '50px', 
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            maxWidth: '600px',
            margin: '0 auto',
            display: 'flex',
            gap: '0.5rem'
          }}>
            <input 
              placeholder={t('Where are you going?')} 
              style={{ 
                border: 'none', 
                padding: '1rem 1.5rem', 
                flex: 1, 
                outline: 'none' 
              }} 
            />
            <input 
              type="date" 
              style={{ 
                border: 'none', 
                padding: '1rem 1.5rem', 
                outline: 'none' 
              }} 
            />
            <button className="btn btn-primary" style={{ borderRadius: '50px', padding: '1rem 2rem' }}>
              {t('Search')}
            </button>
          </div>
        </div>
      </section>
      
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <h3 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>
            {t('Upcoming Events')}
          </h3>
          <div className="grid grid-3">
            <EventCard title={t('Keukenhof Gardens')} date="Mar - May 2024" />
            <EventCard title={t('Amsterdam Dance Event')} date="Oct 2024" />
            <EventCard title={t('Dutch F1 Grand Prix')} date="Aug 2024" />
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