import './style/index.scss';
import { RoleBrief } from '@models/server.models';
import { useSearchParams } from 'react-router-dom';
import roleApi from '@redux/clinic/rbac/role/roleApi';
import Icon from 'toSvg/link.svg?icon';

interface RoleItemProps {
  selected: boolean;
  masterRole?: RoleBrief;
}
function RoleItem({
  id,
  name,
  selected,
  masterRole,
}: RoleBrief & RoleItemProps) {
  const [_, setSearchParams] = useSearchParams();
  return (
    <div
      onClick={() => {
        setSearchParams({ roleId: id.toString() });
        roleApi.util.resetApiState();
      }}
      className={`role-item${selected ? ' selected' : ''}`}
    >
      <span>{name}</span>
      {masterRole && (
        <div
          className="linked"
          css={{ display: masterRole ? 'flex' : 'none!important' }}
        >
          <Icon />
          <div className="linked-role-container">
            <span>{masterRole?.name}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default RoleItem;
