import NewRole from './new_role';
import RoleItem from './role_item';
import { useState } from 'react';
import './style/index.scss';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface RoleType {
  roleName: string;
  linked?: string;
}
interface RoleListProps {
  roleList: RoleType[];
  selected?: number;
  height: number | string;
  defaultSelected?: number;
}
export default function RoleList({
  roleList,
  defaultSelected = 0,
}: RoleListProps) {
  const [selectedRole, setSelectedRole] = useState(defaultSelected);
  const [itemList, setItemList] = useState(roleList);

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
  return (
    <div className={`role-list`}>
      <NewRole />
      <DragDropContext onDragEnd={handleDrop}>
        <Droppable droppableId="content-list">
          {({ droppableProps, innerRef, placeholder }) => (
            <div className="content-list" {...droppableProps} ref={innerRef}>
              {itemList.map((item, index) => (
                <Draggable
                  key={item.roleName + index}
                  draggableId={item.roleName + index}
                  index={index}
                >
                  {(props) => (
                    <div
                      ref={props.innerRef}
                      {...props.dragHandleProps}
                      {...props.draggableProps}
                    >
                      <RoleItem
                        onClick={() => {
                          setSelectedRole(index);
                        }}
                        roleName={item.roleName}
                        selected={index == selectedRole}
                        linked={item.linked}
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
