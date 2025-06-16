import React, { useEffect, useRef } from 'react';

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    const nodes: { 
      x: number; 
      y: number; 
      vx: number; 
      vy: number; 
      size: number;
      opacity: number;
      pulsePhase: number;
    }[] = [];
    
    const isMobile = window.innerWidth < 768;
    const nodeCount = isMobile ? 20 : 35;

    // Initialize nodes with enhanced properties
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * (isMobile ? 0.2 : 0.4),
        vy: (Math.random() - 0.5) * (isMobile ? 0.2 : 0.4),
        size: Math.random() * (isMobile ? 2 : 3) + 1,
        opacity: Math.random() * 0.5 + 0.3,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.01;
      
      // Clear with subtle trail effect for smoother animation
      ctx.fillStyle = 'rgba(11, 20, 38, 0.03)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      nodes.forEach((node, i) => {
        // Update position with smooth movement
        node.x += node.vx;
        node.y += node.vy;

        // Smooth bounce off edges
        if (node.x < 0 || node.x > canvas.width) {
          node.vx *= -0.8;
          node.x = Math.max(0, Math.min(canvas.width, node.x));
        }
        if (node.y < 0 || node.y > canvas.height) {
          node.vy *= -0.8;
          node.y = Math.max(0, Math.min(canvas.height, node.y));
        }

        // Update pulse phase for breathing effect
        node.pulsePhase += 0.02;
        const pulseMultiplier = 0.8 + 0.4 * Math.sin(node.pulsePhase);

        // Enhanced node rendering with gradient and glow
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.size * pulseMultiplier * 3
        );
        
        // Multi-color gradient based on position
        const hue = (node.x / canvas.width) * 60 + 200; // Blue to purple range
        gradient.addColorStop(0, `hsla(${hue}, 70%, 60%, ${node.opacity * pulseMultiplier})`);
        gradient.addColorStop(0.5, `hsla(${hue}, 70%, 50%, ${node.opacity * pulseMultiplier * 0.5})`);
        gradient.addColorStop(1, `hsla(${hue}, 70%, 40%, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size * pulseMultiplier * 2, 0, Math.PI * 2);
        ctx.fill();

        // Core node with enhanced glow
        ctx.fillStyle = `hsla(${hue}, 80%, 70%, ${node.opacity * pulseMultiplier})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size * pulseMultiplier, 0, Math.PI * 2);
        ctx.fill();

        // Draw enhanced connections
        nodes.slice(i + 1).forEach((otherNode) => {
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = isMobile ? 120 : 150;

          if (distance < maxDistance) {
            const connectionOpacity = (isMobile ? 0.15 : 0.2) * 
              (1 - distance / maxDistance) * 
              node.opacity * 
              otherNode.opacity;

            // Gradient connection line
            const lineGradient = ctx.createLinearGradient(
              node.x, node.y, otherNode.x, otherNode.y
            );
            
            const nodeHue = (node.x / canvas.width) * 60 + 200;
            const otherHue = (otherNode.x / canvas.width) * 60 + 200;
            
            lineGradient.addColorStop(0, `hsla(${nodeHue}, 70%, 60%, ${connectionOpacity})`);
            lineGradient.addColorStop(0.5, `hsla(${(nodeHue + otherHue) / 2}, 70%, 55%, ${connectionOpacity * 1.2})`);
            lineGradient.addColorStop(1, `hsla(${otherHue}, 70%, 60%, ${connectionOpacity})`);

            ctx.strokeStyle = lineGradient;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.stroke();

            // Add subtle glow to connection
            ctx.strokeStyle = `hsla(${(nodeHue + otherHue) / 2}, 70%, 70%, ${connectionOpacity * 0.3})`;
            ctx.lineWidth = 2;
            ctx.stroke();
          }
        });
      });

      // Add floating particles for extra ambiance
      if (Math.random() < 0.02) {
        const particle = {
          x: Math.random() * canvas.width,
          y: canvas.height + 10,
          vx: (Math.random() - 0.5) * 0.5,
          vy: -Math.random() * 2 - 1,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.3 + 0.1,
          pulsePhase: Math.random() * Math.PI * 2,
        };
        
        if (nodes.length < nodeCount + 5) {
          nodes.push(particle);
        }
      }

      // Remove particles that have moved off screen
      for (let i = nodes.length - 1; i >= nodeCount; i--) {
        if (nodes[i].y < -10 || nodes[i].opacity < 0.05) {
          nodes.splice(i, 1);
        } else {
          nodes[i].opacity *= 0.995; // Fade out particles
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};

export default AnimatedBackground;