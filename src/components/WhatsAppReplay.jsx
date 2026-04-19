import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { chatHistory } from '../data/roastData';
import { useSoundEffects } from '../hooks/useSoundEffects';

export default function WhatsAppReplay() {
  const [messages, setMessages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const { playPing } = useSoundEffects();

  const handleNext = () => {
    if (currentIndex >= chatHistory.length) return;
    
    setIsTyping(true);
    const nextMsg = chatHistory[currentIndex];
    
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, nextMsg]);
      setCurrentIndex(prev => prev + 1);
      playPing();
    }, 800); // simulate 800ms typing before popping
  };

  return (
    <div className="w-full max-w-sm bg-[#ece5dd] border border-gray-400 rounded-xl overflow-hidden shadow-2xl flex flex-col h-[450px]">
      <div className="bg-[#075e54] text-white p-3 flex items-center shadow-md z-10">
        <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden mr-3">
           <img src="/abdullah1.jpeg" alt="Abdullah" className="w-full h-full object-cover" />
        </div>
        <div>
          <div className="font-bold">Abdullah 💀</div>
          <div className="text-xs text-green-200">typing... wait nvm ghosting</div>
        </div>
      </div>

      <div className="flex-grow p-4 overflow-y-auto flex flex-col space-y-3 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-cover">
        <AnimatePresence>
          {messages.map((m, i) => {
            const isMe = m.sender === 'You';
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className={`max-w-[80%] rounded-lg p-2 px-3 shadow-sm relative ${
                  isMe ? 'bg-[#dcf8c6] self-end rounded-tr-none' : 'bg-white self-start rounded-tl-none'
                }`}
              >
                <div className="text-sm text-gray-800">{m.text}</div>
                {m.subtext && <div className="text-xs text-red-500 font-bold mt-1 italic">{m.subtext}</div>}
              </motion.div>
            );
          })}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white self-start rounded-lg rounded-tl-none p-2 px-3 shadow-sm text-gray-500 max-w-[80%]"
            >
              <div className="flex space-x-1">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="bg-[#f0f0f0] p-3 flex justify-center">
        <button 
          onClick={handleNext} 
          disabled={currentIndex >= chatHistory.length || isTyping}
          className="bg-[#128C7E] text-white px-4 py-2 rounded-full font-bold shadow hover:bg-[#075E54] disabled:opacity-50 transition-colors w-full"
        >
          {currentIndex >= chatHistory.length ? "Left on Read" : "Load Next Message"}
        </button>
      </div>
    </div>
  );
}
