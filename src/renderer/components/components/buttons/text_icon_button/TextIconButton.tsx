import React from 'react';
import './style/index.scss';
import { css } from '@emotion/css';

interface TextIconButtonProps {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  text: string;
  color?: string;
  startFocus?: boolean;
  id?: number;
  onMouseOver?: (a: number) => void;
}

function TextIconButton({
  Icon,
  text,
  color,
  startFocus,
  onMouseOver,
  id,
}: TextIconButtonProps) {
  return (
    <div
      onMouseEnter={() =>
        id != undefined && onMouseOver != undefined
          ? onMouseOver(id)
          : undefined
      }
      className={`text-icon-button ${startFocus && 'active'} ${
        color &&
        css`
          background-color: ${color};
        `
      }`}
    >
      <div className="text">{text}</div>
      <div className="icon">{Icon && <Icon />}</div>
    </div>
  );
}

export default TextIconButton;
