import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    gap: 24,
  },
  innerWrapper: {
    gap: 16,
  },
  seasonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  seasonButton: {
    gap: 8,
  },
  cardWrapper: {
    flexDirection: 'row',
    gap: 16,
  },
  card: {
    flex: 1,
    gap: 8,
  },
  cardSubtitle: {
    fontSize: 16,
  },
  cardTitle: {
    fontSize: 24,
    fontFamily: 'Space-Grotesk-Bold',
  },
});
