import { useQuery } from 'react-query';
import { LIFETIME_STATS_QUERY_KEY, SURVIVAL_MASTERY_QUERY_KEY } from '~/api/stats/constants';
import { survivalSchema } from '~/api/stats/schemas/survivalSchema';
import { useRequest } from '~/api/useRequest';
import { usePlayerStore } from '~/store/player';
import { useStatsStore } from '~/store/stats';

const getLifetimeURL = (id: string): `/${string}` => `/players/${id}/seasons/lifetime`;
const getSurvivalMasteryURL = (id: string): `/${string}` => `/players/${id}/survival_mastery`;

export const useLifetimeStatsQuery = () => {
  const { id } = usePlayerStore();
  const request = useRequest(getLifetimeURL(id));
  return useQuery({
    queryFn: async () => {
      const response = await request();

      if (response.ok) {
        return await response.json();
      }
    },
    queryKey: [LIFETIME_STATS_QUERY_KEY],
  });
};

export const useSurvivalStatsQuery = () => {
  const { id } = usePlayerStore();
  const {
    survivalStats: { setLevel, setTier, setXP, setTotalMatchesPlayed },
  } = useStatsStore();
  const request = useRequest(getSurvivalMasteryURL(id));

  return useQuery({
    queryFn: async () => {
      const response = await request();

      if (response.ok) {
        const json = await response.json();
        const survivalStats = survivalSchema.parse(json);
        if (!survivalStats.data.attributes) {
          return;
        }

        setLevel(survivalStats.data.attributes.level.toString());
        setTier(survivalStats.data.attributes.tier.toString());
        setXP(survivalStats.data.attributes.xp.toString());
        setTotalMatchesPlayed(survivalStats.data.attributes.level.toString());
      }
    },
    queryKey: [SURVIVAL_MASTERY_QUERY_KEY],
  });
};
