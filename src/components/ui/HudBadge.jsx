import React from 'react';

const variants = {
  red: 'border-neon-red/40 bg-neon-red/10 text-neon-red',
  blue: 'border-neon-blue/40 bg-neon-blue/10 text-neon-blue',
  gold: 'border-neon-gold/40 bg-neon-gold/10 text-neon-gold',
  purple: 'border-purple-400/40 bg-purple-500/10 text-purple-300',
  green: 'border-emerald-400/40 bg-emerald-500/10 text-emerald-300',
  orange: 'border-orange-400/40 bg-orange-500/10 text-orange-300',
};

export default function HudBadge({ variant = 'red', children, className = '' }) {
  return (
    <span className={`inline-flex items-center rounded border px-2 py-0.5 font-rajdhani text-[10px] font-bold uppercase tracking-wider ${variants[variant] || variants.red} ${className}`}>
      {children}
    </span>
  );
}
