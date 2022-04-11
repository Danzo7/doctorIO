import { css } from '@emotion/css';
import React from 'react';
import './style/index.scss';
import colors from '@colors';
interface TextButtonProps {
  text: string;
  fontColor?: string;
  fontSize?: number;
  backgroundColor?: string;
  borderColor?: string;
  afterBgColor?: string;
  afterBorderColor?: string;
  afterFontColor?: string;
  radius?: number;
}
function TextButton({
  text,
  fontColor,
  fontSize = 14,
  backgroundColor,
  borderColor,
  afterBgColor,
  afterBorderColor,
  afterFontColor,
  radius,
}: TextButtonProps) {
  return (
    <div
      className={`text-button ${css`
        background-color: ${backgroundColor};
        ${borderColor ? `border: 1px solid ${borderColor} ` : ''};
        border-radius: ${radius}px;
        &:hover {
          background-color: ${afterBgColor};
          ${afterBorderColor ? `border: 1px solid ${afterBorderColor} ` : ''};
          > span {
            color: ${afterFontColor ? afterFontColor : colors.white};
          }
        }
      `} `}
    >
      <span
        className={` text ${css`
          color: ${fontColor};
          font-size: ${fontSize}px;
          line-height: ${fontSize}px;
        `}`}
      >
        {text}
      </span>
    </div>
  );
}

export default TextButton;
