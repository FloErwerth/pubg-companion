import { View } from 'react-native';
import { styles } from '~/components/Stepper/styles';
import { PropsWithChildren } from 'react';

export const StepperPage = ({ children }: PropsWithChildren) => {
  return (
    <View style={styles.outerWrapper}>
      {children}
    </View>
  );
};
