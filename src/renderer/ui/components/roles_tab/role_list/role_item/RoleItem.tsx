import './style/index.scss';
import Icon from 'toSvg/link.svg?icon';
import { css } from '@emotion/css';
interface RoleItemProps {
  roleName: string;
  selected: boolean;
  onClick: () => void;
  linked?: boolean;
}
function RoleItem({
  roleName,
  linked = false,
  selected,
  onClick,
}: RoleItemProps) {
  return (
    <div
      onClick={onClick}
      className={`role-item${selected ? ' selected' : ''}`}
    >
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
  );
}

export default RoleItem;
