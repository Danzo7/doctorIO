import React from 'react';
import './style/index.scss';
import Icon from 'toSvg/link.svg?icon';
interface RoleItemProps {}
function RoleItem({}: RoleItemProps) {
  return (
    <div className="role-item">
      <span>Support</span>

      <Icon />
      <div className="linked">
        <span>@Rythm#3722</span>
      </div>
    </div>
  );
}

export default RoleItem;
