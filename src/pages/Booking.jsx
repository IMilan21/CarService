import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Booking({ 
  onNavigate, 
  initialParams, 
  showToast, 
  addBookingHistory, 
  addLoyaltyPoints, 
  servicesData, 
  websiteSettings 
}) {
  const [activeIntegration, setActiveIntegration] = useState(null); // 'whatsapp' | 'gmail' | null
  const [showGmailModal, setShowGmailModal] = useState(false);
  const [carBrand, setCarBrand] = useState('');
  const [carModel, setCarModel] = useState('');
  const [kmDriven, setKmDriven] = useState('');
  const [serviceNeeded, setServiceNeeded] = useState('');

  // Sync service from navigation params
  useEffect(() => {
    if (initialParams?.service) {
      setServiceNeeded(initialParams.service);
    }
  }, [initialParams]);

  const handleWhatsAppBooking = (e) => {
    e.preventDefault();
    if (!carBrand || !carModel || !serviceNeeded) {
      if (showToast) showToast('Please fill out all required fields.', 'error');
      return;
    }

    const text = `Hi,
Thank you for contacting GS Automobiles. To help us assist you better, please provide the following details:

🚗 Car Brand: ${carBrand}
🚘 Car Model: ${carModel}
🛣️ Kilometers Driven: ${kmDriven || ''}
🔧 Issue / Service Required: ${serviceNeeded}

Our technician will review the details and get in touch with you shortly.

Thank you!
GS Automobiles`;
    
    // Support number is +91 99999 38499
    const url = `https://wa.me/919999938499?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    if (showToast) showToast('Redirecting to WhatsApp...', 'success');
  };

  const handleGmailBooking = (e) => {
    e.preventDefault();
    setShowGmailModal(true);
  };

  return (
    <>
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="section" 
        style={{ paddingTop: '140px', paddingBottom: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="glass-card" style={{ padding: '50px 40px', borderRadius: 'var(--radius-lg)', textAlign: 'center', boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            
            <AnimatePresence mode="wait">
              {activeIntegration === null ? (
                <motion.div
                  key="options"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '10px', letterSpacing: '-0.5px' }}>
                    Book a <span style={{ color: 'var(--accent-color)' }}>Service Slot</span>
                  </h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '40px' }}>
                    Select your preferred method to request and confirm your workshop appointment.
                  </p>

                  {/* Option Cards */}
                  <div className="booking-options-grid">
                    
                    {/* WhatsApp Option */}
                    <motion.div 
                      whileHover={{ y: -5, borderColor: '#25D366' }}
                      onClick={() => setActiveIntegration('whatsapp')}
                      className="booking-option-card"
                    >
                      <div className="booking-option-icon-wrapper whatsapp-icon">
                        <i className="fab fa-whatsapp"></i>
                      </div>
                      <h3>Book via WhatsApp</h3>
                      <p>
                        Send your car details and issue description directly to our workshop managers on WhatsApp.
                      </p>
                    </motion.div>

                    {/* Gmail Option */}
                    <motion.div 
                      whileHover={{ y: -5, borderColor: '#EA4335' }}
                      onClick={() => setShowGmailModal(true)}
                      className="booking-option-card"
                    >
                      <div className="booking-option-icon-wrapper gmail-icon">
                        <i className="fas fa-envelope"></i>
                      </div>
                      <h3>Book via Gmail</h3>
                      <p>
                        Send an automated email inquiry and receive direct scheduling confirmations in your inbox.
                      </p>
                    </motion.div>

                  </div>

                  <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                    <button 
                      onClick={() => onNavigate('contact')} 
                      className="btn btn-secondary" 
                      style={{ padding: '12px 28px', fontSize: '0.95rem' }}
                    >
                      Write to Us Instead
                    </button>
                  </div>
                </motion.div>
              ) : activeIntegration === 'whatsapp' ? (
                <motion.div
                  key="whatsapp-details"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(37, 211, 102, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', border: '1px solid #25D366' }}>
                    <i className="fab fa-whatsapp" style={{ fontSize: '2rem', color: '#25D366' }}></i>
                  </div>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '15px' }}>
                    Book via WhatsApp
                  </h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '30px', maxWidth: '600px', margin: '0 auto 25px' }}>
                    Please fill in your basic vehicle details below. Clicking send will open WhatsApp pre-filled with your service inquiry.
                  </p>

                  {/* Form */}
                  <form onSubmit={handleWhatsAppBooking} style={{ textAlign: 'left', maxWidth: '500px', margin: '0 auto' }}>
                    <div className="form-grid" style={{ gap: '15px', marginBottom: '15px' }}>
                      <div className="premium-input-group">
                        <label>Car Brand *</label>
                        <div className="premium-input-wrapper">
                          <input 
                            type="text" 
                            placeholder="e.g. Maruti Suzuki" 
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
                            placeholder="e.g. Swift" 
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
                          value={kmDriven}
                          onChange={(e) => setKmDriven(e.target.value)}
                        />
                        <i className="fas fa-tachometer-alt"></i>
                      </div>
                    </div>
                    <div className="premium-input-group" style={{ marginBottom: '25px' }}>
                      <label>Issue / Service Required *</label>
                      <div className="premium-input-wrapper">
                        <textarea 
                          rows="3"
                          placeholder="e.g. Periodic maintenance service and suspension check" 
                          value={serviceNeeded}
                          onChange={(e) => setServiceNeeded(e.target.value)}
                          required
                        />
                        <i className="fas fa-wrench"></i>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                      <button 
                        type="button"
                        onClick={() => setActiveIntegration(null)} 
                        className="btn btn-secondary" 
                        style={{ padding: '10px 24px', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px' }}
                      >
                        <i className="fas fa-arrow-left"></i> Back
                      </button>
                      <button 
                        type="submit" 
                        className="btn btn-primary" 
                        style={{ background: '#25D366', borderColor: '#25D366', color: '#FFF', padding: '10px 24px', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px' }}
                      >
                        <i className="fab fa-whatsapp" style={{ fontSize: '1.1rem' }}></i> Send Booking Details
                      </button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="gmail-details"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(234, 67, 53, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', border: '1px solid #EA4335' }}>
                    <i className="fas fa-envelope" style={{ fontSize: '1.8rem', color: '#EA4335' }}></i>
                  </div>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '15px' }}>
                    Book via Gmail
                  </h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '30px', maxWidth: '600px', margin: '0 auto 25px' }}>
                    Please fill in your basic vehicle details below. Clicking send will open your email client pre-filled with your service inquiry.
                  </p>

                  {/* Form */}
                  <form onSubmit={handleGmailBooking} style={{ textAlign: 'left', maxWidth: '500px', margin: '0 auto' }}>
                    <div className="form-grid" style={{ gap: '15px', marginBottom: '15px' }}>
                      <div className="premium-input-group">
                        <label>Car Brand *</label>
                        <div className="premium-input-wrapper">
                          <input 
                            type="text" 
                            placeholder="e.g. Maruti Suzuki" 
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
                            placeholder="e.g. Swift" 
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
                          value={kmDriven}
                          onChange={(e) => setKmDriven(e.target.value)}
                        />
                        <i className="fas fa-tachometer-alt"></i>
                      </div>
                    </div>
                    <div className="premium-input-group" style={{ marginBottom: '25px' }}>
                      <label>Issue / Service Required *</label>
                      <div className="premium-input-wrapper">
                        <textarea 
                          rows="3"
                          placeholder="e.g. Periodic maintenance service and suspension check" 
                          value={serviceNeeded}
                          onChange={(e) => setServiceNeeded(e.target.value)}
                          required
                        />
                        <i className="fas fa-wrench"></i>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                      <button 
                        type="button"
                        onClick={() => setActiveIntegration(null)} 
                        className="btn btn-secondary" 
                        style={{ padding: '10px 24px', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px' }}
                      >
                        <i className="fas fa-arrow-left"></i> Back
                      </button>
                      <button 
                        type="submit" 
                        className="btn btn-primary" 
                        style={{ background: '#EA4335', borderColor: '#EA4335', color: '#FFF', padding: '10px 24px', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px' }}
                      >
                        <i className="fas fa-envelope" style={{ fontSize: '1rem' }}></i> Send Booking Details
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
            
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
