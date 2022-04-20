import { css } from '@emotion/css';
import React from 'react';
import './style/index.scss';

interface MiniStatsProps {
  value: number;
  text: string;
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  percentage?: number;
  state?: string;
  backgroundColor?: string;
}

function MiniStats({
  value,
  text,
  Icon,
  percentage = -1,
  state,
  backgroundColor,
}: MiniStatsProps) {
  return (
    <div
      className={`mini-stats ${css`
        background-color: ${backgroundColor};
      `} ${state}`}
    >
      <span
        className={` ${css`
          visibility: ${percentage >= 0 ? 'visible' : 'hidden'};
        `} `}
      >
        {percentage}%
      </span>
      <Icon width={35} height={35}></Icon>
      <span>{text}</span>
      <span>{value}</span>
    </div>
  );
}

export default MiniStats;
