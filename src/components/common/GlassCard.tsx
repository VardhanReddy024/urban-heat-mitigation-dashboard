import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
  glow?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  hoverEffect = false,
  onClick,
  glow = false
}) => {
  return (
    <div
      onClick={onClick}
      className={`glass-card rounded-2xl p-6 ${hoverEffect ? 'glass-card-hover cursor-pointer' : ''} ${
        glow ? 'border-[#FF7A00]/40 shadow-[0_0_20px_rgba(255,122,0,0.15)]' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
