import React, { useEffect, useRef, useCallback } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  pulsePhase: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const nodesRef = useRef<Node[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const pausedRef = useRef(false);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    resizeCanvas();

    const isMobile = window.innerWidth < 768;
    const nodeCount = isMobile ? 18 : 32;

    // Initialize nodes with glowing properties
    if (nodesRef.current.length === 0) {
      const nodes: Node[] = [];
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * (isMobile ? 0.25 : 0.4),
          vy: (Math.random() - 0.5) * (isMobile ? 0.25 : 0.4),
          size: Math.random() * (isMobile ? 1.5 : 2.5) + 1.2,
          opacity: Math.random() * 0.4 + 0.35,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
      nodesRef.current = nodes;
    }

    let lastTime = 0;
    const targetFPS = isMobile ? 30 : 60;
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      if (pausedRef.current) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      if (currentTime - lastTime < frameInterval) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      lastTime = currentTime;

      // Subtle trail effect on pure black background
      ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const nodes = nodesRef.current;
      const particles = particlesRef.current;
      const maxDistance = isMobile ? 80 : 110;

      // 1. Draw and update nodes (subtle, delicate, non-glaring)
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        node.x += node.vx;
        node.y += node.vy;

        // Bounce off canvas edges
        if (node.x < 0 || node.x > canvas.width) {
          node.vx *= -1;
          node.x = Math.max(0, Math.min(canvas.width, node.x));
        }
        if (node.y < 0 || node.y > canvas.height) {
          node.vy *= -1;
          node.y = Math.max(0, Math.min(canvas.height, node.y));
        }

        // Gentle breathing pulse
        node.pulsePhase += 0.02;
        const pulse = 0.9 + 0.2 * Math.sin(node.pulsePhase);
        const currentSize = (isMobile ? 1.0 : 1.4) * pulse;

        // Clean, subtle node without glaring bright halo
        ctx.fillStyle = `rgba(96, 165, 250, ${node.opacity * pulse * 0.45})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentSize, 0, Math.PI * 2);
        ctx.fill();

        // 2. Draw hairline connections between nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineOpacity = (1 - dist / maxDistance) * (isMobile ? 0.06 : 0.10);

            ctx.strokeStyle = `rgba(96, 165, 250, ${lineOpacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }
      }

      // 3. Upward floating subtle ambient dust particles
      if (Math.random() < 0.02 && particles.length < (isMobile ? 5 : 10)) {
        particles.push({
          x: Math.random() * canvas.width,
          y: canvas.height + 10,
          vx: (Math.random() - 0.5) * 0.3,
          vy: -Math.random() * 1.0 - 0.4,
          size: Math.random() * 1.0 + 0.6,
          opacity: Math.random() * 0.2 + 0.1,
        });
      }

      for (let p = particles.length - 1; p >= 0; p--) {
        const pt = particles[p];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.opacity *= 0.995;

        if (pt.y < -10 || pt.opacity < 0.015) {
          particles.splice(p, 1);
        } else {
          ctx.fillStyle = `rgba(96, 165, 250, ${pt.opacity * 0.5})`;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    const handleVisibility = () => {
      pausedRef.current = document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const handleResize = () => {
      resizeCanvas();
      nodesRef.current.forEach((node) => {
        node.x = Math.min(node.x, canvas.width);
        node.y = Math.min(node.y, canvas.height);
      });
    };
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [resizeCanvas]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
      style={{
        background: 'transparent',
        willChange: 'transform',
        transform: 'translateZ(0)',
      }}
    />
  );
};

export default React.memo(AnimatedBackground);