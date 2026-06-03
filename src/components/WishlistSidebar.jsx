import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WishlistSidebar({ isOpen, onClose, wishlist, removeFromWishlist, onBookNow }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: '#000',
              zIndex: 1099
            }}
          />

          {/* Sidebar Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="wishlist-sidebar active"
            style={{ display: 'flex' }}
          >
            <div className="sidebar-header">
              <h3><i className="fas fa-heart" style={{ color: '#EF4444' }}></i> Your Wishlist</h3>
              <button className="sidebar-close" onClick={onClose}>&times;</button>
            </div>
            
            <div className="sidebar-content">
              <div className="sidebar-section-title">Saved Services</div>
              
              <div className="sidebar-items-list">
                {wishlist.length === 0 ? (
                  <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '30px 0' }}>
                    Your wishlist is empty. Browse services to save your favorites!
                  </p>
                ) : (
                  wishlist.map(item => (
                    <motion.div 
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="glass-card" 
                      style={{ padding: '15px', display: 'flex', gap: '15px', alignItems: 'center', position: 'relative' }}
                    >
                      <img 
                        src={item.img} 
                        alt={item.title} 
                        style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
                      />
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '0.95rem', marginBottom: '2px' }}>{item.title}</h4>
                        <div style={{ fontSize: '0.85rem', color: 'var(--accent-color)', fontWeight: 600 }}>{item.price}</div>
                        <button 
                          className="btn btn-text" 
                          style={{ fontSize: '0.8rem', marginTop: '5px' }}
                          onClick={() => onBookNow(item.title)}
                        >
                          Book Now <i className="fas fa-arrow-right"></i>
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeFromWishlist(item.id)}
                        style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          background: 'none',
                          border: 'none',
                          color: 'var(--text-muted)',
                          cursor: 'pointer',
                          fontSize: '0.9rem'
                        }}
                        aria-label="Remove item"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
