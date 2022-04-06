import React from 'react';
import './style/index.scss';
interface SmallRollProps {
  rollName: string;
}
function SmallRoll({ rollName }: SmallRollProps) {
  return (
    <div className="small-roll">
      <span>{rollName}</span>
    </div>
  );
}

export default SmallRoll;
