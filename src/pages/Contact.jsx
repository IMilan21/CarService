import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Contact({ onNavigate, showToast }) {
  // Emergency Dispatch States
  const [activeDispatch, setActiveDispatch] = useState(null);
  const [dispatchLog, setDispatchLog] = useState([]);
  const [dispatching, setDispatching] = useState(false);

  // Near Garages List
  const allGarages = [
    { id: 1, name: 'AutoCare West Main Garage', distance: '1.8 km', rating: '4.9', zip: '110001', address: 'Plot 4, Karol Bagh Metro Sector, New Delhi' },
    { id: 2, name: 'AutoCare East Wing Workshop', distance: '3.4 km', rating: '4.8', zip: '110092', address: 'Block D, Preet Vihar Industrial Hub, New Delhi' },
    { id: 3, name: 'AutoCare South Express Hub', distance: '4.2 km', rating: '4.7', zip: '110016', address: 'Plot 12, Hauz Khas Ring Road, New Delhi' },
    { id: 4, name: 'AutoCare North Point Center', distance: '6.1 km', rating: '4.8', zip: '110009', address: 'G.T. Karnal Road, Near Model Town, New Delhi' }
  ];

  const [zipCode, setZipCode] = useState('');
  const [filteredGarages, setFilteredGarages] = useState(allGarages);

  // Form State
  const [cName, setCName] = useState('');
  const [cEmail, setCEmail] = useState('');
  const [cMessage, setCMessage] = useState('');

  // Handle Contact Submit
  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (cName && cEmail && cMessage) {
      showToast('Message sent! Our support team will write back shortly.', 'success');
      setCName('');
      setCEmail('');
      setCMessage('');
    }
  };

  // Handle emergency trigger
  const handleTriggerEmergency = (type) => {
    setActiveDispatch(type);
    setDispatching(true);
    setDispatchLog(['Initializing GPS telemetry...', 'Acquiring satellite lock...']);

    // Sequence log updates
    setTimeout(() => {
      setDispatchLog(prev => [...prev, 'Broadcasting emergency packet...']);
    }, 800);

    setTimeout(() => {
      setDispatchLog(prev => [...prev, 'Dispatch approved by hub manager.']);
    }, 1800);

    setTimeout(() => {
      setDispatchLog(prev => [...prev, 'Mechanic Allocated: Vinay Singh (Service Van #4)']);
    }, 2800);

    setTimeout(() => {
      setDispatchLog(prev => [...prev, 'ETA: 12 minutes. Telemetry updates active.']);
      setDispatching(false);
      showToast('Roadside Assist Dispatched!', 'success');
    }, 3800);
  };

  // Filter garages
  const handleSearchGarages = (e) => {
    e.preventDefault();
    if (!zipCode.trim()) {
      setFilteredGarages(allGarages);
      return;
    }

    const match = allGarages.filter(g => g.zip.includes(zipCode.trim()) || g.address.toLowerCase().includes(zipCode.toLowerCase().trim()));
    setFilteredGarages(match);
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
          <h1 className="section-title">Contact & <span>Roadside Assistance</span></h1>
          <p className="section-subtitle">Reach out to our support team, search near service stations, or trigger instant emergency roadside dispatch.</p>
        </div>

        <div className="contact-layout-grid">
          {/* Form */}
          <div className="glass-card" style={{ padding: '30px' }}>
            <h3 style={{ marginBottom: '20px' }}>
              <i className="fas fa-paper-plane" style={{ color: 'var(--accent-color)', marginRight: '8px' }}></i> Write to Us
            </h3>
            <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div className="form-group">
                <label>Your Name</label>
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  required 
                  value={cName}
                  onChange={(e) => setCName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  placeholder="name@domain.com" 
                  required 
                  value={cEmail}
                  onChange={(e) => setCEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea 
                  rows="4" 
                  placeholder="Type your message here..." 
                  required
                  value={cMessage}
                  onChange={(e) => setCMessage(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>

            <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div className="contact-detail-row">
                <div className="contact-detail-icon"><i className="fas fa-phone-alt"></i></div>
                <div>
                  <div style={{ fontWeight: 600 }}>Helpline Hotline</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>1800-123-4567 (Toll Free)</div>
                </div>
              </div>
              <div className="contact-detail-row">
                <div className="contact-detail-icon"><i className="fas fa-map-marker-alt"></i></div>
                <div>
                  <div style={{ fontWeight: 600 }}>Headquarters Office</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Tech Park Block C, Preet Vihar, New Delhi</div>
                </div>
              </div>
            </div>
          </div>

          {/* Garage Search map */}
          <div className="glass-card" style={{ padding: '30px' }}>
            <h3 style={{ marginBottom: '20px' }}>
              <i className="fas fa-map-marked-alt" style={{ color: 'var(--accent-color)', marginRight: '8px' }}></i> Find Nearest Garage
            </h3>
            
            <form onSubmit={handleSearchGarages} className="garage-search-row">
              <input 
                type="text" 
                placeholder="Enter ZIP Code or City..." 
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
              <button type="submit" className="btn btn-secondary">Search</button>
            </form>

            <div className="garage-list" style={{ maxHeight: '350px', overflowY: 'auto', paddingRight: '5px' }}>
              {filteredGarages.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>No workshops found in this region.</p>
              ) : (
                filteredGarages.map(g => (
                  <div key={g.id} className="garage-item glass-card" style={{ padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div className="garage-title" style={{ fontSize: '0.95rem' }}>{g.name}</div>
                      <div className="garage-meta" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {g.address} &bull; <strong style={{ color: 'var(--accent-color)' }}>{g.distance}</strong>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '5px' }}>
                      <div style={{ fontSize: '0.85rem', color: '#F59E0B' }}><i className="fas fa-star"></i> {g.rating}</div>
                      <button 
                        onClick={() => onNavigate('booking', { notes: `Direct referral from ${g.name}` })} 
                        className="btn btn-primary" 
                        style={{ padding: '5px 10px', fontSize: '0.75rem' }}
                      >
                        Book
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Roadside Emergency assistance */}
        <div className="roadside-assistance-dashboard glass-card">
          <h2 style={{ color: 'var(--danger)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <i className="fas fa-ambulance"></i> 24/7 Roadside Assistance Center
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '30px' }}>
            Stranded on the road? Tap your breakdown category below to transmit GPS telemetry coordinates. We dispatch a technician instantly.
          </p>

          <div className="roadside-grid">
            <div className="roadside-card glass-card" onClick={() => handleTriggerEmergency('Flat Tire')}>
              <i className="fas fa-car-crash"></i>
              <div className="roadside-card-name">Flat Tire</div>
            </div>
            <div className="roadside-card glass-card" onClick={() => handleTriggerEmergency('Empty Fuel')}>
              <i className="fas fa-gas-pump"></i>
              <div className="roadside-card-name">Out of Fuel</div>
            </div>
            <div className="roadside-card glass-card" onClick={() => handleTriggerEmergency('Battery Jump')}>
              <i className="fas fa-car-battery"></i>
              <div className="roadside-card-name">Dead Battery</div>
            </div>
            <div className="roadside-card glass-card" onClick={() => handleTriggerEmergency('Towing Assist')}>
              <i className="fas fa-truck-pickup"></i>
              <div className="roadside-card-name">Tow Request</div>
            </div>
            <div className="roadside-card glass-card" onClick={() => handleTriggerEmergency('Engine Smoke')}>
              <i className="fas fa-cloud"></i>
              <div className="roadside-card-name">Engine Overheat</div>
            </div>
          </div>

          {/* Dispatch console outputs */}
          <AnimatePresence>
            {activeDispatch && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{ padding: '20px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                    <strong>Breakdown Request: {activeDispatch}</strong>
                    {dispatching ? (
                      <span style={{ color: 'var(--warning)' }}><i className="fas fa-spinner fa-spin"></i> Dispatching...</span>
                    ) : (
                      <span style={{ color: 'var(--success)' }}><i className="fas fa-check-circle"></i> Dispatched</span>
                    )}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontFamily: 'monospace', fontSize: '0.85rem' }}>
                    {dispatchLog.map((log, idx) => (
                      <div key={idx} style={{ color: '#10B981' }}>&gt; {log}</div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}
