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

export type SeasonsBackend = z.infer<typeof allSeasonsSchema>;
