import { useQuery } from 'react-query';
import { SEASONS_QUERY_KEY } from '~/api/seasons/constants';
import { seasonMapper } from '~/api/seasons/mapper';
import { allSeasonsSchema, seasonStatsSchema } from '~/api/seasons/schema';
import { useRequest } from '~/api/useRequest';
import { usePlayerStore } from '~/store/player';
import { useStatsStore } from '~/store/stats';
import { calculators } from '~/api/seasons/calculators';

const seasonsURL = '/seasons' as const;
const getSeasonStatsUrl = (id: string, seasonId: string) =>
  `/players/${id}/seasons/${seasonId}` as const;

export const useAllSeasonsQuery = () => {
  const { id, platform } = usePlayerStore();
  const request = useRequest(seasonsURL);

  return useQuery({
    enabled: !!id,
    queryFn: async () => {
      const response = await request();

      if (response.ok) {
        const seasonJson = await response.json();
        const parsedSeasons = allSeasonsSchema.parse(seasonJson);
        const frontendSeasons = seasonMapper.toFrontend(parsedSeasons);
        const filteredFrontendSeasons = frontendSeasons.filter(({ id }) =>
          id.includes(platform.toLowerCase())
        );
        filteredFrontendSeasons.unshift({
          id: 'lifetime',
          name: 'Lifetime',
          isCurrentSeason: false,
        });
        return filteredFrontendSeasons;
      }
    },
    queryKey: [SEASONS_QUERY_KEY],
  });
};

export const useSeasonStatsQuery = () => {
  const { id } = usePlayerStore();
  const {
    season: { id: seasonId },
  } = useStatsStore();
  const request = useRequest(getSeasonStatsUrl(id, seasonId));

  return useQuery({
    enabled: !!id,
    queryFn: async () => {
      const response = await request();
      const seasonStatsJson = await response.json();
      const data = seasonStatsSchema.parse(seasonStatsJson);
      const kdAllSeasons = calculators.kdAllGameModes(data);
      console.log(kdAllSeasons);
      return data.data;
    },
  });
};
