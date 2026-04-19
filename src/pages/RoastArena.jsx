import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, Copy, AlertCircle, Loader2 } from 'lucide-react';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { roasts } from '../data/roastData';

export default function RoastArena() {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentRoast, setCurrentRoast] = useState('');
  const [hallOfFame, setHallOfFame] = useState(() => {
    try {
      const saved = localStorage.getItem('roastHallOfFame');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  
  const { playBzzt, playClick } = useSoundEffects();

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    playBzzt();
    setIsLoading(true);
    setCurrentRoast('');

    try {
      // Simulate API loading for dramatic effect
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Match keywords
      const t = input.toLowerCase();
      let roastCategory = roasts.general;
      
      if (t.match(/tbyt|sick|beemar/)) roastCategory = roasts.tbyt;
      else if (t.match(/game|pubg|khel/)) roastCategory = roasts.pubg;
      else if (t.match(/so|neend|uth/)) roastCategory = roasts.sleeping;
      else if (t.match(/bhr|aa|nikl/)) roastCategory = roasts.going_out;

      const roastText = roastCategory[Math.floor(Math.random() * roastCategory.length)];

      // Typewriter effect for the roast
      let i = 0;
      const interval = setInterval(() => {
        setCurrentRoast(prev => prev + roastText.charAt(i));
        i++;
        if (i % 3 === 0) playClick();
        if (i >= roastText.length) {
          clearInterval(interval);
          addToHallOfFame(roastText);
        }
      }, 30);

    } catch (error) {
      console.error(error);
      setCurrentRoast("Error generating roast. He broke the matrix. 🤡");
    } finally {
      setIsLoading(false);
      setInput('');
    }
  };

  const addToHallOfFame = (roast) => {
    setHallOfFame(prev => {
      const updated = [roast, ...prev].slice(0, 5); // Keep last 5
      localStorage.setItem('roastHallOfFame', JSON.stringify(updated));
      return updated;
    });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    playClick();
    alert('Roast copied to clipboard!'); // Could replace with toast
  };

  return (
    <div className="flex-grow flex flex-col items-center p-4 md:p-8 relative">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-neon-purple border-b-2 border-neon-purple/50 pb-2 flex items-center gap-3">
        <Bot size={40} className="animate-pulse" /> AI ROAST ARENA
      </h1>
      
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-12 mt-4">
        
        {/* Left Column: Generator Form */}
        <div className="flex flex-col">
          <div className="bg-gray-900 border border-gray-700 p-6 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
            <h2 className="text-xl text-gray-300 mb-4 font-terminal">What did Abdullah do now?</h2>
            
            <form onSubmit={handleGenerate} className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-2 mb-2">
                {[
                  { label: 'He dodged my call', val: 'dodged phone' },
                  { label: 'Tbyt claim', val: 'tbyt kharab sick' },
                  { label: 'Playing PUBG', val: 'pubg game' },
                  { label: 'Sleeping again', val: 'so neend' },
                  { label: 'Ghosted the plan', val: 'bhr aa plan ghost' },
                  { label: 'Lost data again', val: 'lost data' },
                ].map(b => (
                  <button
                    key={b.val}
                    type="button"
                    onClick={() => { setInput(b.val); playClick(); }}
                    className="text-xs bg-gray-800 hover:bg-neon-red hover:text-white text-gray-300 font-terminal py-1 px-3 rounded-full border border-gray-600 hover:border-neon-red transition-all"
                  >
                    {b.label}
                  </button>
                ))}
              </div>

              <textarea 
                className="w-full bg-black border border-neon-red/50 text-white p-4 font-terminal focus:outline-none focus:border-neon-red focus:ring-1 focus:ring-neon-red resize-none"
                rows="4"
                placeholder="Or type the latest offense..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              
              <button 
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-neon-purple hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 flex items-center justify-center gap-2 transition-colors uppercase tracking-widest"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">Scanning DB <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}><Loader2 size={16}/></motion.div></span>
                ) : (
                  <>SEND IT 💀 <Send size={18} /></>
                )}
              </button>
            </form>
          </div>

          {/* Current Generated Roast Output */}
          <AnimatePresence>
            {(currentRoast || isLoading) && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 bg-black border-l-4 border-neon-red p-6 min-h-[150px] relative group"
              >
                {isLoading && !currentRoast ? (
                  <div className="flex flex-col items-center justify-center h-full space-y-4">
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }} className="text-neon-purple">
                      <Loader2 size={32} />
                    </motion.div>
                    <p className="text-neon-purple font-terminal animate-pulse">Consulting the chat logs...</p>
                  </div>
                ) : (
                  <>
                    <p className="font-terminal text-lg text-green-400">"{currentRoast}"</p>
                    {!isLoading && currentRoast && (
                      <button 
                        onClick={() => copyToClipboard(currentRoast)}
                        className="absolute top-2 right-2 text-gray-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Copy to clipboard"
                      >
                        <Copy size={20} />
                      </button>
                    )}
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Column: Hall of Fame */}
        <div className="flex flex-col">
          <h2 className="text-2xl text-neon-red font-bold mb-4 flex items-center gap-2">
            HALL OF FAME
          </h2>
          <div className="space-y-4">
            {hallOfFame.length === 0 ? (
              <p className="text-gray-500 font-terminal italic">No roasts generated yet. The AI is waiting...</p>
            ) : (
              hallOfFame.map((roast, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-gray-800/50 p-4 border border-gray-700 hover:border-gray-500 transition-colors relative group"
                >
                  <p className="font-terminal text-sm text-gray-300">"{roast}"</p>
                  <button 
                    onClick={() => copyToClipboard(roast)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Copy size={16} />
                  </button>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
