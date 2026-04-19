import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Copy, Scale, Flame, HeartCrack, Clock } from 'lucide-react';
import { useSoundEffects } from '../hooks/useSoundEffects';
import CrimeTicker from './CrimeTicker';
import SoundBoard from './SoundBoard';

export default function Layout() {
  const location = useLocation();
  const { playClick, playBzzt } = useSoundEffects();
  const [easterEggActive, setEasterEggActive] = useState(false);
  const [easterEggRoast, setEasterEggRoast] = useState('');
  const [tbytActive, setTbytActive] = useState(false);
  
  // Easter Egg logic
  useEffect(() => {
    let typed = '';
    const handleKeyDown = (e) => {
      typed += e.key.toLowerCase();
      if (typed.length > 8) typed = typed.slice(-8);
      
      if (typed.includes('tbyt')) {
        playBzzt();
        setTbytActive(true);
        setTimeout(() => setTbytActive(false), 3500);
        typed = ''; // reset to avoid spam
      } else if (typed === 'abdullah') {
        playBzzt();
        // Pick a random roast
        import('../data/roastData').then(({ roasts }) => {
          const allRoasts = [...roasts.general, ...roasts.sleeping, ...roasts.pubg];
          setEasterEggRoast(allRoasts[Math.floor(Math.random() * allRoasts.length)]);
          setEasterEggActive(true);
          setTimeout(() => setEasterEggActive(false), 4000);
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playBzzt]);

  const navLinks = [
    { path: '/muhasiba', label: 'Dashboard', icon: <Scale size={18} /> },
    { path: '/evidence', label: 'Evidence', icon: <Copy size={18} /> },
    { path: '/timeline', label: 'Timeline', icon: <Clock size={18} /> },
    { path: '/roast-arena', label: 'Fire Away', icon: <Flame size={18} /> },
    { path: '/redemption', label: 'The End', icon: <HeartCrack size={18} /> }
  ];

  const handleNavClick = () => playClick();

  return (
    <div className="relative min-h-screen bg-background scanlines text-white font-terminal overflow-hidden flex flex-col pt-6">
      <CrimeTicker />
      
      {/* Glitching header */}
      <nav className="sticky top-0 z-50 border-b border-neon-red/30 bg-background/80 backdrop-blur pointer-events-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row lg:justify-between lg:items-center py-2 h-auto">
          <div className="flex items-center justify-between lg:w-auto w-full mb-2 lg:mb-0">
            <div className="flex items-center space-x-2 text-neon-red font-bold text-xl glitch-text" data-text="A.ROAST">
              <Terminal />
              <span>A.ROAST</span>
            </div>
            {/* Streak Counter Mobile */}
            <div className="flex lg:hidden items-center text-orange-500 font-bold text-sm bg-orange-500/10 px-2 py-1 rounded">
              Days of Tbyt Excuses: <Flame size={14} className="mx-1 text-orange-400 animate-pulse"/> 23
            </div>
          </div>

          <div className="flex flex-wrap items-center space-x-1 sm:space-x-4 mb-2 lg:mb-0 justify-center">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `flex items-center space-x-1 sm:space-x-2 px-3 py-2 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-neon-red/20 text-neon-red border border-neon-red/50' 
                      : 'text-gray-400 hover:text-neon-purple hover:bg-neon-purple/10'
                  }`
                }
              >
                {link.icon}
                <span className="hidden sm:inline">{link.label}</span>
              </NavLink>
            ))}
          </div>

          {/* Streak Counter Desktop */}
          <div className="hidden lg:flex items-center text-orange-500 font-bold text-sm bg-orange-500/10 px-3 py-1.5 rounded border border-orange-500/30 shadow-[0_0_10px_rgba(249,115,22,0.3)]">
            Days of Tbyt Excuses: <Flame size={16} className="mx-2 text-orange-400 animate-pulse"/> 23
          </div>
        </div>
      </nav>

      <main className="flex-grow flex flex-col relative z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: -100, scaleX: 0.8, skewX: 5, filter: 'hue-rotate(90deg)' }}
            animate={{ opacity: 1, x: 0, scaleX: 1, skewX: 0, filter: 'hue-rotate(0deg)' }}
            exit={{ opacity: 0, x: 100, scaleX: 0.8, skewX: -5, filter: 'blur(10px)' }}
            transition={{ type: "spring", stiffness: 100, damping: 12 }}
            className="flex-grow flex flex-col"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Easter Egg Modal */}
      <AnimatePresence>
        {easterEggActive && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1.2, 1], 
              opacity: 1,
              x: [0, -10, 10, -10, 10, 0],
              y: [0, 10, -10, 10, -10, 0]
            }}
            transition={{ duration: 0.5 }}
            exit={{ scale: 1.5, opacity: 0 }}
            className="fixed inset-0 flex flex-col items-center justify-center bg-black/90 z-[100] pointer-events-none p-8"
          >
            <h1 className="text-4xl md:text-6xl text-neon-red font-display font-bold animate-glitch glitch-text mb-4 text-center" data-text="SURPRISE ROAST">SURPRISE ROAST</h1>
            <p className="text-xl md:text-3xl text-neon-purple font-terminal text-center max-w-3xl">"{easterEggRoast}"</p>
            <p className="text-2xl mt-8">💀 👀 💀</p>
          </motion.div>
        )}

        {tbytActive && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1.2, 1], 
              opacity: 1,
              x: [0, -20, 20, -20, 20, 0],
              filter: ['hue-rotate(0deg)', 'hue-rotate(90deg)', 'hue-rotate(0deg)']
            }}
            transition={{ duration: 0.5 }}
            exit={{ scale: 1.5, opacity: 0 }}
            className="fixed inset-0 flex flex-col items-center justify-center bg-neon-red/90 z-[100] pointer-events-none p-8"
          >
            <h1 className="text-5xl md:text-7xl text-black font-display font-bold animate-glitch glitch-text mb-4 text-center" data-text="CAUGHT!">CAUGHT!</h1>
            <p className="text-3xl md:text-5xl text-white font-terminal text-center max-w-3xl font-bold uppercase mt-4">Tbyt kharab tha na? LIAR!</p>
          </motion.div>
        )}
      </AnimatePresence>
      <SoundBoard />
    </div>
  );
}
