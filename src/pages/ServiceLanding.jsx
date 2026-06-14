import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { seoContent } from '../data/seoContent';

export default function ServiceLanding({ serviceSlug, onNavigate, showToast }) {
  const data = seoContent.services[serviceSlug];

  useEffect(() => {
    if (!data) return;
    
    // Set dynamic SEO meta tags
    document.title = data.title;
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = data.metaDescription;

    // Inject FAQ schema JSON-LD & AutoRepair/Service schema
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": data.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a
        }
      }))
    };

    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": data.h1,
      "provider": {
        "@type": "AutoRepair",
        "name": "GS Automobiles",
        "telephone": "+919999938499",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Plot no.677, Sucheta Kriplani Marg, near igl cng pump, Shakti Khand III, Indirapuram",
          "addressLocality": "Ghaziabad",
          "addressRegion": "UP",
          "postalCode": "201014",
          "addressCountry": "IN"
        }
      },
      "areaServed": ["Ghaziabad", "Indirapuram", "Noida", "Delhi NCR"]
    };

    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.id = 'seo-service-schema';
    schemaScript.innerHTML = JSON.stringify([faqSchema, serviceSchema]);
    document.head.appendChild(schemaScript);

    return () => {
      // Cleanup schemas on unmount
      const existing = document.getElementById('seo-service-schema');
      if (existing) existing.remove();
    };
  }, [serviceSlug, data]);

  if (!data) {
    return (
      <div className="section" style={{ paddingTop: '150px', textAlign: 'center' }}>
        <div className="container">
          <h2>Service Page Not Found</h2>
          <button className="btn btn-primary" onClick={() => onNavigate('home')}>Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="section" 
      style={{ paddingTop: '120px' }}
    >
      <div className="container">
        {/* Breadcrumb Navigation */}
        <nav className="breadcrumb-nav" aria-label="breadcrumb" style={{ display: 'flex', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px', alignItems: 'center' }}>
          {data.breadcrumb.map((crumb, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <span style={{ opacity: 0.5 }}>/</span>}
              {idx === data.breadcrumb.length - 1 ? (
                <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>{crumb.label}</span>
              ) : (
                <a 
                  href={crumb.path} 
                  onClick={(e) => { 
                    e.preventDefault(); 
                    onNavigate('home'); 
                  }} 
                  style={{ color: 'var(--text-muted)', textDecoration: 'none' }}
                >
                  {crumb.label}
                </a>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* H1 Heading */}
        <div className="section-header" style={{ textAlign: 'left', marginBottom: '40px' }}>
          <h1 className="section-title" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', margin: '0 0 10px 0', textAlign: 'left' }}>
            {data.h1.split(' ').slice(0, -1).join(' ')} <span>{data.h1.split(' ').slice(-1)}</span>
          </h1>
        </div>

        <div className="services-layout-grid">
          {/* Left Content Area */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            <div className="glass-card" style={{ padding: '30px', borderRadius: 'var(--radius-lg)' }}>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-main)', marginBottom: '20px' }}>
                {data.introduction}
              </p>
              
              {data.sections.map((sec, idx) => (
                <div key={idx} style={{ marginTop: '25px' }}>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent-color)', marginBottom: '12px' }}>
                    {sec.title}
                  </h2>
                  <p style={{ fontSize: '0.98rem', lineHeight: '1.65', color: 'var(--text-muted)' }}>
                    {sec.text}
                  </p>
                </div>
              ))}
            </div>

            {/* FAQ Section */}
            <div className="glass-card" style={{ padding: '30px', borderRadius: 'var(--radius-lg)' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '25px', color: 'var(--text-main)' }}>
                Frequently Asked Questions
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {data.faqs.map((faq, idx) => (
                  <div key={idx} style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '15px' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-main)' }}>
                      {faq.q}
                    </h3>
                    <p style={{ fontSize: '0.92rem', lineHeight: '1.5', color: 'var(--text-muted)' }}>
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar Area */}
          <div className="services-filter-sidebar">
            {/* Related Links */}
            <div className="glass-card" style={{ padding: '25px', borderRadius: 'var(--radius-lg)', marginBottom: '25px' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '15px', borderBottom: '2px solid var(--accent-color)', paddingBottom: '8px' }}>
                Service Locations
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {data.related.map((link, idx) => (
                  <a 
                    key={idx} 
                    href={link.path}
                    onClick={(e) => {
                      e.preventDefault();
                      if (link.path.startsWith('/services/')) {
                        const service = link.path.replace('/services/', '');
                        onNavigate('service-landing', { service });
                      } else if (link.path.startsWith('/locations/')) {
                        const loc = link.path.replace('/locations/', '');
                        onNavigate('location-landing', { location: loc });
                      } else {
                        onNavigate('home');
                      }
                    }}
                    className="btn-text"
                    style={{ display: 'block', padding: '4px 0', fontSize: '0.92rem', textDecoration: 'none', color: 'var(--text-muted)', transition: 'color 0.2s' }}
                  >
                    <i className="fas fa-chevron-right" style={{ fontSize: '0.75rem', color: 'var(--accent-color)', marginRight: '8px' }}></i>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* CTA Box */}
            <div className="glass-card" style={{ padding: '30px', borderRadius: 'var(--radius-lg)', textAlign: 'center', background: 'linear-gradient(135deg, rgba(255,107,0,0.1) 0%, rgba(0,0,0,0) 100%)', border: '1px solid rgba(255, 107, 0, 0.2)' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '12px' }}>
                {data.cta.title}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '25px' }}>
                {data.cta.text}
              </p>
              <button 
                onClick={() => onNavigate('booking', { service: data.h1 })}
                className="btn btn-primary" 
                style={{ width: '100%', padding: '12px', fontSize: '0.95rem' }}
              >
                {data.cta.btnText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
