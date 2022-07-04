import MembersTable from '@components/members_table';
import { Member } from '@models/server.models';

import './style/index.scss';

interface RoleSettingMembersProps {
  list: Member[];
}
export default function RoleSettingMembers({ list }: RoleSettingMembersProps) {
  return (
    <div className="role-setting-members">
      <MembersTable list={list} />
    </div>
  );
}
