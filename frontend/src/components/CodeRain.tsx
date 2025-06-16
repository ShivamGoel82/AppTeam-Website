import React, { useEffect, useRef } from 'react';

const CodeRain: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const codeChars = [
      '0', '1', '{', '}', '<', '>', '/', '\\', '(', ')', '[', ']', 
      '=', '+', '-', '*', '&', '%', '$', '#', '@', '!', '?', ';', 
      ':', '.', ',', '|', '^', '~', '`', '"', "'", '_'
    ];
    
    const isMobile = window.innerWidth < 768;
    const columns = Math.floor(window.innerWidth / (isMobile ? 50 : 30));

    const createRainDrop = (x: number) => {
      const drop = document.createElement('div');
      const char = codeChars[Math.floor(Math.random() * codeChars.length)];
      drop.textContent = char;
      
      // Enhanced styling with better colors and effects
      const hue = Math.random() * 60 + 200; // Blue to purple range
      const opacity = Math.random() * 0.4 + 0.1;
      const size = Math.random() * 0.3 + 0.7;
      
      drop.className = `absolute font-mono pointer-events-none select-none transition-all duration-1000`;
      drop.style.cssText = `
        left: ${x * (isMobile ? 50 : 30)}px;
        top: -20px;
        color: hsla(${hue}, 70%, 60%, ${opacity});
        font-size: ${size}rem;
        text-shadow: 0 0 10px hsla(${hue}, 70%, 60%, ${opacity * 0.8});
        will-change: transform;
        animation: ${isMobile ? 'codeRainMobile' : 'codeRain'} ${
          isMobile ? '15s' : '20s'
        } linear infinite;
        animation-delay: ${Math.random() * 2}s;
      `;
      
      container.appendChild(drop);

      // Enhanced cleanup with fade out
      setTimeout(() => {
        if (container.contains(drop)) {
          drop.style.opacity = '0';
          drop.style.transform = 'scale(0.5)';
          setTimeout(() => {
            if (container.contains(drop)) {
              container.removeChild(drop);
            }
          }, 1000);
        }
      }, isMobile ? 15000 : 20000);
    };

    // Create occasional burst effects
    const createBurst = () => {
      const burstCount = isMobile ? 3 : 5;
      const startX = Math.floor(Math.random() * (columns - burstCount));
      
      for (let i = 0; i < burstCount; i++) {
        setTimeout(() => {
          createRainDrop(startX + i);
        }, i * 100);
      }
    };

    const interval = setInterval(() => {
      const frequency = isMobile ? 0.992 : 0.985;
      
      // Regular rain drops
      for (let i = 0; i < columns; i++) {
        if (Math.random() > frequency) {
          createRainDrop(i);
        }
      }
      
      // Occasional burst effect
      if (Math.random() > 0.98) {
        createBurst();
      }
    }, isMobile ? 500 : 300);

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