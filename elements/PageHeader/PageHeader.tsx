import { Text } from '~/components/Text';
import { View } from 'react-native';
import { useAuthenticationStore } from '~/store/player';
import { styles } from '~/elements/PageHeader/styles';
import { Avatar } from '~/components/Avatar';

export const PageHeader = () => {
  const { steamName } = useAuthenticationStore();

  return (
    <View style={styles.wrapper}>
      <Avatar />
      <Text style={styles.name}>{steamName}</Text>
    </View>
  );
};
