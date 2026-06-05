import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, Zap } from 'lucide-react';
import NeonButton from '../ui/NeonButton';

export default function HeroSection() {
  return (
    <div className="relative min-h-[85vh] flex items-center overflow-hidden rounded-2xl mb-12">
      {/* Background */}
      <div className="absolute inset-0 scanlines">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1600&q=80)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* HUD corners */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-neon-red/60" />
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-neon-blue/60" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-neon-blue/60" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-neon-red/60" />

      {/* Scan line */}
      <div className="absolute top-4 left-4 right-4 h-px bg-gradient-to-r from-transparent via-neon-red/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 px-8 md:px-16 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-neon-red pulse-neon" />
            <span className="text-neon-red font-rajdhani font-semibold text-sm tracking-[0.2em] uppercase">System Online</span>
          </div>

          <h1 className="font-orbitron font-black text-5xl md:text-7xl leading-none mb-4">
            <span className="text-white">THE</span><br />
            <span className="text-neon-red">MARVEL</span><br />
            <span className="text-neon-blue">UNIVERSE</span>
          </h1>

          <p className="text-white/60 font-inter text-lg mb-8 leading-relaxed">
            Your ultimate tactical guide to the MCU. Explore every film, character, timeline, and multiverse thread — all in one interface.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link to="/watch-order">
              <NeonButton variant="solid" className="flex items-center gap-2 px-6 py-3 text-base">
                <Play className="w-4 h-4" />
                Start Watch Order
              </NeonButton>
            </Link>
            <Link to="/characters">
              <NeonButton variant="blue" className="flex items-center gap-2 px-6 py-3 text-base">
                <Zap className="w-4 h-4" />
                Explore Characters
              </NeonButton>
            </Link>
          </div>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-12 flex gap-8"
        >
          {[
            { label: 'MCU Titles', value: '35+' },
            { label: 'Characters', value: '500+' },
            { label: 'Universes', value: 'Infinite' },
          ].map(stat => (
            <div key={stat.label}>
              <div className="font-orbitron font-bold text-2xl text-neon-red">{stat.value}</div>
              <div className="font-rajdhani text-white/40 text-sm tracking-wider uppercase">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
