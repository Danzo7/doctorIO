import { css } from '@emotion/css';
import React from 'react';
import './style/index.scss';
interface TitleButtonProps {
  title: string;
  fontColor?: string;
  fontSize?: number;
  backgroundColor?: string;
  borderColor?: string;
  afterBgColor?: string;
  afterBorderColor?: string;
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
  radius,
}: TitleButtonProps) {
  return (
    <div
      className={`title-button ${css`
        background-color: ${backgroundColor};
        border-color: ${borderColor};
        border-radius: ${radius}px;
        &:hover {
          background-color: ${afterBgColor};
          border-color: ${afterBorderColor};
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
