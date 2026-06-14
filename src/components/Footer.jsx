import React from 'react';

export default function Footer({ setActivePage }) {
  return (
    <footer>
      <div className="container footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '40px' }}>
        {/* Brand Column */}
        <div className="footer-brand">
          <a href="#" className="logo" onClick={(e) => { e.preventDefault(); setActivePage('home'); }} style={{ color: 'white' }}>
            <i className="fas fa-tools logo-icon"></i>
            GS <span style={{ color: 'var(--accent-color)' }}>Automobiles</span>
          </a>
          <p style={{ marginTop: '15px', lineHeight: '1.6' }}>Your one-stop destination for premium car repair and maintenance services. Trusted by 10,000+ car owners across multiple brands.</p>
          <div className="social-links" style={{ marginTop: '20px' }}>
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
        
        {/* Service Areas Column */}
        <div className="footer-links">
          <h3>Service Areas</h3>
          <ul>
            <li><a href="/locations/indirapuram" onClick={(e) => { e.preventDefault(); setActivePage('location-landing', { location: 'indirapuram' }); }}>Car Service in Indirapuram</a></li>
            <li><a href="/locations/ghaziabad" onClick={(e) => { e.preventDefault(); setActivePage('location-landing', { location: 'ghaziabad' }); }}>Car Service in Ghaziabad</a></li>
            <li><a href="/locations/noida" onClick={(e) => { e.preventDefault(); setActivePage('location-landing', { location: 'noida' }); }}>Car Service in Noida</a></li>
            <li><a href="/locations/delhi-ncr" onClick={(e) => { e.preventDefault(); setActivePage('location-landing', { location: 'delhi-ncr' }); }}>Car Service in Delhi NCR</a></li>
          </ul>
        </div>
        
        {/* Services Links Column */}
        <div className="footer-links">
          <h3>Popular Services</h3>
          <ul>
            <li><a href="/services/car-service" onClick={(e) => { e.preventDefault(); setActivePage('service-landing', { service: 'car-service' }); }}>Periodic Car Service</a></li>
            <li><a href="/services/car-ac-repair" onClick={(e) => { e.preventDefault(); setActivePage('service-landing', { service: 'car-ac-repair' }); }}>Car AC Repair</a></li>
            <li><a href="/services/brake-repair" onClick={(e) => { e.preventDefault(); setActivePage('service-landing', { service: 'brake-repair' }); }}>Brake Repairs</a></li>
            <li><a href="/services/battery-replacement" onClick={(e) => { e.preventDefault(); setActivePage('service-landing', { service: 'battery-replacement' }); }}>Battery Replacement</a></li>
            <li><a href="/services/denting-painting" onClick={(e) => { e.preventDefault(); setActivePage('service-landing', { service: 'denting-painting' }); }}>Denting &amp; Painting</a></li>
            <li><a href="/services/car-detailing" onClick={(e) => { e.preventDefault(); setActivePage('service-landing', { service: 'car-detailing' }); }}>Car Detailing</a></li>
          </ul>
        </div>

        {/* Contact & Hours Column */}
        <div className="footer-links">
          <h3>Contact Info &amp; Hours</h3>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: 0, listStyle: 'none' }}>
            <li style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.4', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <i className="fas fa-map-marker-alt" style={{ color: 'var(--accent-color)', marginTop: '3px' }}></i>
              <span>Plot no.677, Sucheta Kriplani Marg, Indirapuram, Ghaziabad, UP 201014</span>
            </li>
            <li style={{ color: 'var(--text-muted)', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="fas fa-phone-alt" style={{ color: 'var(--accent-color)' }}></i>
              <a href="tel:+919999938499" style={{ color: 'inherit', textDecoration: 'none' }}>+91 99999 38499</a>
            </li>
            <li style={{ color: 'var(--text-muted)', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="fas fa-envelope" style={{ color: 'var(--accent-color)' }}></i>
              <a href="mailto:support@gsautomobiles.com" style={{ color: 'inherit', textDecoration: 'none' }}>support@gsautomobiles.com</a>
            </li>
            <li style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '8px', borderTop: '1px solid var(--border-color)', paddingTop: '12px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <i className="fas fa-clock" style={{ color: 'var(--accent-color)', marginTop: '2px' }}></i>
              <span><strong>Working Hours:</strong><br />Everyday: 10:00 AM - 6:00 PM</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="container footer-bottom" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px', marginTop: '30px' }}>
        <p>&copy; 2026 GS Automobiles. All Rights Reserved.</p>
        <div style={{ display: 'flex', gap: '20px' }}>
          <a href="#" onClick={(e) => { e.preventDefault(); setActivePage('home'); }}>Privacy Policy</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setActivePage('home'); }}>Terms of Use</a>
        </div>
      </div>
    </footer>
  );
}
