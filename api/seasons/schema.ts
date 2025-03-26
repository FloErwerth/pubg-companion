import { z } from 'zod';

export const allSeasonsSchema = z.object({
  data: z.array(
    z.object({
      attributes: z.object({
        isCurrentSeason: z.boolean(),
      }),
      id: z.string(),
    })
  ),
});

const seasonStatsGamemodeSchema = z.object({
  boosts: z.number().optional(),
  dBNOs: z.number().optional(),
  dailyKills: z.number().optional(),
  damageDealt: z.number().optional(),
  days: z.number().optional(),
  dailyWins: z.number().optional(),
  headshotKills: z.number().optional(),
  heals: z.number().optional(),
  killPoints: z.number().optional(),
  kills: z.number().optional(),
  longestKill: z.number().optional(),
  longestTimeSurvived: z.number().optional(),
  losses: z.number().optional(),
  maxKillStreaks: z.number().optional(),
  mostSurvivalTime: z.number().optional(),
  rankPoints: z.number().optional(),
  rankPointsTitle: z.string().optional(),
  revives: z.number().optional(),
  rideDistance: z.number().optional(),
  roadKills: z.number().optional(),
  roundMostKills: z.number().optional(),
  roundsPlayed: z.number().optional(),
  suicides: z.number().optional(),
  swimDistance: z.number().optional(),
  teamKills: z.number().optional(),
  timeSurvived: z.number().optional(),
  top10s: z.number().optional(),
  vehicleDestroys: z.number().optional(),
  walkDistance: z.number().optional(),
  weaponsAcquired: z.number().optional(),
  weeklyKills: z.number().optional(),
  weeklyWins: z.number().optional(),
  winPoints: z.number().optional(),
  wins: z.number().optional(),
});

const seasonMatchSchema = z.object({
  data: z.array(
    z.object({
      type: z.string(),
      id: z.string(),
    })
  ),
});

export const seasonStatsSchema = z.object({
  data: z.object({
    attributes: z.object({
      gameModeStats: z.object({
        duo: seasonStatsGamemodeSchema,
        'duo-fpp': seasonStatsGamemodeSchema,
        solo: seasonStatsGamemodeSchema,
        'solo-fpp': seasonStatsGamemodeSchema,
        squad: seasonStatsGamemodeSchema,
        'squad-fpp': seasonStatsGamemodeSchema,
      }),
      relationships: z
        .object({
          matchesSolo: seasonMatchSchema,
          matchesSoloFPP: seasonMatchSchema,
          matchesDuo: seasonMatchSchema,
          matchesDuoFPP: seasonMatchSchema,
          matchesSquad: seasonMatchSchema,
          matchesSquadFPP: seasonMatchSchema,
        })
        .optional(),
    }),
  }),
});

export type SeasonsBackend = z.infer<typeof allSeasonsSchema>;
export type SeasonStats = z.infer<typeof seasonStatsSchema>;
