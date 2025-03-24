import { Text as RNText } from 'react-native';
import { ComponentProps } from 'react';
import { styles } from '~/components/Text/styles';

export const Text = ({ ...props }: ComponentProps<typeof RNText>) => {
  return <RNText {...props} style={[styles.text, props.style]} />;
};
