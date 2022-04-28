import { css } from '@emotion/css';
import * as React from 'react';
import './style/index.scss';
import colors from '@colors';
interface TextButtonProps {
  text?: string;
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  fontColor?: string;
  fontSize?: number;
  fontWeight?: number;
  backgroundColor?: string;
  borderColor?: string;
  afterBgColor?: string;
  afterBorderColor?: string;
  afterFontColor?: string;
  radius?: number;
  padding?: string;
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

  padding,
  onPress,
  type,
}: TextButtonProps) {
  return (
    <button
      type={type}
      className={`${css`
        background-color: ${backgroundColor};
        border: 1px solid ${borderColor ? `${borderColor} ` : 'transparent'};
        border-radius: ${radius ? radius + 'px' : ''};
        padding: ${padding};
        width: ${typeof width === 'number' ? `${width}px` : ''};
        width: ${typeof width === 'string'
          ? width == '100%'
            ? 'unset'
            : `${width}`
          : ''};
        height: ${typeof height === 'number' ? `${height}px` : ''};
        height: ${typeof height === 'string'
          ? height == '100%'
            ? 'unset'
            : `${height}`
          : ''};

        &:hover {
          background-color: ${afterBgColor};
          ${afterBorderColor ? `border: 1px solid ${afterBorderColor} ` : ''};
          > span {
            color: ${afterFontColor ? afterFontColor : colors.white};
          }
        }
      `} text-button`}
      onClick={onPress}
    >
      {Icon ? (
        <Icon />
      ) : (
        <span
          className={` text ${css`
            color: ${fontColor};
            font-size: ${fontSize}px;
            line-height: ${fontSize}px;
            font-weight: ${fontWeight};
          `}`}
        >
          {text}
        </span>
      )}
    </button>
  );
}

export default TextButton;
