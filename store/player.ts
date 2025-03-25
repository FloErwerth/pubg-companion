import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const Region = { EU: 'EU', NA: 'NA', OC: 'OC', SA: 'SA', AS: 'AS' } as const;
export const Platform = { PC: 'PC', XBOX: 'Xbox', PS: 'PlayStation' } as const;
export type RegionType = (typeof Region)[keyof typeof Region];
export type PlatformType = (typeof Platform)[keyof typeof Platform];

type PlayerStore = {
  steamName: string;
  setSteamName: (name: string) => void;
  id: string;
  setId: (id: string) => void;
  region: RegionType;
  setRegion: (region: RegionType) => void;
  platform: PlatformType;
  setPlatform: (platform: PlatformType) => void;
};

export const usePlayerStore = create<PlayerStore>()(
  persist(
    (set) => ({
      steamName: '',
      setSteamName: (name: string) => set({ steamName: name }),
      id: '',
      setId: (id: string) => set({ id }),
      region: Region.EU,
      setRegion: (region: RegionType) => set({ region: region }),
      platform: Platform.PC,
      setPlatform: (platform: PlatformType) => set({ platform: platform }),
    }),
    { name: 'playerStore', storage: createJSONStorage(() => AsyncStorage) }
  )
);

export const useIsRegisteredPlayer = () => ({
  isRegisteredPlayer: usePlayerStore((state) => !!state.id),
});
