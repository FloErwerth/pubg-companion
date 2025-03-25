import { Button } from '~/components/Button';
import { useCallback, useMemo } from 'react';
import { Text } from '~/components/Text';
import { colors } from '~/theme';
import { styles } from '~/components/SelectableButtonGroup/styles';

type SelectableButtonProps<T extends string> = {
  value: T;
  onPress: (value: T) => void;
  isSelected?: boolean;
};

export const SelectableButton = <T extends string>({ isSelected = false, value, onPress }: SelectableButtonProps<T>) => {
  const handleSelection = useCallback(() => {
    if (isSelected) {
      return;
    }
    onPress(value);
  }, [isSelected, onPress, value]);

  const buttonTextStyle = useMemo(
    () => ({ color: isSelected ? colors.primary : colors.foreground }),
    [isSelected]
  );

  const buttonStyle = useMemo(
    () => [styles.button, { backgroundColor: isSelected ? colors.white : colors.grey4 }],
    [isSelected]
  );

  return (
    <Button style={buttonStyle} onPress={handleSelection}>
      <Text style={buttonTextStyle}>{value}</Text>
    </Button>
  );
};
