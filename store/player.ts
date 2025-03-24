import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type PlayerStore = {
  steamName: string;
  setSteamName: (name: string) => void;
  id: string;
  setId: (id: string) => void;
};

export const useAuthenticationStore = create<PlayerStore>()(
  persist(
    (set) => ({
      steamName: "",
      setSteamName: (name: string) => set({ steamName: name }),
      id: '',
      setId: (id: string) => set({ id }),
    }),
    { name: 'playerStore', storage: createJSONStorage(() => AsyncStorage) }
  )
);

export const useIsRegisteredPlayer = () => ({
  isRegisteredPlayer: useAuthenticationStore((state) => !!state.id),
});
