import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Admin({ bookingHistory, updateBookingStatus, setBookingHistory, showToast, onNavigate }) {
  // Login State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Dashboard Filters & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Verify active session on mount
  useEffect(() => {
    const sessionAuth = sessionStorage.getItem('autocare_admin_auth');
    if (sessionAuth === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim().toLowerCase() === 'milllan_666' && password.trim() === 'milan123') {
      setIsLoggedIn(true);
      sessionStorage.setItem('autocare_admin_auth', 'true');
      showToast('Admin login successful!', 'success');
    } else {
      showToast('Invalid credentials. Access Denied.', 'error');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('autocare_admin_auth');
    setUsername('');
    setPassword('');
    showToast('Logged out of Admin Portal.', 'info');
  };

  const handleDeleteBooking = (id) => {
    if (window.confirm(`Are you sure you want to cancel and delete booking ID: ${id}?`)) {
      setBookingHistory(prev => prev.filter(b => b.id !== id));
      showToast(`Booking ${id} deleted successfully.`, 'success');
    }
  };

  // Status definitions matching Tracking.jsx
  const statusOptions = [
    'Vehicle Received',
    'Inspection Done',
    'Service In Progress',
    'Quality Check',
    'Ready for Delivery'
  ];

  // Calculated Stats
  const totalBookings = bookingHistory.length;
  const totalRevenue = bookingHistory.reduce((sum, b) => sum + (b.total || 0), 0);
  const activeServices = bookingHistory.filter(b => b.status !== 'Ready for Delivery').length;
  const completedServices = bookingHistory.filter(b => b.status === 'Ready for Delivery').length;

  // Filter & Search Logic
  const filteredBookings = bookingHistory.filter(b => {
    const matchesSearch = 
      b.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.phone.includes(searchQuery);

    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Login Portal Layout
  if (!isLoggedIn) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        className="container"
        style={{ paddingTop: '150px', paddingBottom: '80px', display: 'flex', justifyContent: 'center' }}
      >
        <div className="admin-login-card glass-card">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'rgba(255, 107, 0, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-color)',
              fontSize: '1.8rem'
            }}>
              <i className="fas fa-lock"></i>
            </div>
          </div>
          <h2 style={{ marginBottom: '10px' }}>Admin Dashboard Gate</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '25px' }}>
            Please authenticate to access booking controls and metrics.
          </p>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'left' }}>
            <div className="search-input-group">
              <i className="fas fa-user" style={{ color: 'var(--text-muted)' }}></i>
              <input 
                type="text" 
                placeholder="Username" 
                required 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ paddingLeft: '45px', width: '100%', height: '48px', border: '1px solid var(--border-color)', background: 'var(--input-bg)', color: 'var(--input-text)', borderRadius: 'var(--radius-md)', outline: 'none' }}
              />
            </div>
            
            <div className="search-input-group">
              <i className="fas fa-key" style={{ color: 'var(--text-muted)' }}></i>
              <input 
                type="password" 
                placeholder="Password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingLeft: '45px', width: '100%', height: '48px', border: '1px solid var(--border-color)', background: 'var(--input-bg)', color: 'var(--input-text)', borderRadius: 'var(--radius-md)', outline: 'none' }}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', height: '48px', marginTop: '10px' }}>
              Authenticate <i className="fas fa-arrow-right" style={{ marginLeft: '6px' }}></i>
            </button>
          </form>
          
          <button 
            onClick={() => onNavigate('home')} 
            className="btn btn-text" 
            style={{ marginTop: '20px', fontSize: '0.9rem' }}
          >
            <i className="fas fa-chevron-left" style={{ marginRight: '6px' }}></i> Return to Home
          </button>
        </div>
      </motion.div>
    );
  }

  // Dashboard Control Center Layout
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container admin-dashboard-container"
    >
      <div className="admin-header">
        <div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Admin Portal Dashboard</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '5px' }}>
            Inspect client diagnostics, track timelines, and manage active service schedules.
          </p>
        </div>
        <button className="btn btn-secondary" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i> Sign Out
        </button>
      </div>

      {/* Summary Metrics Cards */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card glass-card">
          <h3>Total Bookings</h3>
          <div className="admin-stat-number">{totalBookings}</div>
        </div>
        <div className="admin-stat-card glass-card">
          <h3>Total Revenue</h3>
          <div className="admin-stat-number">₹{totalRevenue.toLocaleString('en-IN')}</div>
        </div>
        <div className="admin-stat-card glass-card">
          <h3>Active Repairs</h3>
          <div className="admin-stat-number">{activeServices}</div>
        </div>
        <div className="admin-stat-card glass-card">
          <h3>Completed / Ready</h3>
          <div className="admin-stat-number">{completedServices}</div>
        </div>
      </div>

      {/* Interactive Controls Panel */}
      <div className="admin-controls">
        <div className="admin-search-wrapper">
          <i className="fas fa-search"></i>
          <input 
            type="text" 
            placeholder="Search by name, phone, or Booking ID..." 
            className="admin-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Status Filter:</span>
          <select 
            className="admin-filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            {statusOptions.map((opt, idx) => (
              <option key={idx} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Bookings Table list */}
      <div className="admin-table-wrapper glass-card" style={{ padding: 0 }}>
        {filteredBookings.length === 0 ? (
          <div style={{ padding: '40px', textAlignment: 'center', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '15px', color: 'var(--border-color)', textAlign: 'center' }}>
              <i className="fas fa-folder-open"></i>
            </div>
            <p style={{ textAlign: 'center' }}>No booking records match your search criteria.</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Customer</th>
                <th>Vehicle Info</th>
                <th>Selected Service</th>
                <th>Scheduled Details</th>
                <th>Invoice Total</th>
                <th>Update Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map(b => (
                <tr key={b.id}>
                  <td style={{ fontWeight: 700, color: 'var(--accent-color)' }}>{b.id}</td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{b.fullname}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{b.phone}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{b.email}</div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{b.brand}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{b.model}</div>
                  </td>
                  <td>
                    <span className="badge badge-primary">{b.service}</span>
                  </td>
                  <td>
                    <div>{b.date}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{b.time}</div>
                  </td>
                  <td style={{ fontWeight: 700 }}>₹{b.total?.toLocaleString('en-IN')}</td>
                  <td>
                    <select 
                      className="admin-status-select"
                      value={b.status}
                      onChange={(e) => {
                        updateBookingStatus(b.id, e.target.value);
                        showToast(`Status updated for ${b.id}`, 'info');
                      }}
                    >
                      {statusOptions.map((opt, idx) => (
                        <option key={idx} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button 
                      className="admin-delete-btn"
                      onClick={() => handleDeleteBooking(b.id)}
                      title="Cancel Booking"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </motion.div>
  );
}
