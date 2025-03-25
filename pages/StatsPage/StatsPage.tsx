import {TouchableWithoutFeedback, View} from 'react-native';
import { PageHeader } from '~/elements/PageHeader';
import { Card } from '~/components/Card';
import { Text } from '~/components/Text';
import { ScreenView } from '~/components/ScreenView';
import { styles } from '~/pages/StatsPage/styles';
import { useTranslation } from 'react-i18next';
import React, { useMemo } from 'react';
import { Button, SecondaryButton } from '~/components/Button';
import { Pen } from 'lucide-react-native';
import { colors } from '~/theme';
import { useBottomSheetControls } from '~/components/BottomSheet/useBottomSheet';
import { useStatsStore } from '~/store/stats';
import { SeasonsSelectSheetContent } from '~/pages/StatsPage/SeasonsSelect';
import { BottomSheet } from '~/components/BottomSheet/BottomSheet';
import { playerApi } from '~/api/player';

export const StatsPage = () => {
  const { t } = useTranslation();
  const { openSheet, closeSheet, bottomSheetRef } = useBottomSheetControls();

  const {
    kd,
    avgDmg,
    season: { name, isCurrentSeason },
  } = useStatsStore();

  const seasonButtonText = useMemo(() => {
    if (isCurrentSeason) {
      return t('stats.currentSeason');
    }
    return name;
  }, [name, isCurrentSeason]);

  return (
    <>
      <ScreenView>
        <View style={styles.wrapper}>
          <PageHeader />
          <View style={styles.innerWrapper}>
            <TouchableWithoutFeedback onPress={openSheet}>
              <Card style={styles.seasonWrapper}>
                <View>
                  <Text>{t('stats.chosenSeason')}</Text>
                  <Text style={{fontSize: 22}}>{seasonButtonText}</Text>
                </View>
                <Pen color={colors.white} size="18" />
              </Card>
            </TouchableWithoutFeedback>

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
