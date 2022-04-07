import React from 'react';
import './style/index.scss';
interface SmallRolePreviewProps {
  roleName: string;
}

function SmallRolePreview({ roleName }: SmallRolePreviewProps) {
  return (
    <div className="small-roll">
      <span>{roleName}</span>
    </div>
  );
}

export default SmallRolePreview;
