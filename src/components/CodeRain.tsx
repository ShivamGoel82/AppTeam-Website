import React, { useEffect, useRef } from 'react';

const CodeRain: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const codeChars = ['0', '1', '{', '}', '<', '>', '/', '\\', '(', ')', '[', ']', '=', '+', '-', '*', '&', '%', '$', '#', '@'];
    const isMobile = window.innerWidth < 768;
    const columns = Math.floor(window.innerWidth / (isMobile ? 30 : 20));
    const drops: number[] = [];

    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    const createRainDrop = (x: number) => {
      const drop = document.createElement('div');
      drop.textContent = codeChars[Math.floor(Math.random() * codeChars.length)];
      drop.className = `absolute text-electric-blue font-jetbrains ${isMobile ? 'text-xs opacity-30' : 'text-sm opacity-60'} animate-code-rain`;
      drop.style.left = `${x * (isMobile ? 30 : 20)}px`;
      drop.style.top = '-20px';
      container.appendChild(drop);

      setTimeout(() => {
        if (container.contains(drop)) {
          container.removeChild(drop);
        }
      }, isMobile ? 15000 : 20000);
    };

    const interval = setInterval(() => {
      for (let i = 0; i < columns; i++) {
        if (Math.random() > (isMobile ? 0.995 : 0.98)) {
          createRainDrop(i);
        }
      }
    }, isMobile ? 200 : 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden"
    />
  );
};

export default CodeRain;