import { SeasonsBackend } from '~/api/seasons/schema';

export const seasonMapper = {
  toFrontend: (seasons: SeasonsBackend) => {
    return seasons.data
      .map((season) => {
        const getSeasonName = () => {
          return `Season: ${season.id.split('-')[2]}`;
        };

        return {
          isCurrentSeason: season.attributes.isCurrentSeason,
          id: season.id,
          name: getSeasonName(),
        } as const;
      });
  },
};
