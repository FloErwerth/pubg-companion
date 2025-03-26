import { useRequest } from '~/api/useRequest';
import { z } from 'zod';

const searchForPlayerSuccessSchema = z.object({
  data: z.array(z.object({ id: z.string() })),
});

export const playerApi = {
  searchForPlayer: async (name: string, onSuccess: (id: string) => void, onError: () => void) => {
    const request = useRequest(`/players?filter[playerNames]=${name}`);
    const response = await request();
    const json = await response.json();
    const player = searchForPlayerSuccessSchema.safeParse(json);

    if (player.success) {
      onSuccess(player.data.data[0].id);
      return;
    }

    onError();
  },
};
