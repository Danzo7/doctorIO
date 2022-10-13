import NewRole from './new_role';
import RoleItem from './role_item';
import { useEffect, useState } from 'react';
import './style/index.scss';
import { Droppable, DroppableProps } from 'react-beautiful-dnd';
import { useSearchParams } from 'react-router-dom';
import { useGetBriefRolesQuery } from '@redux/clinic/rbac/role/roleApi';
import LoadingSpinner from '@components/loading_spinner';
import Can from '@ability/index';

interface RoleListProps {
  selected?: number;
}
const StrictModeDroppable = ({ children, ...props }: DroppableProps) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return <Droppable {...props}>{children}</Droppable>;
};

export default function RoleList({}: RoleListProps) {
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
