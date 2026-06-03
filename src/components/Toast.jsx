import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Toast({ toasts }) {
  return (
    <div className="toast-container">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={`toast toast-${toast.type}`}
          >
            <i className={`fas ${
              toast.type === 'success' ? 'fa-check-circle' : 
              toast.type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'
            }`}></i>
            <span>{toast.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
