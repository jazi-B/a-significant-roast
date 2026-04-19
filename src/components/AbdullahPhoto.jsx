import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { roasts } from '../data/roastData';

export default function AbdullahPhoto({ src, caption, rotation = 0 }) {
  const [stampGuilty, setStampGuilty] = useState(false);
  const { playBzzt } = useSoundEffects();

  const handleInteract = () => {
    if (!stampGuilty) {
      playBzzt();
      setStampGuilty(true);
    }
  };

  const defaultCaption = caption || roasts.general[Math.floor(Math.random() * roasts.general.length)];

  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: rotation + (Math.random() * 4 - 2) }}
      whileTap={{ scale: 0.95 }}
      onClick={handleInteract}
      initial={{ rotate: rotation }}
      className="relative bg-white p-4 pb-12 shadow-xl m-4 cursor-crosshair transform transition-all"
      style={{ width: '300px', flexShrink: 0 }}
    >
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-red-600/60 rotate-2 z-10 
        shadow-sm mix-blend-multiply" />
      
      <div className="w-full aspect-square bg-gray-200 mb-4 overflow-hidden relative">
        {src ? (
          <img 
            src={src} 
            alt="Abdullah" 
            className="w-full h-full object-cover transition-all duration-300 hover:hue-rotate-90 hover:contrast-150"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-800">
            <span className="font-display">📸 Photo Yahan Aayegi</span>
          </div>
        )}
        
        {stampGuilty && (
          <motion.div 
            initial={{ scale: 5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
            className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
          >
            <div className="border-4 border-red-600 text-red-600 font-bold text-5xl p-2 rotate-[-15deg] uppercase tracking-widest bg-red-600/20"
                 style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.5)', boxShadow: 'inset 0 0 10px rgba(220,38,38,0.5)' }}>
              GUILTY
            </div>
          </motion.div>
        )}
      </div>
      
      <p className="font-mono text-gray-900 text-center text-sm leading-tight h-10 overflow-hidden text-ellipsis italic">
        "{defaultCaption}"
      </p>
    </motion.div>
  );
}
