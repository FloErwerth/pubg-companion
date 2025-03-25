import { StyleSheet } from 'react-native';
import { colors } from '~/theme';

export const gapBetweenItems = 4;

export const styles = StyleSheet.create({
  wrapper: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: gapBetweenItems,
  },
  disabled: {
    backgroundColor: colors.white,
  },
  button: {
    justifyContent: 'center',
  },
});
