import React from 'react';
import './style/index.scss';
import Icon from 'toSvg/link.svg?icon';
import { css } from '@emotion/css';
import color from '@assets/styles/color';
interface RoleItemProps {
  roleName: string;
  selected: boolean;
  linked?: boolean;
}
function RoleItem({ roleName, linked = false, selected }: RoleItemProps) {
  return (
    <div
      className={`role-item ${css`
        background: ${selected ? color.darkersec_color : 'none'};
        box-shadow: 0px 0px 0px ${selected ? 1 : 0}px ${color.border_color};
      `} `}
    >
      <div className="role-item-wrapper">
        <span>{roleName}</span>
        <div
          className={`linked  ${css`
            visibility: ${linked ? 'visible' : 'hidden'};
          `} `}
        >
          <Icon />
          <div className="linked-role-container">
            <span>@Rythm#3722</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoleItem;
