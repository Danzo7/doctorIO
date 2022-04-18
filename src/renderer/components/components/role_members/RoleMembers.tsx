import MembersTable from '@components/members_table';
import RoleDescription from '@components/role_description';
import React from 'react';
import './style/index.scss';
interface RoleMembersProps {
  roleName: string;
  description: string;
}
export default function RoleMembers({
  roleName,
  description,
}: RoleMembersProps) {
  return (
    <div className="role-members">
      <RoleDescription roleName={roleName} description={description} />
      <MembersTable />
    </div>
  );
}
