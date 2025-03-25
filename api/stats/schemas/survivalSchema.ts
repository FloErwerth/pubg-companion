import { z } from 'zod';

export const survivalSchema = z.object({
  data: z.object({
    attributes: z.object({
      xp: z.number(),
      tier: z.number(),
      level: z.number(),
      totalMatchesPlayed: z.number(),
    }),
  }),
});
