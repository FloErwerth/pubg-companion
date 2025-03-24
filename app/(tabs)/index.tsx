import { View } from 'react-native';
import { Card } from '~/components/Card/Card';
import { ScreenView } from '~/components/ScreenView';
import { useAuthenticationStore } from '~/store/player';
import { PageHeader } from '~/elements/PageHeader';
import { Text } from '~/components/Text';
import { StatsPage } from '~/pages/StatsPage';

export default function Stats() {
  return <StatsPage />;
}
