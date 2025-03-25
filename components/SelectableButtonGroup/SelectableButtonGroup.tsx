import { useEffect, useMemo } from 'react';
import { Dimensions, View } from 'react-native';
import { gapBetweenItems, styles } from '~/components/SelectableButtonGroup/styles';
import { pagePadding } from '~/theme';
import {SelectableButton} from "~/components/SelectableButtonGroup/SelectableButton";

type SelectableButtonGroupProps<T> = {
  maxItemsInRow?: number;
  options: T[];
  disabledOptions?: T[];
  defaultValue: T;
  value: T;
  onSelectOption: (option: T) => void;
};
const width = Dimensions.get('screen').width;

export const SelectableButtonGroup = <T extends string>({
  options,
  value,
  onSelectOption,
  maxItemsInRow = 2,
  defaultValue,
  disabledOptions = [],
}: SelectableButtonGroupProps<T>) => {
  useEffect(() => {
    // check if the currently selected value is disabled
    if (disabledOptions.includes(value)) {
      onSelectOption(defaultValue);
    }
  }, [disabledOptions, value, defaultValue, onSelectOption]);

  const mappedOptions = useMemo(
    () =>
      options.map((option, index) => {

        const r = Math.floor(index / maxItemsInRow);
        const fullRows = Math.floor(options.length / maxItemsInRow);
        const numberOfItemsInRow = r < fullRows ? maxItemsInRow : options.length  - r * maxItemsInRow;
        const itemWidth =  (width - pagePadding * 2 - (numberOfItemsInRow - 1) * gapBetweenItems) / numberOfItemsInRow;


        return (
          <SelectableButton
            key={JSON.stringify(option) + index.toString()}
            disabled={disabledOptions.includes(option)}
            isSelected={value === option}
            value={option}
            onPress={onSelectOption}
            width={itemWidth}
          />
        );
      }),
    [options, disabledOptions, maxItemsInRow, value, onSelectOption]
  );

  return <View style={styles.wrapper}>{mappedOptions}</View>;
};
