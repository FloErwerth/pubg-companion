import { request } from '~/api/request';
import { z } from 'zod';

const searchForPlayerSuccessSchema = z.object({
  data: z.array(z.object({ id: z.string() })),
});

export const playerApi = {
  searchForPlayer: async (name: string, onSuccess: (id: string) => void, onError: () => void) => {
    const response = await request(`/players?filter[playerNames]=${name}`);
    const json = await response.json();
    const player = searchForPlayerSuccessSchema.safeParse(json);

    if (player.success) {
      onSuccess(player.data.data[0].id);
      return;
    }

    onError();
  },
};
