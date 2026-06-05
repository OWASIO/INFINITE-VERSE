import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Filter, BookmarkPlus } from 'lucide-react';
import PageWrapper from '@/components/layout/PageWrapper';
import HudBadge from '@/components/ui/HudBadge';
import { movies, watchlist, auth } from '@/api/client';

const PHASE_COLORS = ['#E30613','#00BFFF','#FFD700','#B400FF','#00FFB4','#FF6400'];
const PHASE_VARIANTS = ['red','blue','gold','purple','green','orange'];

export default function WatchOrder() {
  const [moviesList, setMoviesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhase, setSelectedPhase] = useState(null);
  const [selectedType, setSelectedType] = useState('all');
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const p = searchParams.get('phase');
    if (p) setSelectedPhase(Number(p));
  }, [searchParams]);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const data = await movies.list();
        if (mounted) setMoviesList(data);
      } catch (err) {
        console.error("Failed to load movies:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => { mounted = false; };
  }, []);

  const filtered = moviesList.filter(m => {
    if (selectedPhase && m.phase !== selectedPhase) return false;
    if (selectedType !== 'all' && m.type !== selectedType) return false;
    return true;
  });

  const addToWatchlist = async (movie, e) => {
    e.preventDefault();

    try {
      const user = await auth.me();
      if (!user) return;

      await watchlist.add({
        user_id: user.id,
        movie_id: movie.id,
        movie_title: movie.title,
        poster_url: movie.poster_url,
        status: 'to_watch',
        added_date: new Date().toISOString().split('T')[0],
      });
    } catch (err) {
      console.error("Watchlist error:", err);
    }
  };

  return (
    <PageWrapper>
      <div className="mb-8">
        <h1 className="font-orbitron font-bold text-3xl text-white mb-1">
          Watch Order
        </h1>
        <p className="text-white/40 font-rajdhani tracking-wider">
          CHRONOLOGICAL MCU SEQUENCE — {filtered.length} TITLES
        </p>
      </div>

      {/* Filters */}
      <div className="glass rounded-xl p-4 mb-8 flex flex-wrap gap-3 items-center">
        <Filter className="w-4 h-4 text-neon-red" />

        <span className="text-white/50 font-rajdhani text-sm mr-2">
          PHASE:
        </span>

        <button
          onClick={() => setSelectedPhase(null)}
          className={`px-3 py-1 rounded text-xs font-rajdhani font-semibold tracking-wider transition-all ${
            !selectedPhase ? 'bg-neon-red text-white' : 'text-white/40'
          }`}
        >
          ALL
        </button>

        {[1,2,3,4,5,6].map(p => (
          <button
            key={p}
            onClick={() => setSelectedPhase(selectedPhase === p ? null : p)}
            className="px-3 py-1 rounded text-xs font-rajdhani font-semibold tracking-wider border border-white/10 text-white/40 hover:text-white"
            style={
              selectedPhase === p
                ? {
                    color: PHASE_COLORS[p-1],
                    borderColor: PHASE_COLORS[p-1],
                    background: PHASE_COLORS[p-1] + '20'
                  }
                : {}
            }
          >
            P{p}
          </button>
        ))}

        <span className="text-white/30 mx-1">|</span>

        {['all','movie','series','animated'].map(t => (
          <button
            key={t}
            onClick={() => setSelectedType(t)}
            className={`px-3 py-1 rounded text-xs font-rajdhani font-semibold tracking-wider ${
              selectedType === t
                ? 'text-neon-blue border border-neon-blue/50 bg-neon-blue/10'
                : 'text-white/40 hover:text-white'
            }`}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40 text-neon-blue font-rajdhani tracking-widest animate-pulse">
          SCANNING DATABASE...
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-white/30 font-rajdhani tracking-widest">
          NO TITLES FOUND IN SELECTED PARAMETERS
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((movie, i) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <Link to={`/movie/${movie.id}`}>
                <div className="glass rounded-xl overflow-hidden card-hover flex">

                  {/* Order */}
                  <div className="w-16 flex items-center justify-center glass-red">
                    <span className="font-orbitron font-black text-2xl text-neon-red/70">
                      {String(movie.chronological_order || i + 1).padStart(2,'0')}
                    </span>
                  </div>

                  {/* Poster */}
                  <div className="w-20 h-24 flex-shrink-0 overflow-hidden">
                    <img
                      src={movie.poster_url}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 p-4 flex items-center justify-between">
                    <div>
                      <div className="flex gap-2 mb-1">
                        <HudBadge variant={PHASE_VARIANTS[(movie.phase || 1) - 1]}>
                          Phase {movie.phase}
                        </HudBadge>
                        {movie.type && (
                          <HudBadge variant="blue">{movie.type}</HudBadge>
                        )}
                      </div>

                      <h3 className="font-rajdhani font-bold text-white text-xl">
                        {movie.title}
                      </h3>

                      <div className="flex gap-3 text-xs text-white/40 mt-1">
                        {movie.release_date && (
                          <span>
                            {new Date(movie.release_date).getFullYear()}
                          </span>
                        )}
                        {movie.imdb_rating && (
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-neon-gold fill-neon-gold" />
                            {movie.imdb_rating}
                          </span>
                        )}
                        {movie.duration_minutes && (
                          <span>{movie.duration_minutes}m</span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={(e) => addToWatchlist(movie, e)}
                      className="p-2 text-white/30 hover:text-neon-blue"
                    >
                      <BookmarkPlus className="w-5 h-5" />
                    </button>
                  </div>

                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </PageWrapper>
  );
}