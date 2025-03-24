import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    gap: 32,
  },
  seasonWrapper: {
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
