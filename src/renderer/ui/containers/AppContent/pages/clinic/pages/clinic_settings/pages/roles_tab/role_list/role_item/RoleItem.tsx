import './style/index.scss';
import { RoleBrief } from '@models/server.models';
import { useSearchParams } from 'react-router-dom';

interface RoleItemProps {
  selected: boolean;
}
function RoleItem({ id, name, selected }: RoleBrief & RoleItemProps) {
  const [_, setSearchParams] = useSearchParams();
  return (
    <div
      onClick={() => {
        setSearchParams({ roleId: id.toString() });
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
