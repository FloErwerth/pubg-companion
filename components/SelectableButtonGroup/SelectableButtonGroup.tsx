import { useMemo, useState } from 'react';
import { SelectableButton } from '~/components/SelectableButtonGroup/SelectableButton';
import { View } from 'react-native';
import { styles } from '~/components/SelectableButtonGroup/styles';

type SelectableButtonGroupProps<T extends string> = {
  options: T[];
  value: T;
  onSelectOption: (option: T) => void;
};

export const SelectableButtonGroup = <T extends string>({
  options,
  value,
  onSelectOption,
}: SelectableButtonGroupProps<T>) => {
  const mappedOptions = useMemo(
    () =>
      options.map((option) => (
        <SelectableButton
          key={option}
          isSelected={value === option}
          value={option}
          onPress={onSelectOption}
        />
      )),
    [value, options]
  );

  return <View style={styles.wrapper}>{mappedOptions}</View>;
};
