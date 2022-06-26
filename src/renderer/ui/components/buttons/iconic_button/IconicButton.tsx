import colors from '@assets/styles/color';
import { ComponentProps, FunctionComponent, ReactNode, SVGProps } from 'react';
import TextButton from '../text_button';

interface IconicButtonProps {
  Icon: FunctionComponent<SVGProps<SVGSVGElement>> | ReactNode;
  iconColor?: string;
  iconAfterColor?: string;
  iconType?: 'stroke' | 'fill';
  iconSize?: number | string;
}

/**
 * @param {number} iconSize -Size of icon if ?icon query is used, Default=35vw
 * @param {number} width -Size of button use ?icon query for dynamic icon size*/
function IconicButton({
  Icon,
  radius = '100%',
  iconColor,
  iconType,
  width = 40,
  height,
  activeBgColor = colors.darker,
  iconAfterColor,
  iconSize,
  padding = 'unset',
  ...others
}: IconicButtonProps & Omit<ComponentProps<typeof TextButton>, 'Icon'>) {
  const castIcon = () => {
    if ((Icon as FunctionComponent)?.prototype) {
      Icon = Icon as FunctionComponent<SVGProps<SVGSVGElement>>;
      return (
        <Icon
          {...(typeof width == 'number'
            ? { height: iconSize ?? width / 2, width: iconSize ?? width / 2 }
            : undefined)}
        />
      );
    } else return Icon as ReactNode;
  };

  return (
    <TextButton
      width={width}
      height={height ? height : width}
      padding={padding}
      radius={radius}
      activeBgColor={activeBgColor}
      Icon={{
        svg: castIcon(),
        iconColor: iconColor,
        iconAfterColor: iconAfterColor,
        iconType: iconType,
      }}
      {...others}
    />
  );
}

export default IconicButton;
