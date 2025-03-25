import { Text } from '~/components/Text';
import { View } from 'react-native';
import { usePlayerStore } from '~/store/player';
import { styles } from '~/elements/PageHeader/styles';
import { colors } from '~/theme';
import { useStatsStore } from '~/store/stats';

const NumberFormater = new Intl.NumberFormat('de-DE', { notation: 'compact' });

export const PageHeader = () => {
  const { steamName } = usePlayerStore();
  const {
    survivalStats: { level, xp, tier },
  } = useStatsStore();

  return (
    <View style={styles.wrapper}>
      <Text style={styles.name}>{steamName}</Text>
      {level && xp && tier && (
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Text>Level {level}</Text>
          <View style={{ backgroundColor: colors.grey5, width: 1 }} />
          <Text>Tier 3</Text>
          <View style={{ backgroundColor: colors.grey5, width: 1 }} />
          <Text>Total XP: {NumberFormater.format(parseFloat(xp))}</Text>
        </View>
      )}
    </View>
  );
};
