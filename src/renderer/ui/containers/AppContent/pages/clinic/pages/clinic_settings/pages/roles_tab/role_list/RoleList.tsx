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
import { roles } from '@api/fake';
import { useSearchParams } from 'react-router-dom';

interface RoleListProps {
  selected?: number;
  defaultSelected?: number;
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

export default function RoleList({ defaultSelected = 0 }: RoleListProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get('roleId'));
  // REDUX fetch roles
  const [itemList, setItemList] = useState(roles);

  const handleDrop = (droppedItem: any) => {
    // Ignore drop outside droppable container
    if (!droppedItem.destination) return;
    const updatedList = [...itemList];
    // Remove dragged item
    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
    // Add dropped item
    updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
    // Update State
    setItemList(updatedList);
  };
  //FEATURE implement addNewRoleModal and new Role function
  return (
    <div className={`role-list`}>
      <NewRole />
      <DragDropContext onDragEnd={handleDrop}>
        <StrictModeDroppable droppableId="content-list">
          {({ droppableProps, innerRef, placeholder }) => (
            <div className="content-list" {...droppableProps} ref={innerRef}>
              {itemList.map((role, index) => (
                <Draggable
                  key={role.id + index}
                  draggableId={role.id.toString() + index}
                  index={index}
                >
                  {(props) => (
                    <div
                      ref={props.innerRef}
                      {...props.dragHandleProps}
                      {...props.draggableProps}
                    >
                      <RoleItem
                        selected={
                          role.id.toString() ==
                          (searchParams.get('roleId') ?? '1')
                        }
                        {...role}
                        key={index}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {placeholder}
            </div>
          )}
        </StrictModeDroppable>
      </DragDropContext>
    </div>
  );
}
