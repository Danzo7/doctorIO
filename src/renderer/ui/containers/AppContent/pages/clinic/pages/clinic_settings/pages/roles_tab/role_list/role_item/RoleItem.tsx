import './style/index.scss';
import Icon from 'toSvg/link.svg?icon';
interface RoleItemProps {
  roleName: string;
  selected: boolean;
  onClick: () => void;
  linked?: string;
}
function RoleItem({ roleName, linked, selected, onClick }: RoleItemProps) {
  return (
    <div
      onClick={onClick}
      className={`role-item${selected ? ' selected' : ''}`}
    >
      <span>{roleName}</span>
      <div
        className="linked"
        css={{ display: linked ? 'flex' : 'none!important' }}
      >
        <Icon />
        <div className="linked-role-container">
          <span>{linked}</span>
        </div>
      </div>
    </div>
  );
}

export default RoleItem;
