import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Shield, Zap, BookOpen, User } from 'lucide-react';

import PageWrapper from '@/components/layout/PageWrapper';
import HudBadge from '@/components/ui/HudBadge';
import NeonButton from '@/components/ui/NeonButton';
import { api } from '@/api/client';

const ALIGN_VARIANT = {
  hero: 'blue',
  villain: 'red',
  'anti-hero': 'gold',
  neutral: 'green'
};

export default function CharacterDetail() {
  const { id } = useParams();

  const [character, setCharacter] = useState(null);
  const [actor, setActor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    loadCharacter();
  }, [id]);

  const loadCharacter = async () => {
    try {
      const [characterData] = await api.characters.getById(id);

      setCharacter(characterData);

      if (characterData?.actor_id) {
        const [actorData] = await api.actors.getById(characterData.actor_id);
        setActor(actorData);
      }
    } catch (error) {
      console.error('Failed to load character:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async () => {
    if (!character || isFavorited) return;

    try {
      const user = await api.auth.me();
      await api.favorites.create({
        user_id: user.id,
        item_id: character.id,
        item_type: 'character',
        item_title: character.name,
        item_image: character.image_url
      });

      setIsFavorited(true);
    } catch (error) {
      console.error('Failed to add favorite:', error);
    }
  };

  if (loading) {
    return (
      <PageWrapper>
        <div className="flex h-64 items-center justify-center font-rajdhani tracking-widest text-neon-blue animate-pulse">
          LOADING CHARACTER FILE...
        </div>
      </PageWrapper>
    );
  }

  if (!character) {
    return (
      <PageWrapper>
        <div className="py-20 text-center font-rajdhani tracking-widest text-white/30">
          CHARACTER NOT FOUND IN DATABASE
        </div>
      </PageWrapper>
    );
  }

  const alignVariant = ALIGN_VARIANT[character.alignment] || 'green';

  return (
    <PageWrapper>
      <Link to="/characters" className="mb-6 inline-flex items-center gap-2 font-rajdhani text-sm font-semibold tracking-wider text-white/40 transition hover:text-white">
        <ArrowLeft className="h-4 w-4" /> BACK TO CHARACTERS
      </Link>

      <div className="grid gap-8 lg:grid-cols-[320px,1fr]">
        <section className="glass overflow-hidden rounded-2xl">
          {character.image_url ? (
            <img src={character.image_url} alt={character.name} className="aspect-[3/4] w-full object-cover" />
          ) : (
            <div className="flex aspect-[3/4] items-center justify-center glass-blue">
              <Shield className="h-20 w-20 text-neon-blue/30" />
            </div>
          )}

          <div className="space-y-4 p-5">
            <div className="flex flex-wrap gap-2">
              <HudBadge variant={alignVariant}>{character.alignment}</HudBadge>
              <HudBadge variant="blue">{character.universe || 'Earth-616'}</HudBadge>
            </div>

            <NeonButton variant="red" onClick={toggleFavorite} className="w-full gap-2">
              <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
              {isFavorited ? 'Favorited' : 'Add Favorite'}
            </NeonButton>
          </div>
        </section>

        <section>
          <p className="mb-2 font-rajdhani text-sm font-semibold uppercase tracking-[0.28em] text-neon-red">
            Character File
          </p>
          <h1 className="mb-2 font-orbitron text-4xl font-black text-white md:text-5xl">
            {character.name}
          </h1>
          {character.alias && (
            <p className="mb-6 font-rajdhani text-xl font-semibold text-white/45">
              {character.alias}
            </p>
          )}

          <div className="glass mb-6 rounded-2xl p-6">
            <p className="font-inter leading-relaxed text-white/70">{character.bio}</p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="glass rounded-xl p-5">
              <h2 className="mb-4 flex items-center gap-2 font-orbitron text-lg font-bold text-white">
                <Zap className="h-5 w-5 text-neon-gold" /> Powers
              </h2>
              <div className="flex flex-wrap gap-2">
                {(character.powers || []).map((power) => (
                  <HudBadge key={power} variant="gold">{power}</HudBadge>
                ))}
              </div>
            </div>

            <div className="glass rounded-xl p-5">
              <h2 className="mb-4 flex items-center gap-2 font-orbitron text-lg font-bold text-white">
                <BookOpen className="h-5 w-5 text-neon-blue" /> Appearances
              </h2>
              <div className="space-y-2">
                {(character.movie_appearances || []).map((movie) => (
                  <div key={movie} className="font-rajdhani text-white/60">{movie}</div>
                ))}
              </div>
            </div>

            <div className="glass rounded-xl p-5">
              <h2 className="mb-4 flex items-center gap-2 font-orbitron text-lg font-bold text-white">
                <Shield className="h-5 w-5 text-neon-red" /> Affiliations
              </h2>
              <div className="flex flex-wrap gap-2">
                {(character.affiliations || []).map((group) => (
                  <HudBadge key={group} variant="red">{group}</HudBadge>
                ))}
              </div>
            </div>

            <div className="glass rounded-xl p-5">
              <h2 className="mb-4 flex items-center gap-2 font-orbitron text-lg font-bold text-white">
                <User className="h-5 w-5 text-neon-blue" /> Portrayed By
              </h2>
              {actor ? (
                <div className="flex items-center gap-3">
                  {actor.photo_url && <img src={actor.photo_url} alt={actor.name} className="h-12 w-12 rounded-full object-cover" />}
                  <div>
                    <div className="font-rajdhani text-lg font-bold text-white">{actor.name}</div>
                    {actor.birthplace && <div className="text-sm text-white/35">{actor.birthplace}</div>}
                  </div>
                </div>
              ) : (
                <p className="font-rajdhani text-white/40">No actor data available.</p>
              )}
            </div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}
