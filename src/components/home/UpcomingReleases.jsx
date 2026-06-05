import { motion } from 'framer-motion';
import { Calendar, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import HudBadge from '../ui/HudBadge';

/**
 * @param {{ releases?: Array<{ id?: string | number; release_date?: string; image_url?: string; title?: string; type?: string; }> }} [props]
 */
export default function UpcomingReleases({ releases } = {}) {
  // ✅ ensure safe array
  const safeReleases = Array.isArray(releases) ? releases : [];

  const now = Date.now();

  // ✅ sanitize + validate + sort safely
  const upcoming = safeReleases
    .map((r) => {
      const time = new Date(r?.release_date).getTime();
      return {
        ...r,
        time,
      };
    })
    .filter((r) => Number.isFinite(r.time) && r.time >= now)
    .sort((a, b) => a.time - b.time)
    .slice(0, 4);

  if (!upcoming.length) return null;

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-orbitron font-bold text-2xl text-white">
            Incoming Transmissions
          </h2>
          <p className="text-white/40 font-rajdhani text-sm mt-1 tracking-wider">
            UPCOMING RELEASES
          </p>
        </div>

        <Link
          to="/releases"
          className="flex items-center gap-1 text-neon-blue text-sm font-rajdhani font-semibold hover:gap-2 transition-all"
        >
          All Releases <Bell className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-3">
        {upcoming.map((r, i) => {
          const msLeft = r.time - now;
          const daysLeft = Math.max(
            0,
            Math.floor(msLeft / (1000 * 60 * 60 * 24))
          );

          return (
            <motion.div
              key={r.id ?? r.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-xl p-4 flex items-center gap-4 hover:border-neon-blue/30 transition-all"
            >
              {/* IMAGE */}
              {r.image_url ? (
                <img
                  src={r.image_url}
                  alt={r.title || 'Release'}
                  className="w-16 h-16 rounded-lg object-cover"
                />
              ) : (
                <div className="w-16 h-16 rounded-lg glass-blue flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-neon-blue/50" />
                </div>
              )}

              {/* INFO */}
              <div className="flex-1 min-w-0">
                <h3 className="font-rajdhani font-bold text-white text-lg truncate">
                  {r.title}
                </h3>

                <div className="flex items-center gap-2 mt-1">
                  <HudBadge variant="blue">{r.type || 'Unknown'}</HudBadge>

                  <span className="text-white/40 text-xs font-inter">
                    {new Date(r.time).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </div>

              {/* COUNTDOWN */}
              <div className="text-right">
                <div className="font-orbitron font-bold text-neon-blue text-xl">
                  {daysLeft}
                </div>
                <div className="text-white/40 text-xs font-rajdhani">
                  DAYS
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}