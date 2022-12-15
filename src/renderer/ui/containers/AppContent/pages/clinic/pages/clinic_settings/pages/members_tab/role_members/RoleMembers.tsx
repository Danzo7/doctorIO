import MembersTable from '@components/members_table';
import RoleDescription from '@components/role_description';
import { RoleBrief } from '@models/server.models';
import './style/index.scss';

export default function RoleMembers(props: RoleBrief) {
  const { name, description } = props;

  return (
    <div className="role-members">
      <RoleDescription name={name} description={description} />
      <MembersTable {...props} />
    </div>
  );
}
