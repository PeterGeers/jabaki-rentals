import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

const CollapsibleSection = ({ title, children, isOpen, onToggle, titleColor = '#333' }: { title: string; children: React.ReactNode; isOpen: boolean; onToggle: () => void; titleColor?: string }) => (
  <div style={{ marginBottom: '0.5rem', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
    <button 
      onClick={onToggle}
      style={{ 
        width: '100%',
        padding: '0.25rem', 
        background: '#f8f9fa',
        border: 'none',
        textAlign: 'left',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '1.1rem',
        fontWeight: 'bold',
        color: titleColor
      }}
    >
      {title}
      <span style={{ fontSize: '18px', transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
    </button>
    {isOpen && (
      <div style={{ padding: '1rem', background: 'white', lineHeight: '1.6' }}>
        {children}
      </div>
    )}
  </div>
)

const GoodToKnowPage = () => {
  const { t } = useTranslation()
  const [openSections, setOpenSections] = useState<{[key: string]: boolean}>({})
  
  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  return (
    <div style={{ padding: '2rem 0' }}>
      <div className="container">
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '2rem', textAlign: 'center' }}>
          {t('Good to know')}
        </h1>
        
        <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          
          {/* Amenities */}
          <div className="card">
            <CollapsibleSection 
              title={t('Amenities')}
              isOpen={openSections.amenities} 
              onToggle={() => toggleSection('amenities')}
              titleColor='#FF385C'
            >
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
            </CollapsibleSection>
          </div>

          {/* Transportation */}
          <div className="card">
            <CollapsibleSection 
              title={t('Transportation')}
              isOpen={openSections.transportation} 
              onToggle={() => toggleSection('transportation')}
              titleColor='#FF385C'
            >
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
            </CollapsibleSection>
          </div>

          {/* Local Tips */}
          <div className="card">
            <CollapsibleSection 
              title={t('Local Tips')}
              isOpen={openSections.localtips} 
              onToggle={() => toggleSection('localtips')}
              titleColor='#FF385C'
            >
              <ul style={{ listStyle: 'none', padding: 0, lineHeight: '1.6' }}>
                <li style={{ marginBottom: '0.5rem' }}>• {t('Supermarket 5 minutes walk')}</li>
                <li style={{ marginBottom: '0.5rem' }}>• {t('Restaurants nearby')}</li>
                <li style={{ marginBottom: '0.5rem' }}>• {t('Beach 14 km and 50 minutes by bike')}</li>
                <li style={{ marginBottom: '0.5rem' }}>• {t('Our bike can be used based on availability')}</li>
                <li style={{ marginBottom: '0.5rem' }}>• {t('Bike rentals available in Hoofddorp')}</li>
              </ul>
            </CollapsibleSection>
          </div>

          {/* Check-in/Check-out */}
          <div className="card">
            <CollapsibleSection 
              title={t('Check-in & Check-out')}
              isOpen={openSections.checkin} 
              onToggle={() => toggleSection('checkin')}
              titleColor='#FF385C'
            >
              <ul style={{ listStyle: 'none', padding: 0, lineHeight: '1.6' }}>
                <li style={{ marginBottom: '0.5rem' }}>• {t('Check-in: 15:00 - 22:00')}</li>
                <li style={{ marginBottom: '0.5rem' }}>• {t('Check-out: before 11:00')}</li>
                <li style={{ marginBottom: '0.5rem' }}>• {t('Self check-in with key box')}</li>
              </ul>
            </CollapsibleSection>
          </div>

          {/* House Rules */}
          <div className="card">
            <CollapsibleSection 
              title={t('House Rules')}
              isOpen={openSections.houserules} 
              onToggle={() => toggleSection('houserules')}
              titleColor='#FF385C'
            >
              <ul style={{ listStyle: 'none', padding: 0, lineHeight: '1.6' }}>
                <li style={{ marginBottom: '0.5rem' }}>• {t('No smoking inside')}</li>
                <li style={{ marginBottom: '0.5rem' }}>• {t('No parties or events')}</li>
                <li style={{ marginBottom: '0.5rem' }}>• {t('Quiet hours: 22:00 - 08:00')}</li>
                <li style={{ marginBottom: '0.5rem' }}>• {t('Maximum occupancy as listed')}</li>
              </ul>
            </CollapsibleSection>
          </div>

          {/* Emergency */}
          <div className="card">
            <CollapsibleSection 
              title={t('Noodgeval')}
              isOpen={openSections.emergency} 
              onToggle={() => toggleSection('emergency')}
              titleColor='#FF385C'
            >
              <ul style={{ listStyle: 'none', padding: 0, lineHeight: '1.6' }}>
                <li style={{ marginBottom: '0.5rem' }}>• {t('Medisch: 112')}</li>
                <li style={{ marginBottom: '0.5rem' }}>• {t('Brand: 112')}</li>
                <li style={{ marginBottom: '0.5rem' }}>• {t('Politie: 112 of 0900-8844')}</li>
                <li style={{ marginBottom: '0.5rem' }}>• {t('Gastheer contact 24/7 beschikbaar')}</li>
                <li style={{ marginBottom: '0.5rem' }}>• {t('Ziekenhuis 10 minuten rijden')}</li>
              </ul>
            </CollapsibleSection>
          </div>

          {/* Children Activities Section */}
          <div className="card">
            <CollapsibleSection 
              title={t('gardenhouse.children.title')}
              isOpen={openSections.children} 
              onToggle={() => toggleSection('children')}
              titleColor='#FF385C'
            >
              <ul style={{ listStyle: 'none', padding: 0, lineHeight: '1.6' }}>
                <li style={{ marginBottom: '0.5rem' }}>• {t('gardenhouse.children.item1')}</li>
                <li style={{ marginBottom: '0.5rem' }}>• {t('gardenhouse.children.item2')}</li>
                <li style={{ marginBottom: '0.5rem' }}>• {t('gardenhouse.children.item3')}</li>
                <li style={{ marginBottom: '0.5rem' }}>• {t('gardenhouse.children.item4')}</li>
                <li style={{ marginBottom: '0.5rem' }}>• {t('gardenhouse.children.item5')}</li>
                <li style={{ marginBottom: '0.5rem' }}>• {t('gardenhouse.children.item6')}</li>
                <li style={{ marginBottom: '0.5rem' }}>• {t('gardenhouse.children.item7')}</li>
                <li style={{ marginBottom: '0.5rem' }}>• {t('gardenhouse.children.item8')}</li>
              </ul>
            </CollapsibleSection>
          </div>

          {/* Interesting Places Section */}
          <div className="card">
            <CollapsibleSection 
              title={t('Interesting places to visit')}
              isOpen={openSections.places} 
              onToggle={() => toggleSection('places')}
              titleColor='#FF385C'
            >
              <ul style={{ listStyle: 'none', padding: 0, lineHeight: '1.6' }}>
                <li style={{ marginBottom: '0.5rem' }}>• {t('Amsterdam City Center')}</li>
                <li style={{ marginBottom: '0.5rem' }}>• {t('Schiphol Airport')}</li>
                <li style={{ marginBottom: '0.5rem' }}>• {t('Amsterdam beach (Zandvoort)')}</li>
                <li style={{ marginBottom: '0.5rem' }}>• {t('Langevelderslag (Beach)')}</li>
                <li style={{ marginBottom: '0.5rem' }}>• {t('Haarlem City Center')}</li>
                <li style={{ marginBottom: '0.5rem' }}>• {t('Bergen (artist village)')}</li>
                <li style={{ marginBottom: '0.5rem' }}>• {t('The Bazaar Beverwijk')}</li>
                <li style={{ marginBottom: '0.5rem' }}>• {t('Alkmaar Cheese')}</li>
                <li style={{ marginBottom: '0.5rem' }}>• {t('Linneaushof Bennebroek')}</li>
                <li style={{ marginTop: '0.5rem', fontWeight: 'bold', color: '#FF385C' }}>{t('During april and may')}</li>
                <li style={{ marginBottom: '0.5rem' }}>• {t('Keukenhof')}</li>
                <li style={{ marginBottom: '0.5rem' }}>• {t('Flowerbulb route')}</li>
              </ul>
            </CollapsibleSection>
          </div>

          {/* Restaurants & Cafés Section */}
          <div className="card">
            <CollapsibleSection 
              title={t('Restaurants & Cafés')}
              isOpen={openSections.restaurants} 
              onToggle={() => toggleSection('restaurants')}
              titleColor='#FF385C'
            >
              <ul style={{ listStyle: 'none', padding: 0, lineHeight: '1.6' }}>
                <li style={{ marginBottom: '0.5rem' }}>• De Polderboom, Marktplein 31, 2132 DA Hoofddorp</li>
                <li style={{ marginBottom: '0.5rem' }}>• Josephines cocktails, wines and bites, Tuinweg 3, 2132 DN Hoofddorp</li>
                <li style={{ marginBottom: '0.5rem' }}>• 11 Bar&Kitchen, Marktplein 11, 2132 BR Hoofddorp</li>
                <li style={{ marginBottom: '0.5rem' }}>• Trattoria Buoni Amici, Concourslaan 3, 2132 DH Hoofddorp</li>
                <li style={{ marginBottom: '0.5rem' }}>• Pizzeria Amici, Kruisweg 949, 2132 CD Hoofddorp</li>
                <li style={{ marginBottom: '0.5rem' }}>• Restaurant L'Hirondelle, Boslaan 7, 2132 RJ Hoofddorp</li>
                <li style={{ marginBottom: '0.5rem' }}>• Restaurant De Beren, Raadhuisplein 3, 2132 TZ Hoofddorp</li>
              </ul>
            </CollapsibleSection>
          </div>

          {/* Supermarkets & Shops Section */}
          <div className="card">
            <CollapsibleSection 
              title={t('Supermarkets & Shops')}
              isOpen={openSections.shops} 
              onToggle={() => toggleSection('shops')}
              titleColor='#FF385C'
            >
              <ul style={{ listStyle: 'none', padding: 0, lineHeight: '1.6' }}>
                <li style={{ marginBottom: '0.5rem' }}>• Albert Heijn (15 min lopen) - Grote supermarkt</li>
                <li style={{ marginBottom: '0.5rem' }}>• Jumbo Hoofddorp (10 min) - Supermarkt</li>
                <li style={{ marginBottom: '0.5rem' }}>• Lidl (5 min) - Budget supermarkt</li>
                <li style={{ marginBottom: '0.5rem' }}>• Hoogvliet (5 min) - Budget supermarkt</li>
                <li style={{ marginBottom: '0.5rem' }}>• Etos (15 min) - Drogisterij</li>
                <li style={{ marginBottom: '0.5rem' }}>• Action (15 min) - Huishoudelijke artikelen</li>
                <li style={{ marginBottom: '0.5rem' }}>• Winkelcentrum Vier Meren (15 min) - Winkelcentrum</li>
              </ul>
            </CollapsibleSection>
          </div>

          {/* Attractions Section */}
          <div className="card">
            <CollapsibleSection 
              title={t('Attractions')}
              isOpen={openSections.attractions} 
              onToggle={() => toggleSection('attractions')}
              titleColor='#FF385C'
            >
              <ul style={{ listStyle: 'none', padding: 0, lineHeight: '1.6' }}>
                <li style={{ marginBottom: '0.5rem' }}>• Haarlemmermeersebos - Natuurpark</li>
                <li style={{ marginBottom: '0.5rem' }}>• Toolenburgseplas - Recreatieplas</li>
                <li style={{ marginBottom: '0.5rem' }}>• Cruquius Museum - Historisch museum</li>
                <li style={{ marginBottom: '0.5rem' }}>• Zandvoort Beach - Strand</li>
                <li style={{ marginBottom: '0.5rem' }}>• Langevelderslag - Strand</li>
                <li style={{ marginBottom: '0.5rem' }}>• Amsterdamse Bos - Groot stadspark</li>
              </ul>
            </CollapsibleSection>
          </div>

          {/* Entertainment Section */}
          <div className="card">
            <CollapsibleSection 
              title={t('Entertainment')}
              isOpen={openSections.entertainment} 
              onToggle={() => toggleSection('entertainment')}
              titleColor='#FF385C'
            >
              <ul style={{ listStyle: 'none', padding: 0, lineHeight: '1.6' }}>
                <li style={{ marginBottom: '0.5rem' }}>• Kinepolis Hoofddorp, Raadhuisplein 12, 2132 TZ Hoofddorp</li>
                <li style={{ marginBottom: '0.5rem' }}>• Sportcomplex Koning Willem-Alexander, Bennebroekerweg 800, 2134 AB Hoofddorp</li>
                <li style={{ marginBottom: '0.5rem' }}>• Claus Bowling, Bosweg 19, 2131 LX Hoofddorp</li>
              </ul>
            </CollapsibleSection>
          </div>

        </div>
        
        {/* Terms and Conditions Section */}
        <div style={{ marginTop: '3rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center', color: '#FF385C' }}>
            {t('terms.title')}
          </h2>
          <p style={{ textAlign: 'center', marginBottom: '1rem', color: '#666', fontStyle: 'italic' }}>
            {t('terms.subtitle')}
          </p>
          <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#888', fontSize: '0.9rem' }}>
            Legal content is provided in English for accuracy and legal validity
          </p>
          
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <CollapsibleSection 
              title={t('terms.section1.title')}
              isOpen={openSections.terms} 
              onToggle={() => toggleSection('terms')}
            >
              <p><strong>"JaBaKi Studios"</strong> – the trade name under which Goodwin Solutions B.V., a private limited company (besloten vennootschap) registered in the Netherlands, offers short-term rental accommodations.</p>
              <p><strong>"Company"</strong> – refers to Goodwin Solutions B.V., registered at the Dutch Chamber of Commerce (Kamer van Koophandel) under number 24352408, with registered office in Hoofddorp, the Netherlands.</p>
              <p><strong>"Accommodation"</strong> – the property, apartment, or room offered by JaBaKi Studios for temporary rental to Guests.</p>
              <p><strong>"Agreement"</strong> – the legally binding rental contract between JaBaKi Studios and the Guest, including these Terms and any special conditions confirmed in writing.</p>
              <p><strong>"Guest"</strong> – the natural person or legal entity renting and/or occupying the Accommodation under the Agreement.</p>
              <p><strong>"Booking"</strong> – the reservation made by the Guest for the Accommodation, confirmed by JaBaKi Studios.</p>
              <p><strong>"Rental Period"</strong> – the specific dates for which the Guest has booked the Accommodation.</p>
              <p><strong>"Rental Price"</strong> – the total amount payable by the Guest, including applicable taxes, service charges, and cleaning fees, unless otherwise agreed.</p>
              <p><strong>"Security Deposit"</strong> – a refundable amount paid by the Guest to cover potential damages, losses, or excessive cleaning costs.</p>
              <p><strong>"Check-in / Check-out"</strong> – the times agreed for arrival and departure.</p>
              <p><strong>"Force Majeure"</strong> – circumstances beyond the reasonable control of either party, including but not limited to natural disasters, government restrictions, or utility outages.</p>
              <p><strong>"Personal Data"</strong> – any information relating to an identifiable individual, as defined under the EU General Data Protection Regulation (GDPR).</p>
              <p><strong>"Applicable Law"</strong> – Dutch law (het Nederlandse recht), including the Dutch Civil Code (Burgerlijk Wetboek), local municipal regulations, and EU law.</p>
              <p><strong>"Municipality"</strong> – the local authority (gemeente) in which the Accommodation is located.</p>
            </CollapsibleSection>
            
            <CollapsibleSection 
              title={t('terms.section2.title')}
              isOpen={openSections.scope} 
              onToggle={() => toggleSection('scope')}
            >
              <p>These Terms apply to all short-term rental bookings between JaBaKi Studios (Goodwin Solutions B.V.) and Guests.</p>
              <p>The Agreement is valid only for the Rental Period confirmed by JaBaKi Studios.</p>
              <p>The Accommodation is offered exclusively for temporary stay and not for permanent residence.</p>
            </CollapsibleSection>
            
            <CollapsibleSection 
              title={t('terms.section3.title')}
              isOpen={openSections.booking} 
              onToggle={() => toggleSection('booking')}
            >
              <p>A Booking is confirmed only after written confirmation (email or digital message) is issued by JaBaKi Studios.</p>
              <p>Payment terms, including deposits and balances, are specified at the time of booking.</p>
              <p>A Security Deposit may be requested and will be refunded within seven (7) days after Check-out, provided no damage or excessive cleaning is required.</p>
              <p>Failure to make payment on time may result in cancellation without refund.</p>
            </CollapsibleSection>
            
            <CollapsibleSection 
              title={t('terms.section4.title')}
              isOpen={openSections.cancellation} 
              onToggle={() => toggleSection('cancellation')}
            >
              <p>Cancellations are subject to the policy communicated at the time of booking.</p>
              <p>If no specific policy applies:</p>
              <p>• Cancellation more than 14 days before arrival → full refund minus €25 administration fee.</p>
              <p>• Cancellation within 14 days → 50% refund.</p>
              <p>• Cancellation within 48 hours of check-in → no refund.</p>
              <p>JaBaKi Studios reserves the right to cancel in cases of Force Majeure, providing a full refund without further liability.</p>
            </CollapsibleSection>
            
            <CollapsibleSection 
              title={t('terms.section5.title')}
              isOpen={openSections.obligations} 
              onToggle={() => toggleSection('obligations')}
            >
              <p>Guests must use the Accommodation responsibly and in compliance with Dutch law and municipal regulations (including short-stay and registration rules).</p>
              <p>Smoking, parties, or subletting are not permitted unless explicitly agreed in writing.</p>
              <p>Guests must not cause nuisance or disturbance to neighbours.</p>
              <p>The number of occupants may not exceed the number specified in the Booking.</p>
              <p>Guests must notify JaBaKi Studios immediately of any damage or defect.</p>
              <p>The Guest is liable for all damage caused by negligence, misuse, or violation of these Terms during the Rental Period.</p>
            </CollapsibleSection>
            
            <CollapsibleSection 
              title={t('terms.section6.title')}
              isOpen={openSections.host} 
              onToggle={() => toggleSection('host')}
            >
              <p>JaBaKi Studios shall provide the Accommodation in clean, safe, and habitable condition.</p>
              <p>The Company is not liable for interruptions to utilities or services beyond its control.</p>
              <p>Personal Data will be handled strictly in accordance with GDPR and Dutch privacy law.</p>
            </CollapsibleSection>
            
            <CollapsibleSection 
              title={t('terms.section7.title')}
              isOpen={openSections.liability} 
              onToggle={() => toggleSection('liability')}
            >
              <p>Guests are responsible for their personal belongings. JaBaKi Studios is not liable for theft, loss, or damage, except in cases of gross negligence.</p>
              <p>Guests are encouraged to have appropriate travel and liability insurance.</p>
              <p>The Company's total liability is limited to the total Rental Price paid by the Guest.</p>
            </CollapsibleSection>
            
            <CollapsibleSection 
              title={t('terms.section8.title')}
              isOpen={openSections.force} 
              onToggle={() => toggleSection('force')}
            >
              <p>Neither JaBaKi Studios nor the Guest shall be held liable for non-performance due to Force Majeure.</p>
              <p>If such an event continues for more than 14 days, either party may terminate the Agreement without penalty.</p>
            </CollapsibleSection>
            
            <CollapsibleSection 
              title={t('terms.section9.title')}
              isOpen={openSections.privacy} 
              onToggle={() => toggleSection('privacy')}
            >
              <p>JaBaKi Studios collects and processes Personal Data only for booking management, payment processing, and legal compliance.</p>
              <p>Data may be shared with third parties (e.g., payment processors or municipal authorities) only when required by law or necessary for legitimate business operations.</p>
              <p>Guests may request access, correction, or deletion of their data in accordance with GDPR Articles 15–17.</p>
            </CollapsibleSection>
            
            <CollapsibleSection 
              title={t('terms.section10.title')}
              isOpen={openSections.law} 
              onToggle={() => toggleSection('law')}
            >
              <p>These Terms are governed exclusively by Dutch law (het Nederlandse recht). Any dispute shall be submitted to the competent court in the district where the Accommodation is located, unless mandatory consumer protection law provides otherwise.</p>
            </CollapsibleSection>
            
            <CollapsibleSection 
              title={t('terms.section11.title')}
              isOpen={openSections.misc} 
              onToggle={() => toggleSection('misc')}
            >
              <p>If any provision of these Terms is found invalid, the remaining provisions shall remain in full effect.</p>
              <p>Amendments must be made in writing and agreed by both parties.</p>
              <p>Communication between JaBaKi Studios and Guests may take place electronically and is considered legally valid.</p>
            </CollapsibleSection>
            
            <div style={{ 
              marginTop: '2rem', 
              padding: '1.5rem', 
              background: '#f8f9fa', 
              borderRadius: '8px',
              fontSize: '0.9rem',
              color: '#333',
              border: '1px solid #e2e8f0'
            }}>
              <h4 style={{ color: '#FF385C', marginBottom: '1rem', fontSize: '1.1rem' }}>📄 JaBaKi Studios</h4>
              <p><strong>A Goodwin Solutions B.V. company</strong></p>
              <p>Registered at the Dutch Chamber of Commerce (Kamer van Koophandel) under number 24352408</p>
              <p><strong>Registered office:</strong> Beemsterstraat 3, 2131 ZA, Hoofddorp</p>
              <p><strong>Email:</strong> peter@jabaki.nl</p>
              <p><strong>Website:</strong> www.jabaki.nl</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default GoodToKnowPage