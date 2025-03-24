import { useQuery } from 'react-query';
import { request } from '~/api/request';
import { useAuthenticationStore } from '~/store/player';
import { SEASONS_QUERY_KEY } from '~/api/seasons/constants';
import { allSeasonsSchema } from '~/api/seasons/schema';
import { seasonMapper } from '~/api/seasons/mapper';

const seasonsURL = '/seasons';

export const useAllSeasonsQuery = () => {
  const { id } = useAuthenticationStore();

  return useQuery({
    enabled: !!id,
    queryFn: async () => {
      const response = await request(seasonsURL);

      if (response.ok) {
        const seasonJson = await response.json();
        const parsedSeasons = allSeasonsSchema.parse(seasonJson);
        return seasonMapper.toFrontend(parsedSeasons);
      }
    },
    queryKey: [SEASONS_QUERY_KEY],
  });
};
