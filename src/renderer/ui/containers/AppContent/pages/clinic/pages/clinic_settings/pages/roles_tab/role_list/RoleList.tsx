import NewRole from './new_role';
import RoleItem from './role_item';
import './style/index.scss';
import { useSearchParams } from 'react-router-dom';
import { useGetBriefRolesQuery } from '@redux/clinic/rbac/role/roleApi';
import LoadingSpinner from '@components/loading_spinner';
import Can from '@ability/index';

export default function RoleList() {
  const [searchParams] = useSearchParams();

  const { data, isLoading, isFetching, isSuccess, error } =
    useGetBriefRolesQuery();

  return (
    <div className={`role-list`}>
      {
        <Can I="manage" a="role">
          <NewRole />
        </Can>
      }

      <div className="content-list">
        {isLoading ? (
          <LoadingSpinner />
        ) : isSuccess ? (
          data.map((role, index) => (
            <RoleItem
              selected={role.id.toString() == searchParams.get('roleId')}
              {...role}
              key={index}
            />
          ))
        ) : (
          <div> not succeeded </div>
        )}
      </div>
    </div>
  );
}
