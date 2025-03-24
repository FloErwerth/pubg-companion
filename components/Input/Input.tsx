import { TextInput } from 'react-native';
import { ComponentProps } from 'react';

export const Input = (props: ComponentProps<typeof TextInput>) => {
  return <TextInput {...props} />;
};
