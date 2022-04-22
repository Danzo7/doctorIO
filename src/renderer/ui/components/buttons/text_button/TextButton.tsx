import { css } from '@emotion/css';
import React from 'react';
import './style/index.scss';
import colors from '@colors';
interface TextButtonProps {
  text: string;
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
}
function TextButton({
  text,
  fontColor,
  fontSize = 14,
  fontWeight = 600,
  backgroundColor,
  borderColor,
  afterBgColor,
  afterBorderColor,
  afterFontColor,
  width,
  radius,
  padding,
  onPress,
}: TextButtonProps) {
  return (
    <div
      className={`text-button ${css`
        background-color: ${backgroundColor};
        border: 1px solid ${borderColor ? `${borderColor} ` : 'transparent'};
        border-radius: ${radius}px;
        padding: ${padding};
        width: ${typeof width === 'number' ? `${width}px` : ''};
        width: ${typeof width === 'string' ? `${width}` : ''};

        &:hover {
          background-color: ${afterBgColor};
          ${afterBorderColor ? `border: 1px solid ${afterBorderColor} ` : ''};
          > span {
            color: ${afterFontColor ? afterFontColor : colors.white};
          }
        }
      `} `}
      onClick={onPress}
    >
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
    </div>
  );
}

export default TextButton;
