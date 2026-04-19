import React, { useEffect, useState } from 'react';

export default function CursorTrail() {
  const [trails, setTrails] = useState([]);

  useEffect(() => {
    let count = 0;
    const handleMouseMove = (e) => {
      count++;
      if (count % 2 !== 0) return; // Throttle slightly
      
      const newTrail = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };

      setTrails((prev) => [...prev.slice(-15), newTrail]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (trails.length === 0) return;
    const interval = setInterval(() => {
      setTrails((prev) => prev.slice(1));
    }, 50);
    return () => clearInterval(interval);
  }, [trails]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {trails.map((trail, index) => (
        <div
          key={trail.id}
          className="absolute w-2 h-2 bg-neon-red rounded-full"
          style={{
            left: trail.x - 4,
            top: trail.y - 4,
            opacity: index / trails.length,
            transform: `scale(${index / trails.length})`,
            transition: 'opacity 0.1s, transform 0.1s'
          }}
        />
      ))}
    </div>
  );
}
