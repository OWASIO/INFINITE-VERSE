import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, Film, Tv, BookOpen, Zap } from 'lucide-react';

import PageWrapper from '@/components/layout/PageWrapper';
import HudBadge from '@/components/ui/HudBadge';

import { api } from '@/api/client';

const TYPE_ICON = { movie: Film, series: Tv, comic: BookOpen, event: Zap };
const TYPE_VARIANT = { movie: 'red', series: 'blue', comic: 'gold', event: 'purple' };

export default function Releases() {
  const [releases, setReleases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadReleases();
  }, []);

  const loadReleases = async () => {
    try {
      const data = await api.releases.getPublished({
        limit: 50,
        sort: 'release_date',
      });

      setReleases(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const now = new Date();

  const filtered =
    filter === 'all'
      ? releases
      : releases.filter(r => r.type === filter);

  const upcoming = filtered
    .filter(r => new Date(r.release_date) >= now)
    .sort((a, b) => new Date(a.release_date) - new Date(b.release_date));

  const past = filtered
    .filter(r => new Date(r.release_date) < now)
    .sort((a, b) => new Date(b.release_date) - new Date(a.release_date));

  const ReleaseCard = ({ release, isPast }) => {
    const Icon = TYPE_ICON[release.type] || Zap;
    const date = new Date(release.release_date);
    const daysLeft = Math.ceil((date - now) / (1000 * 60 * 60 * 24));

    return (
      <div className={`glass rounded-xl flex gap-0 card-hover ${isPast ? 'opacity-60' : ''}`}>
        {release.image_url ? (
          <img
            src={release.image_url}
            alt={release.title}
            className="w-24 h-24 object-cover flex-shrink-0"
          />
        ) : (
          <div className="w-24 h-24 flex-shrink-0 glass-blue flex items-center justify-center">
            <Icon className="w-8 h-8 text-neon-blue/30" />
          </div>
        )}

        <div className="p-4 flex-1 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <HudBadge variant={TYPE_VARIANT[release.type] || 'blue'}>
              {release.type}
            </HudBadge>

            <h3 className="font-rajdhani font-bold text-white text-lg leading-tight">
              {release.title}
            </h3>

            {release.description && (
              <p className="text-white/40 text-xs font-inter line-clamp-1 mt-0.5">
                {release.description}
              </p>
            )}

            <p className="text-white/30 text-xs font-inter mt-1">
              {date.toLocaleDateString()}
            </p>
          </div>

          {!isPast ? (
            <div className="text-right flex-shrink-0">
              <div className="font-orbitron font-black text-2xl text-neon-blue">
                {daysLeft}
              </div>
              <div className="text-white/30 text-xs font-rajdhani">DAYS</div>
            </div>
          ) : (
            <div className="text-right flex-shrink-0">
              <div className="text-white/20 text-xs font-rajdhani tracking-wider">
                RELEASED
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <PageWrapper>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-orbitron font-bold text-3xl text-white mb-1">
            Release Calendar
          </h1>
          <p className="text-white/40 font-rajdhani tracking-wider">
            INCOMING TRANSMISSIONS
          </p>
        </div>
        <Bell className="w-6 h-6 text-neon-gold pulse-neon" />
      </div>

      {/* Filters */}
      <div className="glass rounded-xl p-4 mb-8 flex flex-wrap gap-2">
        {['all', 'movie', 'series', 'comic', 'event'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-xs font-rajdhani font-semibold tracking-wider capitalize ${
              filter === f
                ? 'bg-neon-red text-white'
                : 'text-white/40 hover:text-white bg-white/5'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40 text-neon-blue font-rajdhani tracking-widest animate-pulse">
          SCANNING TRANSMISSIONS...
        </div>
      ) : (
        <>
          {upcoming.length > 0 && (
            <section className="mb-10">
              <h2 className="font-orbitron font-bold text-xl text-white mb-4">
                Upcoming ({upcoming.length})
              </h2>

              <div className="space-y-3">
                {upcoming.map((r, i) => (
                  <motion.div
                    key={r.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <ReleaseCard release={r} isPast={false} />
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {past.length > 0 && (
            <section>
              <h2 className="font-orbitron font-bold text-xl text-white/50 mb-4">
                Past Releases
              </h2>

              <div className="space-y-3">
                {past.slice(0, 10).map((r, i) => (
                  <motion.div
                    key={r.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    <ReleaseCard release={r} isPast={true} />
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {!upcoming.length && !past.length && (
            <div className="text-center py-20 text-white/30 font-rajdhani tracking-widest">
              NO TRANSMISSIONS DETECTED
            </div>
          )}
        </>
      )}
    </PageWrapper>
  );
}