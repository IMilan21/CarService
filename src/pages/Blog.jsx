import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Blog() {
  const blogArticles = [
    { id: 1, title: '5 Essential Monsoon Car Care Tips', category: 'Tips & Hacks', date: 'June 01, 2026', author: 'Tech Team', img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80', excerpt: 'Driving during heavy monsoons requires special precautions. Learn how to maintain your wiper blades, brakes and tire treads for wet conditions.', content: 'Monsoons bring relief from summer heat but pose challenges for car owners. Here are five crucial steps to protect your vehicle:\n\n1. WIPERS AND WASHERS: Ensure wiper blades do not leave streaks. Check washer fluids and top them up with anti-fog solutions.\n2. TIRE GRIP CHECK: Wet roads reduce traction. Inspect tread depth. Replace tires if treads are worn below 2mm.\n3. BRAKES TESTING: Water can get in brake pads and cause slippage. Test braking at low speeds after driving through puddles.\n4. RUST PREVENTION: Apply anti-rust coats underneath the chassis to guard against road salt and moisture accumulation.\n5. ELECTRICAL BOARDS: Sealed fuses and wiring harnesses keep water out. Spray humidity repellents on battery terminals.' },
    { id: 2, title: 'Understanding Your Car Battery Lifespan', category: 'Guides', date: 'May 20, 2026', author: 'Support Desk', img: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80', excerpt: 'Is your car struggling to start? Read about the indicators of battery drain and learn when you should replace your battery.', content: 'A car battery is the electrical heart of your vehicle. Under normal usage conditions, standard Lead-Acid batteries have a lifespan of 3 to 5 years.\n\nINDICATORS OF A DECAYING BATTERY:\n- SLOW ENGINE CRANK: It takes longer for the engine to fire up.\n- DIM HEADLIGHTS: Cluster dials and lights flicker or dim during engine idle.\n- CORROSION INDEX: White ash-like powder forming near terminals indicates gas leakage.\n\nMAINTENANCE HACKS:\n- Clean terminals with soda solution.\n- Secure the battery hold-down clamp to reduce vibrations.\n- Turn off headlights and AC blower systems before starting the ignition.' },
    { id: 3, title: 'Maximize Fuel Efficiency: The Ultimate Guide', category: 'Maintenance', date: 'May 10, 2026', author: 'Admin Advisor', img: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=600&q=80', excerpt: 'Tired of high fuel bills? Explore these simple tuning hacks and adjustments that can increase your mileage up to 15%.', content: 'Fuel consumption depends significantly on driving habits and basic engine maintenance state. Implement these adjustments to save fuel:\n\n1. CORRECT TIRE PRESSURE: Under-inflated tires increase rolling resistance, which reduces mileage. Check pressure weekly.\n2. SCHEDULE PERIODIC TUNING: Replace clogged air filters and worn spark plugs. A well-tuned engine burns fuel more efficiently.\n3. AVOID IDLING: Turn off the engine at traffic lights if waiting exceeds 30 seconds. Idling wastes gas and increases emissions.\n4. SMOOTH ACCELERATION: Sudden acceleration and harsh braking consume 30% more fuel. Cruise smoothly at moderate speeds.\n5. LIMIT EXCESS WEIGHT: Heavy tools or luggage in the boot force the engine to work harder. Clean your trunk to shed weight.' }
  ];

  const [search, setSearch] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const filteredArticles = blogArticles.filter(item => 
    item.title.toLowerCase().includes(search.toLowerCase()) || 
    item.excerpt.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

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
          <h1 className="section-title">Maintenance <span>Knowledge Base</span></h1>
          <p className="section-subtitle">Read detailed guides and articles written by our certified automotive mechanics to expand vehicle life.</p>
        </div>

        {/* Search controls */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
          <div className="search-bar-wrapper" style={{ maxWidth: '500px' }}>
            <i className="fas fa-search"></i>
            <input 
              type="text" 
              placeholder="Search articles by keywords..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Blogs Grid */}
        <div className="blogs-grid">
          {filteredArticles.map(item => (
            <motion.div 
              key={item.id}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedArticle(item)}
              className="blog-card glass-card"
              style={{ cursor: 'pointer' }}
            >
              <img src={item.img} alt={item.title} />
              <div className="blog-card-body">
                <div className="blog-card-meta">
                  <span><i className="fas fa-tag"></i> {item.category}</span> &bull; <span><i className="fas fa-calendar-alt"></i> {item.date}</span>
                </div>
                <h3 className="blog-card-title">{item.title}</h3>
                <p className="blog-card-excerpt">{item.excerpt}</p>
                <span className="btn btn-primary btn-text">Read Article <i className="fas fa-arrow-right"></i></span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Article Viewer Modal */}
        <AnimatePresence>
          {selectedArticle && (
            <div className="modal-overlay active" style={{ display: 'flex' }}>
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="modal-box glass-card"
                style={{ maxWidth: '700px', maxHeight: '90vh', overflowY: 'auto', padding: '35px' }}
              >
                <button className="modal-close-btn" onClick={() => setSelectedArticle(null)}>&times;</button>
                <div className="blog-card-meta" style={{ marginBottom: '15px' }}>
                  <span><i className="fas fa-tag"></i> {selectedArticle.category}</span> &bull; <span><i className="fas fa-calendar-alt"></i> {selectedArticle.date}</span> &bull; <span>By {selectedArticle.author}</span>
                </div>
                <h2 style={{ fontSize: '1.8rem', marginBottom: '20px', lineHeight: '1.3' }}>{selectedArticle.title}</h2>
                <img 
                  src={selectedArticle.img} 
                  alt={selectedArticle.title} 
                  style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: '20px' }}
                />
                <div style={{ whiteSpace: 'pre-line', lineHeight: '1.7', color: 'var(--text-muted)' }}>
                  {selectedArticle.content}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
