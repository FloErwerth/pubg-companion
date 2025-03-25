import React from 'react';
import {ActivityIndicator, ScrollView} from 'react-native';
import { useAllSeasonsQuery } from '~/api/seasons';
import { SelectableButtonGroup } from '~/components/SelectableButtonGroup/SelectableButtonGroup';
import { Text } from '~/components/Text';
import { useStatsStore } from '~/store/stats';
import {BottomSheetScrollView} from "@gorhom/bottom-sheet";
import {useSafeAreaInsets} from "react-native-safe-area-context";

type SeasonsSelectSheetContentProps = {
  onSelectSeason: () => void;
};

export const SeasonsSelectSheetContent = ({ onSelectSeason }: SeasonsSelectSheetContentProps) => {
  const { data, isLoading } = useAllSeasonsQuery();
  const { season, setSeason } = useStatsStore();
  const { bottom } = useSafeAreaInsets()
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
    <BottomSheetScrollView contentContainerStyle={{paddingBottom: "10%"}}>
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
