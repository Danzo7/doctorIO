import { css } from '@emotion/react';
import { FunctionComponent, SVGProps } from 'react';
import './style/index.scss';

interface MiniStatsProps {
  value: number;
  text: string;
  Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
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
      className={`mini-stats${state ? ' ' + state : ''}`}
      css={{ backgroundColor: backgroundColor }}
    >
      <span css={css({ visibility: percentage >= 0 ? undefined : 'hidden' })}>
        {percentage}%
      </span>
      <Icon width={35} height={35}></Icon>
      <span>{text}</span>
      <span>{value}</span>
    </div>
  );
}

export default MiniStats;
