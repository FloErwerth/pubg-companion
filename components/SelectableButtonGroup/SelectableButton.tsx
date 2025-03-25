import { useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { Button } from '~/components/Button';
import { styles } from '~/components/SelectableButtonGroup/styles';
import { Text } from '~/components/Text';
import { colors } from '~/theme';

type SelectableButtonProps<T extends string> = {
  width?: number;
  value: T;
  onPress: (value: T) => void;
  isSelected?: boolean;
  disabled?: boolean;
};

export const SelectableButton = <T extends string>({
  isSelected = false,
  value,
  onPress,
  width,
  disabled,
}: SelectableButtonProps<T>) => {
  const handleSelection = useCallback(() => {
    if (isSelected) {
      return;
    }
    onPress(value);
  }, [isSelected, onPress, value]);

  const buttonTextStyle = useMemo(
    () => ({
      color: disabled ? colors.grey2 : isSelected ? colors.primary : colors.foreground,
    }),
    [disabled, isSelected]
  );

  const buttonStyle = useMemo(
    () => [
      styles.button,
      {
        backgroundColor: disabled ? colors.black : isSelected ? colors.white : colors.grey4,
      },
    ],
    [disabled, isSelected]
  );

  return (
    <View style={{ width }}>
      <Button disabled={disabled} style={buttonStyle} onPress={handleSelection}>
        <Text style={buttonTextStyle}>{value}</Text>
      </Button>
    </View>
  );
};
