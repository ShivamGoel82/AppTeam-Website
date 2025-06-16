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
        backdrop-blur-sm bg-glass-white border border-glass-border rounded-xl
        shadow-lg shadow-neutral-200/20
        ${hover ? 'hover:bg-white/90 hover:shadow-neutral-300/30 hover:scale-[1.02]' : ''}
        transition-all duration-300 ease-out
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default GlassCard;