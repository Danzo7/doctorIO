import MembersTable from '@components/members_table';

interface RoleSettingMembersProps {}
export default function RoleSettingMembers({}: RoleSettingMembersProps) {
  return (
    <div className="role-setting-members">
      <MembersTable />
    </div>
  );
}
