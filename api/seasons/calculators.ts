import { SeasonStats } from '~/api/seasons/schema';

export const calculators = {
  kdAllGameModes: (data: SeasonStats) => {
    const gameModes = Object.entries(data.data.attributes.gameModeStats);
    const stats = gameModes.reduce(
      (kdAllSeasons, [key, value]) => {
        if (!value || value.kills === undefined || value.losses === undefined) {
          return kdAllSeasons;
        }
        return {
          kills: kdAllSeasons.kills + value.kills,
          losses: kdAllSeasons.losses + value.losses,
        };
      },
      { kills: 0, losses: 0 }
    );

    return stats.kills / stats.losses;
  },
};
