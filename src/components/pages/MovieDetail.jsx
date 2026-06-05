import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Clock, Calendar, Play, Heart, BookmarkPlus, ArrowLeft, User } from 'lucide-react';

import PageWrapper from '@/components/layout/PageWrapper';
import HudBadge from '@/components/ui/HudBadge';
import NeonButton from '@/components/ui/NeonButton';

// replace Base44 with your API client
import { api } from '@/api/client';

const PHASE_VARIANTS = ['red','blue','gold','purple','green','orange'];

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    loadMovie();
  }, [id]);

  const loadMovie = async () => {
    try {
      const [m] = await api.movies.getById(id);
      setMovie(m);

      if (m?.cast_ids?.length) {
        const actorResults = await Promise.all(
          m.cast_ids.map((aid) => api.actors.getById(aid))
        );
        setActors(actorResults.flat());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async () => {
    const user = await api.auth.me();
    if (!user || !movie || isFavorited) return;

    await api.favorites.create({
      user_id: user.id,
      item_id: movie.id,
      item_type: 'movie',
      item_title: movie.title,
      item_image: movie.poster_url,
    });

    setIsFavorited(true);
  };

  const addWatchlist = async () => {
    const user = await api.auth.me();
    if (!user || !movie) return;

    await api.watchlist.create({
      user_id: user.id,
      movie_id: movie.id,
      movie_title: movie.title,
      poster_url: movie.poster_url,
      status: 'to_watch',
      added_date: new Date().toISOString().split('T')[0],
    });
  };

  if (loading) return (
    <PageWrapper>
      <div className="flex items-center justify-center h-64 text-neon-blue font-rajdhani tracking-widest animate-pulse">
        LOADING TACTICAL DATA...
      </div>
    </PageWrapper>
  );

  if (!movie) return (
    <PageWrapper>
      <div className="text-center py-20 text-white/30 font-rajdhani tracking-widest">
        TITLE NOT FOUND IN DATABASE
      </div>
    </PageWrapper>
  );

  const phaseVariant = PHASE_VARIANTS[(movie.phase || 1) - 1];

  return (
    <PageWrapper>
      <Link to="/watch-order" className="inline-flex items-center gap-2 text-white/40 hover:text-white mb-6 transition-all font-rajdhani font-semibold tracking-wider text-sm">
        <ArrowLeft className="w-4 h-4" /> BACK TO WATCH ORDER
      </Link>

      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden mb-8">
        <div className="absolute inset-0">
          <img
            src={movie.backdrop_url || movie.poster_url || 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1200&q=80'}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </div>

        <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row gap-8">
          <div className="flex-shrink-0">
            <img
              src={movie.poster_url || 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=300&q=80'}
              alt={movie.title}
              className="w-48 rounded-xl shadow-2xl border border-white/10"
            />
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-3">
              <HudBadge variant={phaseVariant}>Phase {movie.phase}</HudBadge>
              {movie.type && <HudBadge variant="blue">{movie.type}</HudBadge>}
              {movie.universe && <HudBadge variant="gold">{movie.universe}</HudBadge>}
            </div>

            <h1 className="font-orbitron font-black text-4xl md:text-5xl text-white mb-4 leading-tight">
              {movie.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm font-rajdhani text-white/50">
              {movie.release_date && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(movie.release_date).toLocaleDateString()}
                </span>
              )}

              {movie.duration_minutes && (
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {movie.duration_minutes} min
                </span>
              )}

              {movie.imdb_rating && (
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-neon-gold fill-neon-gold" />
                  <span className="text-neon-gold font-bold">{movie.imdb_rating}</span>/10
                </span>
              )}

              {movie.director && <span>Dir. {movie.director}</span>}
            </div>

            {movie.synopsis && (
              <p className="text-white/70 font-inter leading-relaxed text-base mb-6 max-w-2xl">
                {movie.synopsis}
              </p>
            )}

            <div className="flex flex-wrap gap-3">
              {movie.youtube_trailer_id && (
                <a
                  href={`https://www.youtube.com/watch?v=${movie.youtube_trailer_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <NeonButton variant="solid" className="flex items-center gap-2">
                    <Play className="w-4 h-4" /> Watch Trailer
                  </NeonButton>
                </a>
              )}

              <NeonButton variant="red" onClick={toggleFavorite} className="flex items-center gap-2">
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-neon-red' : ''}`} />
                {isFavorited ? 'Favorited' : 'Favorite'}
              </NeonButton>

              <NeonButton variant="blue" onClick={addWatchlist} className="flex items-center gap-2">
                <BookmarkPlus className="w-4 h-4" /> Add to Watchlist
              </NeonButton>
            </div>
          </div>
        </div>
      </div>

      {/* Trailer */}
      {movie.youtube_trailer_id && (
        <div className="mb-8">
          <h2 className="font-orbitron font-bold text-xl text-white mb-4">
            Official Trailer
          </h2>

          <div className="relative aspect-video rounded-xl overflow-hidden glass">
            <iframe
              src={`https://www.youtube.com/embed/${movie.youtube_trailer_id}`}
              title="Trailer"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      )}

      {/* Cast */}
      {actors.length > 0 && (
        <div className="mb-8">
          <h2 className="font-orbitron font-bold text-xl text-white mb-4">Cast</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {actors.map(actor => (
              <div key={actor.id} className="glass rounded-xl p-4 flex flex-col items-center text-center card-hover">
                {actor.photo_url ? (
                  <img src={actor.photo_url} className="w-16 h-16 rounded-full mb-3" />
                ) : (
                  <div className="w-16 h-16 rounded-full glass-blue flex items-center justify-center mb-3">
                    <User className="w-7 h-7 text-neon-blue/50" />
                  </div>
                )}
                <h4 className="font-rajdhani font-bold text-white text-sm">{actor.name}</h4>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tags */}
      {movie.tags?.length > 0 && (
        <div>
          <h2 className="font-orbitron font-bold text-xl text-white mb-3">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {movie.tags.map(tag => (
              <HudBadge key={tag} variant="blue">{tag}</HudBadge>
            ))}
          </div>
        </div>
      )}
    </PageWrapper>
  );
}