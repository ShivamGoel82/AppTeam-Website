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
        backdrop-blur-xl bg-glass-white border border-glass-border rounded-xl
        shadow-lg shadow-accent-blue/5
        ${hover ? 'hover:bg-glass-white/8 hover:shadow-accent-blue/10 hover:scale-[1.02]' : ''}
        transition-all duration-300 ease-out
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default GlassCard;