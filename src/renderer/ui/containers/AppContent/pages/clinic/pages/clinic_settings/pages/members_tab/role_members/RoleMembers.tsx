import { members } from '@api/fake';
import MembersTable from '@components/members_table';
import RoleDescription from '@components/role_description';
import { Role } from '@models/server.models';
import './style/index.scss';

export default function RoleMembers({ roleName, roleDesc, roleId }: Role) {
  return (
    <div className="role-members">
      <RoleDescription roleName={roleName} description={roleDesc} />
      <MembersTable
        list={members.filter(
          ({ roles }) =>
            roles.find(({ roleId: id }) => id == roleId) != undefined,
        )} //REDUX getMembers
      />
    </div>
  );
}
