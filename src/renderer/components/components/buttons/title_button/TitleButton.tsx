import { css } from '@emotion/css';
import React from 'react';
import './style/index.scss';
interface TitleButtonProps {
  title: string;
  fontColor?: string;
  fontSize?: number;
  backgroundColor?: string;
  borderColor?: string;
  width?: number;
  radius?: number;
}
function TitleButton({
  title,
  fontColor,
  fontSize = 14,
  backgroundColor,
  borderColor,
  width = 90,
  radius,
}: TitleButtonProps) {
  return (
    <div
      className={`title-button ${css`
        background-color: ${backgroundColor};
        border-color: ${borderColor};
        width: ${width}px;
        height: ${width / 3}px;
        border-radius: ${radius}px;
      `} `}
    >
      <span
        className={`${css`
          color: ${fontColor};
          font-size: ${fontSize}px;
        `}`}
      >
        {title}
      </span>
    </div>
  );
}

export default TitleButton;
