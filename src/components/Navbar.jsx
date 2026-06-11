import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ activePage, setActivePage, theme, toggleTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'brands', label: 'Brands' },
    { id: 'booking', label: 'Book Service' },
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
          GS <span>Automobiles</span>
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


          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="theme-toggle" 
            onClick={toggleTheme} 
            aria-label="Toggle Theme"
          >
            <i className={`fas ${theme === 'dark-theme' ? 'fa-sun' : 'fa-moon'}`}></i>
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
            

          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
