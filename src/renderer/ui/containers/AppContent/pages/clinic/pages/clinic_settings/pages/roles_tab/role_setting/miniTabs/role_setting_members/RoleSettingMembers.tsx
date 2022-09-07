import MembersTable from '@components/members_table';
import { useGetMembersQuery } from '@redux/clinic/rbac/member/memberApi';

import './style/index.scss';

interface RoleSettingMembersProps {
  id: number;
}
export default function RoleSettingMembers({ id }: RoleSettingMembersProps) {
  const { data, isLoading, isSuccess, error } = useGetMembersQuery();

  const list = isSuccess
    ? data.filter(
        ({ roles }) => roles.find(({ id: rId }) => id == rId) != undefined,
      )
    : [];
  return (
    <div className="role-setting-members">
      <MembersTable list={list} />
    </div>
  );
}
