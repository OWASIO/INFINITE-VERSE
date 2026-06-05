import React from 'react';
import { NavLink } from 'react-router-dom';
import { CalendarDays, Clapperboard, Home, Map, Search, Shield, Trophy, User } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/watch-order', label: 'Watch Order', icon: Clapperboard },
  { to: '/characters', label: 'Characters', icon: Shield },
  { to: '/multiverse', label: 'Multiverse', icon: Map },
  { to: '/quiz', label: 'Quiz', icon: Trophy },
  { to: '/search', label: 'Search', icon: Search },
  { to: '/releases', label: 'Releases', icon: CalendarDays },
  { to: '/profile', label: 'Profile', icon: User },
];

export default function PageWrapper({ children }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-white/5 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
          <NavLink to="/" className="flex items-center gap-3 flex-shrink-0">
            <img src="/icon.png" alt="" className="h-9 w-9" />
            <div>
              <div className="font-orbitron text-sm font-black tracking-[0.18em] text-white">INFINITE VERRRSE</div>
              <div className="font-rajdhani text-[10px] font-semibold tracking-[0.28em] text-neon-red">MCU DATABASE</div>
            </div>
          </NavLink>

          <nav className="ml-auto hidden items-center gap-1 lg:flex">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-rajdhani font-semibold tracking-wider transition ${
                    isActive ? 'bg-neon-red text-white' : 'text-white/45 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        <nav className="flex gap-1 overflow-x-auto border-t border-white/5 px-3 py-2 lg:hidden">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex min-w-max items-center gap-2 rounded-lg px-3 py-2 text-xs font-rajdhani font-semibold tracking-wider ${
                  isActive ? 'bg-neon-red text-white' : 'text-white/45'
                }`
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">{children}</main>
    </div>
  );
}
