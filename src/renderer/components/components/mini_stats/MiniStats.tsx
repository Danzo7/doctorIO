import React from 'react';
import './style/index.scss';
import Clinic from 'toSvg/clinic.svg';
interface MiniStatsProps {
  value?: string;
  text?: string;
}

function MiniStats({ value, text }: MiniStatsProps) {
  return (
    <div className="mini-stats">
      <span>{value}</span>
      <span>{text}</span>
      <Clinic></Clinic>
    </div>
  );
}

export default MiniStats;
