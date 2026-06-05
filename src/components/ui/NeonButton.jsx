import React from 'react';

const variants = {
  solid: 'border-neon-red bg-neon-red text-white shadow-[0_0_24px_rgba(227,6,19,0.25)] hover:bg-red-600',
  red: 'border-neon-red/50 bg-neon-red/10 text-neon-red hover:bg-neon-red/20',
  blue: 'border-neon-blue/50 bg-neon-blue/10 text-neon-blue hover:bg-neon-blue/20',
  gold: 'border-neon-gold/50 bg-neon-gold/10 text-neon-gold hover:bg-neon-gold/20',
};

export default function NeonButton({ variant = 'red', className = '', type = 'button', children, ...props }) {
  return (
    <button
      type={type}
      className={`inline-flex min-h-10 items-center justify-center rounded-lg border px-4 py-2 font-rajdhani text-sm font-bold tracking-wider transition disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant] || variants.red} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
