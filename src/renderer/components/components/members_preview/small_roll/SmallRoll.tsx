import React from 'react';
import './style/index.scss';
interface SmallRollProps {
  rollName: string;
}
//TODO:  Roll!=Role rename to SmallRolePreview
function SmallRoll({ rollName }: SmallRollProps) {
  return (
    <div className="small-roll">
      <span>{rollName}</span>
    </div>
  );
}

export default SmallRoll;
