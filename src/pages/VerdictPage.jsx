import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { ShieldAlert, Share2 } from 'lucide-react';

export default function VerdictPage() {
  const [stampDown, setStampDown] = useState(false);
  const { playBzzt, playGameOver } = useSoundEffects();

  useEffect(() => {
    const timer = setTimeout(() => {
      setStampDown(true);
      playGameOver();
    }, 2000);
    return () => clearTimeout(timer);
  }, [playGameOver]);

  const handleShare = () => {
    playBzzt();
    navigator.clipboard.writeText("Verdict: GUILTY ON ALL COUNTS. Check out the digital muhasiba here: https://a-significant-roast.vercel.app/verdict");
    alert("Verdict copied to clipboard to share on WhatsApp 💀");
  };

  return (
    <div className="flex-grow flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-2xl bg-[#fdf5e6] text-black p-8 md:p-12 shadow-2xl relative"
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')" }}
      >
        <div className="border-4 border-double border-gray-800 p-8 relative h-full">
          {/* Header */}
          <div className="text-center border-b-2 border-gray-800 pb-6 mb-8">
            <h1 className="font-serif text-3xl md:text-5xl font-bold uppercase tracking-widest text-gray-900 mb-2">
              In The Court of Best Friends
            </h1>
            <h2 className="font-mono text-xl text-gray-600">Case No: 4991/2025</h2>
          </div>

          {/* Body */}
          <div className="space-y-6 font-mono text-lg text-gray-800 leading-relaxed max-w-lg mx-auto">
            <p><strong className="uppercase">Accused:</strong> Abdullah (aka Dallay, aka Tbyt King)</p>
            <p>
              <strong className="uppercase">Charges:</strong><br/>
              - Aggravated Phone Dodging<br/>
              - Fraudulent 'Tbyt Kharab' Claims<br/>
              - Unauthorized 2:00 AM PUBG Sessions<br/>
              - Reckless Data Destruction (7 Years)<br/>
              - Habitual Plan Ghosting In The Third Degree
            </p>

            <div className="mt-12 pt-8 border-t border-gray-400">
              <h3 className="font-serif text-3xl font-bold uppercase text-center text-gray-900 mb-4">
                VERDICT: GUILTY ON ALL COUNTS
              </h3>
              <p className="text-center font-bold">
                <strong className="uppercase">Sentence:</strong> Subjected to this website forever.
              </p>
            </div>

            <div className="flex justify-between items-end mt-16 text-sm italic">
              <div>
                Judge: <span className="font-serif font-bold not-italic text-xl border-b border-black">The Squad</span>
              </div>
              <div className="text-right">
                Signed & Sealed 💀<br/>
                Digital Muhasiba
              </div>
            </div>
          </div>

          {/* Animated Wax Seal */}
          <AnimatePresence>
            {stampDown && (
              <motion.div
                initial={{ scale: 5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 12 }}
                className="absolute bottom-8 right-8 pointer-events-none"
              >
                <div className="w-32 h-32 bg-red-700 rounded-full flex flex-col items-center justify-center text-white border-[6px] border-red-900 shadow-[2px_4px_10px_rgba(0,0,0,0.5)] rotate-12 relative overflow-hidden">
                   <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-500/20 to-transparent"></div>
                   <ShieldAlert size={40} className="mb-1" opacity={0.6} />
                   <span className="font-serif font-bold tracking-widest text-lg">SEALED</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Action Button */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
          <button 
            onClick={handleShare}
            className="flex items-center gap-2 bg-neon-red hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full shadow-xl transition-all hover:scale-105"
          >
            <Share2 size={18} /> Share Verdict
          </button>
        </div>
      </motion.div>
    </div>
  );
}
