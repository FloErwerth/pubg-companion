import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type Season = { id: string; name: string; isCurrentSeason: boolean };

type StatsStore = {
  season: Season;
  seasonStats: {
    kd: string;
    setKd: (kd: string) => void;
    avgDmg: string;
    setAvgDmg: (avgDmg: string) => void;
  };
  survivalStats: {
    xp: string;
    setXP: (xp: string) => void;
    level: string;
    setLevel: (level: string) => void;
    tier: string;
    setTier: (tier: string) => void;
    totalMatchesPlayed: string;
    setTotalMatchesPlayed: (totalMatchesPlayed: string) => void;
  };
  setSeason: (season: Season) => void;
};

export const useStatsStore = create<StatsStore>()(
  persist(
    (set) => ({
      seasonStats: {
        kd: '2.85',
        setKd: (kd: string) =>
          set((current) => ({
            ...current,
            seasonStats: { ...current.seasonStats, kd },
          })),
        avgDmg: '300',
        setAvgDmg: (avgDmg: string) =>
          set((current) => ({
            ...current,
            seasonStats: { ...current.seasonStats, avgDmg },
          })),
      },
      survivalStats: {
        tier: '',
        setTier: (tier: string) =>
          set((current) => ({
            ...current,
            survivalStats: { ...current.survivalStats, tier },
          })),
        xp: '',
        setXP: (xp: string) =>
          set((current) => ({
            ...current,
            survivalStats: { ...current.survivalStats, xp },
          })),
        level: '',
        setLevel: (level: string) =>
          set((current) => ({
            ...current,
            survivalStats: { ...current.survivalStats, level },
          })),
        totalMatchesPlayed: '',
        setTotalMatchesPlayed: (totalMatchesPlayed: string) =>
          set((current) => ({
            ...current,
            survivalStats: { ...current.survivalStats, totalMatchesPlayed },
          })),
      },
      season: { id: 'undefined', name: '33', isCurrentSeason: true },
      setSeason: (season: Season) => set({ season }),
    }),
    { name: 'playerStore', storage: createJSONStorage(() => AsyncStorage) }
  )
);
