import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [carBrand, setCarBrand] = useState('');
  const [carModel, setCarModel] = useState('');
  const [kmDriven, setKmDriven] = useState('');
  const [issueText, setIssueText] = useState('');

  const openModal = () => {
    setCarBrand('');
    setCarModel('');
    setKmDriven('');
    setIssueText('');
    setIsOpen(true);
  };

  const handleSendWhatsApp = (e) => {
    e.preventDefault();
    if (!carBrand || !carModel || !issueText) return;
    
    const text = `Hi,
Thank you for contacting GS Automobiles. To help us assist you better, please provide the following details:

🚗 Car Brand: ${carBrand}
🚘 Car Model: ${carModel}
🛣️ Kilometers Driven: ${kmDriven || ''}
🔧 Issue / Service Required: ${issueText}

Our technician will review the details and get in touch with you shortly.

Thank you!
GS Automobiles`;

    const whatsappUrl = `https://wa.me/919999938499?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
  };

  return (
    <div id="live-chat-widget">
      {/* WhatsApp Floating FAB */}
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="whatsapp-toggle"
        onClick={openModal}
        aria-label="Contact on WhatsApp"
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          zIndex: 999
        }}
      >
        <i className="fab fa-whatsapp" style={{ fontSize: '2.2rem' }}></i>
      </motion.button>

      {/* WhatsApp Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="whatsapp-modal-overlay" onClick={() => setIsOpen(false)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="whatsapp-modal glass-card"
              onClick={(e) => e.stopPropagation()}
              style={{
                border: '1px solid rgba(37, 211, 102, 0.25)',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
                maxWidth: '480px'
              }}
            >
              {/* Close Button */}
              <button className="whatsapp-modal-close" onClick={() => setIsOpen(false)}>
                &times;
              </button>

              {/* WhatsApp Icon Header */}
              <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(37, 211, 102, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', border: '1px solid #25D366' }}>
                <i className="fab fa-whatsapp" style={{ fontSize: '2.2rem', color: '#25D366' }}></i>
              </div>

              {/* Header Text */}
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '10px' }}>
                WhatsApp Support
              </h3>
              
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '20px' }}>
                Send a message directly to GS Automobiles (+91 99999 38499). Fill in your details below to start the chat:
              </p>

              {/* Form */}
              <form onSubmit={handleSendWhatsApp} style={{ display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'left', marginBottom: '15px' }}>
                <div className="form-grid" style={{ gap: '15px' }}>
                  <div className="premium-input-group">
                    <label>Car Brand *</label>
                    <div className="premium-input-wrapper">
                      <input 
                        type="text" 
                        placeholder="e.g. Maruti" 
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
                
                <div className="premium-input-group">
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

                <div className="premium-input-group">
                  <label>Issue / Service Needed *</label>
                  <div className="premium-input-wrapper">
                    <textarea 
                      rows="3"
                      placeholder="Describe what help you need..." 
                      value={issueText}
                      onChange={(e) => setIssueText(e.target.value)}
                      required
                    />
                    <i className="fas fa-wrench"></i>
                  </div>
                </div>
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  style={{ background: '#25D366', borderColor: '#25D366', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', marginTop: '5px' }}
                >
                  <i className="fab fa-whatsapp" style={{ fontSize: '1.2rem' }}></i> Start Chat on WhatsApp
                </button>
              </form>

              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>
                <i className="fas fa-lock"></i> Chat is secure and direct with our team.
              </span>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
