import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Services({ onNavigate, wishlist, toggleWishlist, recentlyViewed, addRecentlyViewed, servicesData }) {

  // Filters State
  const [categories, setCategories] = useState({
    Maintenance: true,
    Repairs: true,
    Cleaning: true,
    Utility: true
  });
  const [searchQuery, setSearchQuery] = useState('');

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
    setSearchQuery('');
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
    const matchesCategory = categories[item.category];
    return matchesSearch && matchesCategory;
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
                  const pText = item.price > 0 ? `₹${item.price.toLocaleString('en-IN')}/- (Starts from)` : 'Free Assist';
                  
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

          </main>
        </div>
      </div>
    </motion.section>
  );
}
