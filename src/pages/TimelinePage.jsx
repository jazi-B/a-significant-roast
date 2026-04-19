import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { timelineEvents } from '../data/roastData';
import { Clock, AlertTriangle } from 'lucide-react';
import { useSoundEffects } from '../hooks/useSoundEffects';

export default function TimelinePage() {
  const { playBzzt } = useSoundEffects();

  return (
    <div className="flex-grow flex flex-col items-center p-4 md:p-8 relative">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-neon-red border-b-2 border-neon-red/50 pb-2 flex items-center gap-4">
        <Clock /> Abdullah Ki Kahaani <Clock />
      </h1>

      <p className="text-gray-400 max-w-2xl text-center mb-16 font-terminal">
        A documented history of tragedies, false excuses, and inexplicably terrible logical decisions.
      </p>

      <div className="relative w-full max-w-4xl mx-auto">
        {/* Center Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-800 -translate-x-1/2 rounded" />

        <div className="flex flex-col gap-12 w-full">
          {timelineEvents.map((event, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <div key={idx} className={`flex w-full ${isLeft ? 'justify-start' : 'justify-end'}`}>
                <motion.div
                  initial={{ opacity: 0, x: isLeft ? -50 : 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileHover={{ scale: 1.05 }}
                  onHoverStart={playBzzt}
                  className={`w-[45%] relative ${isLeft ? 'text-right' : 'text-left'}`}
                >
                  {/* Circle dot on the line */}
                  <div className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-4 border-black ${isLeft ? '-right-[calc(11.1%+3px)]' : '-left-[calc(11.1%+3px)]'} bg-neon-red shadow-[0_0_10px_rgba(255,45,85,0.6)] z-10 hidden md:block`} />
                  
                  <div className={`bg-gray-900 border border-gray-700 p-6 rounded-xl hover:border-neon-red hover:shadow-[0_0_20px_rgba(255,45,85,0.3)] transition-all cursor-crosshair group ${!isLeft ? 'ml-auto' : ''}`}>
                    <div className={`flex items-center gap-2 mb-2 ${isLeft ? 'justify-end' : 'justify-start'}`}>
                      <AlertTriangle size={16} className="text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="text-neon-purple font-bold font-mono tracking-widest">{event.date}</span>
                    </div>
                    <p className="font-terminal text-gray-300 md:text-lg">{event.text}</p>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
