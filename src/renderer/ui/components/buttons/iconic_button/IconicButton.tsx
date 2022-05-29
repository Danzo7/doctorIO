import colors from '@assets/styles/color';
import { FunctionComponent, ReactNode, SVGProps } from 'react';
import TextButton from '../text_button';

interface IconicButtonProps {
  Icon: FunctionComponent<SVGProps<SVGSVGElement>> | ReactNode;
  width?: number;
  height?: number;
  backgroundColor?: string;
  afterBgColor?: string;
  activeBgColor?: string;
  borderColor?: string;
  afterBorderColor?: string;
  activeBorderColor?: string;
  iconColor?: string;
  iconAfterColor?: string;
  iconType?: 'stroke' | 'fill';
  radius?: string | number;
  onPress?: () => void;
  iconSize?: number | string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
}

/**
 * @param {number} iconSize -Size of icon if ?icon query is used, Default=35vw
 * @param {number} width -Size of button use ?icon query for dynamic icon size*/
function IconicButton({
  Icon,

  backgroundColor,
  borderColor,
  radius = '100%',
  afterBgColor,
  afterBorderColor,
  iconColor,
  iconType,
  width = 40,
  height,
  onPress,
  activeBgColor = colors.darker,
  type,
  activeBorderColor,
  iconAfterColor,
  iconSize,
  disabled = false,
}: IconicButtonProps) {
  const castIcon = () => {
    if ((Icon as FunctionComponent)?.prototype) {
      Icon = Icon as FunctionComponent<SVGProps<SVGSVGElement>>;
      return (
        <Icon height={iconSize ?? width / 2} width={iconSize ?? width / 2} />
      );
    } else return Icon as ReactNode;
  };

  return (
    <TextButton
      type={type}
      backgroundColor={backgroundColor}
      afterBgColor={afterBgColor}
      width={width}
      height={height ? height : width}
      padding={'unset'}
      radius={radius}
      activeBgColor={activeBgColor}
      borderColor={borderColor}
      activeBorderColor={activeBorderColor}
      afterBorderColor={afterBorderColor}
      onPress={onPress}
      disabled={disabled}
      Icon={{
        svg: castIcon(),
        iconColor: iconColor,
        iconAfterColor: iconAfterColor,
        iconType: iconType,
      }}
    />
  );
}

export default IconicButton;
