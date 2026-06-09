import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Blog({ blogArticles }) {

  const [search, setSearch] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const filteredArticles = blogArticles.filter(item => 
    item.title.toLowerCase().includes(search.toLowerCase()) || 
    item.excerpt.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="section" 
      style={{ paddingTop: '120px' }}
    >
      <div className="container">
        <div className="section-header">
          <h1 className="section-title">Maintenance <span>Knowledge Base</span></h1>
          <p className="section-subtitle">Read detailed guides and articles written by our certified automotive mechanics to expand vehicle life.</p>
        </div>

        {/* Search controls */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
          <div className="search-bar-wrapper" style={{ maxWidth: '500px' }}>
            <i className="fas fa-search"></i>
            <input 
              type="text" 
              placeholder="Search articles by keywords..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Blogs Grid */}
        <div className="blogs-grid">
          {filteredArticles.map(item => (
            <motion.div 
              key={item.id}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedArticle(item)}
              className="blog-card glass-card"
              style={{ cursor: 'pointer' }}
            >
              <img src={item.img} alt={item.title} />
              <div className="blog-card-body">
                <div className="blog-card-meta">
                  <span><i className="fas fa-tag"></i> {item.category}</span> &bull; <span><i className="fas fa-calendar-alt"></i> {item.date}</span>
                </div>
                <h3 className="blog-card-title">{item.title}</h3>
                <p className="blog-card-excerpt">{item.excerpt}</p>
                <span className="btn btn-primary btn-text">Read Article <i className="fas fa-arrow-right"></i></span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Article Viewer Modal */}
        <AnimatePresence>
          {selectedArticle && (
            <div className="modal-overlay active" style={{ display: 'flex' }}>
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="modal-box glass-card"
                style={{ maxWidth: '700px', maxHeight: '90vh', overflowY: 'auto', padding: '35px' }}
              >
                <button className="modal-close-btn" onClick={() => setSelectedArticle(null)}>&times;</button>
                <div className="blog-card-meta" style={{ marginBottom: '15px' }}>
                  <span><i className="fas fa-tag"></i> {selectedArticle.category}</span> &bull; <span><i className="fas fa-calendar-alt"></i> {selectedArticle.date}</span> &bull; <span>By {selectedArticle.author}</span>
                </div>
                <h2 style={{ fontSize: '1.8rem', marginBottom: '20px', lineHeight: '1.3' }}>{selectedArticle.title}</h2>
                <img 
                  src={selectedArticle.img} 
                  alt={selectedArticle.title} 
                  style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: '20px' }}
                />
                <div style={{ whiteSpace: 'pre-line', lineHeight: '1.7', color: 'var(--text-muted)' }}>
                  {selectedArticle.content}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
