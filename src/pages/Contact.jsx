import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Contact({ onNavigate, showToast }) {
  const [contactMethod, setContactMethod] = useState(null); // 'whatsapp' | 'gmail' | null
  const [showGmailModal, setShowGmailModal] = useState(false);
  const [carBrand, setCarBrand] = useState('');
  const [carModel, setCarModel] = useState('');
  const [details, setDetails] = useState('');
  const [query, setQuery] = useState('');

  const handleWhatsAppContact = (e) => {
    e.preventDefault();
    if (!carBrand || !carModel || !query) {
      if (showToast) showToast('Please fill out all required fields.', 'error');
      return;
    }

    const text = `Hi,
Thank you for contacting GS Automobiles. To help us assist you better, please provide the following details:

🚗 Car Brand: ${carBrand}
🚘 Car Model: ${carModel}
🛣️ Kilometers Driven: ${details || ''}
🔧 Issue / Service Required: ${query}

Our technician will review the details and get in touch with you shortly.

Thank you!
GS Automobiles`;
    const url = `https://wa.me/919999938499?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    if (showToast) showToast('Redirecting to WhatsApp...', 'success');
  };

  const handleGmailContact = (e) => {
    e.preventDefault();
    setShowGmailModal(true);
  };

  return (
    <>
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="section" 
        style={{ paddingTop: '120px' }}
      >
        <div className="container">
          <div className="section-header">
            <h1 className="section-title">Contact <span>GS Automobiles</span></h1>
            <p className="section-subtitle">Reach out to our support team or book a service appointment at our Indirapuram workshop.</p>
          </div>

          <div className="contact-layout-grid">
            {/* Write to Us Cards */}
            <div className="glass-card" style={{ padding: '30px', minHeight: '450px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              
              <AnimatePresence mode="wait">
                {contactMethod === null ? (
                  <motion.div
                    key="channels"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 style={{ marginBottom: '15px', fontSize: '1.3rem', fontWeight: 800 }}>
                      <i className="fas fa-paper-plane" style={{ color: 'var(--accent-color)', marginRight: '8px' }}></i> Write to Us
                    </h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '25px', lineHeight: '1.6' }}>
                      Select your preferred communication channel to send us details about your vehicle.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '25px' }}>
                      {/* WhatsApp option */}
                      <motion.div 
                        whileHover={{ scale: 1.02, borderColor: '#25D366' }}
                        onClick={() => setContactMethod('whatsapp')}
                        style={{
                          background: 'rgba(255, 255, 255, 0.02)',
                          border: '1px solid var(--border-color)',
                          borderRadius: 'var(--radius-md)',
                          padding: '18px 20px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '15px',
                          transition: 'border-color 0.3s ease',
                          textAlign: 'left'
                        }}
                      >
                        <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(37, 211, 102, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #25D366', flexShrink: 0 }}>
                          <i className="fab fa-whatsapp" style={{ fontSize: '1.3rem', color: '#25D366' }}></i>
                        </div>
                        <div>
                          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 2px 0' }}>Write via WhatsApp</h4>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Send inquiry template with car details</span>
                        </div>
                      </motion.div>

                      {/* Gmail option */}
                      <motion.div 
                        whileHover={{ scale: 1.02, borderColor: '#EA4335' }}
                        onClick={() => setShowGmailModal(true)}
                        style={{
                          background: 'rgba(255, 255, 255, 0.02)',
                          border: '1px solid var(--border-color)',
                          borderRadius: 'var(--radius-md)',
                          padding: '18px 20px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '15px',
                          transition: 'border-color 0.3s ease',
                          textAlign: 'left'
                        }}
                      >
                        <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(234, 67, 53, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #EA4335', flexShrink: 0 }}>
                          <i className="fas fa-envelope" style={{ fontSize: '1.2rem', color: '#EA4335' }}></i>
                        </div>
                        <div>
                          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 2px 0' }}>Write via Gmail</h4>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Send automated email booking details</span>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                ) : contactMethod === 'whatsapp' ? (
                  <motion.div
                    key="whatsapp-msg"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div style={{ width: '55px', height: '55px', borderRadius: '50%', background: 'rgba(37, 211, 102, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px', border: '1px solid #25D366' }}>
                      <i className="fab fa-whatsapp" style={{ fontSize: '1.6rem', color: '#25D366' }}></i>
                    </div>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '15px', textAlign: 'center' }}>WhatsApp Inquiry</h3>
                    
                    <form onSubmit={handleWhatsAppContact} style={{ textAlign: 'left' }}>
                      <div className="form-grid" style={{ gap: '15px', marginBottom: '15px' }}>
                        <div className="premium-input-group">
                          <label>Car Brand *</label>
                          <div className="premium-input-wrapper">
                            <input 
                              type="text" 
                              placeholder="e.g. Toyota" 
                              value={carBrand}
                              onChange={(e) => setCarBrand(e.target.value)}
                              required
                            />
                            <i className="fas fa-car"></i>
                          </div>
                        </div>
                        <div className="premium-input-group">
                          <label>Car Model *</label>
                          <div className="premium-input-wrapper">
                            <input 
                              type="text" 
                              placeholder="e.g. Fortuner" 
                              value={carModel}
                              onChange={(e) => setCarModel(e.target.value)}
                              required
                            />
                            <i className="fas fa-gauge-high"></i>
                          </div>
                        </div>
                      </div>
                      <div className="premium-input-group" style={{ marginBottom: '15px' }}>
                        <label>Kilometers Driven (Optional)</label>
                        <div className="premium-input-wrapper">
                          <input 
                            type="text" 
                            placeholder="e.g. 45,000 km" 
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                          />
                          <i className="fas fa-tachometer-alt"></i>
                        </div>
                      </div>
                      <div className="premium-input-group" style={{ marginBottom: '25px' }}>
                        <label>My Query / Problem *</label>
                        <div className="premium-input-wrapper">
                          <textarea 
                            rows="3"
                            placeholder="Describe your issue or questions here..." 
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            required
                          />
                          <i className="fas fa-wrench"></i>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button type="button" onClick={() => setContactMethod(null)} className="btn btn-secondary" style={{ flex: 1, padding: '10px', fontSize: '0.9rem' }}>
                          <i className="fas fa-arrow-left"></i> Back
                        </button>
                        <button type="submit" className="btn btn-primary" style={{ flex: 2, background: '#25D366', borderColor: '#25D366', color: '#FFF', padding: '10px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                          <i className="fab fa-whatsapp"></i> Send on WhatsApp
                        </button>
                      </div>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="gmail-msg"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div style={{ width: '55px', height: '55px', borderRadius: '50%', background: 'rgba(234, 67, 53, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px', border: '1px solid #EA4335' }}>
                      <i className="fas fa-envelope" style={{ fontSize: '1.5rem', color: '#EA4335' }}></i>
                    </div>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '15px', textAlign: 'center' }}>Gmail Inquiry</h3>
                    
                    <form onSubmit={handleGmailContact} style={{ textAlign: 'left' }}>
                      <div className="form-grid" style={{ gap: '15px', marginBottom: '15px' }}>
                        <div className="premium-input-group">
                          <label>Car Brand *</label>
                          <div className="premium-input-wrapper">
                            <input 
                              type="text" 
                              placeholder="e.g. Honda" 
                              value={carBrand}
                              onChange={(e) => setCarBrand(e.target.value)}
                              required
                            />
                            <i className="fas fa-car"></i>
                          </div>
                        </div>
                        <div className="premium-input-group">
                          <label>Car Model *</label>
                          <div className="premium-input-wrapper">
                            <input 
                              type="text" 
                              placeholder="e.g. Civic" 
                              value={carModel}
                              onChange={(e) => setCarModel(e.target.value)}
                              required
                            />
                            <i className="fas fa-gauge-high"></i>
                          </div>
                        </div>
                      </div>
                      <div className="premium-input-group" style={{ marginBottom: '15px' }}>
                        <label>Kilometers Driven (Optional)</label>
                        <div className="premium-input-wrapper">
                          <input 
                            type="text" 
                            placeholder="e.g. 45,000 km" 
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                          />
                          <i className="fas fa-tachometer-alt"></i>
                        </div>
                      </div>
                      <div className="premium-input-group" style={{ marginBottom: '25px' }}>
                        <label>My Query / Problem *</label>
                        <div className="premium-input-wrapper">
                          <textarea 
                            rows="3"
                            placeholder="Describe your issue or questions here..." 
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            required
                          />
                          <i className="fas fa-wrench"></i>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button type="button" onClick={() => setContactMethod(null)} className="btn btn-secondary" style={{ flex: 1, padding: '10px', fontSize: '0.9rem' }}>
                          <i className="fas fa-arrow-left"></i> Back
                        </button>
                        <button type="submit" className="btn btn-primary" style={{ flex: 2, background: '#EA4335', borderColor: '#EA4335', color: '#FFF', padding: '10px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                          <i className="fas fa-envelope"></i> Send via Gmail
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

              <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div className="contact-detail-row">
                  <div className="contact-detail-icon"><i className="fas fa-map-marker-alt"></i></div>
                  <div>
                    <div style={{ fontWeight: 600 }}>Workshop Location Address</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Plot no.677, Sucheta Kriplani Marg, near igl cng pump, Shakti Khand III, Indirapuram, Ghaziabad, Uttar Pradesh 201014</div>
                  </div>
                </div>
                <div className="contact-detail-row">
                  <div className="contact-detail-icon"><i className="fas fa-phone-alt"></i></div>
                  <div>
                    <div style={{ fontWeight: 600 }}>Phone / WhatsApp Support</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      <a href="tel:+919999938499" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>+91 99999 38499</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Workshop Location */}
            <div className="glass-card" style={{ padding: '30px' }}>
              <h3 style={{ marginBottom: '20px' }}>
                <i className="fas fa-map-marked-alt" style={{ color: 'var(--accent-color)', marginRight: '8px' }}></i> Our Workshop Location
              </h3>
              <div className="workshop-item glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px', border: '1px solid rgba(255, 107, 0, 0.2)' }}>
                <div>
                  <div className="workshop-title" style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--accent-color)' }}>GS Automobiles</div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '8px', lineHeight: '1.5' }}>
                    <i className="fas fa-map-marker-alt" style={{ color: 'var(--accent-color)', marginRight: '8px', width: '16px' }}></i>
                    Plot no.677, Sucheta Kriplani Marg, near igl cng pump, Shakti Khand III, Indirapuram, Ghaziabad, Uttar Pradesh 201014
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                    <i className="fas fa-phone-alt" style={{ color: 'var(--accent-color)', marginRight: '8px', width: '16px' }}></i>
                    <strong>Phone / WhatsApp:</strong> <a href="tel:+919999938499" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>+91 99999 38499</a>
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                    <i className="fas fa-calendar-alt" style={{ color: 'var(--accent-color)', marginRight: '8px', width: '16px' }}></i>
                    <strong>Year of Establishment:</strong> 2009
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                    <i className="fas fa-clock" style={{ color: 'var(--accent-color)', marginRight: '8px', width: '16px' }}></i>
                    <strong>Working Hours:</strong> Everyday: 10:00 AM - 6:00 PM
                  </div>
                  
                  <div style={{ marginTop: '15px', borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '220px', border: '1px solid var(--border-color)', position: 'relative' }}>
                    <iframe 
                      title="GS Automobiles Map"
                      src="https://maps.google.com/maps?q=GS%20Automobiles,%20Sucheta%20Kriplani%20Marg,%20near%20igl%20cng%20pump,%20Shakti%20Khand%20III,%20Indirapuram,%20Ghaziabad,%20Uttar%20Pradesh,%20India&t=&z=15&ie=UTF8&iwloc=&output=embed"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                    ></iframe>
                    <a 
                      href="https://www.google.com/maps/search/?api=1&query=GS+Automobiles,+Sucheta+Kriplani+Marg,+near+igl+cng+pump,+Shakti+Khand+III,+Indirapuram,+Ghaziabad,+Uttar+Pradesh,+India"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ 
                        position: 'absolute', 
                        bottom: '10px', 
                        right: '10px', 
                        background: 'var(--accent-color)', 
                        color: 'white', 
                        padding: '6px 12px', 
                        borderRadius: 'var(--radius-sm)', 
                        fontSize: '0.8rem', 
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                        textDecoration: 'none'
                      }}
                    >
                      <i className="fas fa-external-link-alt"></i> Open Google Maps
                    </a>
                  </div>
                </div>
                <button 
                  onClick={() => onNavigate('booking')} 
                  className="btn btn-primary" 
                  style={{ width: '100%', padding: '10px', fontSize: '0.95rem', marginTop: '10px' }}
                >
                  Book a Service at this Workshop
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Gmail Modal Overlay */}
      <AnimatePresence>
        {showGmailModal && (
          <div className="whatsapp-modal-overlay" onClick={() => setShowGmailModal(false)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="whatsapp-modal glass-card"
              onClick={(e) => e.stopPropagation()}
              style={{
                border: '1px solid rgba(234, 67, 53, 0.25)',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
                maxWidth: '480px',
                textAlign: 'center'
              }}
            >
              {/* Close Button */}
              <button className="whatsapp-modal-close" onClick={() => setShowGmailModal(false)}>
                &times;
              </button>

              {/* Email Icon Header */}
              <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(234, 67, 53, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', border: '1px solid #EA4335' }}>
                <i className="fas fa-envelope" style={{ fontSize: '2.2rem', color: '#EA4335' }}></i>
              </div>

              {/* Header Text */}
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '15px' }}>
                Email Support Coming Soon
              </h3>
              
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '25px' }}>
                Thank you for your interest in contacting GS Automobiles. Our email support feature is currently under development and will be available soon.
                <br /><br />
                For immediate assistance, please contact us via WhatsApp.
              </p>

              {/* Action Button */}
              <button 
                onClick={() => setShowGmailModal(false)} 
                className="btn btn-primary" 
                style={{ width: '100%', padding: '12px', fontSize: '0.95rem', background: '#EA4335', borderColor: '#EA4335', color: '#FFF', border: 'none' }}
              >
                Got It
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
