import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const hotspots = [
  {
    top: '42%',
    left: '52%',
    icon: 'fa-snowflake',
    title: 'HVAC & AC Service',
    desc: 'Climate diagnosis: Refrigerant level 98% | Cabin filter status: Optimal | Output temp: 6°C'
  },
  {
    top: '48%',
    left: '68%',
    icon: 'fa-microchip',
    title: 'ECU Tuning & Diagnostics',
    desc: 'Engine health: 99% | 0 errors detected | Transmission sync: Excellent | Fuel injection: Calibrated'
  },
  {
    top: '64%',
    left: '78%',
    icon: 'fa-life-ring',
    title: 'Brakes & Wheel Alignment',
    desc: 'Brake pads wear: 12% | Fluid pressure: Normal | Alignment calibration: Balanced 0.05°'
  },
  {
    top: '72%',
    left: '58%',
    icon: 'fa-spray-can',
    title: 'Detailing & Paint Protection',
    desc: 'Exterior protection: 9H Ceramic Coat applied | Hydrophobic rating: High | Gloss index: 98%'
  },
  {
    top: '32%',
    left: '75%',
    icon: 'fa-tools',
    title: 'Hydraulic Lift Systems',
    desc: 'Under-chassis service: Lift active | Suspensions inspected | Bushings & linkages secure'
  }
];

// Count-up helper component for premium stats count up
function Counter({ target }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const increment = Math.ceil(target / (duration / 16));
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target]);

  return <span>{count.toLocaleString()}+</span>;
}

export default function Home({ onNavigate, showToast, theme = 'dark-theme', websiteSettings }) {
  // Brand Estimator State
  const [estimateBrand, setEstimateBrand] = useState('');
  const [estimateService, setEstimateService] = useState('');
  const [estimatedPrice, setEstimatedPrice] = useState(null);

  // AI Recommendations Wizard State
  const [wizStep, setWizStep] = useState(1);
  const [wizMileage, setWizMileage] = useState('');
  const [wizAge, setWizAge] = useState('');
  const [wizRecommendation, setWizRecommendation] = useState(null);

  // Vehicle Health Calculator Quiz State
  const [quizStep, setQuizStep] = useState(1);
  const [quizScore, setQuizScore] = useState(0);

  // FAQ state
  const [activeFaq, setActiveFaq] = useState(null);

  // Handle Estimate Calculate
  const handleCalculateEstimate = (e) => {
    e.preventDefault();
    if (!estimateBrand || !estimateService) return;

    let base = 1500;
    if (estimateService === 'Basic Package') base = websiteSettings?.priceBasic || 1999;
    else if (estimateService === 'Standard Package') base = websiteSettings?.priceStandard || 3999;
    else if (estimateService === 'Premium Package') base = websiteSettings?.pricePremium || 6999;
    else if (estimateService === 'Car Wash') base = 599;

    const luxury = ['BMW', 'Mercedes-Benz', 'Audi'];
    const mid = ['Toyota', 'Honda', 'Hyundai', 'Kia', 'Mahindra'];

    if (luxury.includes(estimateBrand)) base = Math.round(base * 1.5);
    else if (mid.includes(estimateBrand)) base = Math.round(base * 1.1);

    setEstimatedPrice(base);
  };

  // AI Recommendations next step
  const handleWizNext = (step, val) => {
    if (step === 1) {
      setWizMileage(val);
      setWizStep(2);
    } else if (step === 2) {
      setWizAge(val);
      setWizStep(3);
    } else if (step === 3) {
      // Logic for recommendations
      let title = "Standard Service Package";
      let reason = "Perfect for mid-level mileage vehicles. Includes oil top-ups and wheel alignment check.";
      let targetLink = "Standard Package";

      if (val === 'ac') {
        title = "AC Service & Cooling Tuning";
        reason = "We recommend booking our specialized AC cooling service to clean ducts and top up refrigerant.";
        targetLink = "AC Service";
      } else if (val === 'alignment') {
        title = "Wheel Alignment & Balancing";
        reason = "Suspension warning: Your steer pull indicates the need for alignment testing.";
        targetLink = "Wheel Alignment";
      } else if (wizMileage === 'above_40k' || val === 'noise') {
        title = "Premium Service Package";
        reason = "Your car shows significant mileage and/or indicators. We recommend complete 60-point premium diagnostics.";
        targetLink = "Premium Package";
      } else if (wizMileage === 'under_10k' && wizAge === 'new') {
        title = "Basic Service Package";
        reason = "Perfect for low mileage and young cars to maintain health and warranty stamps.";
        targetLink = "Basic Package";
      }

      setWizRecommendation({ title, reason, targetLink });
      setWizStep(4);
    }
  };

  const resetWiz = () => {
    setWizStep(1);
    setWizMileage('');
    setWizAge('');
    setWizRecommendation(null);
  };

  // Quiz helper
  const handleQuizNext = (step, val) => {
    const nextScore = quizScore + val;
    setQuizScore(nextScore);
    if (step < 3) {
      setQuizStep(step + 1);
    } else {
      setQuizStep(4);
    }
  };

  const resetQuiz = () => {
    setQuizStep(1);
    setQuizScore(0);
  };

  // FAQ questions list
  const faqs = [
    { q: "How often should I get my car serviced?", a: "For most brands, we recommend getting a periodic maintenance check every 10,000 kilometers or once every 6 months, whichever comes first, to keep your engine running smoothly." },
    { q: "Do you use genuine spare parts for repairs?", a: "Yes, we strictly use 100% OEM (Original Equipment Manufacturer) and OES parts certified by car brands to ensure absolute reliability and safety standards." },
    { q: "How can I track my active car servicing progress?", a: "When you book a service, you receive a Booking ID (e.g. AC-123456). Go to our Track Status page, enter your ID, and view real-time status steps from receiving to delivery." },
    { q: "What is the pick and drop service coverage?", a: "Our contactless pick and drop service is free for Premium Package bookings. Mid-level and basic service packages can request pick and drop services at a nominal flat charge of ₹299." }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Hero Section */}
      <section className="hero-section" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Interactive 4K Garage Diagnostic Hero Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="hero-car-bg-container"
        >
          <img 
            src="/garage_hero.png" 
            alt="Futuristic Car Service Bay" 
            className="hero-image-bg"
          />
          <div className="hero-vignette" />
          
          {/* Dynamic Diagnostic Hotspots */}
          <div className="hotspots-container" style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, zIndex: 2 }}>
            {hotspots.map((spot, idx) => (
              <div 
                key={idx}
                className="hero-hotspot"
                style={{ top: spot.top, left: spot.left }}
              >
                <div className="hotspot-pointer">
                  <i className={`fas ${spot.icon} hotspot-icon`}></i>
                </div>
                <div className="hotspot-tooltip">
                  <div className="tooltip-title">
                    <i className={`fas ${spot.icon}`}></i> {spot.title}
                  </div>
                  <div className="tooltip-desc">
                    {spot.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="container hero-layout">
          <div className="hero-text">
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="hero-tagline"
            >
              {websiteSettings?.heroTagline || "Trusted Car Services for Every Brand"}
            </motion.div>
            <motion.h1 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="hero-title"
            >
              {websiteSettings?.heroTitlePrefix || "Keep Your Car Running at "}
              <span>{websiteSettings?.heroTitleHighlight || "Peak Performance"}</span>
            </motion.h1>
            <motion.p 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="hero-description"
            >
              {websiteSettings?.heroDescription || "Experience premium automotive care with upfront transparent pricing, certified mechanics, and live step-by-step service tracking."}
            </motion.p>
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="hero-buttons"
            >
              <button onClick={() => onNavigate('booking')} className="btn btn-primary">
                <i className="fas fa-calendar-alt"></i> Book Service Now
              </button>
              <a href="#packages-section" className="btn btn-secondary">
                <i className="fas fa-tags"></i> View Hot Deals
              </a>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="hero-search-card glass-card"
          >
            <h3>Quick Brand Estimator</h3>
            <form className="brand-search-form" onSubmit={handleCalculateEstimate}>
              <div className="search-input-group">
                <i className="fas fa-car"></i>
                <select 
                  value={estimateBrand} 
                  onChange={(e) => { setEstimateBrand(e.target.value); setEstimatedPrice(null); }}
                  required
                >
                  <option value="">Choose Car Brand</option>
                  <option value="Toyota">Toyota</option>
                  <option value="Honda">Honda</option>
                  <option value="Hyundai">Hyundai</option>
                  <option value="Maruti Suzuki">Maruti Suzuki</option>
                  <option value="Tata Motors">Tata Motors</option>
                  <option value="Mahindra">Mahindra</option>
                  <option value="Kia">Kia</option>
                  <option value="BMW">BMW</option>
                  <option value="Mercedes-Benz">Mercedes-Benz</option>
                  <option value="Audi">Audi</option>
                </select>
              </div>
              <div className="search-input-group">
                <i className="fas fa-cogs"></i>
                <select 
                  value={estimateService} 
                  onChange={(e) => { setEstimateService(e.target.value); setEstimatedPrice(null); }}
                  required
                >
                  <option value="">Select Service Type</option>
                  <option value="Basic Package">Basic Service Package</option>
                  <option value="Standard Package">Standard Service Package</option>
                  <option value="Premium Package">Premium Service Package</option>
                  <option value="Car Wash">Car Detailing & Wash</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                <i className="fas fa-calculator"></i> Calculate Estimate
              </button>
            </form>

            <AnimatePresence>
              {estimatedPrice !== null && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  style={{ marginTop: '15px', textAlign: 'center', overflow: 'hidden' }}
                >
                  <div style={{ fontWeight: 500, fontSize: '0.95rem' }}>Estimated Cost:</div>
                  <div style={{ fontSize: '1.6rem', color: 'var(--accent-color)', fontWeight: 700, margin: '5px 0' }}>
                    ₹{estimatedPrice.toLocaleString('en-IN')}
                  </div>
                  <button 
                    onClick={() => onNavigate('booking', { brand: estimateBrand, service: estimateService })}
                    className="btn btn-text" 
                    style={{ fontSize: '0.9rem' }}
                  >
                    Proceed to Booking <i className="fas fa-arrow-right"></i>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats-section">
        <div className="container stats-grid">
          <div className="stat-item">
            <h2><Counter target={10000} /></h2>
            <p>Cars Serviced</p>
          </div>
          <div className="stat-item">
            <h2><Counter target={50} /></h2>
            <p>Service Centers</p>
          </div>
          <div className="stat-item">
            <h2>4.8/5</h2>
            <p>Customer Rating</p>
          </div>
          <div className="stat-item">
            <h2>24/7</h2>
            <p>Emergency Support</p>
          </div>
        </div>
      </section>

      {/* Smart Diagnostic Tools */}
      <section className="section container">
        <div className="section-header">
          <h2 className="section-title">Interactive <span>Smart Diagnostic Tools</span></h2>
          <p className="section-subtitle">Use our automated widgets to quickly diagnose your car needs and inspect health indices.</p>
        </div>

        <div className="interactive-dashboard-grid">
          {/* AI Recommendation Box */}
          <div className="ai-recommendation-box glass-card">
            <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <i className="fas fa-brain" style={{ color: 'var(--accent-color)' }}></i> AI Service Selector
            </h3>
            
            <AnimatePresence mode="wait">
              {wizStep === 1 && (
                <motion.div 
                  key="wiz-1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="wizard-step active"
                >
                  <p style={{ fontWeight: 500, marginBottom: '15px' }}>1. What is the current mileage of your vehicle?</p>
                  <div className="wizard-options">
                    <button className="option-btn" onClick={() => handleWizNext(1, 'under_10k')}>Under 10,000 km</button>
                    <button className="option-btn" onClick={() => handleWizNext(1, '10k_40k')}>10,000 km - 40,000 km</button>
                    <button className="option-btn" onClick={() => handleWizNext(1, 'above_40k')}>Above 40,000 km</button>
                  </div>
                </motion.div>
              )}

              {wizStep === 2 && (
                <motion.div 
                  key="wiz-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="wizard-step active"
                >
                  <p style={{ fontWeight: 500, marginBottom: '15px' }}>2. How old is your vehicle?</p>
                  <div className="wizard-options">
                    <button className="option-btn" onClick={() => handleWizNext(2, 'new')}>Less than 1 Year</button>
                    <button className="option-btn" onClick={() => handleWizNext(2, 'mid')}>1 - 3 Years</button>
                    <button className="option-btn" onClick={() => handleWizNext(2, 'old')}>More than 3 Years</button>
                  </div>
                </motion.div>
              )}

              {wizStep === 3 && (
                <motion.div 
                  key="wiz-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="wizard-step active"
                >
                  <p style={{ fontWeight: 500, marginBottom: '15px' }}>3. Are you experiencing any issues?</p>
                  <div className="wizard-options">
                    <button className="option-btn" onClick={() => handleWizNext(3, 'none')}>No specific issues, just periodic tuning</button>
                    <button className="option-btn" onClick={() => handleWizNext(3, 'alignment')}>Car pulls to side / steering vibrates</button>
                    <button className="option-btn" onClick={() => handleWizNext(3, 'ac')}>AC is not blowing cold air</button>
                    <button className="option-btn" onClick={() => handleWizNext(3, 'noise')}>Squeaking noises when braking</button>
                  </div>
                </motion.div>
              )}

              {wizStep === 4 && wizRecommendation && (
                <motion.div 
                  key="wiz-result"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="wizard-step active"
                >
                  <div className="result-card-inner">
                    <i className="fas fa-check-circle" style={{ fontSize: '3rem', color: 'var(--success)', marginBottom: '15px' }}></i>
                    <h4>AI Recommendation Complete</h4>
                    <p style={{ margin: '10px 0', fontSize: '1.1rem', fontWeight: 600 }}>{wizRecommendation.title}</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>{wizRecommendation.reason}</p>
                    <div>
                      <button 
                        onClick={() => onNavigate('booking', { service: wizRecommendation.targetLink })} 
                        className="btn btn-primary"
                      >
                        Book Suggested Service
                      </button>
                      <button className="btn btn-secondary" onClick={resetWiz} style={{ marginLeft: '10px' }}>
                        Retry
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Health Quiz Score Dashboard */}
          <div className="health-score-box glass-card">
            <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <i className="fas fa-tachometer-alt" style={{ color: 'var(--accent-color)' }}></i> Vehicle Health Calculator
            </h3>

            <AnimatePresence mode="wait">
              {quizStep === 1 && (
                <motion.div 
                  key="quiz-1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="quiz-step active"
                >
                  <p style={{ fontWeight: 500, marginBottom: '15px' }}>1. When was your last oil change service?</p>
                  <div className="quiz-options">
                    <button className="option-btn" onClick={() => handleQuizNext(1, 30)}>Within the last 6 months</button>
                    <button className="option-btn" onClick={() => handleQuizNext(1, 15)}>6 - 12 months ago</button>
                    <button className="option-btn" onClick={() => handleQuizNext(1, 5)}>More than a year ago</button>
                  </div>
                </motion.div>
              )}

              {quizStep === 2 && (
                <motion.div 
                  key="quiz-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="quiz-step active"
                >
                  <p style={{ fontWeight: 500, marginBottom: '15px' }}>2. How is your engine noise level?</p>
                  <div className="quiz-options">
                    <button className="option-btn" onClick={() => handleQuizNext(2, 35)}>Completely silent, smooth purr</button>
                    <button className="option-btn" onClick={() => handleQuizNext(2, 20)}>Occasional ticks or minor friction hums</button>
                    <button className="option-btn" onClick={() => handleQuizNext(2, 10)}>Loud metallic squeaks or heavy vibrations</button>
                  </div>
                </motion.div>
              )}

              {quizStep === 3 && (
                <motion.div 
                  key="quiz-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="quiz-step active"
                >
                  <p style={{ fontWeight: 500, marginBottom: '15px' }}>3. Are any dashboard alert lights illuminated?</p>
                  <div className="quiz-options">
                    <button className="option-btn" onClick={() => handleQuizNext(3, 35)}>No alerts, cluster is completely clean</button>
                    <button className="option-btn" onClick={() => handleQuizNext(3, 15)}>Maintenance/Inspection indicators only</button>
                    <button className="option-btn" onClick={() => handleQuizNext(3, 5)}>Engine check / ABS light is active</button>
                  </div>
                </motion.div>
              )}

              {quizStep === 4 && (
                <motion.div 
                  key="quiz-result"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="quiz-step active"
                >
                  <div className="result-card-inner">
                    <div 
                      className="health-gauge" 
                      style={{ 
                        borderTopColor: quizScore >= 80 ? 'var(--success)' : quizScore >= 50 ? 'var(--warning)' : 'var(--danger)'
                      }}
                    >
                      {quizScore}%
                    </div>
                    <h4>
                      {quizScore >= 80 ? "Excellent Vehicle Health" : 
                       quizScore >= 50 ? "Moderate Service Warning" : 
                       "Critical Inspection Recommended"}
                    </h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '5px', marginBottom: '20px' }}>
                      {quizScore >= 80 ? "Your car is running perfectly. Maintain periodic inspection schedules." : 
                       quizScore >= 50 ? "Tuning required. Minor carbon deposits or fluid depletion likely. Schedule checking soon." : 
                       "Diagnostics alarm active. Immediate inspection needed for brakes, engine tuning, or electrical boards."}
                    </p>
                    <div>
                      <button onClick={() => onNavigate('booking', { service: 'Periodic Service' })} className="btn btn-primary">
                        Schedule Checkup
                      </button>
                      <button className="btn btn-secondary" onClick={resetQuiz} style={{ marginLeft: '10px' }}>
                        Re-calculate
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="section" id="packages-section" style={{ background: 'rgba(255, 255, 255, 0.01)' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Affordable <span>Service Packages</span></h2>
            <p className="section-subtitle">Upfront transparent pricing with premium inclusions. Choose the package that suits your vehicle.</p>
          </div>

          <div className="packages-grid">
            {/* Basic */}
            <motion.div whileHover={{ y: -5 }} className="package-card glass-card">
              <div className="badge badge-primary">Basic Package</div>
              <div className="package-price">₹{(websiteSettings?.priceBasic || 1999).toLocaleString('en-IN')}<span>/Service</span></div>
              <ul className="package-features">
                <li><i className="fas fa-check"></i> Engine Oil Check</li>
                <li><i className="fas fa-check"></i> Battery Check</li>
                <li><i className="fas fa-check"></i> General Inspection</li>
                <li style={{ color: 'var(--text-muted)', textDecoration: 'line-through' }}><i className="fas fa-times" style={{ color: 'var(--danger)' }}></i> Wheel Alignment</li>
                <li style={{ color: 'var(--text-muted)', textDecoration: 'line-through' }}><i className="fas fa-times" style={{ color: 'var(--danger)' }}></i> AC Performance Check</li>
              </ul>
              <button onClick={() => onNavigate('booking', { service: 'Basic Package' })} className="btn btn-secondary" style={{ width: '100%' }}>
                Select Package
              </button>
            </motion.div>

            {/* Standard */}
            <motion.div whileHover={{ y: -5 }} className="package-card glass-card featured">
              <div className="badge badge-success">Standard Package</div>
              <div className="package-price">₹{(websiteSettings?.priceStandard || 3999).toLocaleString('en-IN')}<span>/Service</span></div>
              <ul className="package-features">
                <li><i className="fas fa-check"></i> Engine Oil Check & Top Up</li>
                <li><i className="fas fa-check"></i> Battery Check & Diagnostics</li>
                <li><i className="fas fa-check"></i> General 40-Point Inspection</li>
                <li><i className="fas fa-check"></i> Wheel Alignment & Balancing</li>
                <li><i className="fas fa-check"></i> AC Performance Check</li>
              </ul>
              <button onClick={() => onNavigate('booking', { service: 'Standard Package' })} className="btn btn-primary" style={{ width: '100%' }}>
                Select Package
              </button>
            </motion.div>

            {/* Premium */}
            <motion.div whileHover={{ y: -5 }} className="package-card glass-card">
              <div className="badge badge-primary">Premium Package</div>
              <div className="package-price">₹{(websiteSettings?.pricePremium || 6999).toLocaleString('en-IN')}<span>/Service</span></div>
              <ul className="package-features">
                <li><i className="fas fa-check"></i> Complete Engine Oil & Filter Change</li>
                <li><i className="fas fa-check"></i> Battery Check & Full Diagnosis</li>
                <li><i className="fas fa-check"></i> Premium 60-Point Inspection</li>
                <li><i className="fas fa-check"></i> Wheel Alignment & Balancing</li>
                <li><i className="fas fa-check"></i> Complete AC Service & Gas Top-Up</li>
              </ul>
              <button onClick={() => onNavigate('booking', { service: 'Premium Package' })} className="btn btn-secondary" style={{ width: '100%' }}>
                Select Package
              </button>
            </motion.div>
          </div>

          <div className="section-header" style={{ marginTop: '50px', marginBottom: '20px' }}>
            <h3>Package Comparison Table</h3>
          </div>
          <div className="compare-matrix-container glass-card">
            <table className="compare-table">
              <thead>
                <tr>
                  <th>Features</th>
                  <th>Basic</th>
                  <th>Standard</th>
                  <th>Premium</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Starting Price</td>
                  <td>₹{(websiteSettings?.priceBasic || 1999).toLocaleString('en-IN')}</td>
                  <td>₹{(websiteSettings?.priceStandard || 3999).toLocaleString('en-IN')}</td>
                  <td>₹{(websiteSettings?.pricePremium || 6999).toLocaleString('en-IN')}</td>
                </tr>
                <tr>
                  <td>Engine Oil Top-Up</td>
                  <td><i className="fas fa-check"></i> Check Only</td>
                  <td><i className="fas fa-check"></i> Top Up</td>
                  <td><i className="fas fa-check"></i> Oil & Filter Change</td>
                </tr>
                <tr>
                  <td>Wheel Alignment</td>
                  <td><i className="fas fa-times"></i></td>
                  <td><i className="fas fa-check"></i></td>
                  <td><i className="fas fa-check"></i></td>
                </tr>
                <tr>
                  <td>AC Performance Check</td>
                  <td><i className="fas fa-times"></i></td>
                  <td><i className="fas fa-check"></i></td>
                  <td><i className="fas fa-check"></i> Service & Gas Refill</td>
                </tr>
                <tr>
                  <td>Loyalty Point Rewards</td>
                  <td>200 Pts</td>
                  <td>400 Pts</td>
                  <td>700 Pts</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="section container">
        <div className="section-header">
          <h2 className="section-title">Frequently Asked <span>Questions</span></h2>
          <p className="section-subtitle">Got questions? We have answers. Check out our quick guides below.</p>
        </div>

        <div className="faq-accordion">
          {faqs.map((faq, idx) => (
            <div key={idx} className={`faq-item ${activeFaq === idx ? 'active' : ''}`}>
              <button className="faq-question" onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}>
                <span>{faq.q}</span>
                <i className="fas fa-chevron-down faq-icon"></i>
              </button>
              <div 
                className="faq-answer"
                style={{ 
                  maxHeight: activeFaq === idx ? '200px' : '0px',
                  paddingTop: activeFaq === idx ? '10px' : '0px'
                }}
              >
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
