import React from 'react';

interface GlowButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
}

const GlowButton: React.FC<GlowButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary',
  className = '' 
}) => {
  const baseClasses = `
    px-8 py-4 rounded-lg font-jetbrains font-medium text-sm
    transition-all duration-300 ease-out
    transform hover:scale-105 active:scale-95
    border
  `;

  const variantClasses = {
    primary: `
      bg-electric-blue text-cyber-dark border-electric-blue
      hover:bg-electric-blue/90 hover:shadow-lg hover:shadow-electric-blue/50
      active:bg-electric-blue/80
    `,
    secondary: `
      bg-transparent text-electric-blue border-electric-blue
      hover:bg-electric-blue/10 hover:shadow-lg hover:shadow-electric-blue/30
      active:bg-electric-blue/5
    `
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default GlowButton;