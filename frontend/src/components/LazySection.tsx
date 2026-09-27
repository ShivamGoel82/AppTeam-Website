import React, { useState, useEffect, useRef } from 'react';

interface LazySectionProps {
  children: React.ReactNode;
  minHeight?: string;
}

/**
 * LazySection defers mounting heavy below-the-fold components until they approach the viewport.
 * Uses a generous 350px rootMargin so sections are preloaded before the user reaches them.
 * Drastically reduces initial DOM size, main-thread parsing, and improves Mobile Lighthouse score.
 */
const LazySection: React.FC<LazySectionProps> = ({ children, minHeight = '250px' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '350px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} style={{ minHeight: isVisible ? undefined : minHeight }}>
      {isVisible ? children : null}
    </div>
  );
};

export default React.memo(LazySection);
