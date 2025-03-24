import { PropsWithChildren } from 'react';
import { View, ViewProps } from 'react-native';
import { styles } from '~/components/Card/styles';

export const Card = ({ children, ...props }: PropsWithChildren & ViewProps) => {
  return (
    <View {...props} style={[props.style, styles.wrapper]}>
      {children}
    </View>
  );
};
