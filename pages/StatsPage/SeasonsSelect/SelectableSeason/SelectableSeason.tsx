import { Button } from '~/components/Button';
import { Text } from '~/components/Text';
import { colors } from '~/theme';

type SelectableSeasonProps = {
  season: string;
  date: string;
  onSelectSeason: () => void;
};

export const SelectableSeason = ({ season, date, onSelectSeason }: SelectableSeasonProps) => {
  return (
    <Button
      onPress={onSelectSeason}
      style={{
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'flex-start',
        flexDirection: 'column',
      }}>
      <Text style={{ fontSize: 18 }}>Season {season}</Text>
      <Text style={{ fontSize: 10, color: colors.grey2 }}>{date}</Text>
    </Button>
  );
};
