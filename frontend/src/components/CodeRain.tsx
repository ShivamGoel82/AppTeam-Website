import React, { useEffect, useRef } from 'react';

const CodeRain: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const codeChars = ['0', '1', '{', '}', '<', '>', '/', '\\', '(', ')', '[', ']', '=', '+', '-', '*', '&', '%', '$', '#', '@'];
    const isMobile = window.innerWidth < 768;
    const columns = Math.floor(window.innerWidth / (isMobile ? 40 : 25));

    const createRainDrop = (x: number) => {
      const drop = document.createElement('div');
      drop.textContent = codeChars[Math.floor(Math.random() * codeChars.length)];
      drop.className = `absolute text-accent-primary/20 font-mono pointer-events-none select-none ${
        isMobile 
          ? 'text-xs opacity-15 animate-code-rain-mobile' 
          : 'text-sm opacity-25 animate-code-rain'
      }`;
      drop.style.left = `${x * (isMobile ? 40 : 25)}px`;
      drop.style.top = '-20px';
      drop.style.willChange = 'transform';
      container.appendChild(drop);

      // Remove drop after animation
      setTimeout(() => {
        if (container.contains(drop)) {
          container.removeChild(drop);
        }
      }, isMobile ? 12000 : 18000);
    };

    const interval = setInterval(() => {
      const frequency = isMobile ? 0.994 : 0.988;
      
      for (let i = 0; i < columns; i++) {
        if (Math.random() > frequency) {
          createRainDrop(i);
        }
      }
    }, isMobile ? 400 : 200);

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