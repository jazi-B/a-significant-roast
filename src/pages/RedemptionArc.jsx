import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Skull } from 'lucide-react';
import { useSoundEffects } from '../hooks/useSoundEffects';
import AbdullahPhoto from '../components/AbdullahPhoto';
import { finalRoast } from '../data/roastData';
import confetti from 'canvas-confetti';

export default function RedemptionArc() {
  const [isGlitching, setIsGlitching] = useState(true);
  const [forgiven, setForgiven] = useState(false);
  const [typedMessage, setTypedMessage] = useState('');
  const { playBzzt, playClick } = useSoundEffects();

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(prev => !prev);
    }, isGlitching ? Math.random() * 500 + 100 : Math.random() * 2000 + 2000);

    return () => clearInterval(glitchInterval);
  }, [isGlitching]);

  const handleForgive = () => {
    playBzzt();
    setForgiven(true);
    
    // Trigger confetti
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ff2d55', '#bf5af2', '#ffffff']
    });

    // Type out final message
    let i = 0;
    const interval = setInterval(() => {
      setTypedMessage(prev => prev + finalRoast.charAt(i));
      i++;
      if (i % 4 === 0) playClick();
      if (i >= finalRoast.length) clearInterval(interval);
    }, 40);
  };

  return (
    <div className="flex-grow flex flex-col items-center justify-center p-4 md:p-8 relative">
      <div className="w-full max-w-4xl text-center flex flex-col items-center">
        
        {/* Animated Heart / Skull */}
        <div className="mb-12 relative w-32 h-32 flex items-center justify-center">
          <AnimatePresence mode="popLayout">
            {(isGlitching && !forgiven) ? (
              <motion.div
                key="skull"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.5 }}
                className="text-neon-red"
              >
                <Skull size={100} />
              </motion.div>
            ) : (
              <motion.div
                key="heart"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className={forgiven ? "text-neon-purple" : "text-gray-500"}
              >
                <Heart size={100} fill={forgiven ? "#bf5af2" : "none"} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {!forgiven ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-display text-white">
              Official Apology Letter
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl font-terminal">
              Dear Abdullah, this website has roasted you relentlessly. You have been humiliated in front of your friends and the internet. 
              But perhaps... you aren't that bad. Just very weird.
            </p>
            
            <button 
              onClick={handleForgive}
              className="bg-gray-800 hover:bg-neon-red border-2 border-neon-red/50 text-white font-bold py-4 px-8 text-xl tracking-widest uppercase transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,45,85,0.8)]"
            >
              Okay Fine, Forgiven 🙄
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center bg-black/50 p-8 border border-neon-purple/30 rounded-xl"
          >
            <div className="flex justify-center mb-8">
              <AbdullahPhoto src="/abdullah1.jpeg" caption="Ajeeb But Apna Hai 🤍" rotation={0} />
            </div>

            <div className="text-xl md:text-2xl font-terminal text-green-400 max-w-3xl leading-relaxed min-h-[150px]">
              {typedMessage}
              {typedMessage.length < finalRoast.length && (
                <span className="animate-pulse inline-block w-3 h-6 bg-green-400 ml-1 mb-[-4px]"></span>
              )}
            </div>
            
            {typedMessage.length === finalRoast.length && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-8 text-gray-500 font-terminal text-sm"
              >
                End of Muhasiba &gt;
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
