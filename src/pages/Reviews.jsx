import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Reviews({ showToast }) {
  // Predefined reviews
  const defaultReviews = [
    { id: 1, name: 'Siddharth Sharma', stars: 5, comment: 'Exceptional service! The pickup was right on time and my car felt like brand new after the standard service package.', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80' },
    { id: 2, name: 'Neha Goel', stars: 5, comment: 'Highly recommend the AI recommendation tool. It diagnosed my AC issue correctly and saved me from unnecessary garage repairs.', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80' },
    { id: 3, name: 'Amit Verma', stars: 4, comment: 'The live tracking feature is super convenient. I was able to watch progress updates step-by-step from my desk.', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80' }
  ];

  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('autocare_reviews');
    return saved ? JSON.parse(saved) : defaultReviews;
  });

  const [currentSlide, setCurrentSlide] = useState(0);

  // Form State
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  useEffect(() => {
    localStorage.setItem('autocare_reviews', JSON.stringify(reviews));
  }, [reviews]);

  const handleNextSlide = () => {
    setCurrentSlide(prev => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const handlePrevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!name || !comment) {
      showToast('Please fill out all review fields.', 'error');
      return;
    }

    const newRev = {
      id: Date.now(),
      name,
      stars: rating,
      comment,
      img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80' // default avatar
    };

    setReviews(prev => [newRev, ...prev]);
    setName('');
    setComment('');
    setRating(5);
    setCurrentSlide(0);
    showToast('Thank you for submitting your review!', 'success');
  };

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
          <h1 className="section-title">Customer <span>Reviews</span></h1>
          <p className="section-subtitle">Read testimonials from our valuable clients or submit your own feedback.</p>
        </div>

        {/* Carousel Container */}
        <div className="reviews-slider-container glass-card">
          <div className="reviews-wrapper">
            <AnimatePresence mode="wait">
              {reviews.map((rev, idx) => {
                if (idx !== currentSlide) return null;
                return (
                  <motion.div 
                    key={rev.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="review-slide-card"
                  >
                    <img src={rev.img} alt={rev.name} className="review-author-img" />
                    <div className="rating-stars">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <i key={i} className={`${i < rev.stars ? 'fas' : 'far'} fa-star`}></i>
                      ))}
                    </div>
                    <p className="review-comment">"{rev.comment}"</p>
                    <div className="review-author-name">{rev.name}</div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Navigation arrows */}
          <button className="slider-btn slider-btn-prev" onClick={handlePrevSlide} aria-label="Previous Review">
            <i className="fas fa-chevron-left"></i>
          </button>
          <button className="slider-btn slider-btn-next" onClick={handleNextSlide} aria-label="Next Review">
            <i className="fas fa-chevron-right"></i>
          </button>

          {/* Dots */}
          <div className="slider-dots">
            {reviews.map((_, idx) => (
              <div 
                key={idx} 
                className={`slider-dot ${idx === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(idx)}
              ></div>
            ))}
          </div>
        </div>

        {/* Submission Form */}
        <div className="glass-card" style={{ maxWidth: '600px', margin: '50px auto 0', padding: '35px' }}>
          <h3 style={{ marginBottom: '20px', textAlign: 'center' }}>
            <i className="fas fa-pen-nib" style={{ color: 'var(--accent-color)', marginRight: '8px' }}></i> Submit Your Feedback
          </h3>

          <form onSubmit={handleSubmitReview} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="form-group">
              <label>Your Name</label>
              <input 
                type="text" 
                placeholder="Enter your name" 
                required 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Rating Score</label>
              <select value={rating} onChange={(e) => setRating(+e.target.value)}>
                <option value="5">5 Stars (Excellent)</option>
                <option value="4">4 Stars (Good)</option>
                <option value="3">3 Stars (Average)</option>
                <option value="2">2 Stars (Poor)</option>
                <option value="1">1 Star (Critical)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Review Comment</label>
              <textarea 
                rows="4" 
                placeholder="Share details of your experience..." 
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              <i className="fas fa-paper-plane"></i> Submit Review
            </button>
          </form>
        </div>
      </div>
    </motion.section>
  );
}
