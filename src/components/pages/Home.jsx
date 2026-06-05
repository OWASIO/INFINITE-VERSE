import { useEffect, useState } from 'react';
import { api } from '@/api/client';
import PageWrapper from '@/components/layout/PageWrapper';
import HeroSection from '@/components/home/HeroSection';
import FeaturedMovies from '@/components/home/FeaturedMovies';
import PhaseGrid from '@/components/home/PhaseGrid';
import UpcomingReleases from '@/components/home/UpcomingReleases';
import { motion } from 'framer-motion';
import { Cpu, Database, Activity } from 'lucide-react';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [releases, setReleases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.movies.getFeatured({ limit: 6, sort: '-release_date' }),
      api.releases.getPublished({ limit: 10, sort: 'release_date' }),
    ]).then(([m, r]) => {
      setMovies(m);
      setReleases(r);
      setLoading(false);
    });
  }, []);

  return (
    <PageWrapper>
      <HeroSection />

      {/* Status bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center gap-6 mb-10 px-4 py-3 glass rounded-xl border border-white/5"
      >
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-neon-red pulse-neon" />
          <span className="font-rajdhani font-semibold text-xs tracking-widest text-neon-red">JARVIS ONLINE</span>
        </div>
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-neon-blue pulse-neon" />
          <span className="font-rajdhani font-semibold text-xs tracking-widest text-neon-blue">DATABASE SYNCED</span>
        </div>
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-neon-gold pulse-neon" />
          <span className="font-rajdhani font-semibold text-xs tracking-widest text-neon-gold">ALL SYSTEMS GO</span>
        </div>
      </motion.div>

      <PhaseGrid />
      <FeaturedMovies movies={movies} />
      <UpcomingReleases releases={releases} />
    </PageWrapper>
  );
}