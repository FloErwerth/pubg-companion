import { useQuery } from 'react-query';
import { request } from '~/api/request';
import { usePlayerStore } from '~/store/player';
import { SEASONS_QUERY_KEY } from '~/api/seasons/constants';
import { allSeasonsSchema } from '~/api/seasons/schema';
import { seasonMapper } from '~/api/seasons/mapper';

const seasonsURL = '/seasons';

export const useAllSeasonsQuery = () => {
  const { id, platform } = usePlayerStore();

  return useQuery({
    enabled: !!id,
    queryFn: async () => {
      const response = await request(seasonsURL);

      if (response.ok) {
        const seasonJson = await response.json();
        const parsedSeasons = allSeasonsSchema.parse(seasonJson);
        const frontendSeasons =  seasonMapper.toFrontend(parsedSeasons);
        const filteredFrontendSeasons = frontendSeasons.filter(({ id }) => id.includes(platform.toLowerCase()));
        filteredFrontendSeasons.unshift({ id: "lifetime", name: "Lifetime", isCurrentSeason: false });
        return filteredFrontendSeasons;
      }
    },
    queryKey: [SEASONS_QUERY_KEY],
  });
};
