import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { SelectableButtonGroup } from '~/components/SelectableButtonGroup/SelectableButtonGroup';
import { Text } from '~/components/Text';
import { Season, useStatsStore } from '~/store/stats';

type SeasonsSelectSheetContentProps = {
  onSelectSeason: () => void;
  data?: Season[];
  isLoading: boolean;
};

export const SeasonsSelectSheetContent = ({
  onSelectSeason,
  data,
  isLoading,
}: SeasonsSelectSheetContentProps) => {
  const { season, setSeason } = useStatsStore();

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  if (!data) {
    return <Text>Keine Seasons verfügbar</Text>;
  }

  const handleSetSeason = (name: string) => {
    const foundSeason = data.find((season) => season.name === name);

    if (!foundSeason) {
      return;
    }

    setSeason(foundSeason);
    onSelectSeason();
  };

  return (
    <BottomSheetScrollView contentContainerStyle={{ paddingBottom: '10%' }}>
      <SelectableButtonGroup
        defaultValue="lifetime"
        onSelectOption={handleSetSeason}
        value={season.name}
        maxItemsInRow={2}
        options={data.map((season) => season.name)}
      />
    </BottomSheetScrollView>
  );
};
