import { TextInput } from 'react-native';
import { ComponentProps } from 'react';
import {colors} from "~/theme";
import {styles} from "~/components/Input/styles";

export const Input = (props: ComponentProps<typeof TextInput>) => {
  return <TextInput style={styles.wrapper} placeholderTextColor={colors.grey} {...props} />;
};
