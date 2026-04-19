import React from 'react';
import { motion } from 'framer-motion';

export default function CrimeTicker() {
  const newsItems = [
    "BREAKING: Abdullah ne aaj bhi call nahi uthaya 📵",
    "ALERT: Tbyt kharab report filed — 23rd time this month",
    "UPDATE: PUBG session confirmed at 2:30 AM post-tbyt claim",
    "FLASH: 7 saal ka data. 1 forgotten PIN. RIP 💀",
    "WARNING: Snooker plans initiated. Probability of attendance: 0%"
  ];

  const fullText = newsItems.join("  |  ") + "  |  " + newsItems.join("  |  ");

  return (
    <div className="w-full bg-neon-red text-black font-terminal py-1 overflow-hidden whitespace-nowrap flex border-b-2 border-black sticky top-0 z-[60]">
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        className="font-bold text-sm tracking-widest inline-block uppercase"
      >
        <span className="mr-8">{fullText}</span>
        <span className="mr-8">{fullText}</span>
      </motion.div>
    </div>
  );
}
