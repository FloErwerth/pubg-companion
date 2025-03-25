import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useCallback } from 'react';
import { View } from 'react-native';
import { styles } from '~/components/BottomSheet/styles';
import { SecondaryButton } from '~/components/Button';
import { Text } from '~/components/Text';
import { BottomSheetProps } from './types';

const defaultSnapPoints = ['95%'];

export const BottomSheet = ({
  children,
  snapPoints = defaultSnapPoints,
  title,
  ...props
}: BottomSheetProps) => {
  const handleClose = useCallback(() => {
    props.reference?.current?.close();
  }, [props.reference?.current?.close]);

  return (
    <BottomSheetModal
      backgroundStyle={styles.background}
      snapPoints={snapPoints}
      ref={props.reference}
      enablePanDownToClose={false}
      handleComponent={null}
      {...props}>
      <View style={styles.outerWrapper}>
        <Text style={styles.title}>{title}</Text>
        <SecondaryButton size="m" onPress={handleClose}>
          <Text style={styles.close}>Schließen</Text>
        </SecondaryButton>
      </View>
      <View style={styles.wrapper}>{children}</View>
    </BottomSheetModal>
  );
};
