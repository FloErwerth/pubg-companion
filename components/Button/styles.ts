import { StyleSheet } from 'react-native';
import { borderRadius, colors } from '~/theme';

export const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius,
  },
});

export const primaryStyles = StyleSheet.create({
  button: {
    ...styles.button,
    backgroundColor: colors.destructive,
  },
});

export const secondaryStyles = StyleSheet.create({
  button: {
    ...styles.button,
    backgroundColor: colors.grey5,
  },
});

export const underlineButton = StyleSheet.create({
  button: {
    ...styles.button,
    backgroundColor: colors.grey5,
  },
});
