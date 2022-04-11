import { css } from '@emotion/css';
import React from 'react';
import './style/index.scss';
import colors from '@colors';
interface TitleButtonProps {
  title: string;
  fontColor?: string;
  fontSize?: number;
  backgroundColor?: string;
  borderColor?: string;
  afterBgColor?: string;
  afterBorderColor?: string;
  afterFontColor?: string;
  radius?: number;
}
function TitleButton({
  title,
  fontColor,
  fontSize = 14,
  backgroundColor,
  borderColor,
  afterBgColor,
  afterBorderColor,
  afterFontColor,
  radius,
}: TitleButtonProps) {
  return (
    <div
      className={`title-button ${css`
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
        className={` title ${css`
          color: ${fontColor};
          font-size: ${fontSize}px;
          line-height: ${fontSize}px;
        `}`}
      >
        {title}
      </span>
    </div>
  );
}

export default TitleButton;
