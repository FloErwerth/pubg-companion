import { TextInput } from 'react-native';
import { ComponentProps } from 'react';
import {colors} from "~/theme";

export const Input = (props: ComponentProps<typeof TextInput>) => {
  return <TextInput style={{fontSize: 16,color: colors.white, backgroundColor: colors.grey6, paddingHorizontal: 16, height: 44, borderRadius: 8}} placeholderTextColor={colors.grey} {...props} />;
};
