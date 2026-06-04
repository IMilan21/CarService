import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

// Components
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LiveChat from './components/LiveChat';
import WishlistSidebar from './components/WishlistSidebar';
import Toast from './components/Toast';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import Brands from './pages/Brands';
import Booking from './pages/Booking';
import Tracking from './pages/Tracking';
import Reviews from './pages/Reviews';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

export default function App() {
  // Navigation & Routing State
  const [activePage, setActivePage] = useState('home');
  const [pageParams, setPageParams] = useState(null); // params to pre-fill pages (e.g. Booking)

  // Theme State
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('autocare_theme') || 'dark-theme';
  });

  // State Persistence
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('autocare_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [bookingHistory, setBookingHistory] = useState(() => {
    const saved = localStorage.getItem('autocare_bookings');
    return saved ? JSON.parse(saved) : [];
  });

  const [loyaltyPoints, setLoyaltyPoints] = useState(() => {
    const saved = localStorage.getItem('autocare_loyalty');
    return saved ? parseInt(saved, 10) : 400; // Start with some default points for loyalty demo
  });

  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    const saved = localStorage.getItem('autocare_recently_viewed');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Sync state changes to localStorage
  useEffect(() => {
    localStorage.setItem('autocare_theme', theme);
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('autocare_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('autocare_bookings', JSON.stringify(bookingHistory));
  }, [bookingHistory]);

  useEffect(() => {
    localStorage.setItem('autocare_loyalty', loyaltyPoints.toString());
  }, [loyaltyPoints]);

  useEffect(() => {
    localStorage.setItem('autocare_recently_viewed', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  // Back to Top button scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toast Helper
  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  // State Modifiers
  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark-theme' ? 'light-theme' : 'dark-theme'));
    showToast('Theme switched!', 'info');
  };

  const toggleWishlist = (item) => {
    if (wishlist.some(w => w.id === item.id)) {
      setWishlist(prev => prev.filter(w => w.id !== item.id));
      showToast('Removed from wishlist', 'info');
    } else {
      setWishlist(prev => [...prev, item]);
      showToast('Saved to wishlist!', 'success');
    }
  };

  const removeFromWishlist = (id) => {
    setWishlist(prev => prev.filter(w => w.id !== id));
    showToast('Removed from wishlist', 'info');
  };

  const addRecentlyViewed = (item) => {
    setRecentlyViewed(prev => {
      // keep only unique items, limit to 4
      const filtered = prev.filter(p => p.id !== item.id);
      return [item, ...filtered].slice(0, 4);
    });
  };

  const addBookingHistory = (booking) => {
    setBookingHistory(prev => [booking, ...prev]);
  };

  const updateBookingStatus = (bookingId, nextStatus) => {
    setBookingHistory(prev => prev.map(b => {
      if (b.id === bookingId) {
        return { ...b, status: nextStatus };
      }
      return b;
    }));
  };

  const addLoyaltyPoints = (points) => {
    setLoyaltyPoints(prev => prev + points);
  };

  // Navigations
  const handleNavigate = (page, params = null) => {
    setActivePage(page);
    setPageParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Quick book now from wishlist side-panel
  const handleBookFromWishlist = (serviceName) => {
    setWishlistOpen(false);
    handleNavigate('booking', { service: serviceName });
  };

  return (
    <>
      {/* 1. Preloader Screen */}
      <Preloader />

      {/* 2. Global Toast Alerts */}
      <Toast toasts={toasts} />

      {/* 3. Global Navbar Header */}
      <Navbar 
        activePage={activePage} 
        setActivePage={(page) => handleNavigate(page)} 
        theme={theme}
        toggleTheme={toggleTheme}
        wishlistCount={wishlist.length}
        toggleWishlistSidebar={() => setWishlistOpen(!wishlistOpen)}
      />

      {/* 4. Wishlist Drawer Sidebar Panel */}
      <WishlistSidebar 
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        wishlist={wishlist}
        removeFromWishlist={removeFromWishlist}
        onBookNow={handleBookFromWishlist}
      />

      {/* 5. Pages Router Wrapper */}
      <main style={{ minHeight: '80vh' }}>
        <AnimatePresence mode="wait">
          {activePage === 'home' && (
            <Home 
              key="home" 
              onNavigate={handleNavigate} 
              showToast={showToast} 
              theme={theme}
            />
          )}
          {activePage === 'services' && (
            <Services 
              key="services" 
              onNavigate={handleNavigate} 
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
              recentlyViewed={recentlyViewed}
              addRecentlyViewed={addRecentlyViewed}
            />
          )}
          {activePage === 'brands' && (
            <Brands 
              key="brands" 
              onNavigate={handleNavigate} 
            />
          )}
          {activePage === 'booking' && (
            <Booking 
              key="booking" 
              initialParams={pageParams} 
              onNavigate={handleNavigate} 
              showToast={showToast} 
              addBookingHistory={addBookingHistory}
              addLoyaltyPoints={addLoyaltyPoints}
            />
          )}
          {activePage === 'tracking' && (
            <Tracking 
              key="tracking" 
              initialTrackId={pageParams?.trackId} 
              bookingHistory={bookingHistory}
              loyaltyPoints={loyaltyPoints}
              updateBookingStatus={updateBookingStatus}
              showToast={showToast}
            />
          )}
          {activePage === 'reviews' && (
            <Reviews 
              key="reviews" 
              showToast={showToast} 
            />
          )}
          {activePage === 'blog' && (
            <Blog 
              key="blog" 
            />
          )}
          {activePage === 'contact' && (
            <Contact 
              key="contact" 
              onNavigate={handleNavigate} 
              showToast={showToast} 
            />
          )}
          {activePage === 'admin' && (
            <Admin 
              key="admin" 
              bookingHistory={bookingHistory}
              updateBookingStatus={updateBookingStatus}
              setBookingHistory={setBookingHistory}
              showToast={showToast}
              onNavigate={handleNavigate}
            />
          )}
        </AnimatePresence>
      </main>

      {/* 6. Floating Assistant Elements */}
      <LiveChat setActivePage={handleNavigate} />
      
      <button 
        id="back-to-top" 
        className={showScrollTop ? 'active' : ''} 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        <i className="fas fa-chevron-up"></i>
      </button>

      {/* 7. Footer Layout */}
      <Footer setActivePage={handleNavigate} showToast={showToast} />
    </>
  );
}
