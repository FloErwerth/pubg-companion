import { ComponentProps } from 'react';
import { TouchableOpacity } from 'react-native';

type ButtonSizeProp = { size?: 's' | 'm' | 'l' };

export type ButtonProps = ComponentProps<typeof TouchableOpacity> & ButtonSizeProp;
