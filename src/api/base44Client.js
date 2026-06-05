import { api } from './client';

export const base44 = {
  auth: api.auth,
  entities: {
    Movie: {
      list: (_sort, limit = 200) => api.movies.list({ limit }),
    },
    Character: {
      list: (_sort, limit = 200) => api.characters.list({ limit }),
    },
    Actor: {
      list: (_sort, limit = 200) => api.actors.list({ limit }),
    },
    ReleaseNotification: {
      list: (_sort, limit = 200) => api.releases.getPublished({ limit }),
    },
  },
};
