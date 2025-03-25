import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Text } from '~/components/Text';
import { View } from 'react-native';
import { styles } from '~/components/BottomSheet/styles';
import { BottomSheetProps } from './types';
import { SecondaryButton } from '~/components/Button';
import { useCallback } from 'react';

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
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 16,
        }}>
        <Text style={styles.title}>{title}</Text>
        <SecondaryButton size="m">
          <Text style={styles.close} onPress={handleClose}>
            Schließen
          </Text>
        </SecondaryButton>
      </View>
      <View style={styles.wrapper}>{children}</View>
    </BottomSheetModal>
  );
};
