import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Tracking({ initialTrackId, bookingHistory, loyaltyPoints, updateBookingStatus, showToast }) {
  const [searchId, setSearchId] = useState('');
  const [activeBooking, setActiveBooking] = useState(null);

  // Status mapping to indices
  const statusSteps = [
    { label: 'Vehicle Received', icon: 'fa-car-side' },
    { label: 'Inspection Done', icon: 'fa-clipboard-check' },
    { label: 'Service In Progress', icon: 'fa-wrench' },
    { label: 'Quality Check', icon: 'fa-tasks' },
    { label: 'Ready for Delivery', icon: 'fa-box' }
  ];

  // Load initial search parameters if passed
  useEffect(() => {
    if (initialTrackId) {
      setSearchId(initialTrackId);
      const match = bookingHistory.find(b => b.id.toLowerCase() === initialTrackId.toLowerCase());
      if (match) {
        setActiveBooking(match);
      }
    }
  }, [initialTrackId, bookingHistory]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchId.trim()) return;

    const match = bookingHistory.find(b => b.id.toLowerCase() === searchId.toLowerCase().trim());
    if (match) {
      setActiveBooking(match);
      showToast('Booking record found!', 'success');
    } else {
      setActiveBooking(null);
      showToast('No record matching this ID was found.', 'error');
    }
  };

  const getStatusIndex = (status) => {
    return statusSteps.findIndex(s => s.label === status);
  };

  const handleSimulateStatus = () => {
    if (!activeBooking) return;
    const currentIndex = getStatusIndex(activeBooking.status);
    if (currentIndex < statusSteps.length - 1) {
      const nextStatus = statusSteps[currentIndex + 1].label;
      updateBookingStatus(activeBooking.id, nextStatus);
      showToast(`Status updated: ${nextStatus}`, 'info');
    } else {
      showToast('Service is already ready for delivery!', 'success');
    }
  };

  const statusIdx = activeBooking ? getStatusIndex(activeBooking.status) : 0;
  const progressPercent = activeBooking ? (statusIdx / (statusSteps.length - 1)) * 100 : 0;

  // Loyalty rewards percentage (cap at 1000)
  const rewardsPercentage = Math.min(100, (loyaltyPoints / 1000) * 100);

  return (
    <div className="container tracking-container">
      <div className="section-header" style={{ marginBottom: '30px' }}>
        <h1 className="section-title">Service <span>Timeline Tracker</span></h1>
        <p className="section-subtitle">Search for active booking records or view your customer loyalty points rewards.</p>
      </div>

      {/* Tracker Lookup form */}
      <form onSubmit={handleSearch} className="tracking-search-box">
        <input 
          type="text" 
          placeholder="Enter Booking ID (e.g. AC-123456)" 
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          <i className="fas fa-search"></i> Track Status
        </button>
      </form>

      {/* Lookup results */}
      <AnimatePresence mode="wait">
        {activeBooking && (
          <motion.div 
            key={activeBooking.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="tracking-result-box glass-card"
            style={{ display: 'block' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '15px' }}>
              <div>
                <h3>Booking Details: {activeBooking.id}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  {activeBooking.brand} {activeBooking.model} &bull; {activeBooking.service}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="badge badge-success" style={{ fontSize: '0.9rem' }}>{activeBooking.status}</span>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '5px' }}>
                  Scheduled: {activeBooking.date} at {activeBooking.time}
                </p>
              </div>
            </div>

            {/* Tracker Timeline animation */}
            <div className="status-tracker-timeline">
              <div className="tracking-progress-fill" style={{ width: `${progressPercent}%` }}></div>
              {statusSteps.map((step, idx) => {
                const isActive = idx <= statusIdx;
                return (
                  <div key={idx} className={`status-step ${isActive ? 'active' : ''}`}>
                    <div className="status-icon-wrapper">
                      <i className={`fas ${step.icon}`}></i>
                    </div>
                    <div className="status-step-label">{step.label}</div>
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', borderTop: '1px dashed var(--border-color)', paddingTop: '15px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                * Timeline automatically shifts when mechanic updates logs.
              </span>
              <button className="btn btn-secondary" onClick={handleSimulateStatus}>
                <i className="fas fa-play"></i> Simulate Next Step
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dashboard Metrics */}
      <div className="dashboard-grid">
        {/* Loyalty Reward Progress */}
        <div className="rewards-card glass-card">
          <h3 style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <i className="fas fa-award" style={{ color: 'var(--accent-color)' }}></i> Loyalty Rewards
          </h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-color)', marginBottom: '5px' }}>
            {loyaltyPoints} <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>Points Earned</span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '20px' }}>
            Earn points on every service booking. Unlock a free diagnostic check or 20% discount coupon at 1,000 points.
          </p>

          <div style={{ marginBottom: '10px', fontSize: '0.85rem', display: 'flex', justifyContent: 'space-between' }}>
            <span>Progress to Free Coupon</span>
            <span>{loyaltyPoints} / 1000 Pts</span>
          </div>
          <div style={{ width: '100%', height: '8px', background: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${rewardsPercentage}%`, height: '100%', background: 'var(--accent-color)', transition: 'width 0.4s ease' }}></div>
          </div>
        </div>

        {/* History log */}
        <div className="history-card glass-card">
          <h3><i className="fas fa-history" style={{ color: 'var(--accent-color)', marginRight: '8px' }}></i> Booking History Logs</h3>
          
          <div className="history-list">
            {bookingHistory.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', padding: '20px 0' }}>No appointment histories on record.</p>
            ) : (
              bookingHistory.map(b => (
                <div key={b.id} className="history-timeline-item">
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <strong style={{ cursor: 'pointer' }} onClick={() => { setSearchId(b.id); setActiveBooking(b); }}>
                      {b.brand} {b.model} &bull; {b.service}
                    </strong>
                    <span style={{ fontSize: '0.8rem', color: 'var(--accent-color)', fontWeight: 600 }}>{b.status}</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Scheduled Date: {b.date} at {b.time}</span>
                    <span>ID: {b.id}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
