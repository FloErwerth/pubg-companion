import { Pen } from 'lucide-react-native';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';
import { playerApi } from '~/api/player';
import { BottomSheet } from '~/components/BottomSheet/BottomSheet';
import { useBottomSheetControls } from '~/components/BottomSheet/useBottomSheet';
import { Button } from '~/components/Button';
import { Card } from '~/components/Card';
import { ScreenView } from '~/components/ScreenView';
import { Text } from '~/components/Text';
import { PageHeader } from '~/elements/PageHeader';
import { SeasonsSelectSheetContent } from '~/pages/StatsPage/SeasonsSelect';
import { styles } from '~/pages/StatsPage/styles';
import { useStatsStore } from '~/store/stats';
import { colors } from '~/theme';

export const StatsPage = () => {
  const { t } = useTranslation();
  const { openSheet, closeSheet, bottomSheetRef } = useBottomSheetControls();

  const {
    seasonStats: { kd, avgDmg },
    season: { name, isCurrentSeason },
  } = useStatsStore();

  const seasonButtonText = useMemo(() => {
    if (isCurrentSeason) {
      return t('stats.currentSeason');
    }
    return name;
  }, [t, name, isCurrentSeason]);

  return (
    <>
      <ScreenView>
        <View style={styles.wrapper}>
          <PageHeader />
          <View style={styles.innerWrapper}>
            <Pressable onPress={openSheet}>
              <Card style={styles.seasonWrapper}>
                <View>
                  <Text>{t('stats.chosenSeason')}</Text>
                  <Text style={{ fontSize: 22 }}>{seasonButtonText}</Text>
                </View>
                <Pen color={colors.white} size="18" />
              </Card>
            </Pressable>

            <View style={styles.cardWrapper}>
              <Card style={styles.card}>
                <Text style={styles.cardSubtitle}>{t('stats.kd')}</Text>
                <Text style={styles.cardTitle}>{kd}</Text>
              </Card>
              <Card style={styles.card}>
                <Text>{t('stats.avgDmg')}</Text>
                <Text style={styles.cardTitle}>{avgDmg}</Text>
              </Card>
            </View>
          </View>
        </View>
        <Button
          onPress={() =>
            playerApi.searchForPlayer(
              'forli69',
              () => undefined,
              () => undefined
            )
          }>
          <Text>Nach Spieler suchen</Text>
        </Button>
      </ScreenView>
      <BottomSheet title="Season ändern" enableDynamicSizing={false} reference={bottomSheetRef}>
        <SeasonsSelectSheetContent onSelectSeason={closeSheet} />
      </BottomSheet>
    </>
  );
};
