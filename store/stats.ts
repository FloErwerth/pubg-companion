import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type Season = { name: string; isCurrentSeason: boolean };

type StatsStore = {
  kd: string;
  avgDmg: string;
  season: Season;
  setKD: (kd: string) => void;
  setAvgDmg: (avgDmg: string) => void;
  setSeason: (season: Season) => void;
};

export const useStatsStore = create<StatsStore>()(
  persist(
    (set) => ({
      kd: '2.85',
      avgDmg: '300',
      season: { name: '33', isCurrentSeason: true },
      setKD: (kd: string) => set({ kd }),
      setSeason: (season: Season) => set({ season }),
      setAvgDmg: (avgDmg: string) => set({ avgDmg }),
    }),
    { name: 'playerStore', storage: createJSONStorage(() => AsyncStorage) }
  )
);
