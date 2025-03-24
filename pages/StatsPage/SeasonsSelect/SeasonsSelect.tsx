import React from 'react';
import { SelectableSeason } from '~/pages/StatsPage/SeasonsSelect/SelectableSeason';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useAllSeasonsQuery } from '~/api/seasons';
import { ActivityIndicator } from 'react-native';

const flatListContainerStyle = { gap: 8 } as const;

type SeasonsSelectSheetContentProps = {
  onSelectSeason: () => void;
};

export const SeasonsSelectSheetContent = ({ onSelectSeason }: SeasonsSelectSheetContentProps) => {
  const { data, isLoading } = useAllSeasonsQuery();

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <BottomSheetFlatList
      numColumns={2}
      columnWrapperStyle={flatListContainerStyle}
      contentContainerStyle={flatListContainerStyle}
      renderItem={({ item: { name } }) => (
        <SelectableSeason onSelectSeason={onSelectSeason} season={name} date="20.03.2025" />
      )}
      data={data}
    />
  );
};
