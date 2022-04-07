import React from 'react';
import './style/index.scss';

interface MiniStatsProps {
  value: number;
  text: string;
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  percentage?: number;
  state: string;
}

function MiniStats({ value, text, Icon, percentage, state }: MiniStatsProps) {
  return (
    <div className={`mini-stats ${state}`}>
      <span>{percentage}%</span>
      <Icon width={35} height={35}></Icon>
      <span>{text}</span>
      <span>{value}</span>
    </div>
  );
}

export default MiniStats;
