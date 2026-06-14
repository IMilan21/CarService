import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

// Components
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LiveChat from './components/LiveChat';
import Toast from './components/Toast';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import Brands from './pages/Brands';
import Booking from './pages/Booking';
import Reviews from './pages/Reviews';
import Blog from './pages/Blog';
import Admin from './pages/Admin';
import Contact from './pages/Contact';
import LocationLanding from './pages/LocationLanding';
import ServiceLanding from './pages/ServiceLanding';

export default function App() {
  // Navigation & Routing State
  const [activePage, setActivePage] = useState(() => {
    const path = typeof window !== 'undefined' ? window.location.pathname : '/';
    if (path.startsWith('/locations/')) return 'location-landing';
    if (path.startsWith('/services/')) {
      const service = path.split('/services/')[1];
      const seoSlugs = ['car-service', 'car-ac-repair', 'brake-repair', 'battery-replacement', 'engine-repair', 'denting-painting', 'car-detailing'];
      if (seoSlugs.includes(service)) return 'service-landing';
    }
    if (path !== '/') {
      const page = path.substring(1);
      const validPages = ['home', 'services', 'brands', 'booking', 'reviews', 'blog', 'contact', 'admin'];
      if (validPages.includes(page)) return page;
    }
    return 'home';
  });

  const [pageParams, setPageParams] = useState(() => {
    const path = typeof window !== 'undefined' ? window.location.pathname : '/';
    if (path.startsWith('/locations/')) {
      return { location: path.split('/locations/')[1] };
    }
    if (path.startsWith('/services/')) {
      return { service: path.split('/services/')[1] };
    }
    return null;
  });

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

  const [servicesData, setServicesData] = useState(() => {
    const saved = localStorage.getItem('autocare_services');
    const savedVersion = localStorage.getItem('autocare_services_version');
    const CURRENT_VERSION = '20260614_v2';

    const defaultServices = [
      { id: '1', title: 'Periodic Service', category: 'Maintenance', price: 2499, img: 'https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&w=600&q=80', desc: 'Complete 40-point maintenance inspect, engine oil top-up, spark plugs inspection and filter check.' },
      { id: '2', title: 'Oil Change', category: 'Maintenance', price: 1499, img: 'https://images.unsplash.com/photo-1552656967-7a0991a13906?auto=format&fit=crop&w=600&q=80', desc: 'Premium synthetic oil replace & lubricant check with standard oil filter replacements.' },
      { id: '3', title: 'Brake Repair', category: 'Repairs', price: 1899, img: 'https://images.unsplash.com/photo-1760317890322-364a810cd4da?auto=format&fit=crop&w=600&q=80', desc: 'Inspection of calipers, pads replacement, lines bleeding and diagnostic safety report.' },
      { id: '4', title: 'Wheel Alignment', category: 'Repairs', price: 899, img: 'https://images.unsplash.com/photo-1645445522156-9ac06bc7a767?auto=format&fit=crop&w=600&q=80', desc: 'Precise 3D wheel alignment, tracking adjustment and dynamic balancing for safety.' },
      { id: '5', title: 'AC Service', category: 'Repairs', price: 1299, img: 'https://images.unsplash.com/photo-1615192559550-100bd8c17b5f?auto=format&fit=crop&w=600&q=80', desc: 'Cabin filter cleaning, vent sterilization and AC refrigerant gas top-up.' },
      { id: '6', title: 'Engine Overhaul & Diagnostics', category: 'Repairs', price: 9999, img: 'https://plus.unsplash.com/premium_photo-1682141708282-3a4f7023e1bb?auto=format&fit=crop&w=600&q=80', desc: 'Advanced engine overhaul, valve tuning, diagnostic error clearance and performance tuning.' },
      { id: '7', title: 'Battery Replacement', category: 'Maintenance', price: 3499, img: 'https://plus.unsplash.com/premium_photo-1661770030805-0abb8fd880f1?auto=format&fit=crop&w=600&q=80', desc: 'High capacity battery installation with 36 months warranty and old battery recycling.' },
      { id: '8', title: 'Denting & Painting', category: 'Cleaning', price: 4999, img: 'https://plus.unsplash.com/premium_photo-1661750334379-2f2b4b1f6ef4?auto=format&fit=crop&w=600&q=80', desc: 'Car denting, car painting with precision scratch extraction, paint matched code painting, and high-gloss polish overlay.' },
      { id: '9', title: 'Shocker & Suspension Repair', category: 'Repairs', price: 1999, img: 'https://plus.unsplash.com/premium_photo-1674375348374-aad3d999634d?auto=format&fit=crop&w=600&q=80', desc: 'Complete shocker repair and suspension system tuning for smooth drivability.' },
      { id: '10', title: 'Transmission Repair', category: 'Repairs', price: 4999, img: 'https://plus.unsplash.com/premium_photo-1694016219825-62a6a5697027?auto=format&fit=crop&w=600&q=80', desc: 'Gearbox repairs, transmission fluid flush, clutch tuning, and mechanical gearbox replacements.' },
      { id: '11', title: 'Accident Car Repair & Services', category: 'Utility', price: 7999, img: 'https://plus.unsplash.com/premium_photo-1661964211810-f078c3f9e111?auto=format&fit=crop&w=600&q=80', desc: 'End-to-end frame repair, structural painting, structural alignment, and claim processing.' },
      { id: '12', title: 'Car Wash', category: 'Cleaning', price: 599, img: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=600&q=80', desc: 'High pressure shampoo wash, underbody clean, dashboard cleaning and vacuum service.' }
    ];

    if (saved && savedVersion === CURRENT_VERSION) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }

    localStorage.setItem('autocare_services', JSON.stringify(defaultServices));
    localStorage.setItem('autocare_services_version', CURRENT_VERSION);
    return defaultServices;
  });

  const [blogArticles, setBlogArticles] = useState(() => {
    const saved = localStorage.getItem('autocare_blogs');
    if (saved) return JSON.parse(saved);
    return [
      { id: 1, title: '5 Essential Monsoon Car Care Tips', category: 'Tips & Hacks', date: 'June 01, 2026', author: 'Tech Team', img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80', excerpt: 'Driving during heavy monsoons requires special precautions. Learn how to maintain your wiper blades, brakes and tire treads for wet conditions.', content: 'Monsoons bring relief from summer heat but pose challenges for car owners. Here are five crucial steps to protect your vehicle:\n\n1. WIPERS AND WASHERS: Ensure wiper blades do not leave streaks. Check washer fluids and top them up with anti-fog solutions.\n2. TIRE GRIP CHECK: Wet roads reduce traction. Inspect tread depth. Replace tires if treads are worn below 2mm.\n3. BRAKES TESTING: Water can get in brake pads and cause slippage. Test braking at low speeds after driving through puddles.\n4. RUST PREVENTION: Apply anti-rust coats underneath the chassis to guard against road salt and moisture accumulation.\n5. ELECTRICAL BOARDS: Sealed fuses and wiring harnesses keep water out. Spray humidity repellents on battery terminals.' },
      { id: 2, title: 'Understanding Your Car Battery Lifespan', category: 'Guides', date: 'May 20, 2026', author: 'Support Desk', img: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80', excerpt: 'Is your car struggling to start? Read about the indicators of battery drain and learn when you should replace your battery.', content: 'A car battery is the electrical heart of your vehicle. Under normal usage conditions, standard Lead-Acid batteries have a lifespan of 3 to 5 years.\n\nINDICATORS OF A DECAYING BATTERY:\n- SLOW ENGINE CRANK: It takes longer for the engine to fire up.\n- DIM HEADLIGHTS: Cluster dials and lights flicker or dim during engine idle.\n- CORROSION INDEX: White ash-like powder forming near terminals indicates gas leakage.\n\nMAINTENANCE HACKS:\n- Clean terminals with soda solution.\n- Secure the battery hold-down clamp to reduce vibrations.\n- Turn off headlights and AC blower systems before starting the ignition.' },
      { id: 3, title: 'Maximize Fuel Efficiency: The Ultimate Guide', category: 'Maintenance', date: 'May 10, 2026', author: 'Admin Advisor', img: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=600&q=80', excerpt: 'Tired of high fuel bills? Explore these simple tuning hacks and adjustments that can increase your mileage up to 15%.', content: 'Fuel consumption depends significantly on driving habits and basic engine maintenance state. Implement these adjustments to save fuel:\n\n1. CORRECT TIRE PRESSURE: Under-inflated tires increase rolling resistance, which reduces mileage. Check pressure weekly.\n2. SCHEDULE PERIODIC TUNING: Replace clogged air filters and worn spark plugs. A well-tuned engine burns fuel more efficiently.\n3. AVOID IDLING: Turn off the engine at traffic lights if waiting exceeds 30 seconds. Idling wastes gas and increases emissions.\n4. SMOOTH ACCELERATION: Sudden acceleration and harsh braking consume 30% more fuel. Cruise smoothly at moderate speeds.\n5. LIMIT EXCESS WEIGHT: Heavy tools or luggage in the boot force the engine to work harder. Clean your trunk to shed weight.' }
    ];
  });

  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('autocare_reviews');
    const defaultReviews = [
      { id: 1, name: 'Dheeraj Chamoli', stars: 5, comment: 'Superb experience. The service was smooth, professional, and completed on time.' },
      { id: 2, name: 'Saurabh Kansal', stars: 5, comment: 'Had an awesome experience with GS Automobiles. My accidental car was restored like new within just 5 days. Excellent workmanship and timely delivery.' },
      { id: 3, name: 'Upkar Dobriyal', stars: 5, comment: 'Experienced workers and good staff. The team was helpful and handled everything professionally.' },
      { id: 4, name: 'Sachin Kashyap', stars: 5, comment: 'My car\'s ABS warning light issue was diagnosed accurately and fixed professionally. The technicians were knowledgeable and the service quality was excellent.' },
      { id: 5, name: 'Tushar Tyagi', stars: 5, comment: 'Got my car serviced at GS Automobiles. Everything was handled smoothly and the pricing was around 20% lower than the market rate.' },
      { id: 6, name: 'Shivam Sharma', stars: 5, comment: 'Very good service. Professional staff and a hassle-free experience.' },
      { id: 7, name: 'Rio Sports', stars: 5, comment: 'Best quality denting service in the neighborhood. Highly recommended for body repair work.' },
      { id: 8, name: 'Vikas Shakya', stars: 5, comment: 'Wonderful experience at GS Automobiles. The team was honest, customer-focused, and completed the work on time with excellent quality.' }
    ];
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.length !== 8 || !parsed.some(r => r.name === 'Dheeraj Chamoli')) {
        localStorage.setItem('autocare_reviews', JSON.stringify(defaultReviews));
        return defaultReviews;
      }
      return parsed;
    }
    return defaultReviews;
  });

  const [websiteSettings, setWebsiteSettings] = useState(() => {
    const saved = localStorage.getItem('autocare_settings');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.contactAddress === '123 Auto Plaza, Sector 62, Noida, UP - 201301' || !parsed.yearOfEstablishment || parsed.workingHours === 'Mon - Sat: 9:00 AM - 7:00 PM' || parsed.contactPhone) {
        parsed.contactAddress = 'Plot no.677, Sucheta Kriplani Marg, near igl cng pump, Shakti Khand III, Indirapuram, Ghaziabad, Uttar Pradesh 201014';
        parsed.yearOfEstablishment = '2009';
        parsed.workingHours = 'Everyday: 10:00 AM - 6:00 PM';
        parsed.contactPhone = '';
        localStorage.setItem('autocare_settings', JSON.stringify(parsed));
      }
      return parsed;
    }
    return {
      heroTagline: 'Trusted Car Services for Every Brand',
      heroTitlePrefix: 'Keep Your Car Running at ',
      heroTitleHighlight: 'Peak Performance',
      heroDescription: 'Experience premium automotive care with upfront transparent pricing, certified mechanics, and dedicated workshop support.',
      contactPhone: '',
      contactEmail: 'support@gsautomobiles.com',
      contactAddress: 'Plot no.677, Sucheta Kriplani Marg, near igl cng pump, Shakti Khand III, Indirapuram, Ghaziabad, Uttar Pradesh 201014',
      yearOfEstablishment: '2009',
      workingHours: 'Everyday: 10:00 AM - 6:00 PM',
      priceBasic: 1999,
      priceStandard: 3999,
      pricePremium: 6999
    };
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

  useEffect(() => {
    localStorage.setItem('autocare_services', JSON.stringify(servicesData));
    localStorage.setItem('autocare_services_version', '20260614_v2');
  }, [servicesData]);

  useEffect(() => {
    localStorage.setItem('autocare_blogs', JSON.stringify(blogArticles));
  }, [blogArticles]);

  useEffect(() => {
    localStorage.setItem('autocare_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('autocare_settings', JSON.stringify(websiteSettings));
  }, [websiteSettings]);

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

  // Navigations with window.history support for local SEO URLs
  const handleNavigate = (page, params = null, pushState = true) => {
    setActivePage(page);
    setPageParams(params);
    
    if (pushState) {
      let path = '/';
      if (page === 'location-landing' && params?.location) {
        path = `/locations/${params.location}`;
      } else if (page === 'service-landing' && params?.service) {
        path = `/services/${params.service}`;
      } else if (page !== 'home') {
        path = `/${page}`;
      }
      
      if (window.location.pathname !== path) {
        window.history.pushState({ page, params }, '', path);
      }
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Parse pathnames and set up event listeners for forward/back navigation
  useEffect(() => {
    const parseUrlRoute = () => {
      const path = window.location.pathname;
      if (path.startsWith('/locations/')) {
        const location = path.split('/locations/')[1];
        handleNavigate('location-landing', { location }, false);
      } else if (path.startsWith('/services/')) {
        const service = path.split('/services/')[1];
        const seoSlugs = ['car-service', 'car-ac-repair', 'brake-repair', 'battery-replacement', 'engine-repair', 'denting-painting', 'car-detailing'];
        if (seoSlugs.includes(service)) {
          handleNavigate('service-landing', { service }, false);
        } else {
          handleNavigate('services', null, false);
        }
      } else if (path !== '/') {
        const page = path.substring(1);
        const validPages = ['home', 'services', 'brands', 'booking', 'reviews', 'blog', 'contact', 'admin'];
        if (validPages.includes(page)) {
          handleNavigate(page, null, false);
        } else {
          handleNavigate('home', null, false);
        }
      } else {
        handleNavigate('home', null, false);
      }
    };

    const handlePopState = (e) => {
      if (e.state && e.state.page) {
        handleNavigate(e.state.page, e.state.params, false);
      } else {
        parseUrlRoute();
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Dynamic homepage AutoRepair LocalBusiness schema injection
  useEffect(() => {
    if (activePage === 'home') {
      const homeSchema = {
        "@context": "https://schema.org",
        "@type": "AutoRepair",
        "name": "GS Automobiles",
        "image": "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80",
        "@id": "https://gsautomobiles.com",
        "url": "https://gsautomobiles.com",
        "telephone": "+919999938499",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Plot no.677, Sucheta Kriplani Marg, near igl cng pump, Shakti Khand III, Indirapuram",
          "addressLocality": "Ghaziabad",
          "addressRegion": "UP",
          "postalCode": "201014",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 28.6366,
          "longitude": 77.3732
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
          ],
          "opens": "10:00",
          "closes": "18:00"
        }
      };

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'seo-home-schema';
      script.innerHTML = JSON.stringify(homeSchema);
      document.head.appendChild(script);

      return () => {
        const existing = document.getElementById('seo-home-schema');
        if (existing) existing.remove();
      };
    }
  }, [activePage]);

  // Quick book now from wishlist side-panel
  const handleBookFromWishlist = (serviceName) => {
    setWishlistOpen(false);
    handleNavigate('booking', { service: serviceName });
  };

  const isAdminPage = activePage === 'admin';

  return (
    <>
      {/* 1. Preloader Screen */}
      <Preloader />

      {/* 2. Global Toast Alerts */}
      <Toast toasts={toasts} />

      {/* 3. Global Navbar Header */}
      {!isAdminPage && (
        <Navbar 
          activePage={activePage} 
          setActivePage={(page) => handleNavigate(page)} 
          theme={theme}
          toggleTheme={toggleTheme}
        />
      )}

      {/* 5. Pages Router Wrapper */}
      <main style={{ minHeight: '80vh' }}>
        <AnimatePresence mode="wait">
          {activePage === 'home' && (
            <Home 
              key="home" 
              onNavigate={handleNavigate} 
              showToast={showToast} 
              theme={theme}
              websiteSettings={websiteSettings}
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
              servicesData={servicesData}
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
              servicesData={servicesData}
              websiteSettings={websiteSettings}
            />
          )}
          {activePage === 'reviews' && (
            <Reviews 
              key="reviews" 
              showToast={showToast} 
              reviews={reviews}
              setReviews={setReviews}
            />
          )}
          {activePage === 'blog' && (
            <Blog 
              key="blog" 
              blogArticles={blogArticles}
            />
          )}
          {activePage === 'contact' && (
            <Contact 
              key="contact" 
              onNavigate={handleNavigate} 
              showToast={showToast} 
            />
          )}
          {activePage === 'location-landing' && (
            <LocationLanding
              key="location-landing"
              locationSlug={pageParams?.location}
              onNavigate={handleNavigate}
              showToast={showToast}
            />
          )}
          {activePage === 'service-landing' && (
            <ServiceLanding
              key="service-landing"
              serviceSlug={pageParams?.service}
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
              servicesData={servicesData}
              setServicesData={setServicesData}
              blogArticles={blogArticles}
              setBlogArticles={setBlogArticles}
              reviews={reviews}
              setReviews={setReviews}
              websiteSettings={websiteSettings}
              setWebsiteSettings={setWebsiteSettings}
            />
          )}
        </AnimatePresence>
      </main>

      {/* 6. Floating Assistant Elements */}
      {!isAdminPage && <LiveChat setActivePage={handleNavigate} />}
      
      {!isAdminPage && (
        <button 
          id="back-to-top" 
          className={showScrollTop ? 'active' : ''} 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
        >
          <i className="fas fa-chevron-up"></i>
        </button>
      )}

      {/* 7. Footer Layout */}
      {!isAdminPage && <Footer setActivePage={handleNavigate} showToast={showToast} />}
    </>
  );
}
