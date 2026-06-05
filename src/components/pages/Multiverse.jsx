import { motion } from 'framer-motion';
import PageWrapper from '@/components/layout/PageWrapper';
import { Link } from 'react-router-dom';
import { Atom, GitBranch, Globe, Zap, ArrowRight } from 'lucide-react';
import HudBadge from '@/components/ui/HudBadge';

const UNIVERSES = [
  { id: 'earth-616', name: 'Earth-616', label: 'Sacred Timeline', desc: 'The main MCU timeline. All primary MCU films occur here.', color: '#E30613', films: ['Iron Man', 'Captain America', 'The Avengers', 'Infinity War', 'Endgame'], phase: 'All Phases' },
  { id: 'earth-838', name: 'Earth-838', label: 'Illuminati Universe', desc: 'Home of the Illuminati. Doctor Strange 2 multiverse branch.', color: '#00BFFF', films: ['Doctor Strange in the Multiverse of Madness'], phase: 'Phase 4' },
  { id: 'earth-19999', name: 'Earth-19999', label: 'MCU Designation', desc: 'Official Marvel designation for the MCU prime universe.', color: '#FFD700', films: ['All MCU Films'], phase: 'All Phases' },
  { id: 'earth-TRN734', name: 'Earth-TRN734', label: 'What If Universe', desc: 'The animated multiverse explored in What If...?', color: '#B400FF', films: ['What If...? Season 1 & 2'], phase: 'Phase 4–5' },
  { id: 'void', name: 'The Void', label: 'End of Time', desc: 'Where the TVA prunes timelines. Home of Alioth and Kang variants.', color: '#00FFB4', films: ['Loki'], phase: 'Phase 4' },
  { id: 'dark-dimension', name: 'Dark Dimension', label: 'Dormammu\'s Realm', desc: 'The timeless dimension ruled by Dormammu.', color: '#FF6400', films: ['Doctor Strange'], phase: 'Phase 3' },
];

const EVENTS = [
  { year: '2008', event: 'Iron Man', universe: 'Earth-616', type: 'movie' },
  { year: '2012', event: 'Battle of New York', universe: 'Earth-616', type: 'event' },
  { year: '2016', event: 'Civil War / Sokovia Accords', universe: 'Earth-616', type: 'event' },
  { year: '2018', event: 'Thanos Snap', universe: 'Earth-616', type: 'event' },
  { year: '2023', event: 'The Blip Reversal', universe: 'Earth-616', type: 'event' },
  { year: '2023', event: 'TVA Nexus Event', universe: 'Multiple', type: 'multiverse' },
  { year: '2024', event: 'Multiverse Incursion', universe: 'Earth-838', type: 'multiverse' },
  { year: '2025', event: 'Secret Wars', universe: 'Multiple', type: 'multiverse' },
];

export default function Multiverse() {
  return (
    <PageWrapper>
      <div className="mb-8">
        <h1 className="font-orbitron font-bold text-3xl text-white mb-1">Multiverse Map</h1>
        <p className="text-white/40 font-rajdhani tracking-wider">QUANTUM REALM NAVIGATION SYSTEM</p>
      </div>

      {/* Universe Cards */}
      <section className="mb-12">
        <h2 className="font-orbitron font-bold text-xl text-white mb-5">Known Universes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {UNIVERSES.map((u, i) => (
            <motion.div
              key={u.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-xl p-6 card-hover relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-0.5" style={{ background: u.color }} />
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-5" style={{ background: u.color }} />
              
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="font-orbitron font-black text-xl mb-1" style={{ color: u.color }}>{u.name}</div>
                  <span className="text-xs font-rajdhani font-semibold tracking-widest text-white/40 uppercase">{u.label}</span>
                </div>
                <Globe className="w-5 h-5 text-white/20" />
              </div>
              
              <p className="text-white/60 font-inter text-sm leading-relaxed mb-4">{u.desc}</p>
              
              <div className="space-y-1">
                {u.films.slice(0, 3).map(f => (
                  <div key={f} className="flex items-center gap-2 text-sm">
                    <div className="w-1 h-1 rounded-full" style={{ background: u.color }} />
                    <span className="text-white/50 font-rajdhani">{f}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-white/30 text-xs font-rajdhani tracking-wider">{u.phase}</span>
                <Atom className="w-4 h-4" style={{ color: u.color }} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="mb-12">
        <h2 className="font-orbitron font-bold text-xl text-white mb-5">Sacred Timeline Events</h2>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-16 top-0 bottom-0 w-px bg-gradient-to-b from-neon-red via-neon-blue to-neon-gold opacity-30" />
          
          <div className="space-y-4">
            {EVENTS.map((ev, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className="flex items-center gap-4"
              >
                <div className="w-16 text-right flex-shrink-0">
                  <span className="font-orbitron font-bold text-xs text-neon-red">{ev.year}</span>
                </div>
                <div className={`w-3 h-3 rounded-full flex-shrink-0 relative z-10 ${
                  ev.type === 'multiverse' ? 'bg-neon-blue' : ev.type === 'event' ? 'bg-neon-gold' : 'bg-neon-red'
                }`}>
                  {ev.type === 'multiverse' && (
                    <div className="absolute inset-0 rounded-full bg-neon-blue animate-ping opacity-50" />
                  )}
                </div>
                <div className="glass rounded-lg px-4 py-3 flex-1 flex items-center justify-between">
                  <div>
                    <span className="font-rajdhani font-bold text-white">{ev.event}</span>
                    <span className="text-white/30 text-xs ml-2 font-inter">{ev.universe}</span>
                  </div>
                  {ev.type === 'multiverse' && (
                    <HudBadge variant="blue">MULTIVERSE</HudBadge>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Info cards */}
      <section>
        <h2 className="font-orbitron font-bold text-xl text-white mb-5">Multiverse Mechanics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="glass rounded-xl p-5 flex gap-4">
            <GitBranch className="w-6 h-6 mt-1 flex-shrink-0 text-neon-red" />
            <div>
              <h4 className="font-rajdhani font-bold text-white text-lg mb-1">Nexus Events</h4>
              <p className="text-white/50 font-inter text-sm leading-relaxed">Moments that create a new branch in the timeline. The TVA monitors and prunes these to maintain the Sacred Timeline.</p>
            </div>
          </div>
          <div className="glass rounded-xl p-5 flex gap-4">
            <Zap className="w-6 h-6 mt-1 flex-shrink-0 text-neon-blue" />
            <div>
              <h4 className="font-rajdhani font-bold text-white text-lg mb-1">Incursions</h4>
              <p className="text-white/50 font-inter text-sm leading-relaxed">When two universes collide due to a Nexus Event, causing the destruction of one or both realities.</p>
            </div>
          </div>
          <div className="glass rounded-xl p-5 flex gap-4">
            <Atom className="w-6 h-6 mt-1 flex-shrink-0 text-neon-gold" />
            <div>
              <h4 className="font-rajdhani font-bold text-white text-lg mb-1">Variants</h4>
              <p className="text-white/50 font-inter text-sm leading-relaxed">Alternate versions of the same person living in different timeline branches, each making different choices.</p>
            </div>
          </div>
          <div className="glass rounded-xl p-5 flex gap-4">
            <Globe className="w-6 h-6 mt-1 flex-shrink-0 text-purple-400" />
            <div>
              <h4 className="font-rajdhani font-bold text-white text-lg mb-1">The TVA</h4>
              <p className="text-white/50 font-inter text-sm leading-relaxed">Time Variance Authority. An organization that monitors the multiverse and controls temporal flow.</p>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}