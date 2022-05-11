import * as React from 'react';
import './style/index.scss';
import colors from '@colors';
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
  activeBgColor?: string;
  activeBorderColor?: string;
  afterBorderColor?: string;
  afterFontColor?: string;
  radius?: number | string;
  padding?: string | number;
  onPress?: () => void;
  width?: number | string;
  height?: number | string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
}
function TextButton({
  text,
  Icon,
  fontColor,
  fontSize = 14,
  fontWeight = 600,
  backgroundColor = 'transparent',
  borderColor = 'transparent',
  radius = 7,
  afterBgColor,
  afterBorderColor,
  afterFontColor,
  width,
  height,
  children,
  padding,
  onPress,
  activeBgColor = colors.light,
  type,
  activeBorderColor,
  disabled = false,
}: TextButtonProps) {
  return (
    <button
      type={type}
      className={`text-button`}
      css={{
        backgroundColor: !disabled ? backgroundColor : colors.silver_gray,
        border: `${borderColor} 1px solid`,

        borderRadius: radius,
        padding: padding,
        width: width,
        height: height,
        cursor: disabled ? 'no-drop' : undefined,

        '&:active': {
          boxShadow:
            !disabled && activeBgColor
              ? `inset 1000px 1000px 1px ${activeBgColor}`
              : undefined,

          border:
            !disabled && activeBorderColor
              ? `${activeBorderColor} 1px solid`
              : undefined,
        },
        '&:hover': {
          backgroundColor: !disabled ? afterBgColor : undefined,
          border:
            !disabled && afterBorderColor
              ? `${afterBorderColor} 1px solid`
              : undefined,

          '> span': {
            color: !disabled && afterFontColor ? afterFontColor : undefined,
          },
        },
      }}
      onClick={(e) => {
        e.stopPropagation();
        onPress?.();
      }}
      disabled={disabled}
    >
      {children}
      {Icon ? (
        <Icon />
      ) : (
        <span
          className={'text'}
          css={{
            color: !disabled ? fontColor : colors.text_gray,
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
