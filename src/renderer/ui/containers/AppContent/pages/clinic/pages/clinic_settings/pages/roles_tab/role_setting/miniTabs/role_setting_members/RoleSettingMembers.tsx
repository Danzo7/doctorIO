import { members } from '@api/fake';
import MembersTable from '@components/members_table';
import { Member } from '@models/server.models';

const memberList: Member[] = members;

interface RoleSettingMembersProps {}
export default function RoleSettingMembers({}: RoleSettingMembersProps) {
  return (
    <div className="role-setting-members">
      <MembersTable list={memberList} />
    </div>
  );
}
