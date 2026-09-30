import React from 'react';

interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'amber';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  glow?: boolean;
}

export const GlowButton: React.FC<GlowButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  glow = true,
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-3.5 py-1.5 text-xs rounded-full',
    md: 'px-5 py-2.5 text-sm rounded-full',
    lg: 'px-7 py-3 text-base rounded-full font-semibold',
  };

  const variantClasses = {
    primary: `bg-gradient-to-r from-purple-600 via-purple-500 to-fuchsia-500 text-white font-medium hover:brightness-110 active:scale-95 ${
      glow ? 'shadow-[0_0_20px_rgba(168,85,247,0.35)] hover:shadow-[0_0_30px_rgba(192,132,252,0.6)]' : ''
    }`,
    outline: `border border-purple-500/40 bg-purple-950/20 text-purple-100 hover:bg-purple-900/40 hover:border-purple-400 active:scale-95 ${
      glow ? 'hover:shadow-[0_0_20px_rgba(168,85,247,0.25)]' : ''
    }`,
    ghost: `bg-transparent text-purple-200 hover:text-white hover:bg-purple-900/30 active:scale-95`,
    amber: `bg-amber-500/20 border border-amber-500/40 text-amber-200 hover:bg-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.25)] active:scale-95`,
  };

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
