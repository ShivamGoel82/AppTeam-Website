import React, { useEffect, useRef, useCallback } from 'react';

const CodeRain: React.FC = () => {
  const containerRef  = useRef<HTMLDivElement>(null);
  const intervalRef   = useRef<number>();
  const dropsRef      = useRef<Set<HTMLElement>>(new Set());
  const timeoutsRef   = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());
  const pausedRef     = useRef(false);

  const createRainDrop = useCallback((x: number) => {
    const container = containerRef.current;
    if (!container) return;

    const drop = document.createElement('div');
    const codeChars = ['0', '1', '{', '}', '<', '>', '/', '\\'];
    drop.textContent = codeChars[Math.floor(Math.random() * codeChars.length)];
    
    const isMobile = window.innerWidth < 768;
    drop.className = `absolute font-mono pointer-events-none select-none ${
      isMobile 
        ? 'text-xs animate-code-rain-mobile' 
        : 'text-sm animate-code-rain'
    }`;
    
    drop.style.left = `${x}px`;
    drop.style.top = '-20px';
    drop.style.color = '#60A5FA';
    drop.style.opacity = isMobile ? '0.18' : '0.28';
    drop.style.textShadow = '0 0 8px rgba(59, 130, 246, 0.4)';
    drop.style.willChange = 'transform';
    
    container.appendChild(drop);
    dropsRef.current.add(drop);

    const tid = setTimeout(() => {
      if (container.contains(drop)) {
        container.removeChild(drop);
        dropsRef.current.delete(drop);
      }
      timeoutsRef.current.delete(tid);
    }, isMobile ? 8000 : 12000);
    timeoutsRef.current.add(tid);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;
    const isLowEnd = navigator.hardwareConcurrency <= 4;
    const columnWidth = isMobile ? 60 : 35;
    const columns = Math.floor(window.innerWidth / columnWidth);
    
    // Significantly reduce frequency for mobile and low-end devices
    const baseFrequency = isMobile ? 0.998 : 0.994;
    const frequency = isLowEnd ? baseFrequency + 0.003 : baseFrequency;
    const intervalTime = isMobile ? 800 : 400;

    intervalRef.current = window.setInterval(() => {
      // Skip entirely when tab hidden
      if (pausedRef.current) return;
      // Limit total drops for performance
      if (dropsRef.current.size > (isMobile ? 8 : 20)) return;

      for (let i = 0; i < columns; i++) {
        if (Math.random() > frequency) {
          createRainDrop(i * columnWidth);
        }
      }
    }, intervalTime);

    // Pause when tab not visible
    const handleVisibility = () => { pausedRef.current = document.hidden; };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      document.removeEventListener('visibilitychange', handleVisibility);
      // Clear all pending timeouts to prevent memory leaks
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current.clear();
      // Remove all DOM drops
      dropsRef.current.forEach(drop => {
        if (container.contains(drop)) container.removeChild(drop);
      });
      dropsRef.current.clear();
    };
  }, [createRainDrop]);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
      style={{ willChange: 'auto' }}
    />
  );
};

export default React.memo(CodeRain);