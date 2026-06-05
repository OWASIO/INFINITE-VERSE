import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { Search, Shield, Skull, Zap } from 'lucide-react';
import PageWrapper from '@/components/layout/PageWrapper';
import HudBadge from '@/components/ui/HudBadge';

const ALIGNMENT_COLORS = {
  hero: { variant: 'blue', icon: Shield },
  villain: { variant: 'red', icon: Skull },
  'anti-hero': { variant: 'gold', icon: Zap },
  neutral: { variant: 'green', icon: Zap },
};

export default function Characters() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    base44.entities.Character.list('name', 200).then(data => {
      setCharacters(data);
      setLoading(false);
    });
  }, []);

  const filtered = characters.filter(c => {
    const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.alias?.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || c.alignment === filter;
    return matchSearch && matchFilter;
  });

  return (
    <PageWrapper>
      <div className="mb-8">
        <h1 className="font-orbitron font-bold text-3xl text-white mb-1">Character Database</h1>
        <p className="text-white/40 font-rajdhani tracking-wider">SCANNING {characters.length} ENTITIES</p>
      </div>

      {/* Search & filter */}
      <div className="glass rounded-xl p-4 mb-8 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search characters..."
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white font-inter text-sm placeholder-white/30 focus:outline-none focus:border-neon-blue/50"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all','hero','villain','anti-hero','neutral'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-lg text-xs font-rajdhani font-semibold tracking-wider transition-all capitalize ${
                filter === f
                  ? f === 'all' ? 'bg-neon-red text-white' : f === 'hero' ? 'bg-neon-blue/20 border border-neon-blue/50 text-neon-blue' : f === 'villain' ? 'bg-neon-red/20 border border-neon-red/50 text-neon-red' : 'bg-neon-gold/20 border border-neon-gold/50 text-neon-gold'
                  : 'text-white/40 hover:text-white bg-white/5'
              }`}
            >{f}</button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40 text-neon-blue font-rajdhani tracking-widest animate-pulse">
          SCANNING DATABASE...
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-white/30 font-rajdhani tracking-widest">
          NO ENTITIES MATCHING SEARCH PARAMETERS
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map((char, i) => {
            const al = ALIGNMENT_COLORS[char.alignment] || ALIGNMENT_COLORS.neutral;
            const Icon = al.icon;
            return (
              <motion.div
                key={char.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03 }}
              >
                <Link to={`/character/${char.id}`}>
                  <div className="glass rounded-xl overflow-hidden card-hover group text-center">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      {char.image_url ? (
                        <img
                          src={char.image_url}
                          alt={char.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full glass flex items-center justify-center">
                          <Icon className="w-12 h-12 text-white/10" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="font-rajdhani font-bold text-white text-sm leading-tight">{char.name}</h3>
                        {char.alias && <p className="text-white/50 text-xs">{char.alias}</p>}
                      </div>
                      <div className="absolute top-2 right-2">
                        <HudBadge variant={al.variant}>{char.alignment}</HudBadge>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}
    </PageWrapper>
  );
}