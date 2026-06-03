import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Services({ onNavigate, wishlist, toggleWishlist, recentlyViewed, addRecentlyViewed }) {
  // Services Data
  const servicesData = [
    { id: '1', title: 'Periodic Service', category: 'Maintenance', price: 2499, img: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80', desc: 'Complete 40-point maintenance inspect, engine oil top-up, spark plugs inspection and filter check.' },
    { id: '2', title: 'Oil Change', category: 'Maintenance', price: 1499, img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80', desc: 'Premium synthetic oil replace & lubricant check with standard oil filter replacements.' },
    { id: '3', title: 'Brake Repair', category: 'Repairs', price: 1899, img: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80', desc: 'Inspection of calipers, pads replacement, lines bleeding and diagnostic safety report.' },
    { id: '4', title: 'Wheel Alignment', category: 'Repairs', price: 899, img: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80', desc: 'Precise 3D wheel alignment, tracking adjustment and dynamic balancing for safety.' },
    { id: '5', title: 'AC Service', category: 'Repairs', price: 1299, img: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80', desc: 'Cabin filter cleaning, vent sterilization and AC refrigerant gas top-up.' },
    { id: '6', title: 'Engine Repair', category: 'Repairs', price: 9999, img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80', desc: 'Advanced engine overhaul, valve tuning, diagnostic error clearance and performance tuning.' },
    { id: '7', title: 'Battery Replacement', category: 'Maintenance', price: 3499, img: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80', desc: 'High capacity battery installation with 36 months warranty and old battery recycling.' },
    { id: '8', title: 'Dent & Paint', category: 'Cleaning', price: 4999, img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80', desc: 'Precision scratch extraction, paint match code painting and high-gloss polish overlay.' },
    { id: '9', title: 'Car Wash', category: 'Cleaning', price: 599, img: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=600&q=80', desc: 'High pressure shampoo wash, underbody clean, dashboard cleaning and vacuum service.' },
    { id: '10', title: 'Insurance Claim Assistance', category: 'Utility', price: 0, img: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80', desc: 'End-to-end documentation preparation, garage inspector coordinates and quick claim processing.' }
  ];

  // Filters State
  const [categories, setCategories] = useState({
    Maintenance: true,
    Repairs: true,
    Cleaning: true,
    Utility: true
  });
  const [maxPrice, setMaxPrice] = useState(10000);
  const [searchQuery, setSearchQuery] = useState('');

  // Cost Calculator State
  const [calcBrand, setCalcBrand] = useState('Toyota');
  const [calcService, setCalcService] = useState('Periodic Service');
  const [calcQuote, setCalcQuote] = useState(null);

  // Toggle Category
  const handleCategoryChange = (cat) => {
    setCategories(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  // Reset Filters
  const handleResetFilters = () => {
    setCategories({
      Maintenance: true,
      Repairs: true,
      Cleaning: true,
      Utility: true
    });
    setMaxPrice(10000);
    setSearchQuery('');
  };

  // Run Calculator
  const handleGetQuote = () => {
    const item = servicesData.find(s => s.title === calcService);
    if (!item) return;

    let price = item.price;
    const luxury = ['BMW', 'Mercedes-Benz', 'Audi'];
    const mid = ['Toyota', 'Honda', 'Hyundai', 'Kia', 'Mahindra'];

    if (luxury.includes(calcBrand)) price = Math.round(price * 1.5);
    else if (mid.includes(calcBrand)) price = Math.round(price * 1.1);

    setCalcQuote(price);
  };

  // Service Card click log viewed
  const handleServiceCardClick = (item) => {
    addRecentlyViewed({
      id: item.id,
      title: item.title,
      price: item.price > 0 ? `₹${item.price.toLocaleString('en-IN')}` : 'Free Assist',
      img: item.img
    });
  };

  // Filtered Services
  const filteredServices = servicesData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = item.price <= maxPrice;
    const matchesCategory = categories[item.category];
    return matchesSearch && matchesPrice && matchesCategory;
  });

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
          <h1 className="section-title">Explore <span>Our Services</span></h1>
          <p className="section-subtitle">Choose from our list of high-quality automotive repair services. Filter by category, price or brand.</p>
        </div>

        <div className="services-layout-grid">
          {/* Filters Sidebar */}
          <aside className="services-filter-sidebar glass-card">
            <div className="filter-group">
              <h4>Category</h4>
              <div className="filter-checkbox-list">
                <label>
                  <input 
                    type="checkbox" 
                    checked={categories.Maintenance} 
                    onChange={() => handleCategoryChange('Maintenance')} 
                  /> Maintenance
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    checked={categories.Repairs} 
                    onChange={() => handleCategoryChange('Repairs')} 
                  /> Repair & Alignments
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    checked={categories.Cleaning} 
                    onChange={() => handleCategoryChange('Cleaning')} 
                  /> Cleaning & Detailing
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    checked={categories.Utility} 
                    onChange={() => handleCategoryChange('Utility')} 
                  /> Utilities & Claims
                </label>
              </div>
            </div>

            <div className="filter-group">
              <h4>Max Budget</h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span>₹500</span>
                <span>₹{maxPrice.toLocaleString('en-IN')}</span>
              </div>
              <input 
                type="range" 
                className="price-range-slider" 
                min="500" 
                max="10000" 
                step="500" 
                value={maxPrice} 
                onChange={(e) => setMaxPrice(+e.target.value)}
              />
            </div>

            <button className="btn btn-secondary" style={{ width: '100%' }} onClick={handleResetFilters}>
              Reset Filters
            </button>
          </aside>

          {/* Main List */}
          <main className="services-main-pane">
            <div className="services-control-bar">
              <div className="search-bar-wrapper">
                <i className="fas fa-search"></i>
                <input 
                  type="text" 
                  placeholder="Search services instantly..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div>
                <span style={{ fontWeight: 500 }}>
                  Showing {filteredServices.length} of {servicesData.length} Services
                </span>
              </div>
            </div>

            {/* Grid display */}
            <div className="services-grid">
              <AnimatePresence>
                {filteredServices.map(item => {
                  const isWishlisted = wishlist.some(w => w.id === item.id);
                  const pText = item.price > 0 ? `₹${item.price.toLocaleString('en-IN')}` : 'Free Assist';
                  
                  return (
                    <motion.div 
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="service-card glass-card"
                      onClick={() => handleServiceCardClick(item)}
                    >
                      <img src={item.img} alt={item.title} />
                      <button 
                        className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist({
                            id: item.id,
                            title: item.title,
                            price: pText,
                            img: item.img
                          });
                        }}
                        aria-label="Wishlist Service"
                      >
                        <i className="fas fa-heart"></i>
                      </button>
                      <div className="service-card-body">
                        <div className="badge badge-primary" style={{ alignSelf: 'flex-start', marginBottom: '10px' }}>
                          {item.category}
                        </div>
                        <h3 className="service-card-title">{item.title}</h3>
                        <p className="service-card-desc">{item.desc}</p>
                        <div className="service-card-footer">
                          <span className="service-card-price">{pText}</span>
                          <button 
                            onClick={() => onNavigate('booking', { service: item.title })}
                            className="btn btn-primary btn-text"
                          >
                            Book Now <i className="fas fa-arrow-right"></i>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Price Calculator */}
            <div className="calculator-box glass-card">
              <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <i className="fas fa-calculator" style={{ color: 'var(--accent-color)' }}></i> Instant Service Cost Calculator
              </h3>
              <div className="calc-grid">
                <div className="form-group">
                  <label>Select Brand</label>
                  <select value={calcBrand} onChange={(e) => { setCalcBrand(e.target.value); setCalcQuote(null); }}>
                    <option value="Toyota">Toyota</option>
                    <option value="Honda">Honda</option>
                    <option value="Hyundai">Hyundai</option>
                    <option value="Maruti Suzuki">Maruti Suzuki</option>
                    <option value="Tata Motors">Tata Motors</option>
                    <option value="Mahindra">Mahindra</option>
                    <option value="Kia">Kia</option>
                    <option value="BMW">BMW</option>
                    <option value="Mercedes-Benz">Mercedes-Benz</option>
                    <option value="Audi">Audi</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Select Service</label>
                  <select value={calcService} onChange={(e) => { setCalcService(e.target.value); setCalcQuote(null); }}>
                    {servicesData.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
                  </select>
                </div>
                <div className="form-group" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button className="btn btn-primary" onClick={handleGetQuote} style={{ width: '100%', height: '47px' }}>
                    <i className="fas fa-cogs"></i> Get Quote
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {calcQuote !== null && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="calc-result"
                  >
                    <span style={{ fontWeight: 500 }}>Estimated Cost for your vehicle: </span>
                    <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-color)', marginLeft: '10px' }}>
                      ₹{calcQuote.toLocaleString('en-IN')}
                    </span>
                    <button 
                      onClick={() => onNavigate('booking', { brand: calcBrand, service: calcService })}
                      className="btn btn-text" 
                      style={{ marginLeft: '20px' }}
                    >
                      Book Now <i className="fas fa-arrow-right"></i>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Recently Viewed */}
            <div style={{ marginTop: '40px' }}>
              <h3 style={{ marginBottom: '15px' }}>
                <i className="fas fa-history" style={{ color: 'var(--accent-color)' }}></i> Recently Viewed Services
              </h3>
              <div className="services-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
                {recentlyViewed.length === 0 ? (
                  <p style={{ color: 'var(--text-muted)' }}>No recently viewed services yet.</p>
                ) : (
                  recentlyViewed.map(item => (
                    <div 
                      key={item.id} 
                      className="service-card glass-card" 
                      style={{ padding: '10px', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}
                    >
                      <img 
                        src={item.img} 
                        alt={item.title} 
                        style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
                      />
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '0.9rem', marginBottom: '2px' }}>{item.title}</h4>
                        <div style={{ fontSize: '0.8rem', color: 'var(--accent-color)', fontWeight: 600 }}>{item.price}</div>
                      </div>
                      <button 
                        onClick={() => onNavigate('booking', { service: item.title })}
                        className="btn btn-primary" 
                        style={{ padding: '5px 10px', fontSize: '0.75rem' }}
                      >
                        <i className="fas fa-calendar-alt"></i>
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </motion.section>
  );
}
