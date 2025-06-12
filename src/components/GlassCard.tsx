import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', hover = true }) => {
  return (
    <div
      className={`
        backdrop-blur-md bg-glass-white border border-glass-border rounded-xl
        shadow-lg shadow-electric-blue/10
        ${hover ? 'hover:bg-glass-white/20 hover:shadow-electric-blue/20 hover:scale-105' : ''}
        transition-all duration-300 ease-out
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default GlassCard;