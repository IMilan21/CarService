import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Auth({ users, setUsers, onAuthSuccess, onNavigate }) {
  const [isLoginView, setIsLoginView] = useState(true);

  // Form Fields
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Error messages
  const [errorMsg, setErrorMsg] = useState('');

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const trimmedEmail = email.trim().toLowerCase();
    
    if (isLoginView) {
      // --- Login Flow ---
      const match = users.find(u => u.email.toLowerCase() === trimmedEmail && u.password === password);
      if (match) {
        onAuthSuccess(match);
      } else {
        setErrorMsg('Invalid email or password. Please try again.');
      }
    } else {
      // --- Registration Flow ---
      if (!fullname.trim() || !email.trim() || !phone.trim() || !password) {
        setErrorMsg('Please fill in all fields.');
        return;
      }

      if (password.length < 6) {
        setErrorMsg('Password must be at least 6 characters long.');
        return;
      }

      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match.');
        return;
      }

      if (phone.trim().replace(/\D/g, '').length < 10) {
        setErrorMsg('Please enter a valid 10-digit phone number.');
        return;
      }

      // Check if email already registered
      const exists = users.some(u => u.email.toLowerCase() === trimmedEmail);
      if (exists) {
        setErrorMsg('This email address is already registered.');
        return;
      }

      // Save user
      const newUser = {
        id: `USR-${Date.now()}`,
        fullname: fullname.trim(),
        email: trimmedEmail,
        phone: phone.trim(),
        password: password
      };

      setUsers(prev => [...prev, newUser]);
      onAuthSuccess(newUser);
    }
  };

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="auth-fullscreen-container"
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <motion.div 
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          className="auth-card glass-card"
        >
          {/* Header Switcher */}
          <div className="auth-header-tabs">
            <button 
              className={`auth-tab-btn ${isLoginView ? 'active' : ''}`}
              onClick={() => { setIsLoginView(true); setErrorMsg(''); }}
            >
              Sign In
            </button>
            <button 
              className={`auth-tab-btn ${!isLoginView ? 'active' : ''}`}
              onClick={() => { setIsLoginView(false); setErrorMsg(''); }}
            >
              Sign Up
            </button>
          </div>

          <h3 style={{ margin: '15px 0 5px', textAlign: 'center', color: '#fff' }}>
            {isLoginView ? 'Welcome Back!' : 'Create an Account'}
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center', marginBottom: '20px' }}>
            {isLoginView ? 'Access your vehicle diagnostic timeline & logs.' : 'Register to easily schedule auto repairs and earn loyalty points.'}
          </p>

          <AnimatePresence mode="wait">
            {errorMsg && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{ 
                  background: 'rgba(239, 68, 68, 0.1)', 
                  border: '1px solid rgba(239, 68, 68, 0.3)', 
                  color: '#f87171', 
                  padding: '10px 15px', 
                  borderRadius: 'var(--radius-sm)', 
                  fontSize: '0.85rem', 
                  marginBottom: '15px' 
                }}
              >
                <i className="fas fa-exclamation-triangle" style={{ marginRight: '6px' }}></i>
                {errorMsg}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {!isLoginView && (
              <div className="form-group">
                <label>Full Name *</label>
                <input 
                  type="text" 
                  placeholder="Enter your name" 
                  required 
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
              </div>
            )}

            <div className="form-group">
              <label>Email Address *</label>
              <input 
                type="email" 
                placeholder="you@example.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {!isLoginView && (
              <div className="form-group">
                <label>Phone Number *</label>
                <input 
                  type="tel" 
                  placeholder="10-digit number" 
                  required 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            )}

            <div className="form-group">
              <label>Password *</label>
              <input 
                type="password" 
                placeholder="Enter password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {!isLoginView && (
              <div className="form-group">
                <label>Confirm Password *</label>
                <input 
                  type="password" 
                  placeholder="Re-enter password" 
                  required 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            )}

            <button type="submit" className="btn btn-primary" style={{ height: '48px', marginTop: '10px' }}>
              {isLoginView ? 'Sign In' : 'Sign Up'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button 
              onClick={() => onNavigate('home')} 
              className="btn btn-text"
              style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}
            >
              <i className="fas fa-chevron-left" style={{ marginRight: '6px' }}></i> Return to Home
            </button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
