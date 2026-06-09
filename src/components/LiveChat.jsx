import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LiveChat({ setActivePage }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I am the GS Automobiles assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const msgEndRef = useRef(null);

  useEffect(() => {
    msgEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = (text) => {
    if (!text.trim()) return;
    
    // User message
    const userMsg = { id: Date.now(), text, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInputVal('');

    // Trigger bot reply
    setTimeout(() => {
      let reply = "I am not sure I understand. Type 'help' or click one of the quick assistance triggers below.";
      const query = text.toLowerCase();

      if (query.includes('book') || query.includes('appointment')) {
        reply = "To book a service, you can click on 'Book Service' in the top navbar or simply go to the Bookings section. Would you like me to redirect you?";
      } else if (query.includes('track') || query.includes('status')) {
        reply = "You can track your service live on the Dashboard & Track page! Just enter your active Booking ID (like AC-123456).";
      } else if (query.includes('emergency') || query.includes('road') || query.includes('breakdown')) {
        reply = "Emergency support is active 24/7! Go to the Contact Us page for immediate assistance or call our helpline: 1800-123-4567.";
      } else if (query.includes('price') || query.includes('cost') || query.includes('rate')) {
        reply = "Our service rates are highly transparent. Basic starts at ₹1,999, Standard at ₹3,999, and Premium at ₹6,999. Check the Services page for dynamic cost calculations.";
      } else if (query.includes('hello') || query.includes('hi')) {
        reply = "Hello! Hope you are having a great day. How can I assist you with your car today?";
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, text: reply, sender: 'bot' }]);
    }, 800);
  };

  const handleQuickAction = (action, val) => {
    if (action === 'page') {
      setActivePage(val);
      setIsOpen(false);
    } else {
      handleSend(val);
    }
  };

  return (
    <div id="live-chat-widget">
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="chat-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open Support Chat"
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-comments'}`}></i>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ duration: 0.2 }}
            className="chat-window glass-card active"
            style={{ display: 'flex' }}
          >
            <div className="chat-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <i className="fas fa-robot"></i>
                <span>GS Automobiles Chat Bot</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.2rem', cursor: 'pointer' }}
              >
                &times;
              </button>
            </div>
            
            <div className="chat-messages">
              {messages.map(msg => (
                <div key={msg.id} className={`chat-msg ${msg.sender}`}>
                  {msg.text}
                </div>
              ))}
              <div ref={msgEndRef} />
            </div>

            {/* Quick replies */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', padding: '10px', background: 'rgba(0,0,0,0.05)', borderTop: '1px solid var(--border-color)' }}>
              <button 
                className="btn btn-secondary" 
                style={{ padding: '6px 12px', fontSize: '0.75rem', borderRadius: '4px' }}
                onClick={() => handleQuickAction('msg', 'Book a service')}
              >
                📅 Book Service
              </button>
              <button 
                className="btn btn-secondary" 
                style={{ padding: '6px 12px', fontSize: '0.75rem', borderRadius: '4px' }}
                onClick={() => handleQuickAction('msg', 'Track my car')}
              >
                🔍 Track Status
              </button>
              <button 
                className="btn btn-secondary" 
                style={{ padding: '6px 12px', fontSize: '0.75rem', borderRadius: '4px' }}
                onClick={() => handleQuickAction('msg', 'Roadside breakdown help')}
              >
                🚨 Emergency
              </button>
            </div>

            <form 
              className="chat-input-area" 
              onSubmit={(e) => { e.preventDefault(); handleSend(inputVal); }}
            >
              <input 
                type="text" 
                placeholder="Type a message..." 
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
              />
              <button type="submit" className="chat-send-btn"><i className="fas fa-paper-plane"></i></button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
