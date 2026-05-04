import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles } from 'lucide-react';
import './StudentChatbot.css';

const StudentChatbot = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const name = currentUser?.name || 'Student';
  const classLevel = currentUser?.classLevel || 'Class 1';

  // Initial greeting
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'msg-0',
          text: `Hi ${name}! 👋 I'm your AI Tutor. How can I help you with ${classLevel} today?`,
          sender: 'bot'
        }
      ]);
    }
  }, [name, classLevel, messages.length]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  const toggleChat = () => setIsOpen(!isOpen);

  const getSimulatedResponse = (text) => {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('math') || lowerText.includes('add') || lowerText.includes('subtract') || lowerText.includes('number')) {
      return "Math is super fun! 🧮 Have you tried using the 3D visualizers in your Library? The counting spheres and balance scales are great for practicing!";
    }
    
    if (lowerText.includes('test') || lowerText.includes('exam') || lowerText.includes('quiz')) {
      return "Don't worry about tests! Just keep practicing in the Practice Arena, and you'll do great. Remember to take your time and read every question carefully. 🌟";
    }
    
    if (lowerText.includes('star') || lowerText.includes('reward') || lowerText.includes('point')) {
      return "You earn stars ⭐ every time you solve a quest or complete an exam! You can check your progress on your Student Dashboard.";
    }

    if (lowerText.includes('hello') || lowerText.includes('hi')) {
      return `Hello again, ${name}! Ready to learn something new?`;
    }

    if (lowerText.includes('help')) {
      return "I can help you find your way around! You can check your Subject Hubs for lessons or the Practice Arena for questions!";
    }

    return "That's a great question! 🤔 Since I'm just a demo AI right now, I don't know the exact answer, but I encourage you to check your Library or ask your teacher. Keep exploring!";
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const newMsg = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      sender: 'user'
    };
    
    setMessages(prev => [...prev, newMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate network delay and AI processing
    setTimeout(() => {
      setIsTyping(false);
      const botResponse = {
        id: (Date.now() + 1).toString(),
        text: getSimulatedResponse(newMsg.text),
        sender: 'bot'
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1500 + Math.random() * 1000); // 1.5s to 2.5s delay
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3><Bot size={20} /> AI Tutor <span style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.2)', padding: '2px 6px', borderRadius: '10px' }}>Online</span></h3>
            <button className="close-btn" onClick={toggleChat}>
              <X size={20} />
            </button>
          </div>
          
          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="chat-message bot typing-indicator">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <form className="chatbot-input-area" onSubmit={handleSend}>
            <input 
              type="text" 
              placeholder="Ask me a question..." 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isTyping}
            />
            <button type="submit" disabled={!inputValue.trim() || isTyping}>
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
      
      {!isOpen && (
        <div className="chatbot-fab animate-pop-in" onClick={toggleChat} title="Need help? Ask your AI Tutor!">
          <div className="indicator"></div>
          <Sparkles size={28} />
        </div>
      )}
    </div>
  );
};

export default StudentChatbot;
