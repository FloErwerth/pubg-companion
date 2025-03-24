import { ScreenView } from '~/components/ScreenView';
import { useAuthenticationStore } from '~/store/player';
import { Text } from '~/components/Text/Text';

export default function Profile() {
  const { id } = useAuthenticationStore();
  return (
    <ScreenView>
      <Text>Deine PUBG Account ID: {id}</Text>
    </ScreenView>
  );
}
