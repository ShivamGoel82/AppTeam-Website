import React from 'react';

interface GlowButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
  disabled?: boolean;
}

const GlowButton: React.FC<GlowButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary',
  className = '',
  disabled = false
}) => {
  const baseClasses = `
    px-8 py-4 rounded-lg font-inter font-medium text-sm
    transition-all duration-300 ease-out
    transform hover:scale-105 active:scale-95
    border disabled:opacity-50 disabled:cursor-not-allowed
    disabled:hover:scale-100
  `;

  const variantClasses = {
    primary: `
      bg-accent-blue text-white border-accent-blue
      hover:bg-accent-blue/90 hover:shadow-lg hover:shadow-accent-blue/30
      active:bg-accent-blue/80 disabled:hover:bg-accent-blue
    `,
    secondary: `
      bg-transparent text-accent-blue border-accent-blue
      hover:bg-accent-blue/10 hover:shadow-lg hover:shadow-accent-blue/20
      active:bg-accent-blue/5 disabled:hover:bg-transparent
    `
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default GlowButton;