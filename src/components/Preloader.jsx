import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div 
          id="preloader"
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          style={{ background: '#0B0F19' }}
        >
          <div className="loader">
            <div className="loader-car"><i className="fas fa-car-side"></i></div>
            <div className="loader-bar"></div>
            <p style={{ color: 'white', marginTop: '15px', fontWeight: 500, letterSpacing: '1px' }}>AUTOCARE HUB</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
