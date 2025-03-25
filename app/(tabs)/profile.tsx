import { ScreenView } from '~/components/ScreenView';
import { usePlayerStore } from '~/store/player';
import { Text } from '~/components/Text/Text';
import {Button} from "~/components/Button";

export default function Profile() {
  const { id, setId } = usePlayerStore();
  return (
    <ScreenView>
      <Text>Deine PUBG Account ID: {id}</Text>
        <Button onPress={() => setId("")}><Text>Reset</Text></Button>
    </ScreenView>
  );
}
