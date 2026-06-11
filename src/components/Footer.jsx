import React from 'react';

export default function Footer({ setActivePage }) {
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
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); setActivePage('contact'); }}>Emergency Support</a></li>
          </ul>
        </div>
      </div>

      {/* SEO Searches Section */}
      <div className="container footer-seo-section" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '25px', marginTop: '25px', paddingBottom: '10px' }}>
        <h4 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '12px', color: 'var(--text-main)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Service Areas &amp; Popular Searches</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: '1.6', textAlign: 'left', opacity: 0.75 }}>
          <div>
            <strong style={{ color: 'var(--text-main)' }}>Indirapuram:</strong> Car Service Center &bull; Best Car Service Center &bull; Car Repair Services &bull; General Car Service &bull; Car AC Repair &bull; Battery Replacement Service &bull; Brake Repair Services &bull; Car Denting and Painting &bull; Car Washing and Detailing Services &bull; Engine Repair Services &bull; Suspension Repair Services
          </div>
          <div>
            <strong style={{ color: 'var(--text-main)' }}>Ghaziabad:</strong> Car Service Center &bull; Best Car Service Center &bull; Car Repair Shop &bull; Car AC Service &bull; Periodic Car Maintenance &bull; Car Battery Replacement &bull; Car Brake Repair &bull; Car Denting and Painting Services &bull; Car Detailing Services &bull; Engine Diagnostics and Repair
          </div>
          <div>
            <strong style={{ color: 'var(--text-main)' }}>Noida:</strong> Car Service Center &bull; Best Car Service Center &bull; Car Repair Services &bull; Car AC Repair Service &bull; Car Battery Replacement &bull; Brake Repair Services &bull; Engine Repair Services &bull; Car Denting and Painting &bull; Car Detailing Services &bull; Periodic Car Service &bull; Car Inspection Services
          </div>
          <div>
            <strong style={{ color: 'var(--text-main)' }}>Delhi NCR:</strong> Car Service Center &bull; Best Car Service Center &bull; Car Repair Services &bull; Car AC Service &bull; Engine Repair Services &bull; Car Battery Replacement &bull; Brake Repair Services &bull; Car Denting and Painting Services &bull; Car Detailing Services &bull; Car Wash Services &bull; Doorstep Car Service
          </div>
          <div>
            <strong style={{ color: 'var(--text-main)' }}>Popular Queries:</strong> Affordable Car Service Center in Noida &bull; Trusted Car Repair Shop in Ghaziabad &bull; Same Day Car Service in Indirapuram &bull; Doorstep Car Service in Delhi NCR &bull; Multi Brand Car Service Center in Noida &bull; Car Garage Near Me &bull; Best Car Mechanic in Indirapuram &bull; Emergency Car Repair Services in Noida
          </div>
        </div>
      </div>
      
      <div className="container footer-bottom">
        <p>&copy; 2026 GS Automobiles. All Rights Reserved.</p>
        <div style={{ display: 'flex', gap: '20px' }}>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
        </div>
      </div>
    </footer>
  );
}
