import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// BrandCard Component to handle local image loading and fallback
function BrandCard({ brand, selectedBrand, onSelect }) {
  const [imgError, setImgError] = useState(false);

  // Reset image error state when brand changes (useful if data updates)
  useEffect(() => {
    setImgError(false);
  }, [brand]);

  return (
    <motion.div 
      whileHover={{ scale: 1.05, borderColor: 'var(--accent-color)' }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onSelect(brand)}
      className={`brand-card glass-card ${selectedBrand?.name === brand.name ? 'featured' : ''}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '140px'
      }}
    >
      {!imgError ? (
        <>
          <div className="brand-card-logo">
            <img 
              src={brand.logo} 
              alt={`${brand.name} Logo`} 
              className="brand-logo-img" 
              onError={() => setImgError(true)}
            />
          </div>
          <div className="brand-card-name">{brand.name}</div>
        </>
      ) : (
        <div className="brand-card-name">{brand.name}</div>
      )}
    </motion.div>
  );
}

export default function Brands({ onNavigate }) {
  const brandsData = [
    { id: '1', name: 'Toyota', logo: '/brands/toyota.svg', tagline: 'Reliable Engineering & Longevity', models: ['Fortuner', 'Innova Crysta', 'Camry', 'Glanza', 'Urban Cruiser Taisor'], cost: '₹2,199 - ₹7,699', recom: ['Engine tuning at 10,000km', 'Standard/Premium Package for long durability', 'Synthetic oil replacements'] },
    { id: '2', name: 'Honda', logo: '/brands/honda.svg', tagline: 'VTEC Precision & Refinement', models: ['City', 'Civic', 'Amaze', 'Elevate', 'WR-V'], cost: '₹2,199 - ₹7,699', recom: ['AC performance diagnostic testing', 'Brakes checking every 6 months', 'Standard Service package'] },
    { id: '3', name: 'Hyundai', logo: '/brands/hyundai.svg', tagline: 'Modern Technology & Styling', models: ['Creta', 'i20 Elite', 'Verna', 'Tucson', 'Venue'], cost: '₹2,199 - ₹7,699', recom: ['Steering calibration diagnostic scan', 'Periodic servicing at 5,000km', 'Full diagnostic check'] },
    { id: '4', name: 'Maruti Suzuki', logo: '/brands/maruti_suzuki.svg', tagline: 'Maximum Efficiency & Service Network', models: ['Swift', 'Baleno', 'Brezza', 'Ertiga', 'Grand Vitara'], cost: '₹1,999 - ₹6,999', recom: ['Basic Package tuning schedules', 'Filter replacements every 6 months', 'Suspension inspection'] },
    { id: '5', name: 'Tata Motors', logo: '/brands/tata_motors.svg', tagline: 'Strong Built & Security First', models: ['Nexon', 'Harrier', 'Safari', 'Altroz', 'Punch'], cost: '₹2,199 - ₹7,699', recom: ['Standard Package checkups', 'Wheel alignment inspection', 'Engine diagnostic safety check'] },
    { id: '6', name: 'Mahindra', logo: '/brands/mahindra.svg', tagline: 'Authentic SUVs & Durable Performance', models: ['Thar', 'XUV700', 'Scorpio-N', 'Bolero', 'XUV300'], cost: '₹2,199 - ₹7,699', recom: ['Tire rotation and brake inspections', 'Underbody washing & details coating', 'Standard service tuning'] },
    { id: '7', name: 'Kia', logo: '/brands/kia.svg', tagline: 'Futuristic Cabins & Driving Thrills', models: ['Seltos', 'Sonet', 'Carens', 'Carnival', 'EV6'], cost: '₹2,199 - ₹7,699', recom: ['Electrical OBD scanning checks', 'AC clean & sterilization', 'Periodic oil check'] },
    { id: '8', name: 'BMW', logo: '/brands/bmw.svg', tagline: 'Sheer Driving Pleasure', models: ['3 Series', '5 Series', 'X5 SUV', 'i7 Electric', 'Z4 Roadster'], cost: '₹2,999 - ₹10,499', recom: ['OBD diagnostic scanner check', 'Premium Package every 10,000km', 'Synthetic filter & oil exchange'] },
    { id: '9', name: 'Mercedes-Benz', logo: '/brands/mercedes_benz.svg', tagline: 'The Best or Nothing', models: ['C-Class', 'E-Class Sedan', 'GLC Luxury SUV', 'S-Class flagship', 'AMG-GLE'], cost: '₹2,999 - ₹10,499', recom: ['Engine calibration scan checks', 'Premium Package diagnostic checking', 'Breakpad alignment inspections'] },
    { id: '10', name: 'Audi', logo: '/brands/audi.svg', tagline: 'Vorsprung durch Technik', models: ['A4', 'A6 Executive', 'Q5 Premium', 'Q7 Family', 'e-tron EV'], cost: '₹2,999 - ₹10,499', recom: ['Complete electronics system diagnostic', 'Premium service checkup schedule', 'Dynamic wheel balance checks'] }
  ];

  const [selectedBrand, setSelectedBrand] = useState(null);
  const [detailImgError, setDetailImgError] = useState(false);

  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
    setDetailImgError(false);
  };

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="section" 
      style={{ paddingTop: '120px' }}
    >
      <div className="container">
        <div className="section-header">
          <h1 className="section-title">Explore Supported <span>Car Brands</span></h1>
          <p className="section-subtitle">We have certified mechanics and custom diagnostic profiles tailored for every major brand. Select your brand to explore.</p>
        </div>

        {/* Brand Grid */}
        <div className="brands-grid">
          {brandsData.map(b => (
            <BrandCard 
              key={b.id} 
              brand={b} 
              selectedBrand={selectedBrand} 
              onSelect={handleBrandSelect} 
            />
          ))}
        </div>

        {/* Brand Details Panel */}
        <AnimatePresence mode="wait">
          {selectedBrand && (
            <motion.div 
              key={selectedBrand.id}
              initial={{ height: 0, opacity: 0, y: 20 }}
              animate={{ height: 'auto', opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="brand-details-pane glass-card"
              style={{ display: 'block', overflow: 'hidden' }}
            >
              <div className="brand-details-header" style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
                {!detailImgError && (
                  <div className="brand-card-logo" style={{ margin: 0 }}>
                    <img 
                      src={selectedBrand.logo} 
                      alt={`${selectedBrand.name} Logo`} 
                      className="brand-logo-img" 
                      onError={() => setDetailImgError(true)}
                    />
                  </div>
                )}
                <div>
                  <h2 style={{ fontSize: '1.8rem', margin: 0 }}>{selectedBrand.name}</h2>
                  <p style={{ color: 'var(--text-muted)', margin: 0 }}>{selectedBrand.tagline}</p>
                </div>
              </div>

              <div className="brand-details-grid">
                <div>
                  <h3 style={{ marginBottom: '15px' }}>
                    <i className="fas fa-car-side" style={{ color: 'var(--accent-color)', marginRight: '8px' }}></i> Popular Models
                  </h3>
                  <div className="brand-models-list">
                    {selectedBrand.models.map((m, idx) => (
                      <span key={idx} className="model-tag">{m}</span>
                    ))}
                  </div>

                  <div style={{ marginTop: '30px' }}>
                    <h3 style={{ marginBottom: '10px' }}>
                      <i className="fas fa-coins" style={{ color: 'var(--accent-color)', marginRight: '8px' }}></i> Average Cost of Servicing
                    </h3>
                    <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-color)' }}>{selectedBrand.cost}</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Calculated based on basic vs premium packages plus spare part indices.</p>
                  </div>
                </div>

                <div>
                  <h3 style={{ marginBottom: '15px' }}>
                    <i className="fas fa-shield-alt" style={{ color: 'var(--accent-color)', marginRight: '8px' }}></i> Recommended Packages
                  </h3>
                  <ul className="package-features">
                    {selectedBrand.recom.map((r, idx) => (
                      <li key={idx}><i className="fas fa-check" style={{ color: 'var(--success)' }}></i> {r}</li>
                    ))}
                  </ul>
                  
                  <div style={{ marginTop: '30px' }}>
                    <button 
                      onClick={() => onNavigate('booking', { brand: selectedBrand.name })} 
                      className="btn btn-primary"
                    >
                      <i className="fas fa-calendar-check"></i> Book Servicing for this Brand
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
