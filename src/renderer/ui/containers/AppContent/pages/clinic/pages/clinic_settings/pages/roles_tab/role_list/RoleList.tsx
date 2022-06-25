import NewRole from './new_role';
import RoleItem from './role_item';
import { useState } from 'react';
import './style/index.scss';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { roles } from '@api/fake';
import { useSearchParams } from 'react-router-dom';

interface RoleListProps {
  selected?: number;
  height: number | string;
  defaultSelected?: number;
}
export default function RoleList({ defaultSelected = 0 }: RoleListProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get('roleId'));
  // TODO? fetch roles
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
  //TODO add new Role function //
  return (
    <div className={`role-list`}>
      <NewRole />
      <DragDropContext onDragEnd={handleDrop}>
        <Droppable droppableId="content-list">
          {({ droppableProps, innerRef, placeholder }) => (
            <div className="content-list" {...droppableProps} ref={innerRef}>
              {itemList.map((role, index) => (
                <Draggable
                  key={role.roleId + index}
                  draggableId={role.roleName + index}
                  index={index}
                >
                  {(props) => (
                    <div
                      ref={props.innerRef}
                      {...props.dragHandleProps}
                      {...props.draggableProps}
                    >
                      <RoleItem
                        roleId={role.roleId}
                        roleName={role.roleName}
                        selected={
                          role.roleId.toString() ==
                          (searchParams.get('roleId') ?? '1')
                        }
                        linkedRole={role.linkedRole}
                        key={index}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
