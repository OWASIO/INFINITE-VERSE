import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Heart,
  BookmarkPlus,
  Trophy,
  Bookmark,
  Check,
  Trash2,
  LogOut
} from 'lucide-react';

import PageWrapper from '@/components/layout/PageWrapper';
import HudBadge from '@/components/ui/HudBadge';
import NeonButton from '@/components/ui/NeonButton';

import { api } from '@/api/client';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('watchlist');
  const [watchlist, setWatchlist] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [quizSessions, setQuizSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const u = await api.auth.me();
      setUser(u);

      if (!u) {
        setLoading(false);
        return;
      }

      const [wl, fav, qs] = await Promise.all([
        api.watchlist.getByUser(u.id),
        api.favorites.getByUser(u.id),
        api.quiz.getSessionsByUser(u.id),
      ]);

      setWatchlist(wl);
      setFavorites(fav);
      setQuizSessions(qs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleWatched = async (item) => {
    const newStatus = item.status === 'watched' ? 'to_watch' : 'watched';

    await api.watchlist.update(item.id, { status: newStatus });

    setWatchlist(prev =>
      prev.map(w => w.id === item.id ? { ...w, status: newStatus } : w)
    );
  };

  const removeFavorite = async (item) => {
    await api.favorites.delete(item.id);
    setFavorites(prev => prev.filter(f => f.id !== item.id));
  };

  const removeWatchlist = async (item) => {
    await api.watchlist.delete(item.id);
    setWatchlist(prev => prev.filter(w => w.id !== item.id));
  };

  const logout = async () => {
    await api.auth.logout();
    window.location.href = '/login';
  };

  const tabs = [
    { id: 'watchlist', label: 'Watchlist', icon: BookmarkPlus, count: watchlist.length },
    { id: 'favorites', label: 'Favorites', icon: Heart, count: favorites.length },
    { id: 'quiz', label: 'Quiz Scores', icon: Trophy, count: quizSessions.length },
  ];

  if (loading) return (
    <PageWrapper>
      <div className="text-center py-20 text-neon-blue font-rajdhani tracking-widest animate-pulse">
        LOADING PROFILE DATA...
      </div>
    </PageWrapper>
  );

  if (!user) return (
    <PageWrapper>
      <div className="text-center py-20">
        <User className="w-16 h-16 text-white/10 mx-auto mb-4" />
        <p className="font-rajdhani text-white/40 tracking-widest text-lg">
          NO AGENT IDENTIFIED
        </p>
        <p className="text-white/20 text-sm font-inter mt-2">
          Sign in to access your profile
        </p>
        <div className="mt-6">
          <NeonButton variant="solid" onClick={() => (window.location.href = '/login')}>
            LOGIN TO SYSTEM
          </NeonButton>
        </div>
      </div>
    </PageWrapper>
  );

  const bestScore = quizSessions.length
    ? Math.max(...quizSessions.map(s => s.percentage))
    : 0;

  const watchedCount = watchlist.filter(w => w.status === 'watched').length;

  return (
    <PageWrapper>
      {/* Profile header */}
      <div className="glass rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <div className="w-20 h-20 rounded-full glass-red flex items-center justify-center border-2 border-neon-red/40">
          <span className="font-orbitron font-black text-3xl text-neon-red">
            {user.full_name?.[0]?.toUpperCase() || 'A'}
          </span>
        </div>

        <div className="flex-1">
          <h1 className="font-orbitron font-bold text-2xl text-white">
            {user.full_name || 'Agent'}
          </h1>
          <p className="text-white/40 font-inter text-sm">{user.email}</p>

          <div className="flex flex-wrap gap-2 mt-3">
            <HudBadge variant="red">{user.role || 'User'}</HudBadge>
            {bestScore >= 90 && <HudBadge variant="gold">INFINITY GENIUS</HudBadge>}
          </div>
        </div>

        <div className="flex gap-6">
          {[
            { label: 'Watched', value: watchedCount },
            { label: 'Favorites', value: favorites.length },
            { label: 'Best Score', value: `${bestScore}%` },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div className="font-orbitron font-bold text-xl text-neon-red">
                {stat.value}
              </div>
              <div className="font-rajdhani text-white/30 text-xs tracking-wider uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={logout}
          className="p-2 rounded-lg text-white/30 hover:text-neon-red hover:bg-neon-red/10 transition-all"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 glass rounded-xl p-1 mb-6">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-rajdhani font-semibold tracking-wider transition-all ${
                activeTab === tab.id
                  ? 'bg-neon-red text-white'
                  : 'text-white/40 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="text-xs opacity-60">({tab.count})</span>
            </button>
          );
        })}
      </div>

      <>
          {/* Watchlist */}
          {activeTab === 'watchlist' && (
            <div className="space-y-3">
              {watchlist.length === 0 ? (
                <div className="text-center py-20 text-white/30 font-rajdhani tracking-widest">
                  WATCHLIST EMPTY — START ADDING TITLES
                </div>
              ) : watchlist.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <div className="glass rounded-xl flex items-center gap-4 p-4">
                    {item.poster_url ? (
                      <img
                        src={item.poster_url}
                        alt={item.movie_title}
                        className="w-12 h-16 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-12 h-16 rounded-lg glass flex items-center justify-center">
                        <Bookmark className="w-4 h-4 text-white/20" />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <h3 className="font-rajdhani font-bold text-white truncate">
                        {item.movie_title}
                      </h3>
                      <HudBadge variant={item.status === 'watched' ? 'green' : 'blue'}>
                        {item.status === 'watched' ? 'Watched' : 'To Watch'}
                      </HudBadge>
                    </div>

                    <div className="flex gap-2">
                      <button onClick={() => toggleWatched(item)}>
                        <Check className="w-4 h-4" />
                      </button>
                      <button onClick={() => removeWatchlist(item)}>
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Favorites */}
          {activeTab === 'favorites' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {favorites.length === 0 ? (
                <div className="col-span-full text-center py-20 text-white/30 font-rajdhani tracking-widest">
                  NO FAVORITES LOGGED
                </div>
              ) : favorites.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="glass rounded-xl overflow-hidden relative">
                    {item.item_image ? (
                      <img
                        src={item.item_image}
                        alt={item.item_title}
                        className="w-full aspect-[2/3] object-cover"
                      />
                    ) : (
                      <div className="aspect-[2/3] glass-red flex items-center justify-center">
                        <Heart className="w-10 h-10 text-neon-red/30" />
                      </div>
                    )}

                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="font-rajdhani font-bold text-white text-sm truncate">
                        {item.item_title}
                      </p>
                      <HudBadge variant="red">{item.item_type}</HudBadge>
                    </div>

                    <button onClick={() => removeFavorite(item)}>
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Quiz */}
          {activeTab === 'quiz' && (
            <div className="space-y-3">
              {quizSessions.length === 0 ? (
                <div className="text-center py-20 text-white/30 font-rajdhani tracking-widest">
                  NO QUIZ SESSIONS RECORDED
                </div>
              ) : quizSessions.map((session, i) => (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="glass rounded-xl p-4 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full glass-red flex items-center justify-center">
                      <span className="font-orbitron font-black text-neon-red">
                        {session.percentage}%
                      </span>
                    </div>

                    <div className="flex-1">
                      <HudBadge variant="red">{session.category}</HudBadge>
                      <p className="font-rajdhani font-bold text-white mt-1">
                        {session.score}/{session.total_questions}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
      </>
    </PageWrapper>
  );
}
