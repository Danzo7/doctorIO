import * as React from 'react';
import './style/index.scss';
import colors from '@colors';
import { css } from '@emotion/react';
interface TextButtonProps {
  text?: string;
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  children?: React.ReactNode;
  fontColor?: string;
  fontSize?: number;
  fontWeight?: number;
  backgroundColor?: string;
  borderColor?: string;
  afterBgColor?: string;
  afterBorderColor?: string;
  afterFontColor?: string;
  radius?: number;
  padding?: string | number;
  onPress?: () => void;
  width?: number | string;
  height?: number | string;
  type?: 'button' | 'submit' | 'reset' | undefined;
}
function TextButton({
  text,
  Icon,
  fontColor,
  fontSize = 14,
  fontWeight = 600,
  backgroundColor = 'transparent',
  borderColor,
  radius = 7,
  afterBgColor,
  afterBorderColor,
  afterFontColor,
  width,
  height,
  children,
  padding,
  onPress,
  type,
}: TextButtonProps) {
  return (
    <button
      type={type}
      className={`text-button`}
      css={{
        backgroundColor: backgroundColor,
        border: ` 1px solid ${borderColor ? `${borderColor} ` : 'transparent'}`,
        borderRadius: radius,
        padding: padding,
        width: width,
        height: height,
        '&:hover': {
          backgroundColor: afterBgColor,
          border: afterBorderColor
            ? `1px solid ${afterBorderColor}`
            : undefined,
          '> span': {
            color: afterFontColor ? afterFontColor : colors.white,
          },
        },
      }}
      onClick={onPress}
    >
      {children}
      {Icon ? (
        <Icon />
      ) : (
        <span
          className={'text'}
          css={{
            color: fontColor,
            fontSize: fontSize,
            fontWeight: fontWeight,
          }}
        >
          {text}
        </span>
      )}
    </button>
  );
}

export default TextButton;
