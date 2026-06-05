import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const phases = [
  { num: 1, label: 'Phase 1', desc: 'Avengers Assembled', years: '2008–2012', variant: 'phase-1', count: 6 },
  { num: 2, label: 'Phase 2', desc: 'Expanding the Universe', years: '2013–2015', variant: 'phase-2', count: 6 },
  { num: 3, label: 'Phase 3', desc: 'Infinity Saga', years: '2016–2019', variant: 'phase-3', count: 11 },
  { num: 4, label: 'Phase 4', desc: 'The Multiverse Saga Begins', years: '2021–2022', variant: 'phase-4', count: 13 },
  { num: 5, label: 'Phase 5', desc: 'The Multiverse Expands', years: '2023–2024', variant: 'phase-5', count: 8 },
  { num: 6, label: 'Phase 6', desc: 'Secret Wars', years: '2025+', variant: 'phase-6', count: 5 },
];

export default function PhaseGrid() {
  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="font-orbitron font-bold text-2xl text-white">MCU Phases</h2>
        <p className="text-white/40 font-rajdhani text-sm mt-1 tracking-wider">SAGA TIMELINE OVERVIEW</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {phases.map((phase, i) => (
          <motion.div
            key={phase.num}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08 }}
          >
            <Link to={`/watch-order?phase=${phase.num}`}>
              <div className={`glass rounded-xl p-5 card-hover group cursor-pointer relative overflow-hidden`}>
                <div className={`absolute top-0 left-0 w-1 h-full ${phase.variant.replace('phase-', 'bg-neon-')} opacity-80`}
                  style={{
                    background: ['#E30613','#00BFFF','#FFD700','#B400FF','#00FFB4','#FF6400'][i]
                  }}
                />
                <div className="pl-2">
                  <div className={`font-orbitron font-black text-3xl mb-1`}
                    style={{ color: ['#E30613','#00BFFF','#FFD700','#B400FF','#00FFB4','#FF6400'][i] }}>
                    {String(phase.num).padStart(2, '0')}
                  </div>
                  <div className="font-rajdhani font-bold text-white text-lg">{phase.label}</div>
                  <div className="font-inter text-white/50 text-xs">{phase.desc}</div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-white/30 text-xs font-rajdhani tracking-wider">{phase.years}</span>
                    <span className="text-white/30 text-xs font-rajdhani">{phase.count} TITLES</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}