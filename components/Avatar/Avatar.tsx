import { View } from 'react-native';
import { Image } from 'expo-image';

export const Avatar = () => {
  return (
    <Image
      source={require('assets/images/pubg.png')}
      style={{ width: 108, height: 108, overflow: 'hidden', borderRadius: 1000 }}
    />
  );
};
