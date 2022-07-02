import { members } from '@api/fake';
import MembersTable from '@components/members_table';
import { useSearchParams } from 'react-router-dom';
import './style/index.scss';

interface RoleSettingMembersProps {}
export default function RoleSettingMembers({}: RoleSettingMembersProps) {
  const [searchParams] = useSearchParams();
  return (
    <div className="role-setting-members">
      <MembersTable
        list={members.filter(
          ({ roles }) =>
            roles.find(
              ({ roleId: id }) => id.toString() == searchParams.get('roleId'),
            ) != undefined,
        )}
      />
    </div>
  );
}
