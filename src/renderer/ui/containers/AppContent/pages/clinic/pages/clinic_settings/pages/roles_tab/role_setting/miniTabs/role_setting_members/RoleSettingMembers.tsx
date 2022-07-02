import { members } from '@api/fake';
import MembersTable from '@components/members_table';
import { useSearchParams } from 'react-router-dom';
import './style/index.scss';

interface RoleSettingMembersProps {
  roleId: number;
}
export default function RoleSettingMembers({
  roleId,
}: RoleSettingMembersProps) {
  return (
    <div className="role-setting-members">
      <MembersTable
        list={members.filter(
          ({ roles }) =>
            roles.find(({ roleId: id }) => id == roleId) != undefined,
        )}
      />
    </div>
  );
}
