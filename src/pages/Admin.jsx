import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Admin({ 
  bookingHistory, 
  updateBookingStatus, 
  setBookingHistory, 
  showToast, 
  onNavigate,
  servicesData,
  setServicesData,
  blogArticles,
  setBlogArticles,
  reviews,
  setReviews,
  websiteSettings,
  setWebsiteSettings
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Active tab inside Dashboard: 'bookings', 'services', 'blogs', 'reviews', 'settings'
  const [activeTab, setActiveTab] = useState('bookings');

  // Dashboard Filters & Search State (for bookings)
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // --- Dynamic Manager States ---
  // Services Manager Form State
  const [srvId, setSrvId] = useState('');
  const [srvTitle, setSrvTitle] = useState('');
  const [srvCategory, setSrvCategory] = useState('Maintenance');
  const [srvPrice, setSrvPrice] = useState(0);
  const [srvImg, setSrvImg] = useState('');
  const [srvDesc, setSrvDesc] = useState('');
  const [isEditingService, setIsEditingService] = useState(false);

  // Blogs Manager Form State
  const [blogId, setBlogId] = useState('');
  const [blogTitle, setBlogTitle] = useState('');
  const [blogCategory, setBlogCategory] = useState('Tips & Hacks');
  const [blogAuthor, setBlogAuthor] = useState('Admin');
  const [blogImg, setBlogImg] = useState('');
  const [blogExcerpt, setBlogExcerpt] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [isEditingBlog, setIsEditingBlog] = useState(false);

  // Reviews Manager Form State
  const [revId, setRevId] = useState('');
  const [revName, setRevName] = useState('');
  const [revStars, setRevStars] = useState(5);
  const [revComment, setRevComment] = useState('');
  const [isEditingReview, setIsEditingReview] = useState(false);

  // Settings Editor Form State
  const [settingsForm, setSettingsForm] = useState({
    heroTagline: '',
    heroTitlePrefix: '',
    heroTitleHighlight: '',
    heroDescription: '',
    contactPhone: '',
    contactEmail: '',
    contactAddress: '',
    yearOfEstablishment: '',
    workingHours: '',
    priceBasic: 1999,
    priceStandard: 3999,
    pricePremium: 6999
  });

  // Verify active session on mount
  useEffect(() => {
    const sessionAuth = sessionStorage.getItem('autocare_admin_auth');
    if (sessionAuth === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  // Pre-fill settings form when tab changes
  useEffect(() => {
    if (websiteSettings) {
      setSettingsForm({ ...websiteSettings });
    }
  }, [websiteSettings]);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    sessionStorage.setItem('autocare_admin_auth', 'true');
    showToast('Admin login successful!', 'success');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('autocare_admin_auth');
    setUsername('');
    setPassword('');
    showToast('Logged out of Admin Portal.', 'info');
  };

  // --- Bookings Timelines & Deletes ---
  const handleDeleteBooking = (id) => {
    if (window.confirm(`Are you sure you want to cancel and delete booking ID: ${id}?`)) {
      setBookingHistory(prev => prev.filter(b => b.id !== id));
      showToast(`Booking ${id} deleted successfully.`, 'success');
    }
  };

  // --- Services Actions ---
  const handleSaveService = (e) => {
    e.preventDefault();
    if (!srvTitle || srvPrice < 0) {
      showToast('Please provide valid title and price.', 'error');
      return;
    }

    const defaultImg = 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80';
    if (isEditingService) {
      // Edit
      setServicesData(prev => prev.map(s => {
        if (s.id === srvId) {
          return {
            ...s,
            title: srvTitle,
            category: srvCategory,
            price: Number(srvPrice),
            img: srvImg.trim() || defaultImg,
            desc: srvDesc
          };
        }
        return s;
      }));
      showToast('Service updated successfully!', 'success');
    } else {
      // Add
      const newSrv = {
        id: String(Date.now()),
        title: srvTitle,
        category: srvCategory,
        price: Number(srvPrice),
        img: srvImg.trim() || defaultImg,
        desc: srvDesc
      };
      setServicesData(prev => [...prev, newSrv]);
      showToast('New service added successfully!', 'success');
    }

    resetServiceForm();
  };

  const handleEditService = (srv) => {
    setSrvId(srv.id);
    setSrvTitle(srv.title);
    setSrvCategory(srv.category);
    setSrvPrice(srv.price);
    setSrvImg(srv.img);
    setSrvDesc(srv.desc);
    setIsEditingService(true);
  };

  const handleDeleteService = (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      setServicesData(prev => prev.filter(s => s.id !== id));
      showToast('Service deleted.', 'info');
    }
  };

  const resetServiceForm = () => {
    setSrvId('');
    setSrvTitle('');
    setSrvCategory('Maintenance');
    setSrvPrice(0);
    setSrvImg('');
    setSrvDesc('');
    setIsEditingService(false);
  };

  // --- Blogs Actions ---
  const handleSaveBlog = (e) => {
    e.preventDefault();
    if (!blogTitle || !blogContent) {
      showToast('Please provide blog title and content.', 'error');
      return;
    }

    const defaultImg = 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80';
    if (isEditingBlog) {
      // Edit
      setBlogArticles(prev => prev.map(b => {
        if (b.id === blogId) {
          return {
            ...b,
            title: blogTitle,
            category: blogCategory,
            author: blogAuthor,
            img: blogImg.trim() || defaultImg,
            excerpt: blogExcerpt || blogContent.substring(0, 100) + '...',
            content: blogContent
          };
        }
        return b;
      }));
      showToast('Blog article updated!', 'success');
    } else {
      // Add
      const newBlog = {
        id: Date.now(),
        title: blogTitle,
        category: blogCategory,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        author: blogAuthor,
        img: blogImg.trim() || defaultImg,
        excerpt: blogExcerpt || blogContent.substring(0, 100) + '...',
        content: blogContent
      };
      setBlogArticles(prev => [...prev, newBlog]);
      showToast('Blog article published!', 'success');
    }

    resetBlogForm();
  };

  const handleEditBlog = (article) => {
    setBlogId(article.id);
    setBlogTitle(article.title);
    setBlogCategory(article.category);
    setBlogAuthor(article.author);
    setBlogImg(article.img);
    setBlogExcerpt(article.excerpt);
    setBlogContent(article.content);
    setIsEditingBlog(true);
  };

  const handleDeleteBlog = (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      setBlogArticles(prev => prev.filter(b => b.id !== id));
      showToast('Blog article deleted.', 'info');
    }
  };

  const resetBlogForm = () => {
    setBlogId('');
    setBlogTitle('');
    setBlogCategory('Tips & Hacks');
    setBlogAuthor('Admin');
    setBlogImg('');
    setBlogExcerpt('');
    setBlogContent('');
    setIsEditingBlog(false);
  };

  // --- Reviews Actions ---
  const handleSaveReview = (e) => {
    e.preventDefault();
    if (!revName || !revComment) {
      showToast('Please provide reviewer name and comment.', 'error');
      return;
    }

    const defaultImg = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80';
    if (isEditingReview) {
      setReviews(prev => prev.map(r => {
        if (r.id === revId) {
          return {
            ...r,
            name: revName,
            stars: Number(revStars),
            comment: revComment
          };
        }
        return r;
      }));
      showToast('Review details modified!', 'success');
    } else {
      const newRev = {
        id: Date.now(),
        name: revName,
        stars: Number(revStars),
        comment: revComment,
        img: defaultImg
      };
      setReviews(prev => [newRev, ...prev]);
      showToast('Review added manually!', 'success');
    }

    resetReviewForm();
  };

  const handleEditReview = (rev) => {
    setRevId(rev.id);
    setRevName(rev.name);
    setRevStars(rev.stars);
    setRevComment(rev.comment);
    setIsEditingReview(true);
  };

  const handleDeleteReview = (id) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      setReviews(prev => prev.filter(r => r.id !== id));
      showToast('Review deleted.', 'info');
    }
  };

  const resetReviewForm = () => {
    setRevId('');
    setRevName('');
    setRevStars(5);
    setRevComment('');
    setIsEditingReview(false);
  };

  // --- Global Settings Actions ---
  const handleSaveSettings = (e) => {
    e.preventDefault();
    setWebsiteSettings({
      ...settingsForm,
      priceBasic: Number(settingsForm.priceBasic),
      priceStandard: Number(settingsForm.priceStandard),
      pricePremium: Number(settingsForm.pricePremium)
    });
    showToast('Website content configurations saved!', 'success');
  };

  const handleSettingsChange = (key, val) => {
    setSettingsForm(prev => ({ ...prev, [key]: val }));
  };

  // --- Calculated Stats ---
  const totalBookings = bookingHistory.length;
  const totalRevenue = bookingHistory.reduce((sum, b) => sum + (b.total || 0), 0);
  const activeServices = bookingHistory.filter(b => b.status !== 'Ready for Delivery').length;
  const completedServices = bookingHistory.filter(b => b.status === 'Ready for Delivery').length;

  const statusOptions = [
    'Vehicle Received',
    'Inspection Done',
    'Service In Progress',
    'Quality Check',
    'Ready for Delivery'
  ];

  const filteredBookings = bookingHistory.filter(b => {
    const matchesSearch = 
      b.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.phone.includes(searchQuery);

    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Login Portal Layout (Standalone screen)
  if (!isLoggedIn) {
    return (
      <div className="admin-login-fullscreen">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          className="admin-login-card glass-card"
        >
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
              <i className="fas fa-user-shield"></i>
            </div>
          </div>
          <h2 style={{ marginBottom: '10px', color: '#fff' }}>Admin Panel Gate</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '25px' }}>
            Authenticate to manage bookings, services, blogs, and settings.
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
            style={{ marginTop: '20px', fontSize: '0.9rem', color: 'var(--accent-color)' }}
          >
            <i className="fas fa-chevron-left" style={{ marginRight: '6px' }}></i> Return to Home
          </button>
        </motion.div>
      </div>
    );
  }

  // Dashboard layout: Standalone Sidebar + content grid
  return (
    <div className="admin-dashboard-layout">
      {/* 1. Left Side Navigation Sidebar */}
      <aside className="admin-sidebar-nav">
        <div className="admin-sidebar-brand">
          <i className="fas fa-tools text-accent"></i>
          <div>
            <h3>GS Automobiles Admin</h3>
            <span>Control Panel</span>
          </div>
        </div>

        <div className="admin-sidebar-profile">
          <div className="admin-avatar">M</div>
          <div className="admin-profile-info">
            <strong>Milllan_666</strong>
            <span>Active Administrator</span>
          </div>
        </div>

        <nav className="admin-sidebar-menu">
          <button 
            className={`admin-menu-item ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            <i className="fas fa-calendar-check"></i> Bookings Queue
          </button>
          <button 
            className={`admin-menu-item ${activeTab === 'services' ? 'active' : ''}`}
            onClick={() => setActiveTab('services')}
          >
            <i className="fas fa-cogs"></i> Manage Services
          </button>
          <button 
            className={`admin-menu-item ${activeTab === 'blogs' ? 'active' : ''}`}
            onClick={() => setActiveTab('blogs')}
          >
            <i className="fas fa-newspaper"></i> Knowledge Base
          </button>
          <button 
            className={`admin-menu-item ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            <i className="fas fa-star"></i> Testimonials
          </button>
          <button 
            className={`admin-menu-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <i className="fas fa-sliders-h"></i> Web Content
          </button>
        </nav>

        <div className="admin-sidebar-footer">
          <button 
            onClick={() => onNavigate('home')}
            className="admin-menu-item client-site-btn"
            style={{ marginBottom: '10px' }}
          >
            <i className="fas fa-globe"></i> Client Website
          </button>
          <button 
            onClick={handleLogout} 
            className="admin-menu-item logout-btn"
          >
            <i className="fas fa-sign-out-alt"></i> Sign Out
          </button>
        </div>
      </aside>

      {/* 2. Right Side Content Workspace */}
      <main className="admin-workspace">
        <header className="admin-workspace-header">
          <h2>
            {activeTab === 'bookings' && 'Bookings timeline & scheduler'}
            {activeTab === 'services' && 'Services database inventory'}
            {activeTab === 'blogs' && 'Mechanics knowledge base manager'}
            {activeTab === 'reviews' && 'Customer reviews manager'}
            {activeTab === 'settings' && 'Global content settings'}
          </h2>
          <div className="admin-workspace-time">
            <i className="far fa-clock"></i> Local Time: {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
          </div>
        </header>

        {/* Global Summary Statistics */}
        <div className="admin-stats-grid" style={{ marginBottom: '30px' }}>
          <div className="admin-stat-card glass-card">
            <h3>Total Appointments</h3>
            <div className="admin-stat-number">{totalBookings}</div>
          </div>
          <div className="admin-stat-card glass-card">
            <h3>Cumulative Revenue</h3>
            <div className="admin-stat-number">₹{totalRevenue.toLocaleString('en-IN')}</div>
          </div>
          <div className="admin-stat-card glass-card">
            <h3>Repairs In-Progress</h3>
            <div className="admin-stat-number">{activeServices}</div>
          </div>
          <div className="admin-stat-card glass-card">
            <h3>Services Finalized</h3>
            <div className="admin-stat-number">{completedServices}</div>
          </div>
        </div>

        <div className="admin-tab-content">
          {/* TAB 1: BOOKINGS QUEUE */}
          {activeTab === 'bookings' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="admin-controls">
                <div className="admin-search-wrapper">
                  <i className="fas fa-search"></i>
                  <input 
                    type="text" 
                    placeholder="Search name, phone, email, or Booking ID..." 
                    className="admin-search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Timeline Status:</span>
                  <select 
                    className="admin-filter-select"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="All">All Appointments</option>
                    {statusOptions.map((opt, idx) => (
                      <option key={idx} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="admin-table-wrapper glass-card" style={{ padding: 0 }}>
                {filteredBookings.length === 0 ? (
                  <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <i className="fas fa-folder-open" style={{ fontSize: '3rem', marginBottom: '15px', color: 'var(--border-color)' }}></i>
                    <p>No client bookings match this criteria.</p>
                  </div>
                ) : (
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Booking ID</th>
                        <th>Customer</th>
                        <th>Vehicle info</th>
                        <th>Service type</th>
                        <th>Schedule details</th>
                        <th>Invoice</th>
                        <th>Timeline Status</th>
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
                                showToast(`Timeline updated for ${b.id}`, 'info');
                              }}
                            >
                              {statusOptions.map((opt, idx) => (
                                <option key={idx} value={opt}>{opt}</option>
                              ))}
                            </select>
                          </td>
                          <td>
                            <button 
                              className="admin-simulate-btn"
                              onClick={() => {
                                const currentIndex = statusOptions.indexOf(b.status);
                                if (currentIndex < statusOptions.length - 1) {
                                  const nextStatus = statusOptions[currentIndex + 1];
                                  updateBookingStatus(b.id, nextStatus);
                                  showToast(`Status advanced to: ${nextStatus}`, 'success');
                                } else {
                                  showToast('Booking is already ready for delivery!', 'info');
                                }
                              }}
                              style={{ background: 'none', border: 'none', color: 'var(--accent-color)', cursor: 'pointer', padding: '8px', marginRight: '10px' }}
                              title="Simulate Next Step"
                            >
                              <i className="fas fa-play"></i>
                            </button>
                            <button 
                              className="admin-delete-btn"
                              onClick={() => handleDeleteBooking(b.id)}
                              title="Cancel / Delete Record"
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
          )}

          {/* TAB 2: SERVICES MANAGER */}
          {activeTab === 'services' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="admin-grid-two-col">
              {/* Form panel */}
              <div className="glass-card admin-form-panel">
                <h3>{isEditingService ? '✏️ Edit Service Details' : '➕ Add Custom Service'}</h3>
                <form onSubmit={handleSaveService} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
                  <div className="form-group">
                    <label>Service Title *</label>
                    <input 
                      type="text" 
                      required 
                      value={srvTitle}
                      onChange={(e) => setSrvTitle(e.target.value)}
                      placeholder="e.g. Engine Flushing"
                    />
                  </div>
                  <div className="form-group">
                    <label>Category *</label>
                    <select value={srvCategory} onChange={(e) => setSrvCategory(e.target.value)}>
                      <option value="Maintenance">Maintenance</option>
                      <option value="Repairs">Repairs & Alignment</option>
                      <option value="Cleaning">Cleaning & Detailing</option>
                      <option value="Utility">Utilities & Claims</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Base Price (₹) *</label>
                    <input 
                      type="number" 
                      required 
                      min="0"
                      value={srvPrice}
                      onChange={(e) => setSrvPrice(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Image URL</label>
                    <input 
                      type="text" 
                      value={srvImg}
                      onChange={(e) => setSrvImg(e.target.value)}
                      placeholder="https://unsplash.com/..."
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea 
                      rows="3"
                      value={srvDesc}
                      onChange={(e) => setSrvDesc(e.target.value)}
                      placeholder="Brief details of inclusions..."
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                      {isEditingService ? 'Save Service' : 'Add Service'}
                    </button>
                    {isEditingService && (
                      <button type="button" className="btn btn-secondary" onClick={resetServiceForm}>
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Inventory list */}
              <div className="glass-card admin-list-panel">
                <h3>Services Database List</h3>
                <div className="admin-list-scroll">
                  {servicesData.map(s => (
                    <div key={s.id} className="admin-list-item">
                      <img src={s.img} alt={s.title} className="admin-item-thumbnail" />
                      <div className="admin-item-meta">
                        <strong>{s.title}</strong>
                        <span className="badge badge-primary" style={{ fontSize: '0.75rem', padding: '2px 6px', margin: '4px 0' }}>{s.category}</span>
                        <div style={{ fontWeight: 600, color: 'var(--accent-color)' }}>₹{s.price.toLocaleString('en-IN')}</div>
                      </div>
                      <div className="admin-item-actions">
                        <button className="btn btn-text" onClick={() => handleEditService(s)} title="Edit">
                          <i className="fas fa-edit" style={{ color: 'var(--accent-color)' }}></i>
                        </button>
                        <button className="btn btn-text" onClick={() => handleDeleteService(s.id)} title="Delete">
                          <i className="fas fa-trash-alt" style={{ color: 'var(--danger)' }}></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: KNOWLEDGE BASE (BLOGS) */}
          {activeTab === 'blogs' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="admin-grid-two-col">
              {/* Form Panel */}
              <div className="glass-card admin-form-panel">
                <h3>{isEditingBlog ? '✏️ Edit Blog Article' : '➕ Publish New Article'}</h3>
                <form onSubmit={handleSaveBlog} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
                  <div className="form-group">
                    <label>Article Title *</label>
                    <input 
                      type="text" 
                      required 
                      value={blogTitle}
                      onChange={(e) => setBlogTitle(e.target.value)}
                      placeholder="e.g. Caring for Alloy Wheels"
                    />
                  </div>
                  <div className="form-group">
                    <label>Category *</label>
                    <input 
                      type="text" 
                      required
                      value={blogCategory}
                      onChange={(e) => setBlogCategory(e.target.value)}
                      placeholder="e.g. Maintenance Guides"
                    />
                  </div>
                  <div className="form-group">
                    <label>Author *</label>
                    <input 
                      type="text" 
                      required
                      value={blogAuthor}
                      onChange={(e) => setBlogAuthor(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Image URL</label>
                    <input 
                      type="text" 
                      value={blogImg}
                      onChange={(e) => setBlogImg(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Excerpt (Summary) *</label>
                    <input 
                      type="text" 
                      required
                      value={blogExcerpt}
                      onChange={(e) => setBlogExcerpt(e.target.value)}
                      placeholder="Short summary for homepage grid..."
                    />
                  </div>
                  <div className="form-group">
                    <label>Article Content *</label>
                    <textarea 
                      rows="6"
                      required
                      value={blogContent}
                      onChange={(e) => setBlogContent(e.target.value)}
                      placeholder="Detailed content. Use new lines for paragraphs..."
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                      {isEditingBlog ? 'Save Article' : 'Publish Article'}
                    </button>
                    {isEditingBlog && (
                      <button type="button" className="btn btn-secondary" onClick={resetBlogForm}>
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* List Panel */}
              <div className="glass-card admin-list-panel">
                <h3>Articles Database List</h3>
                <div className="admin-list-scroll">
                  {blogArticles.map(b => (
                    <div key={b.id} className="admin-list-item">
                      <img src={b.img} alt={b.title} className="admin-item-thumbnail" />
                      <div className="admin-item-meta">
                        <strong>{b.title}</strong>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '3px 0' }}>
                          <span>By {b.author}</span> &bull; <span>{b.date}</span>
                        </div>
                        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{b.excerpt}</p>
                      </div>
                      <div className="admin-item-actions">
                        <button className="btn btn-text" onClick={() => handleEditBlog(b)} title="Edit">
                          <i className="fas fa-edit" style={{ color: 'var(--accent-color)' }}></i>
                        </button>
                        <button className="btn btn-text" onClick={() => handleDeleteBlog(b.id)} title="Delete">
                          <i className="fas fa-trash-alt" style={{ color: 'var(--danger)' }}></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 4: REVIEWS TESTIMONIALS */}
          {activeTab === 'reviews' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="admin-grid-two-col">
              {/* Form Panel */}
              <div className="glass-card admin-form-panel">
                <h3>{isEditingReview ? '✏️ Edit Review Details' : '➕ Add Manual Review'}</h3>
                <form onSubmit={handleSaveReview} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
                  <div className="form-group">
                    <label>Reviewer Name *</label>
                    <input 
                      type="text" 
                      required 
                      value={revName}
                      onChange={(e) => setRevName(e.target.value)}
                      placeholder="e.g. Rohan Khanna"
                    />
                  </div>
                  <div className="form-group">
                    <label>Rating (Stars) *</label>
                    <select value={revStars} onChange={(e) => setRevStars(Number(e.target.value))}>
                      <option value="5">5 Stars (Excellent)</option>
                      <option value="4">4 Stars (Good)</option>
                      <option value="3">3 Stars (Average)</option>
                      <option value="2">2 Stars (Critical)</option>
                      <option value="1">1 Star (Poor)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Comment *</label>
                    <textarea 
                      rows="4"
                      required
                      value={revComment}
                      onChange={(e) => setRevComment(e.target.value)}
                      placeholder="Detailed client comment..."
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                      {isEditingReview ? 'Update Review' : 'Add Review'}
                    </button>
                    {isEditingReview && (
                      <button type="button" className="btn btn-secondary" onClick={resetReviewForm}>
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* List Panel */}
              <div className="glass-card admin-list-panel">
                <h3>Customer Testimonials List</h3>
                <div className="admin-list-scroll">
                  {reviews.map(r => (
                    <div key={r.id} className="admin-list-item" style={{ alignItems: 'flex-start' }}>
                      <img src={r.img} alt={r.name} className="admin-item-thumbnail" style={{ borderRadius: '50%', width: '50px', height: '50px' }} />
                      <div className="admin-item-meta">
                        <strong style={{ fontSize: '0.95rem' }}>{r.name}</strong>
                        <div style={{ color: '#FFD700', fontSize: '0.8rem', margin: '4px 0' }}>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <i key={i} className={`${i < r.stars ? 'fas' : 'far'} fa-star`}></i>
                          ))}
                        </div>
                        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>"{r.comment}"</p>
                      </div>
                      <div className="admin-item-actions" style={{ alignSelf: 'center' }}>
                        <button className="btn btn-text" onClick={() => handleEditReview(r)} title="Edit">
                          <i className="fas fa-edit" style={{ color: 'var(--accent-color)' }}></i>
                        </button>
                        <button className="btn btn-text" onClick={() => handleDeleteReview(r.id)} title="Delete">
                          <i className="fas fa-trash-alt" style={{ color: 'var(--danger)' }}></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 5: WEBSITE CONTENT / SETTINGS */}
          {activeTab === 'settings' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="glass-card admin-form-panel" style={{ maxWidth: '850px', margin: '0 auto' }}>
                <h3>🌐 Global Website Text & Pricing Editor</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '20px' }}>
                  Modifying these values updates the homepage headers, contact panels, and package estimators dynamically in real time.
                </p>

                <form onSubmit={handleSaveSettings} className="form-grid" style={{ gap: '20px' }}>
                  
                  <div className="form-group form-group-full">
                    <h4 className="settings-section-header">Hero Header Branding</h4>
                  </div>
                  
                  <div className="form-group">
                    <label>Hero Tagline / Banner Tip</label>
                    <input 
                      type="text" 
                      value={settingsForm.heroTagline} 
                      onChange={(e) => handleSettingsChange('heroTagline', e.target.value)} 
                    />
                  </div>
                  <div className="form-group">
                    <label>Hero Title (Prefix text)</label>
                    <input 
                      type="text" 
                      value={settingsForm.heroTitlePrefix} 
                      onChange={(e) => handleSettingsChange('heroTitlePrefix', e.target.value)} 
                    />
                  </div>
                  <div className="form-group">
                    <label>Hero Title (Highlight text)</label>
                    <input 
                      type="text" 
                      value={settingsForm.heroTitleHighlight} 
                      onChange={(e) => handleSettingsChange('heroTitleHighlight', e.target.value)} 
                    />
                  </div>
                  <div className="form-group form-group-full">
                    <label>Hero Description</label>
                    <textarea 
                      rows="3" 
                      value={settingsForm.heroDescription} 
                      onChange={(e) => handleSettingsChange('heroDescription', e.target.value)} 
                    />
                  </div>

                  <div className="form-group form-group-full">
                    <h4 className="settings-section-header">Company Contact Details</h4>
                  </div>

                  <div className="form-group">
                    <label>Support Hotline Phone</label>
                    <input 
                      type="tel" 
                      value={settingsForm.contactPhone} 
                      onChange={(e) => handleSettingsChange('contactPhone', e.target.value)} 
                    />
                  </div>
                  <div className="form-group">
                    <label>Support Email Address</label>
                    <input 
                      type="email" 
                      value={settingsForm.contactEmail} 
                      onChange={(e) => handleSettingsChange('contactEmail', e.target.value)} 
                    />
                  </div>
                  <div className="form-group form-group-full">
                    <label>Workshop Physical Address</label>
                    <input 
                      type="text" 
                      value={settingsForm.contactAddress} 
                      onChange={(e) => handleSettingsChange('contactAddress', e.target.value)} 
                    />
                  </div>
                  <div className="form-group">
                    <label>Working Hours</label>
                    <input 
                      type="text" 
                      value={settingsForm.workingHours} 
                      onChange={(e) => handleSettingsChange('workingHours', e.target.value)} 
                    />
                  </div>
                  <div className="form-group">
                    <label>Year of Establishment</label>
                    <input 
                      type="text" 
                      value={settingsForm.yearOfEstablishment || ''} 
                      onChange={(e) => handleSettingsChange('yearOfEstablishment', e.target.value)} 
                    />
                  </div>

                  <div className="form-group form-group-full">
                    <h4 className="settings-section-header">Service Packages Starting Price List</h4>
                  </div>

                  <div className="form-group">
                    <label>Basic Package Price (₹)</label>
                    <input 
                      type="number" 
                      value={settingsForm.priceBasic} 
                      onChange={(e) => handleSettingsChange('priceBasic', e.target.value)} 
                    />
                  </div>
                  <div className="form-group">
                    <label>Standard Package Price (₹)</label>
                    <input 
                      type="number" 
                      value={settingsForm.priceStandard} 
                      onChange={(e) => handleSettingsChange('priceStandard', e.target.value)} 
                    />
                  </div>
                  <div className="form-group">
                    <label>Premium Package Price (₹)</label>
                    <input 
                      type="number" 
                      value={settingsForm.pricePremium} 
                      onChange={(e) => handleSettingsChange('pricePremium', e.target.value)} 
                    />
                  </div>

                  <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
                    <button type="submit" className="btn btn-primary" style={{ padding: '12px 30px' }}>
                      <i className="fas fa-save" style={{ marginRight: '6px' }}></i> Save Site Configurations
                    </button>
                  </div>

                </form>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
