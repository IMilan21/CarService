import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Booking({ initialParams, onNavigate, showToast, addBookingHistory, addLoyaltyPoints, servicesData, websiteSettings, currentUser }) {
  // Wizard steps: 1: Customer, 2: Vehicle, 3: Date & Time, 4: Confirm
  const [step, setStep] = useState(1);

  // Form Inputs
  const [fullname, setFullname] = useState(currentUser?.fullname || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [city, setCity] = useState('');

  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [service, setService] = useState('');

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');

  // Pricing & Coupon
  const [coupon, setCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null); // { code, type, value }
  const [couponMsg, setCouponMsg] = useState('');
  const [couponSuccess, setCouponSuccess] = useState(false);

  // Invoicing Modal
  const [showInvoice, setShowInvoice] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);

  // Brand models mapping list
  const modelsMap = {
    Toyota: ['Fortuner', 'Innova Crysta', 'Camry', 'Glanza', 'Urban Cruiser Taisor'],
    Honda: ['City', 'Civic', 'Amaze', 'Elevate', 'WR-V'],
    Hyundai: ['Creta', 'i20 Elite', 'Verna', 'Tucson', 'Venue'],
    'Maruti Suzuki': ['Swift', 'Baleno', 'Brezza', 'Ertiga', 'Grand Vitara'],
    'Tata Motors': ['Nexon', 'Harrier', 'Safari', 'Altroz', 'Punch'],
    Mahindra: ['Thar', 'XUV700', 'Scorpio-N', 'Bolero', 'XUV300'],
    Kia: ['Seltos', 'Sonet', 'Carens', 'Carnival', 'EV6'],
    BMW: ['3 Series', '5 Series', 'X5 SUV', 'i7 Electric', 'Z4 Roadster'],
    'Mercedes-Benz': ['C-Class', 'E-Class Sedan', 'GLC Luxury SUV', 'S-Class flagship', 'AMG-GLE'],
    Audi: ['A4', 'A6 Executive', 'Q5 Premium', 'Q7 Family', 'e-tron EV']
  };

  // Pre-populate fields from query params/navigation context
  useEffect(() => {
    if (initialParams) {
      if (initialParams.brand) {
        setBrand(initialParams.brand);
        if (modelsMap[initialParams.brand]) {
          setModel(modelsMap[initialParams.brand][0]);
        }
      }
      if (initialParams.service) {
        setService(initialParams.service);
      }
    }
  }, [initialParams]);

  // Set default model on brand changes
  const handleBrandChange = (val) => {
    setBrand(val);
    if (modelsMap[val]) {
      setModel(modelsMap[val][0]);
    } else {
      setModel('');
    }
  };

  // Calculate pricing values
  const getPricingCalculations = () => {
    let base = 0;
    if (service === 'Basic Package') base = websiteSettings?.priceBasic || 1999;
    else if (service === 'Standard Package') base = websiteSettings?.priceStandard || 3999;
    else if (service === 'Premium Package') base = websiteSettings?.pricePremium || 6999;
    else {
      const match = servicesData.find(s => s.title === service);
      if (match) {
        base = match.price;
      }
    }

    // Multiplier indices
    const luxury = ['BMW', 'Mercedes-Benz', 'Audi'];
    const mid = ['Toyota', 'Honda', 'Hyundai', 'Kia', 'Mahindra'];
    if (luxury.includes(brand)) base = Math.round(base * 1.5);
    else if (mid.includes(brand)) base = Math.round(base * 1.1);

    // Coupon discount calculation
    let discount = 0;
    if (appliedCoupon) {
      if (appliedCoupon.type === 'percent') {
        discount = Math.round(base * (appliedCoupon.value / 100));
      } else if (appliedCoupon.type === 'flat') {
        discount = appliedCoupon.value;
      }
    }

    const net = Math.max(0, base - discount);
    const tax = Math.round(net * 0.18);
    const total = net + tax;

    return { base, discount, tax, total };
  };

  const { base, discount, tax, total } = getPricingCalculations();

  // Coupon Verification logic
  const handleApplyCoupon = () => {
    const code = coupon.toUpperCase().trim();
    if (code === 'GSAUTO10' || code === 'AUTOCARE10') {
      setAppliedCoupon({ code, type: 'percent', value: 10 });
      setCouponMsg('Coupon code GSAUTO10 applied! 10% off.');
      setCouponSuccess(true);
      showToast('Coupon applied successfully!', 'success');
    } else if (code === 'WELCOME500') {
      setAppliedCoupon({ code, type: 'flat', value: 500 });
      setCouponMsg('Coupon code WELCOME500 applied! Flat ₹500 discount.');
      setCouponSuccess(true);
      showToast('Coupon applied successfully!', 'success');
    } else {
      setAppliedCoupon(null);
      setCouponMsg('Invalid coupon code. Try GSAUTO10 or WELCOME500.');
      setCouponSuccess(false);
      showToast('Invalid coupon code', 'error');
    }
  };

  // Step Nav validation
  const validateStep = (s) => {
    if (s === 1) {
      if (!fullname || !email || !phone || !city) {
        showToast('Please fill out all user details.', 'error');
        return false;
      }
      if (phone.length < 10) {
        showToast('Please input a valid 10-digit phone.', 'error');
        return false;
      }
    } else if (s === 2) {
      if (!brand || !model || !service) {
        showToast('Please choose brand, model and service.', 'error');
        return false;
      }
    } else if (s === 3) {
      if (!date || !time) {
        showToast('Please pick a date and time slot.', 'error');
        return false;
      }
      // Check date is tomorrow onwards
      const pickDate = new Date(date);
      const today = new Date();
      today.setHours(0,0,0,0);
      if (pickDate <= today) {
        showToast('Booking is only allowed from tomorrow onwards.', 'error');
        return false;
      }
    }
    return true;
  };

  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
  };

  // Submit Booking Form
  const handleSubmitBooking = (e) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    const bookingId = `AC-${Math.floor(100000 + Math.random() * 900000)}`;
    
    // Earn rewards points
    let points = 200;
    if (service.includes('Standard')) points = 400;
    else if (service.includes('Premium')) points = 700;

    const bookingObj = {
      id: bookingId,
      fullname,
      email,
      phone,
      city,
      brand,
      model,
      service,
      date,
      time,
      notes,
      basePrice: base,
      discount,
      tax,
      total,
      points,
      status: 'Vehicle Received', // initial status
      createdDate: new Date().toLocaleDateString('en-IN')
    };

    // Save to localStorage
    addBookingHistory(bookingObj);
    addLoyaltyPoints(points);

    setInvoiceData(bookingObj);
    setShowInvoice(true);
    showToast('Booking Confirmed Successfully!', 'success');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleTrackRedirect = () => {
    setShowInvoice(false);
    onNavigate('tracking', { trackId: invoiceData.id });
  };

  return (
    <div className="container booking-container">
      <div className="section-header" style={{ marginBottom: '30px' }}>
        <h1 className="section-title">Book a <span>Servicing Slot</span></h1>
        <p className="section-subtitle">Complete our simple 4-step form to schedule premium service for your vehicle.</p>
      </div>

      {/* Progress Indicators */}
      <div className="booking-progress-bar">
        <div className={`progress-step ${step >= 1 ? 'active' : ''} ${step === 1 ? 'current' : ''}`}>1</div>
        <div className={`progress-step ${step >= 2 ? 'active' : ''} ${step === 2 ? 'current' : ''}`}>2</div>
        <div className={`progress-step ${step >= 3 ? 'active' : ''} ${step === 3 ? 'current' : ''}`}>3</div>
        <div className={`progress-step ${step >= 4 ? 'active' : ''} ${step === 4 ? 'current' : ''}`}>4</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '30px', alignItems: 'flex-start' }}>
        {/* Form panel */}
        <form onSubmit={handleSubmitBooking} className="glass-card" style={{ padding: '30px' }}>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="form-step active"
              >
                <h3 style={{ marginBottom: '20px' }}>
                  <i className="fas fa-user-circle" style={{ color: 'var(--accent-color)', marginRight: '8px' }}></i> Customer Details
                </h3>
                <div className="form-grid">
                  <div className="form-group form-group-full">
                    <label>Full Name *</label>
                    <input 
                      type="text" 
                      placeholder="Enter full name" 
                      required 
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input 
                      type="email" 
                      placeholder="name@domain.com" 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input 
                      type="tel" 
                      placeholder="10-digit number" 
                      required 
                      pattern="[0-9]{10}"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="form-group form-group-full">
                    <label>City *</label>
                    <select value={city} onChange={(e) => setCity(e.target.value)} required>
                      <option value="">Select City</option>
                      <option value="Delhi">Delhi NCR</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Bengaluru">Bengaluru</option>
                      <option value="Pune">Pune</option>
                      <option value="Chennai">Chennai</option>
                      <option value="Kolkata">Kolkata</option>
                      <option value="Hyderabad">Hyderabad</option>
                    </select>
                  </div>
                </div>
                <div className="form-navigation">
                  <div></div>
                  <button type="button" className="btn btn-primary" onClick={handleNextStep}>
                    Next step <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="form-step active"
              >
                <h3 style={{ marginBottom: '20px' }}>
                  <i className="fas fa-car" style={{ color: 'var(--accent-color)', marginRight: '8px' }}></i> Vehicle Details
                </h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Car Brand *</label>
                    <select value={brand} onChange={(e) => handleBrandChange(e.target.value)} required>
                      <option value="">Select Brand</option>
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
                  <div className="form-group">
                    <label>Car Model *</label>
                    <select value={model} onChange={(e) => setModel(e.target.value)} required disabled={!brand}>
                      <option value="">Select Model</option>
                      {brand && modelsMap[brand]?.map((m, idx) => (
                        <option key={idx} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group form-group-full">
                    <label>Service Type *</label>
                    <select value={service} onChange={(e) => setService(e.target.value)} required>
                      <option value="">Choose Service / Package</option>
                      <optgroup label="Service Packages">
                        <option value="Basic Package">Basic Package (₹{(websiteSettings?.priceBasic || 1999).toLocaleString('en-IN')})</option>
                        <option value="Standard Package">Standard Package (₹{(websiteSettings?.priceStandard || 3999).toLocaleString('en-IN')})</option>
                        <option value="Premium Package">Premium Package (₹{(websiteSettings?.pricePremium || 6999).toLocaleString('en-IN')})</option>
                      </optgroup>
                      <optgroup label="Individual Services">
                        {servicesData.map(s => (
                          <option key={s.id} value={s.title}>
                            {s.title} ({s.price > 0 ? `₹${s.price.toLocaleString('en-IN')}` : 'Free Assist'})
                          </option>
                        ))}
                      </optgroup>
                    </select>
                  </div>
                </div>
                <div className="form-navigation">
                  <button type="button" className="btn btn-secondary" onClick={handlePrevStep}>
                    <i className="fas fa-arrow-left"></i> Previous
                  </button>
                  <button type="button" className="btn btn-primary" onClick={handleNextStep}>
                    Next step <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="form-step active"
              >
                <h3 style={{ marginBottom: '20px' }}>
                  <i className="fas fa-clock" style={{ color: 'var(--accent-color)', marginRight: '8px' }}></i> Appointment Scheduler
                </h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Preferred Date *</label>
                    <input 
                      type="date" 
                      required 
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Preferred Time Slot *</label>
                    <select value={time} onChange={(e) => setTime(e.target.value)} required>
                      <option value="">Select Time</option>
                      <option value="09:00 AM">09:00 AM - 11:00 AM</option>
                      <option value="11:00 AM">11:00 AM - 01:00 PM</option>
                      <option value="02:00 PM">02:00 PM - 04:00 PM</option>
                      <option value="04:00 PM">04:00 PM - 06:00 PM</option>
                    </select>
                  </div>
                  <div className="form-group form-group-full">
                    <label>Additional Notes / Instructions</label>
                    <textarea 
                      rows="4" 
                      placeholder="Enter special demands, symptoms, or instructions..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-navigation">
                  <button type="button" className="btn btn-secondary" onClick={handlePrevStep}>
                    <i className="fas fa-arrow-left"></i> Previous
                  </button>
                  <button type="button" className="btn btn-primary" onClick={handleNextStep}>
                    Next step <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step-4"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="form-step active"
              >
                <h3 style={{ marginBottom: '20px' }}>
                  <i className="fas fa-file-invoice" style={{ color: 'var(--accent-color)', marginRight: '8px' }}></i> Review Order
                </h3>
                
                <div className="coupon-group">
                  <input 
                    type="text" 
                    placeholder="Enter Coupon Code (e.g. GSAUTO10)" 
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                  <button type="button" className="btn btn-secondary" onClick={handleApplyCoupon}>
                    Apply
                  </button>
                </div>
                {couponMsg && (
                  <div 
                    style={{ 
                      marginBottom: '20px', 
                      fontSize: '0.85rem', 
                      fontWeight: 500,
                      color: couponSuccess ? 'var(--success)' : 'var(--danger)'
                    }}
                  >
                    {couponMsg}
                  </div>
                )}

                <div style={{ fontSize: '0.9rem', marginBottom: '25px', padding: '15px', background: 'rgba(0,0,0,0.08)', borderRadius: 'var(--radius-md)' }}>
                  <p><strong>Brand:</strong> {brand || '-'}</p>
                  <p><strong>Model:</strong> {model || '-'}</p>
                  <p><strong>Service:</strong> {service || '-'}</p>
                  <p><strong>Date & Time:</strong> {date || '-'} at {time || '-'}</p>
                </div>

                <div class="form-navigation">
                  <button type="button" className="btn btn-secondary" onClick={handlePrevStep}>
                    <i className="fas fa-arrow-left"></i> Previous
                  </button>
                  <button type="submit" className="btn btn-primary">
                    <i className="fas fa-check-circle"></i> Confirm Booking
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        {/* Pricing side summary panel */}
        <aside className="order-summary-card glass-card">
          <h3 style={{ marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '5px' }}>
            Order Summary
          </h3>
          <div className="order-summary-list">
            <div className="order-summary-item">
              <span>Base Cost</span>
              <span>₹{base.toLocaleString('en-IN')}</span>
            </div>
            <div className="order-summary-item">
              <span>Discount</span>
              <span style={{ color: 'var(--success)' }}>- ₹{discount.toLocaleString('en-IN')}</span>
            </div>
            <div className="order-summary-item">
              <span>Taxes (18% GST)</span>
              <span>₹{tax.toLocaleString('en-IN')}</span>
            </div>
            <div className="order-summary-item" style={{ borderTop: '1.5px solid var(--border-color)', paddingTop: '10px', fontSize: '1.25rem' }}>
              <span>Total Price</span>
              <span style={{ color: 'var(--accent-color)', fontWeight: 700 }}>₹{total.toLocaleString('en-IN')}</span>
            </div>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
            <i className="fas fa-shield-alt"></i> Secure checkout. Payment settled at center.
          </div>
        </aside>
      </div>

      {/* Invoice Modal Overlay */}
      <AnimatePresence>
        {showInvoice && invoiceData && (
          <div className="modal-overlay active" style={{ display: 'flex' }}>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="modal-box glass-card"
            >
              <button className="modal-close-btn" onClick={() => setShowInvoice(false)}>&times;</button>
              <h3 style={{ marginBottom: '20px', textAlign: 'center', color: 'var(--success)' }}>
                <i className="fas fa-check-circle"></i> Booking Confirmed!
              </h3>
              
              <div id="printable-invoice-area" style={{ marginBottom: '20px' }}>
                <div className="invoice-container">
                  <div className="invoice-header">
                    <div>
                      <div className="invoice-header-title">GS Automobiles</div>
                      <div style={{ fontSize: '0.8rem', color: '#666' }}>24/7 Premium Car Servicing</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 700 }}>INVOICE</div>
                      <div style={{ fontSize: '0.8rem', color: '#666' }}>ID: {invoiceData.id}</div>
                    </div>
                  </div>

                  <div className="invoice-details-grid">
                    <div style={{ fontSize: '0.85rem', color: '#444' }}>
                      <strong>Customer Details:</strong><br />
                      Name: {invoiceData.fullname}<br />
                      Email: {invoiceData.email}<br />
                      Phone: {invoiceData.phone}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#444', textAlign: 'right' }}>
                      <strong>Appointment Details:</strong><br />
                      Vehicle: {invoiceData.brand} {invoiceData.model}<br />
                      Date: {invoiceData.date} at {invoiceData.time}<br />
                      Invoice Date: {invoiceData.createdDate}
                    </div>
                  </div>

                  <table className="invoice-table">
                    <thead>
                      <tr>
                        <th>Description</th>
                        <th style={{ textAlign: 'right' }}>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{invoiceData.service}</td>
                        <td style={{ textAlign: 'right' }}>₹{invoiceData.basePrice.toLocaleString('en-IN')}</td>
                      </tr>
                      {invoiceData.discount > 0 && (
                        <tr>
                          <td style={{ color: 'green' }}>Discount Coupon Applied</td>
                          <td style={{ textAlign: 'right', color: 'green' }}>- ₹{invoiceData.discount.toLocaleString('en-IN')}</td>
                        </tr>
                      )}
                      <tr>
                        <td>GST tax (18%)</td>
                        <td style={{ textAlign: 'right' }}>₹{invoiceData.tax.toLocaleString('en-IN')}</td>
                      </tr>
                      <tr style={{ fontWeight: 700, borderTop: '2px solid #ddd' }}>
                        <td>Total Amount Payable</td>
                        <td style={{ textAlign: 'right', color: '#FF6B00' }}>₹{invoiceData.total.toLocaleString('en-IN')}</td>
                      </tr>
                    </tbody>
                  </table>

                  <div style={{ fontSize: '0.8rem', color: '#777', borderTop: '1px dashed #ccc', paddingTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                    <span>* Pay at center upon service delivery.</span>
                    <span>Earned: <strong style={{ color: '#FF6B00' }}>{invoiceData.points} Points</strong></span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '15px' }}>
                <button className="btn btn-secondary" style={{ flex: 1 }} onClick={handlePrint}>
                  <i className="fas fa-print"></i> Print Invoice
                </button>
                <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleTrackRedirect}>
                  <i className="fas fa-truck-monster"></i> Go to Tracking
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
