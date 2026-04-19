import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Utensils, Pill, BedDouble, Crosshair } from 'lucide-react';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { roasts } from '../data/roastData';
import AbdullahPhoto from '../components/AbdullahPhoto';
import ParticleBackground from '../components/ParticleBackground';
import SpinWheel from '../components/SpinWheel';
import { useNavigate } from 'react-router-dom';

const objects = [
  { id: 'phone', icon: <Smartphone size={48} />, label: 'Phone', color: 'text-neon-red' },
  { id: 'pubg', icon: <Crosshair size={48} />, label: 'PUBG', color: 'text-green-500' },
  { id: 'sleeping', icon: <BedDouble size={48} />, label: 'Bed', color: 'text-blue-500' },
  { id: 'tbyt', icon: <Pill size={48} />, label: 'Medicine', color: 'text-neon-purple' },
  { id: 'going_out', icon: <Utensils size={48} />, label: 'Khana', color: 'text-yellow-500' }
];

const roastLabels = {
  0: "Abhi Bachaya Hua Hai",
  20: "Shyd Shyd Pakra Ja Raha Hai",
  40: "Tbyt Kharab Ho Rahi Hogi Abki",
  60: "Jeo... Guilty!",
  80: "Hukkammmm — Convicted!",
  100: "GAME OVER"
};

export default function LandingPage() {
  const [meter, setMeter] = useState(0);
  const [activeRoast, setActiveRoast] = useState(null);
  const { playBzzt } = useSoundEffects();
  const navigate = useNavigate();

  // Tbyt Tracker State
  const [tbytCount, setTbytCount] = useState(23);
  React.useEffect(() => {
    const t = setInterval(() => setTbytCount(p => p + 1), 10000);
    return () => clearInterval(t);
  }, []);

  const handleObjectClick = (objId) => {
    playBzzt();
    
    // Pick random roast
    const categoryRoasts = roasts[objId];
    const randomRoast = categoryRoasts[Math.floor(Math.random() * categoryRoasts.length)];
    setActiveRoast(randomRoast);
    
    setTimeout(() => setActiveRoast(null), 3000);

    setMeter(prev => {
      const next = Math.min(prev + 20, 100);
      if (next === 100) {
        setTimeout(() => navigate('/verdict'), 1500);
      }
      return next;
    });
  };

  const getMeterLabel = () => {
    const keys = Object.keys(roastLabels).map(Number).sort((a,b) => b-a);
    for (let k of keys) {
      if (meter >= k) return roastLabels[k];
    }
    return roastLabels[0];
  };

  return (
    <div className="flex-grow flex flex-col items-center p-8 relative">
      <ParticleBackground />
      {/* HUD Roast Meter */}
      <div className="w-full max-w-3xl mb-12">
        <div className="flex justify-between items-end mb-2">
          <span className="text-neon-red font-terminal font-bold">ROAST METER</span>
          <span className="text-xs text-gray-400">{getMeterLabel()} - {meter}%</span>
        </div>
        <div className="w-full h-6 bg-gray-900 border border-gray-700 relative overflow-hidden ring-1 ring-neon-red/20 shadow-[0_0_15px_rgba(255,45,85,0.2)]">
          <div 
            className="h-full bg-neon-red transition-all duration-500 ease-out flex items-center justify-end pr-2 overflow-hidden"
            style={{ width: `${meter}%` }}
          >
            <div className="w-full h-full absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiAvPgo8L3N2Zz4=')]"></div>
          </div>
        </div>
      </div>

      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-bold glitch-text mb-4" data-text="Abdullah Ka Digital Muhasiba">
          Abdullah Ka Digital Muhasiba
        </h1>
        <p className="text-xl md:text-2xl text-neon-purple font-terminal inline-block overflow-hidden whitespace-nowrap border-r-4 border-neon-purple pr-2 animate-typing">
          Tumhari 4991 messages ka hisaab aaj hoga
        </p>
      </div>

      <div className="flex flex-col xl:flex-row items-center justify-center gap-16 w-full max-w-7xl">
        
        {/* Tbyt Tracker Widget */}
        <div className="hidden xl:flex flex-col gap-4 bg-gray-900 border border-gray-700 p-6 rounded shadow-xl min-w-[300px]">
          <h2 className="text-neon-purple font-bold border-b border-gray-700 pb-2">LIVE TRACKER</h2>
          <div className="flex justify-between items-center text-sm font-terminal">
            <span className="text-gray-400">Tbyt Kharab Excuses:</span>
            <span className="text-neon-red font-bold">{tbytCount}</span>
          </div>
          <div className="flex justify-between items-center text-sm font-terminal">
            <span className="text-gray-400">PUBG Sessions Logged:</span>
            <span className="text-green-500 font-bold">{tbytCount}</span>
          </div>
          <div className="mt-2 bg-black p-2 border left-red-500 border-red-500/50 text-center text-xs">
            <span className="text-gray-500">CORRELATION:</span> <span className="text-white font-bold">100.00%</span>
          </div>
        </div>

        {/* Floating Objects */}
        <div className="relative w-full max-w-md h-80 flex items-center justify-center">
          {objects.map((obj, i) => {
            const angle = (i * (360 / objects.length)) * (Math.PI / 180);
            const radius = 120;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <motion.button
                key={obj.id}
                className={`absolute p-4 rounded-full bg-gray-900 border border-gray-700 shadow-xl ${obj.color} animate-wobble hover:ring-2 hover:ring-neon-red hover:shadow-[0_0_20px_rgba(255,45,85,0.6)] transition-all`}
                style={{ left: `calc(50% + ${x}px - 40px)`, top: `calc(50% + ${y}px - 40px)`, animationDelay: `${i * 0.2}s` }}
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.8 }}
                onClick={() => handleObjectClick(obj.id)}
                title={obj.label}
              >
                {obj.icon}
              </motion.button>
            );
          })}
          
          {/* Central Active Roast Popover */}
          <AnimatePresence>
            {activeRoast && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                className="absolute z-30 bg-black/90 border-2 border-neon-red p-4 rounded text-center w-64 shadow-[0_0_30px_rgba(255,45,85,0.4)] pointer-events-none"
              >
                <p className="text-white font-terminal text-sm">{activeRoast}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Spin Wheel */}
        <div className="w-full xl:w-auto flex justify-center">
          <SpinWheel onLand={(roast, label) => {
            setActiveRoast(`${label}: ${roast}`);
             setTimeout(() => setActiveRoast(null), 4000);
             setMeter(prev => {
                const next = Math.min(prev + 30, 100);
                if (next === 100) setTimeout(() => navigate('/verdict'), 1500);
                return next;
             });
          }}/>
        </div>
      </div>
    </div>
  );
}
