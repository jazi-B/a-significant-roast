import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, PhoneMissed, Crosshair, BellRing, MessageSquare, Skull, Trophy, X } from 'lucide-react';
import { useSoundEffects } from '../hooks/useSoundEffects';

export default function SoundBoard() {
  const [isOpen, setIsOpen] = useState(false);
  const { playMissedCall, playGunSound, playAlarm, playPing, playGameOver, playChickenDinner } = useSoundEffects();

  const sounds = [
    { icon: <PhoneMissed size={20} />, label: "Call Dropped", action: playMissedCall, color: "text-neon-red border-neon-red hover:bg-neon-red/20" },
    { icon: <Crosshair size={20} />, label: "PUBG Gun", action: playGunSound, color: "text-green-400 border-green-400 hover:bg-green-400/20" },
    { icon: <BellRing size={20} />, label: "Alarm Ignored", action: playAlarm, color: "text-yellow-400 border-yellow-400 hover:bg-yellow-400/20" },
    { icon: <MessageSquare size={20} />, label: "Msg Ping", action: playPing, color: "text-blue-400 border-blue-400 hover:bg-blue-400/20" },
    { icon: <Skull size={20} />, label: "Game Over", action: playGameOver, color: "text-gray-400 border-gray-400 hover:bg-gray-400/20" },
    { icon: <Trophy size={20} />, label: "Winner", action: playChickenDinner, color: "text-neon-purple border-neon-purple hover:bg-neon-purple/20" }
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-16 right-0 w-64 bg-black/95 border border-gray-700 shadow-[0_0_20px_rgba(0,0,0,0.8)] backdrop-blur p-4 rounded-xl mb-2"
          >
            <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-2">
              <span className="font-bold text-sm text-gray-300 flex items-center gap-2">
                <Volume2 size={16} className="text-neon-purple" /> Abdullah Soundboard
              </span>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white">
                <X size={16} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {sounds.map((s, i) => (
                <button
                  key={i}
                  onClick={s.action}
                  className={`flex flex-col items-center justify-center p-3 border rounded-lg transition-colors gap-2 ${s.color}`}
                >
                  {s.icon}
                  <span className="text-[10px] font-terminal uppercase font-bold">{s.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-neon-purple text-white rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(191,90,242,0.6)] border-2 border-white/20"
      >
        <Volume2 size={24} />
      </motion.button>
    </div>
  );
}
