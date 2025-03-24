import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Text } from '~/components/Text';
import { View } from 'react-native';
import { styles } from '~/components/BottomSheet/styles';
import { BottomSheetProps } from './types';

const defaultSnapPoints = ['95%'];

export const BottomSheet = ({
  children,
  snapPoints = defaultSnapPoints,
  title,
  ...props
}: BottomSheetProps) => {
  return (
    <BottomSheetModal
      backgroundStyle={styles.background}
      snapPoints={snapPoints}
      ref={props.reference}
      {...props}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.wrapper}>{children}</View>
    </BottomSheetModal>
  );
};
