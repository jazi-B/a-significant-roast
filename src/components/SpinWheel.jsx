import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { roasts } from '../data/roastData';

export default function SpinWheel({ onLand }) {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const { playClick, playPing } = useSoundEffects();

  const segments = [
    { label: "Phone Dodger", color: "bg-neon-red text-white", cat: "phone" },
    { label: "Tbyt King", color: "bg-purple-600 text-white", cat: "tbyt" },
    { label: "PUBG Addict", color: "bg-green-600 text-white", cat: "pubg" },
    { label: "Sleep Champion", color: "bg-blue-600 text-white", cat: "sleeping" },
    { label: "Plan Ghost", color: "bg-orange-600 text-white", cat: "going_out" },
    { label: "Data Destroyer", color: "bg-gray-600 text-white", cat: "data_loss" },
    { label: "Chai Lover", color: "bg-yellow-600 text-black", cat: "general" },
    { label: "Excuse Master", color: "bg-pink-600 text-white", cat: "general" },
  ];

  const handleSpin = () => {
    if (spinning) return;
    playClick();
    setSpinning(true);
    
    const extraSpins = 5;
    const randomSegmentIndex = Math.floor(Math.random() * segments.length);
    // each segment is 45 deg. To land on exactly the middle of a segment at the top (top is 0 deg)
    // we need to offset the angle. Top position means the segment is at 270 deg in a standard circle, 
    // but with rotateZ, top is 0. Wait, standard css rotation points 0 at top. 
    // Segment logic: if we rotate circle by -index * 45deg, the index segment is at the top.
    
    const targetDeg = (extraSpins * 360) + (360 - (randomSegmentIndex * 45));
    const newRotation = rotation + targetDeg + (rotation % 360 === 0 ? 0 : (360 - (rotation%360))); 

    setRotation(newRotation);

    setTimeout(() => {
      setSpinning(false);
      playPing();
      const choice = segments[randomSegmentIndex];
      const r = roasts[choice.cat];
      const selectedRoast = r[Math.floor(Math.random() * r.length)];
      onLand(selectedRoast, choice.label);
    }, 4000);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-64 h-64 border-4 border-gray-800 rounded-full shadow-[0_0_30px_rgba(255,45,85,0.3)] mb-4 bg-gray-900 overflow-hidden">
        {/* Pointer */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[20px] border-neon-red z-20 drop-shadow-md"></div>
        
        <motion.div
          animate={{ rotate: rotation }}
          transition={{ duration: 4, ease: [0.2, 0.8, 0.2, 1] }}
          className="w-full h-full relative rounded-full"
        >
          {segments.map((seg, i) => {
            const rot = i * 45;
            return (
              <div 
                key={i}
                className={`absolute w-full h-[50%] origin-bottom left-0 flex justify-center pt-2 ${seg.color} font-terminal font-bold text-xs uppercase overflow-hidden`}
                style={{ transform: `rotate(${rot}deg)`, clipPath: 'polygon(20% 0, 80% 0, 50% 100%)' }}
              >
                <div style={{ marginTop: '0px' }}>{seg.label}</div>
              </div>
            );
          })}
          {/* Cover the messy center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-black rounded-full z-10 border-2 border-gray-700 flex items-center justify-center shadow-inner">
            <span className="text-[10px] text-gray-400">SPIN</span>
          </div>
        </motion.div>
      </div>

      <button
        onClick={handleSpin}
        disabled={spinning}
        className="bg-neon-purple hover:bg-purple-600 disabled:opacity-50 text-white font-bold py-2 px-6 tracking-widest transition-colors uppercase border border-purple-400"
      >
        {spinning ? 'Spinning...' : 'SPIN FOR ROAST'}
      </button>
    </div>
  );
}
