import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search as SearchIcon, Film, Shield, User } from 'lucide-react';

import PageWrapper from '@/components/layout/PageWrapper';
import HudBadge from '@/components/ui/HudBadge';
import { api } from '@/api/client';

export default function Search() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length < 2) {
      setMovies([]);
      setCharacters([]);
      setActors([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);

      try {
        const [allMovies, allChars, allActors] = await Promise.all([
          api.movies.list({ limit: 200 }),
          api.characters.list({ limit: 200 }),
          api.actors.list({ limit: 100 }),
        ]);

        const q = query.toLowerCase();

        setMovies(
          allMovies.filter(m =>
            m.title?.toLowerCase().includes(q)
          ).slice(0, 6)
        );

        setCharacters(
          allChars.filter(c =>
            c.name?.toLowerCase().includes(q) ||
            c.alias?.toLowerCase().includes(q)
          ).slice(0, 6)
        );

        setActors(
          allActors.filter(a =>
            a.name?.toLowerCase().includes(q)
          ).slice(0, 4)
        );

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  const total = movies.length + characters.length + actors.length;

  return (
    <PageWrapper>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="font-orbitron font-bold text-3xl text-white mb-1">
            Intelligence Search
          </h1>
          <p className="text-white/40 font-rajdhani tracking-wider">
            SCAN ALL DATABASES
          </p>
        </div>

        {/* Search input */}
        <div className="relative mb-8">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neon-red/60" />

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies, characters, actors..."
            autoFocus
            className="w-full glass border border-white/10 focus:border-neon-red/40 rounded-xl pl-12 pr-4 py-4 text-white font-inter text-lg placeholder-white/20 focus:outline-none transition-all"
          />

          {loading && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-neon-blue border-t-transparent rounded-full animate-spin" />
          )}
        </div>

        {query.length >= 2 && !loading && total === 0 && (
          <div className="text-center py-20 text-white/30 font-rajdhani tracking-widest">
            NO RESULTS FOUND FOR "{query.toUpperCase()}"
          </div>
        )}

        {/* Movies */}
        {movies.length > 0 && (
          <section className="mb-8">
            <h2 className="flex items-center gap-2 font-orbitron font-bold text-sm text-neon-red mb-4 tracking-wider">
              <Film className="w-4 h-4" /> MOVIES & SHOWS ({movies.length})
            </h2>

            <div className="space-y-3">
              {movies.map((m, i) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link to={`/movie/${m.id}`}>
                    <div className="glass rounded-xl flex gap-3 p-3 hover:border-neon-red/20 transition-all card-hover">
                      {m.poster_url ? (
                        <img
                          src={m.poster_url}
                          alt={m.title}
                          className="w-10 h-14 rounded-lg object-cover flex-shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-14 rounded-lg glass-red flex items-center justify-center flex-shrink-0">
                          <Film className="w-4 h-4 text-neon-red/40" />
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <h3 className="font-rajdhani font-bold text-white truncate">
                          {m.title}
                        </h3>

                        <div className="flex items-center gap-2 mt-0.5">
                          {m.phase && (
                            <HudBadge variant="red">
                              Phase {m.phase}
                            </HudBadge>
                          )}

                          {m.release_date && (
                            <span className="text-white/30 text-xs font-inter">
                              {new Date(m.release_date).getFullYear()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Characters */}
        {characters.length > 0 && (
          <section className="mb-8">
            <h2 className="flex items-center gap-2 font-orbitron font-bold text-sm text-neon-blue mb-4 tracking-wider">
              <Shield className="w-4 h-4" /> CHARACTERS ({characters.length})
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {characters.map((c, i) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link to={`/character/${c.id}`}>
                    <div className="glass rounded-xl p-3 flex items-center gap-3 hover:border-neon-blue/20 transition-all card-hover">
                      {c.image_url ? (
                        <img
                          src={c.image_url}
                          alt={c.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full glass-blue flex items-center justify-center">
                          <Shield className="w-4 h-4 text-neon-blue/40" />
                        </div>
                      )}

                      <div className="min-w-0">
                        <h3 className="font-rajdhani font-bold text-white text-sm truncate">
                          {c.name}
                        </h3>
                        <p className="text-white/30 text-xs truncate">
                          {c.alignment}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Actors */}
        {actors.length > 0 && (
          <section>
            <h2 className="flex items-center gap-2 font-orbitron font-bold text-sm text-neon-gold mb-4 tracking-wider">
              <User className="w-4 h-4" /> ACTORS ({actors.length})
            </h2>

            <div className="grid grid-cols-2 gap-3">
              {actors.map((a, i) => (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="glass rounded-xl p-3 flex items-center gap-3">
                    {a.photo_url ? (
                      <img
                        src={a.photo_url}
                        alt={a.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                        <User className="w-4 h-4 text-white/20" />
                      </div>
                    )}

                    <div>
                      <h3 className="font-rajdhani font-bold text-white text-sm">
                        {a.name}
                      </h3>
                      {a.birthplace && (
                        <p className="text-white/30 text-xs">
                          {a.birthplace}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>
    </PageWrapper>
  );
}