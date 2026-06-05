import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, ChevronRight } from 'lucide-react';
import HudBadge from '../ui/HudBadge';

const PHASE_VARIANTS = ['red','blue','gold','purple','green','orange'];

export default function FeaturedMovies({ movies }) {
  if (!movies?.length) return null;

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-orbitron font-bold text-2xl text-white">Featured Titles</h2>
          <p className="text-white/40 font-rajdhani text-sm mt-1 tracking-wider">HAND-PICKED BY THE SYSTEM</p>
        </div>
        <Link to="/watch-order" className="flex items-center gap-1 text-neon-red text-sm font-rajdhani font-semibold hover:gap-2 transition-all">
          View All <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {movies.map((movie, i) => (
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link to={`/movie/${movie.id}`}>
              <div className="glass rounded-xl overflow-hidden card-hover group">
                <div className="relative aspect-[2/3] overflow-hidden">
                  <img
                    src={movie.poster_url || `https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&q=80`}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <HudBadge variant={PHASE_VARIANTS[(movie.phase || 1) - 1]}>
                      Phase {movie.phase}
                    </HudBadge>
                  </div>
                  {movie.imdb_rating && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 rounded px-2 py-0.5">
                      <Star className="w-3 h-3 text-neon-gold fill-neon-gold" />
                      <span className="text-xs font-rajdhani text-white">{movie.imdb_rating}</span>
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="font-orbitron font-bold text-sm text-white leading-tight">{movie.title}</h3>
                    {movie.release_date && (
                      <p className="text-white/50 text-xs mt-1 font-rajdhani">
                        {new Date(movie.release_date).getFullYear()}
                      </p>
                    )}
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