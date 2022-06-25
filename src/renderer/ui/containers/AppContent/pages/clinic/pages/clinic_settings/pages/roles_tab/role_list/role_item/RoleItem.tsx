import './style/index.scss';
import Icon from 'toSvg/link.svg?icon';
import { Role } from '@models/server.models';
import { useSearchParams } from 'react-router-dom';

interface RoleItemProps {
  selected: boolean;
}
function RoleItem({
  roleId,
  roleName,
  linkedRole,
  selected,
}: Pick<Role, 'roleId' | 'roleName' | 'linkedRole'> & RoleItemProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div
      onClick={() => {
        setSearchParams({ roleId: roleId.toString() });
      }}
      className={`role-item${selected ? ' selected' : ''}`}
    >
      <span>{roleName}</span>
      <div
        className="linked"
        css={{ display: linkedRole ? 'flex' : 'none!important' }}
      >
        <Icon />
        <div className="linked-role-container">
          <span>{linkedRole?.roleName}</span>
        </div>
      </div>
    </div>
  );
}

export default RoleItem;
