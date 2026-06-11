import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Reviews({ showToast, reviews, setReviews }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getVisibleCardsCount = () => {
    if (windowWidth < 768) return 1;  // Mobile
    if (windowWidth < 1024) return 2; // Tablet
    return 3;                         // Desktop
  };

  const visibleCards = getVisibleCardsCount();
  const maxIndex = Math.max(0, reviews.length - visibleCards);

  const handleNextSlide = () => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handlePrevSlide = () => {
    setCurrentIndex(prev => (prev === 0 ? maxIndex : prev - 1));
  };

  // Keep index inside bounds when viewport size / visibleCards changes
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [visibleCards, maxIndex, currentIndex]);

  // Auto-slide every 3 seconds, resets timer on manual interaction
  useEffect(() => {
    const timer = setInterval(() => {
      handleNextSlide();
    }, 3000);
    return () => clearInterval(timer);
  }, [currentIndex, maxIndex]);

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="section" 
      style={{ paddingTop: '120px' }}
    >
      <div className="container">
        <div className="section-header animate__animated animate__fadeIn">
          <h1 className="section-title">What Our <span>Customers Say</span></h1>
          <p className="section-subtitle" style={{ maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
            Trusted by car owners across Ghaziabad , Noida , Delhi NCR Ensure excellent readability and accessibility.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="reviews-carousel-outer">
          <div className="reviews-carousel-container">
            <div 
              className="reviews-carousel-track"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
                transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              {reviews.map((rev) => {
                const stars = rev.stars || rev.rating || 5;
                const comment = rev.comment || rev.review || '';
                const name = rev.name || '';
                return (
                  <div 
                    key={rev.id} 
                    className="reviews-carousel-slide"
                    style={{
                      width: `${100 / visibleCards}%`
                    }}
                  >
                    <div className="review-card glass-card">
                      <div className="review-card-header">
                        <div className="review-card-stars" aria-label={`${stars} star rating`}>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <i key={i} className={`${i < stars ? 'fas' : 'far'} fa-star`} />
                          ))}
                        </div>
                        <div className="review-google-logo" title="Google Review">
                          <i className="fab fa-google" style={{ color: '#4285F4' }} />
                        </div>
                      </div>
                      <blockquote className="review-card-content">
                        "{comment}"
                      </blockquote>
                      <div className="review-card-footer">
                        <div className="review-user-avatar" aria-hidden="true">
                          <i className="fas fa-user" />
                        </div>
                        <div className="review-user-info">
                          <cite className="review-user-name">{name}</cite>
                          <span className="review-verified-text">
                            <i className="fas fa-check-circle review-verified-icon" />
                            Verified Customer (Google)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button 
            className="carousel-btn carousel-btn-prev" 
            onClick={handlePrevSlide} 
            aria-label="Previous reviews"
            title="Previous Reviews"
          >
            <i className="fas fa-chevron-left" />
          </button>
          <button 
            className="carousel-btn carousel-btn-next" 
            onClick={handleNextSlide} 
            aria-label="Next reviews"
            title="Next Reviews"
          >
            <i className="fas fa-chevron-right" />
          </button>
        </div>

        {/* Dots Indicators */}
        <div className="slider-dots" style={{ marginTop: '30px' }}>
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button 
              key={idx} 
              className={`slider-dot ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide page ${idx + 1}`}
              title={`Slide page ${idx + 1}`}
              style={{ border: 'none', padding: 0 }}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
