import NewRole from './new_role';
import RoleItem from './role_item';
import { useEffect, useState } from 'react';
import './style/index.scss';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DroppableProps,
} from 'react-beautiful-dnd';
import { useSearchParams } from 'react-router-dom';
import { useGetBriefRolesQuery } from '@redux/clinic/rbac/role/roleApi';
import LoadingSpinner from '@components/loading_spinner';

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
  const [searchParams, setSearchParams] = useSearchParams();

  // REDUX fetch roles
  const { data, isLoading, isFetching, isSuccess, error } =
    useGetBriefRolesQuery();

  //FEATURE implement addNewRoleModal and new Role function
  return (
    <div className={`role-list`}>
      <NewRole />

      <div className="content-list">
        {isLoading || isFetching ? (
          <LoadingSpinner />
        ) : isSuccess ? (
          data.map((role, index) => (
            <RoleItem
              selected={
                role.id.toString() == (searchParams.get('roleId') ?? '1')
              }
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
