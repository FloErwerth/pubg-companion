import { SeasonsBackend } from '~/api/seasons/schema';

export const seasonMapper = {
  toFrontend: (seasons: SeasonsBackend) =>
    seasons.data.map((season) => {
      const getSeasonName = () => {
        if (season.id.includes('beta')) {
          return 'beta';
        }
        if (season.id.includes('pre')) {
          return `legacy-${season.id.split('-pre')[1]}`;
        }
        return season.id.split('-')[2];
      };

      return {
        name: getSeasonName(),
      } as const;
    }),
};
