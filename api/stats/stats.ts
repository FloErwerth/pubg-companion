import { useQuery } from 'react-query';
import { request } from '~/api/request';
import { usePlayerStore } from '~/store/player';
import { LIFETIME_STATS_QUERY_KEY } from '~/api/stats/constants';

const getLifetimeURL = (id: string): `/${string}` => `/players/${id}/seasons/lifetime`;

export const useLifetimeStatsQuery = () => {
  const { id } = usePlayerStore();
  return useQuery({
    queryFn: async () => {
      const response = await request(getLifetimeURL(id));

      if (response.ok) {
        return await response.json();
      }
    },
    queryKey: [LIFETIME_STATS_QUERY_KEY],
  });
};
