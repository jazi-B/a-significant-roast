import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { crimes, phrases } from '../data/roastData';
import { useSoundEffects } from '../hooks/useSoundEffects';
import AbdullahPhoto from '../components/AbdullahPhoto';
import WhatsAppReplay from '../components/WhatsAppReplay';
import PhotoBooth from '../components/PhotoBooth';

export default function EvidenceVault() {
  const [visibleCrimes, setVisibleCrimes] = useState([]);
  const { playClick } = useSoundEffects();
  const crimeScrollRef = useRef(null);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      if (current < crimes.length) {
        playClick(); // Typewriter sound effect
        setVisibleCrimes(prev => [...prev, crimes[current]]);
        current++;
        if(crimeScrollRef.current) {
           crimeScrollRef.current.scrollTop = crimeScrollRef.current.scrollHeight;
        }
      } else {
        clearInterval(interval);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [playClick]);

  return (
    <div className="flex-grow flex flex-col items-center p-4 md:p-8 relative">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-neon-red border-b-2 border-neon-red/50 pb-2">EVIDENCE VAULT</h1>
      <PhotoBooth />
      
      <div className="w-full max-w-6xl grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left Column: Case File / Exhibit photos */}
        <div className="flex flex-col items-center bg-[#fdf5e6] p-8 rounded shadow-2xl relative xl:col-span-1" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')" }}>
          <div className="absolute top-4 right-4 text-red-600 border-4 border-red-600 px-4 py-1 text-2xl font-bold rotate-12 opacity-80" style={{ fontFamily: 'Courier New' }}>
            CLASSIFIED
          </div>
          
          <h2 className="text-3xl text-black border-b-2 border-black w-full text-left font-serif mb-6">Subject: Abdullah</h2>
          
          <div className="flex flex-col gap-8 w-full items-center">
            <WhatsAppReplay />
          </div>
        </div>

        {/* Right Column: Typed List of Crimes */}
        <div className="flex flex-col xl:col-span-2">
          <div className="bg-black/80 border border-gray-700 p-6 rounded relative min-h-[400px] shadow-[0_0_20px_rgba(191,90,242,0.15)] flex flex-col">
            <h3 className="text-neon-purple text-xl mb-4 uppercase tracking-widest flex items-center border-b border-gray-800 pb-2">
              <span className="w-3 h-3 rounded-full bg-neon-red animate-pulse mr-3"></span>
              Live Crime Log
            </h3>
            
            <div ref={crimeScrollRef} className="flex-grow overflow-y-auto pr-2 space-y-4 font-terminal text-green-400">
              {visibleCrimes.map((crime, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-gray-900/50 p-3 border-l-2 border-green-500"
                >
                  {crime}
                </motion.div>
              ))}
              {visibleCrimes.length < crimes.length && (
                <div className="animate-pulse">_</div>
              )}
            </div>
          </div>

          {/* Top Phrases */}
          <div className="mt-8">
            <h3 className="text-neon-red mb-4 font-bold text-xl border-b border-neon-red/30 pb-2">CONFISCATED EVIDENCE (Top Phrases)</h3>
            <p className="text-gray-400 font-terminal text-sm mb-4">Hover to inspect physical evidence cards.</p>
            <div className="flex flex-wrap gap-4">
               {phrases.map((phrase, idx) => (
                <div key={idx} className="relative w-40 h-24 perspective-1000 group">
                  <div className="absolute w-full h-full transition-all duration-500 transform-style-3d group-hover:rotate-y-180">
                    {/* Front */}
                    <div className="absolute w-full h-full bg-gray-900 border border-gray-600 rounded flex items-center justify-center backface-hidden shadow-md">
                      <span className="text-gray-500 font-terminal">Exhibit {idx + 1}</span>
                    </div>
                    {/* Back */}
                    <div className="absolute w-full h-full bg-black border border-neon-red rounded flex items-center justify-center backface-hidden rotate-y-180 shadow-[0_0_15px_rgba(255,45,85,0.4)] p-2">
                      <span className="text-neon-red font-bold text-center text-sm">"{phrase}"</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
