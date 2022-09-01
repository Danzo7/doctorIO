import { members } from '@api/fake';
import MembersTable from '@components/members_table';
import RoleDescription from '@components/role_description';
import { RoleBrief } from '@models/server.models';
import './style/index.scss';

export default function RoleMembers({ name, description, id }: RoleBrief) {
  return (
    <div className="role-members">
      <RoleDescription name={name} description={description} />
      <MembersTable
        list={members.filter(
          ({ roles }) => roles.find(({ id: rId }) => id == rId) != undefined,
        )} //REDUX getMembers
      />
    </div>
  );
}
