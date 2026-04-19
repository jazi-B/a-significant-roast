import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useSoundEffects } from '../hooks/useSoundEffects';

export default function PhotoBooth({ photos = ["/abdullah1.jpeg", "/abdullah2.jpeg", "/abdullah3.jpeg", "/abdullah4.jpeg"] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [glitching, setGlitching] = useState(false);
  const { playClick, playBzzt } = useSoundEffects();

  const captions = [
    "Caught skipping plans...",
    "Thinking about 2:30 AM PUBG...",
    "Evaluating AC cleaning methods...",
    "Regretting the 6-digit PIN...",
    "Sending 'Tbyt nae sae yr' in 3... 2... 1..."
  ];

  useEffect(() => {
    if (!isOpen) return;
    const gInterval = setInterval(() => {
      setGlitching(true);
      playBzzt();
      setTimeout(() => setGlitching(false), 200);
    }, 3000);
    return () => clearInterval(gInterval);
  }, [isOpen, playBzzt]);

  const handleNext = () => {
    playClick();
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrev = () => {
    playClick();
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <>
      <button 
        onClick={() => { playClick(); setIsOpen(true); }}
        className="bg-neon-purple hover:bg-purple-600 text-white font-bold py-3 px-6 flex items-center gap-2 uppercase tracking-widest transition-colors mb-8"
      >
        <Camera size={20} /> Open Photo Booth
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-4 backdrop-blur-sm"
          >
            <button onClick={() => setIsOpen(false)} className="absolute top-8 right-8 text-white hover:text-neon-red">
              <X size={32} />
            </button>

            <div className={`relative max-w-2xl w-full aspect-square md:aspect-video bg-gray-900 border-4 border-gray-700 shadow-[0_0_40px_rgba(191,90,242,0.3)] flex items-center justify-center overflow-hidden ${glitching ? 'animate-glitch hue-rotate-90' : ''}`}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={photos[currentIndex]}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="w-full h-full object-contain"
                />
              </AnimatePresence>
              
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-4/5 hidden md:block">
                <div className="bg-black/80 text-neon-purple font-terminal p-3 border border-neon-purple/50 text-center tracking-widest text-sm sm:text-lg">
                  "{captions[currentIndex % captions.length]}"
                </div>
              </div>
            </div>
            
            <div className="flex gap-8 mt-8">
              <button onClick={handlePrev} className="bg-gray-800 hover:bg-neon-purple text-white p-4 rounded-full transition-colors"><ChevronLeft size={24} /></button>
              <button onClick={handleNext} className="bg-gray-800 hover:bg-neon-purple text-white p-4 rounded-full transition-colors"><ChevronRight size={24} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
