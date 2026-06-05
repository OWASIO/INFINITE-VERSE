const movieData = [
  {
    id: 'iron-man',
    title: 'Iron Man',
    type: 'movie',
    phase: 1,
    chronological_order: 1,
    release_date: '2008-05-02',
    poster_url: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=600&q=80',
    backdrop_url: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1400&q=80',
    synopsis: 'Tony Stark builds the first Iron Man armor and launches the modern hero age.',
    duration_minutes: 126,
    imdb_rating: 7.9,
    director: 'Jon Favreau',
    cast_ids: ['robert-downey-jr', 'gwyneth-paltrow'],
    universe: 'Earth-616',
    tags: ['origin', 'avengers', 'technology'],
    is_featured: true,
  },
  {
    id: 'captain-america-first-avenger',
    title: 'Captain America: The First Avenger',
    type: 'movie',
    phase: 1,
    chronological_order: 2,
    release_date: '2011-07-22',
    poster_url: 'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?w=600&q=80',
    backdrop_url: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=1400&q=80',
    synopsis: 'Steve Rogers becomes the first super soldier and confronts Hydra during World War II.',
    duration_minutes: 124,
    imdb_rating: 6.9,
    director: 'Joe Johnston',
    cast_ids: ['chris-evans', 'hayley-atwell'],
    universe: 'Earth-616',
    tags: ['origin', 'hydra', 'shield'],
    is_featured: true,
  },
  {
    id: 'the-avengers',
    title: 'The Avengers',
    type: 'movie',
    phase: 1,
    chronological_order: 6,
    release_date: '2012-05-04',
    poster_url: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=600&q=80',
    backdrop_url: 'https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=1400&q=80',
    synopsis: 'Earths mightiest heroes assemble to stop Loki and the Chitauri invasion.',
    duration_minutes: 143,
    imdb_rating: 8.0,
    director: 'Joss Whedon',
    cast_ids: ['robert-downey-jr', 'chris-evans', 'scarlett-johansson'],
    universe: 'Earth-616',
    tags: ['team-up', 'loki', 'new-york'],
    is_featured: true,
  },
  {
    id: 'guardians-of-the-galaxy',
    title: 'Guardians of the Galaxy',
    type: 'movie',
    phase: 2,
    chronological_order: 10,
    release_date: '2014-08-01',
    poster_url: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600&q=80',
    backdrop_url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1400&q=80',
    synopsis: 'A band of cosmic outsiders forms a family while protecting an Infinity Stone.',
    duration_minutes: 121,
    imdb_rating: 8.0,
    director: 'James Gunn',
    cast_ids: ['chris-pratt', 'zoe-saldana'],
    universe: 'Earth-616',
    tags: ['cosmic', 'infinity-stone', 'found-family'],
    is_featured: true,
  },
  {
    id: 'black-panther',
    title: 'Black Panther',
    type: 'movie',
    phase: 3,
    chronological_order: 20,
    release_date: '2018-02-16',
    poster_url: 'https://images.unsplash.com/photo-1542623024-a797a755b8d0?w=600&q=80',
    backdrop_url: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1400&q=80',
    synopsis: 'TChalla returns to Wakanda and fights for the future of his kingdom.',
    duration_minutes: 134,
    imdb_rating: 7.3,
    director: 'Ryan Coogler',
    cast_ids: ['chadwick-boseman', 'danai-gurira'],
    universe: 'Earth-616',
    tags: ['wakanda', 'vibranium', 'king'],
    is_featured: true,
  },
  {
    id: 'avengers-infinity-war',
    title: 'Avengers: Infinity War',
    type: 'movie',
    phase: 3,
    chronological_order: 22,
    release_date: '2018-04-27',
    poster_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&q=80',
    backdrop_url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1400&q=80',
    synopsis: 'The Avengers and Guardians make a last stand as Thanos hunts the Infinity Stones.',
    duration_minutes: 149,
    imdb_rating: 8.4,
    director: 'Anthony Russo, Joe Russo',
    cast_ids: ['robert-downey-jr', 'chris-evans', 'zoe-saldana'],
    universe: 'Earth-616',
    tags: ['thanos', 'infinity-stones', 'snap'],
    is_featured: true,
  },
  {
    id: 'loki',
    title: 'Loki',
    type: 'series',
    phase: 4,
    chronological_order: 28,
    release_date: '2021-06-09',
    poster_url: 'https://images.unsplash.com/photo-1504333638930-c8787321eee0?w=600&q=80',
    backdrop_url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1400&q=80',
    synopsis: 'A Loki variant collides with the TVA and exposes the machinery of the multiverse.',
    duration_minutes: 300,
    imdb_rating: 8.2,
    director: 'Kate Herron',
    cast_ids: ['tom-hiddleston'],
    universe: 'TVA',
    tags: ['tva', 'variants', 'multiverse'],
    is_featured: true,
  },
  {
    id: 'doctor-strange-multiverse-madness',
    title: 'Doctor Strange in the Multiverse of Madness',
    type: 'movie',
    phase: 4,
    chronological_order: 32,
    release_date: '2022-05-06',
    poster_url: 'https://images.unsplash.com/photo-1501526029524-a8ea952b15be?w=600&q=80',
    backdrop_url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1400&q=80',
    synopsis: 'Doctor Strange crosses realities while the Scarlet Witch tears through the multiverse.',
    duration_minutes: 126,
    imdb_rating: 6.9,
    director: 'Sam Raimi',
    cast_ids: ['benedict-cumberbatch', 'elizabeth-olsen'],
    universe: 'Multiple',
    tags: ['multiverse', 'magic', 'incursion'],
    is_featured: true,
  },
];

const characterData = [
  {
    id: 'tony-stark',
    name: 'Tony Stark',
    alias: 'Iron Man',
    alignment: 'hero',
    bio: 'Genius inventor, Avenger, and architect of the modern armored hero era.',
    powers: ['Powered armor', 'Engineering genius', 'Strategic combat'],
    affiliations: ['Avengers', 'Stark Industries'],
    first_appearance: 'Iron Man',
    image_url: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=500&q=80',
    actor_id: 'robert-downey-jr',
    movie_appearances: ['Iron Man', 'The Avengers', 'Avengers: Infinity War'],
    universe: 'Earth-616',
    is_featured: true,
  },
  {
    id: 'steve-rogers',
    name: 'Steve Rogers',
    alias: 'Captain America',
    alignment: 'hero',
    bio: 'The first super soldier and the moral center of the Avengers.',
    powers: ['Super soldier serum', 'Shield mastery', 'Leadership'],
    affiliations: ['Avengers', 'S.H.I.E.L.D.'],
    first_appearance: 'Captain America: The First Avenger',
    image_url: 'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?w=500&q=80',
    actor_id: 'chris-evans',
    movie_appearances: ['The First Avenger', 'The Avengers', 'Endgame'],
    universe: 'Earth-616',
    is_featured: true,
  },
  {
    id: 'natasha-romanoff',
    name: 'Natasha Romanoff',
    alias: 'Black Widow',
    alignment: 'hero',
    bio: 'Master spy and founding Avenger with a long ledger and a sharper conscience.',
    powers: ['Espionage', 'Martial arts', 'Tactical infiltration'],
    affiliations: ['Avengers', 'S.H.I.E.L.D.'],
    first_appearance: 'Iron Man 2',
    image_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&q=80',
    actor_id: 'scarlett-johansson',
    movie_appearances: ['The Avengers', 'Black Widow', 'Endgame'],
    universe: 'Earth-616',
    is_featured: true,
  },
  {
    id: 'tchalla',
    name: 'TChalla',
    alias: 'Black Panther',
    alignment: 'hero',
    bio: 'King of Wakanda, protector of vibranium, and bearer of the Black Panther mantle.',
    powers: ['Enhanced agility', 'Vibranium suit', 'Royal strategy'],
    affiliations: ['Wakanda', 'Avengers'],
    first_appearance: 'Captain America: Civil War',
    image_url: 'https://images.unsplash.com/photo-1542623024-a797a755b8d0?w=500&q=80',
    actor_id: 'chadwick-boseman',
    movie_appearances: ['Black Panther', 'Infinity War', 'Endgame'],
    universe: 'Earth-616',
    is_featured: true,
  },
  {
    id: 'wanda-maximoff',
    name: 'Wanda Maximoff',
    alias: 'Scarlet Witch',
    alignment: 'anti-hero',
    bio: 'A reality-bending witch whose grief and power reshape worlds.',
    powers: ['Chaos magic', 'Telekinesis', 'Reality manipulation'],
    affiliations: ['Avengers'],
    first_appearance: 'Avengers: Age of Ultron',
    image_url: 'https://images.unsplash.com/photo-1501526029524-a8ea952b15be?w=500&q=80',
    actor_id: 'elizabeth-olsen',
    movie_appearances: ['WandaVision', 'Multiverse of Madness'],
    universe: 'Earth-616',
    is_featured: true,
  },
  {
    id: 'thanos',
    name: 'Thanos',
    alias: 'The Mad Titan',
    alignment: 'villain',
    bio: 'A cosmic warlord obsessed with balance and the Infinity Stones.',
    powers: ['Titan physiology', 'Command', 'Infinity Gauntlet'],
    affiliations: ['Black Order'],
    first_appearance: 'The Avengers',
    image_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500&q=80',
    actor_id: 'josh-brolin',
    movie_appearances: ['Infinity War', 'Endgame'],
    universe: 'Earth-616',
    is_featured: true,
  },
];

const actorData = [
  { id: 'robert-downey-jr', name: 'Robert Downey Jr.', photo_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80', birthplace: 'New York, USA', notable_roles: ['Tony Stark'] },
  { id: 'gwyneth-paltrow', name: 'Gwyneth Paltrow', photo_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80', birthplace: 'California, USA', notable_roles: ['Pepper Potts'] },
  { id: 'chris-evans', name: 'Chris Evans', photo_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80', birthplace: 'Massachusetts, USA', notable_roles: ['Steve Rogers'] },
  { id: 'hayley-atwell', name: 'Hayley Atwell', photo_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80', birthplace: 'London, UK', notable_roles: ['Peggy Carter'] },
  { id: 'scarlett-johansson', name: 'Scarlett Johansson', photo_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80', birthplace: 'New York, USA', notable_roles: ['Natasha Romanoff'] },
  { id: 'chris-pratt', name: 'Chris Pratt', photo_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80', birthplace: 'Virginia, USA', notable_roles: ['Peter Quill'] },
  { id: 'zoe-saldana', name: 'Zoe Saldana', photo_url: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80', birthplace: 'New Jersey, USA', notable_roles: ['Gamora'] },
  { id: 'chadwick-boseman', name: 'Chadwick Boseman', photo_url: 'https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?w=400&q=80', birthplace: 'South Carolina, USA', notable_roles: ['TChalla'] },
  { id: 'danai-gurira', name: 'Danai Gurira', photo_url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80', birthplace: 'Iowa, USA', notable_roles: ['Okoye'] },
  { id: 'tom-hiddleston', name: 'Tom Hiddleston', photo_url: 'https://images.unsplash.com/photo-1530268729831-4b0b9e170218?w=400&q=80', birthplace: 'London, UK', notable_roles: ['Loki'] },
  { id: 'benedict-cumberbatch', name: 'Benedict Cumberbatch', photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', birthplace: 'London, UK', notable_roles: ['Doctor Strange'] },
  { id: 'elizabeth-olsen', name: 'Elizabeth Olsen', photo_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80', birthplace: 'California, USA', notable_roles: ['Wanda Maximoff'] },
  { id: 'josh-brolin', name: 'Josh Brolin', photo_url: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=400&q=80', birthplace: 'California, USA', notable_roles: ['Thanos'] },
];

const releaseData = [
  { id: 'doomsday', title: 'Avengers: Doomsday', type: 'movie', release_date: '2026-12-18', description: 'The next major Avengers-level incursion event.', image_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500&q=80', is_published: true },
  { id: 'spider-man-brand-new-day', title: 'Spider-Man: Brand New Day', type: 'movie', release_date: '2026-07-31', description: 'A street-level reset with multiverse aftershocks.', image_url: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=500&q=80', is_published: true },
  { id: 'vision-quest', title: 'Vision Quest', type: 'series', release_date: '2026-08-15', description: 'A synthetic soul searches for identity.', image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80', is_published: true },
  { id: 'secret-wars', title: 'Avengers: Secret Wars', type: 'event', release_date: '2027-12-17', description: 'Multiversal collision on a cosmic scale.', image_url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=500&q=80', is_published: true },
];

const triviaQuestions = [
  { id: 'q1', category: 'mcu', difficulty: 'casual', question: 'Who built the first Iron Man suit?', options: ['Tony Stark', 'Bruce Banner', 'Nick Fury', 'Peter Parker'], correct_answer: 'Tony Stark' },
  { id: 'q2', category: 'mcu', difficulty: 'casual', question: 'What metal is central to Wakanda?', options: ['Adamantium', 'Vibranium', 'Uru', 'Palladium'], correct_answer: 'Vibranium' },
  { id: 'q3', category: 'characters', difficulty: 'casual', question: 'What is Steve Rogers superhero name?', options: ['Captain America', 'Hawkeye', 'Star-Lord', 'Vision'], correct_answer: 'Captain America' },
  { id: 'q4', category: 'characters', difficulty: 'hardcore', question: 'Which organization monitors branching timelines in Loki?', options: ['S.W.O.R.D.', 'TVA', 'Hydra', 'Damage Control'], correct_answer: 'TVA' },
  { id: 'q5', category: 'history', difficulty: 'hardcore', question: 'Which event erased half of all life?', options: ['The Blip', 'The Convergence', 'The Emergence', 'Battleworld'], correct_answer: 'The Blip' },
];

const delay = (value) => Promise.resolve(structuredClone(value));

function readStore(key, fallback) {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function writeStore(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
  return value;
}

function listItems(items, options = {}) {
  let result = [...items];
  const sort = options.sort;

  if (sort) {
    const desc = sort.startsWith('-');
    const field = desc ? sort.slice(1) : sort;
    result.sort((a, b) => {
      const av = a[field] ?? '';
      const bv = b[field] ?? '';
      return desc ? String(bv).localeCompare(String(av)) : String(av).localeCompare(String(bv));
    });
  }

  return delay(options.limit ? result.slice(0, options.limit) : result);
}

const localUser = {
  id: 'local-agent',
  full_name: 'Shakir',
  email: 'agent@infiniteverse.local',
  role: 'Admin',
};

const collection = (key) => ({
  list: () => delay(readStore(key, [])),
  create: (item) => {
    const items = readStore(key, []);
    const next = { id: `${key}-${Date.now()}`, ...item };
    writeStore(key, [next, ...items]);
    return delay(next);
  },
  update: (id, updates) => {
    const updated = readStore(key, []).map((item) => (item.id === id ? { ...item, ...updates } : item));
    writeStore(key, updated);
    return delay(updated.find((item) => item.id === id));
  },
  delete: (id) => {
    writeStore(key, readStore(key, []).filter((item) => item.id !== id));
    return delay(true);
  },
});

const watchStore = collection('iv_watchlist');
const favoriteStore = collection('iv_favorites');
const quizStore = collection('iv_quiz_sessions');

export const api = {
  auth: {
    me: () => delay(readStore('iv_user', localUser)),
    loginWithEmailPassword: (email) => delay(writeStore('iv_user', { ...localUser, email, full_name: email.split('@')[0] || 'Agent' })),
    loginWithProvider: () => delay(writeStore('iv_user', localUser)),
    register: ({ email }) => delay(writeStore('iv_user', { ...localUser, email, full_name: email.split('@')[0] || 'Agent' })),
    verifyOtp: () => delay({ access_token: 'local-token' }),
    setToken: () => undefined,
    resendOtp: () => delay(true),
    resetPasswordRequest: () => delay(true),
    resetPassword: () => delay(true),
    logout: () => {
      window.localStorage.removeItem('iv_user');
      return delay(true);
    },
  },
  movies: {
    list: (options = {}) => listItems(movieData, options.sort ? options : { sort: 'chronological_order', ...options }),
    getFeatured: (options = {}) => listItems(movieData.filter((movie) => movie.is_featured), options),
    getById: (id) => delay(movieData.filter((movie) => movie.id === id)),
  },
  characters: {
    list: (options = {}) => listItems(characterData, options),
    getById: (id) => delay(characterData.filter((character) => character.id === id)),
  },
  actors: {
    list: (options = {}) => listItems(actorData, options),
    getById: (id) => delay(actorData.filter((actor) => actor.id === id)),
  },
  releases: {
    getPublished: (options = {}) => listItems(releaseData.filter((release) => release.is_published !== false), options),
  },
  watchlist: {
    ...watchStore,
    add: watchStore.create,
    getByUser: (userId) => delay(readStore('iv_watchlist', []).filter((item) => item.user_id === userId)),
  },
  favorites: {
    ...favoriteStore,
    getByUser: (userId) => delay(readStore('iv_favorites', []).filter((item) => item.user_id === userId)),
  },
  trivia: {
    getQuestions: ({ category, difficulty, limit = 10 } = {}) => {
      const selected = triviaQuestions.filter((q) => (!category || q.category === category) && (!difficulty || q.difficulty === difficulty));
      const fallback = selected.length ? selected : triviaQuestions;
      return delay(fallback.slice(0, limit));
    },
  },
  quiz: {
    createSession: quizStore.create,
    getSessionsByUser: (userId) => delay(readStore('iv_quiz_sessions', []).filter((item) => item.user_id === userId)),
  },
};

export const movies = api.movies;
export const watchlist = api.watchlist;
export const auth = api.auth;
export const characters = api.characters;
