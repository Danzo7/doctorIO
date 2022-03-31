import React from 'react';
import './style/index.scss';
import Clinic from 'toSvg/clinic.svg';
interface MiniStatsProps {
  value?: string;
  text?: string;
}

function MiniStats({}: MiniStatsProps) {
  return (
    <div className="mini-stats">
      <span>999</span>
      <span>text</span>
      <Clinic></Clinic>
    </div>
  );
}

export default MiniStats;
