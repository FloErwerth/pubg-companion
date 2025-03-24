import { PropsWithChildren } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { styles } from '~/components/ScreenView/styles';

export const ScreenView = ({ children }: PropsWithChildren) => {
  return (
    <SafeAreaView>
      <View style={styles.wrapper}>{children}</View>
    </SafeAreaView>
  );
};
