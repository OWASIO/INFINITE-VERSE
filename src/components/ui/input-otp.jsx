import React from 'react';

export function InputOTP({ value = '', onChange, maxLength = 6, className = '', ...props }) {
  return (
    <input
      value={value}
      maxLength={maxLength}
      onChange={(event) => onChange?.(event.target.value.replace(/\D/g, '').slice(0, maxLength))}
      className={`h-12 w-44 rounded-md border border-input bg-white/5 px-4 text-center font-orbitron text-xl tracking-[0.35em] text-white focus:outline-none focus:ring-2 focus:ring-ring/40 ${className}`}
      {...props}
    />
  );
}

export function InputOTPGroup({ children }) {
  return <div className="hidden">{children}</div>;
}

export function InputOTPSlot() {
  return null;
}
