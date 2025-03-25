import { useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import { primaryStyles, secondaryStyles, styles } from '~/components/Button/styles';
import { ButtonProps } from '~/components/Button';

type RequiredButtonProps = Required<ButtonProps>;

export const sizeToPaddingMap: Record<RequiredButtonProps['size'], number> = {
  s: 4,
  m: 6,
  l: 8,
};

export const Button = ({ size = 'm', ...props }: ButtonProps) => {
  const padding = sizeToPaddingMap[size];

  const buttonStyles = useMemo(
    () => [styles.button, { padding, paddingBottom: padding + 2 }, props.style],
    [props.style, styles.button, padding]
  );

  return <TouchableOpacity {...props} style={buttonStyles} />;
};
export const PrimaryButton = (props: ButtonProps) => {
  return <Button {...props} style={[props.style, primaryStyles.button]} />;
};

export const SecondaryButton = (props: ButtonProps) => {
  return <Button {...props} style={[props.style, secondaryStyles.button]} />;
};
