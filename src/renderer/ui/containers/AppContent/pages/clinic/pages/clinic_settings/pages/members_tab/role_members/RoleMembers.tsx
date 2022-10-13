import LoadingSpinner from '@components/loading_spinner';
import MembersTable from '@components/members_table';
import RoleDescription from '@components/role_description';
import { RoleBrief } from '@models/server.models';
import { useGetMembersQuery } from '@redux/clinic/rbac/member/memberApi';
import './style/index.scss';

export default function RoleMembers({ name, description, id }: RoleBrief) {
  const { data, isLoading, isSuccess, error } = useGetMembersQuery();

  const list = isSuccess
    ? data.filter(
        ({ roles }) => roles.find(({ id: rId }) => id == rId) != undefined,
      )
    : [];
  return (
    <div className="role-members">
      <RoleDescription name={name} description={description} />
      {isLoading ? (
        <LoadingSpinner />
      ) : isSuccess ? (
        list.length > 0 ? (
          <MembersTable list={list} />
        ) : (
          <span>Empty.</span>
        )
      ) : (
        <span> error when getting members </span>
      )}
    </div>
  );
}
