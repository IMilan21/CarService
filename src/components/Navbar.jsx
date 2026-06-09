import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ activePage, setActivePage, theme, toggleTheme, wishlistCount, toggleWishlistSidebar, currentUser, setCurrentUser, showToast }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'brands', label: 'Brands' },
    { id: 'booking', label: 'Book Service' },
    { id: 'tracking', label: 'Dashboard & Track' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact Us' }
  ];

  const handleNavClick = (id) => {
    setActivePage(id);
    setMobileMenuOpen(false);
  };

  return (
    <header>
      <div className="container nav-container">
        <a href="#" className="logo" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}>
          <i className="fas fa-tools logo-icon"></i>
          AutoCare <span>Hub</span>
        </a>

        {/* Desktop nav links */}
        <nav className="nav-links">
          {navItems.map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={activePage === item.id ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); handleNavClick(item.id); }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Actions bar */}
        <div className="nav-actions">
          {currentUser ? (
            <div className="navbar-user-profile" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginRight: '5px' }}>
              <span className="navbar-greeting" style={{ fontSize: '0.9rem', color: 'var(--text-muted)', display: 'inline-block' }}>
                Hi, <strong style={{ color: 'var(--accent-color)' }}>{currentUser.fullname.split(' ')[0]}</strong>
              </span>
              <button 
                className="btn btn-secondary" 
                onClick={() => {
                  setCurrentUser(null);
                  showToast('Logged out successfully.', 'info');
                  setActivePage('home');
                }}
                style={{ padding: '6px 12px', fontSize: '0.8rem', whiteSpace: 'nowrap' }}
              >
                <i className="fas fa-sign-out-alt"></i> Logout
              </button>
            </div>
          ) : (
            <button 
              className="btn btn-primary" 
              onClick={() => setActivePage('auth')}
              style={{ padding: '6px 14px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '5px', marginRight: '5px', whiteSpace: 'nowrap' }}
            >
              <i className="fas fa-sign-in-alt"></i> Sign In
            </button>
          )}

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="theme-toggle" 
            onClick={toggleTheme} 
            aria-label="Toggle Theme"
          >
            <i className={`fas ${theme === 'dark-theme' ? 'fa-sun' : 'fa-moon'}`}></i>
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="wishlist-toggle-btn" 
            onClick={toggleWishlistSidebar}
            aria-label="Toggle Wishlist"
          >
            <i className="fas fa-heart"></i>
            {wishlistCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="wishlist-count"
              >
                {wishlistCount}
              </motion.span>
            )}
          </motion.button>

          <button 
            className="hamburger" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <span style={{ transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></span>
            <span style={{ opacity: mobileMenuOpen ? 0 : 1 }}></span>
            <span style={{ transform: mobileMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }}></span>
          </button>
        </div>
      </div>

      {/* Mobile nav links */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="nav-links active"
          >
            {navItems.map(item => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={activePage === item.id ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.id); }}
                style={{ width: '100%', padding: '10px 0', borderBottom: '1px solid var(--border-color)' }}
              >
                {item.label}
              </a>
            ))}
            
            {/* Mobile Auth actions */}
            {currentUser ? (
              <div style={{ width: '100%', padding: '15px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Logged in as: <strong style={{ color: 'var(--accent-color)' }}>{currentUser.fullname}</strong>
                </span>
                <button 
                  className="btn btn-secondary" 
                  onClick={() => {
                    setCurrentUser(null);
                    showToast('Logged out successfully.', 'info');
                    setActivePage('home');
                    setMobileMenuOpen(false);
                  }}
                  style={{ width: '100%', padding: '10px', fontSize: '0.9rem' }}
                >
                  <i className="fas fa-sign-out-alt"></i> Logout
                </button>
              </div>
            ) : (
              <button 
                className="btn btn-primary" 
                onClick={() => {
                  setActivePage('auth');
                  setMobileMenuOpen(false);
                }}
                style={{ width: '100%', padding: '10px', fontSize: '0.9rem', marginTop: '10px' }}
              >
                <i className="fas fa-sign-in-alt"></i> Sign In / Sign Up
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
