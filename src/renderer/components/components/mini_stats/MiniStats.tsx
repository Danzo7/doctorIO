import React from 'react';
import './style/index.scss';
import clinic from 'toSvg/clinic.svg';
import home from 'toSvg/home.svg';
import stats from 'toSvg/stats.svg';
const arr = [home, clinic, stats];
interface MiniStatsProps {
  value?: string;
  text?: string;
  state?: number;
}

function MiniStats({ value, text, state }: MiniStatsProps) {
  const Comp = arr[state ?? 0];
  return (
    <div className="mini-stats">
      <span>{value}</span>
      <span>{text}</span>
      <Comp></Comp>
    </div>
  );
}

export default MiniStats;
