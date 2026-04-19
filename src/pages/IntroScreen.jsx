import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function IntroScreen() {
  const [lines, setLines] = useState([]);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const terminalLines = [
    'Initializing "Digital Muhasiba" v2.0...',
    'Scanning WhatsApp history... 4991 messages found',
    'Missed calls by Abdullah: 0 | Missed calls TO Abdullah: 847',
    '"Tbyt nae sae yr" detected: 23 times',
    'PUBG sessions after "tbyt kharab": 23 times',
    'Excuse validity: 0.00%',
    'Case file ready. Launching...'
  ];

  useEffect(() => {
    let currentLine = 0;
    
    // Add lines progressively
    const lineInterval = setInterval(() => {
      if (currentLine < terminalLines.length) {
        setLines(prev => [...prev, terminalLines[currentLine]]);
        currentLine++;
      } else {
        clearInterval(lineInterval);
      }
    }, 400);

    // Progress bar simulation
    const progressInterval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return p + Math.floor(Math.random() * 15) + 5;
      });
    }, 200);

    // Redirect after completion
    const redirectTimer = setTimeout(() => {
      navigate('/muhasiba');
    }, 4500);

    return () => {
      clearInterval(lineInterval);
      clearInterval(progressInterval);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <div className="flex-grow flex flex-col items-center justify-center p-8 scanlines bg-black text-[#0f0]">
      <div className="w-full max-w-2xl text-left bg-black/50 p-6 border border-[#0f0]/30 rounded shadow-[0_0_15px_rgba(0,255,0,0.2)]">
        
        <div className="mb-6 min-h-[200px]">
          {lines.map((line, idx) => (
            <motion.p 
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-terminal text-lg mb-2"
            >
              $ {line}
            </motion.p>
          ))}
          {lines.length < terminalLines.length && (
            <span className="animate-pulse inline-block w-3 h-5 bg-[#0f0] ml-2 align-middle"></span>
          )}
        </div>

        <div className="mt-8">
          <div className="text-sm mb-2 flex justify-between">
            <span>SYSTEM OVERRIDE</span>
            <span>{Math.min(progress, 100)}%</span>
          </div>
          <div className="w-full h-4 border border-[#0f0] p-[2px]">
            <div 
              className="h-full bg-[#0f0] transition-all duration-200"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
