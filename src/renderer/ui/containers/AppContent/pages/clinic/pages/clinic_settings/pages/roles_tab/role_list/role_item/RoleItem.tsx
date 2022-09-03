import './style/index.scss';
import { RoleBrief } from '@models/server.models';
import { useSearchParams } from 'react-router-dom';
import roleApi from '@redux/clinic/rbac/role/roleApi';

interface RoleItemProps {
  selected: boolean;
}
function RoleItem({ id, name, selected }: RoleBrief & RoleItemProps) {
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
      {/* <div
        className="linked"
        css={{ display: masterRole ? 'flex' : 'none!important' }}
      >
        <Icon />
        <div className="linked-role-container">
          <span>{masterRole?.roleName}</span>
        </div> 
      </div>*/}
    </div>
  );
}

export default RoleItem;
