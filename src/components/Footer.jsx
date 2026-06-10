import React, { useState } from 'react';

export default function Footer({ setActivePage, showToast }) {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      showToast('Successfully subscribed to newsletter!', 'success');
      setEmail('');
    }
  };

  return (
    <footer>
      <div className="container footer-grid">
        <div className="footer-brand">
          <a href="#" className="logo" onClick={(e) => { e.preventDefault(); setActivePage('home'); }} style={{ color: 'white' }}>
            <i className="fas fa-tools logo-icon"></i>
            GS <span style={{ color: 'var(--accent-color)' }}>Automobiles</span>
          </a>
          <p>Your one-stop destination for premium car repair and maintenance services. Trusted by 10,000+ car owners across multiple brands.</p>
          <div className="social-links">
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
        
        <div className="footer-links">
          <h3>Our Services</h3>
          <ul>
            <li><a href="#services" onClick={(e) => { e.preventDefault(); setActivePage('services'); }}>Periodic Service</a></li>
            <li><a href="#services" onClick={(e) => { e.preventDefault(); setActivePage('services'); }}>Brake Repairs</a></li>
            <li><a href="#services" onClick={(e) => { e.preventDefault(); setActivePage('services'); }}>AC Cooling Service</a></li>
            <li><a href="#services" onClick={(e) => { e.preventDefault(); setActivePage('services'); }}>Car Detail Wash</a></li>
          </ul>
        </div>
        
        <div className="footer-links">
          <h3>Quick Nav</h3>
          <ul>
            <li><a href="#home" onClick={(e) => { e.preventDefault(); setActivePage('home'); }}>Home</a></li>
            <li><a href="#booking" onClick={(e) => { e.preventDefault(); setActivePage('booking'); }}>Book Appointment</a></li>
            <li><a href="#tracking" onClick={(e) => { e.preventDefault(); setActivePage('tracking'); }}>Track Status</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); setActivePage('contact'); }}>Emergency Support</a></li>
            <li><a href="#admin" onClick={(e) => { e.preventDefault(); setActivePage('admin'); }}>Admin Login</a></li>
          </ul>
        </div>

        <div className="footer-newsletter">
          <h3>Newsletter</h3>
          <p style={{ color: '#94A3B8', fontSize: '0.9rem' }}>Subscribe to get the latest maintenance tips & discount coupons.</p>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input 
              type="email" 
              placeholder="Your Email Address" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>&copy; 2026 GS Automobiles. All Rights Reserved.</p>
        <div style={{ display: 'flex', gap: '20px' }}>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
          <a href="#admin" onClick={(e) => { e.preventDefault(); setActivePage('admin'); }} style={{ opacity: 0.12, cursor: 'default' }}>Admin</a>
        </div>
      </div>
    </footer>
  );
}
