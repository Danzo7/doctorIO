import NewRole from './new_role';
import RoleItem from './role_item';
import { useState } from 'react';
import './style/index.scss';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Role } from '@models/server.models';

//TODO! we need to redefine the Role type with linked
const roleList: RoleType[] = [
  {
    role: { roleId: 1, roleName: 'Support', roleDesc: 'Dev' },
    linked: '@doctor',
  },
  {
    role: { roleId: 2, roleName: 'Doctor', roleDesc: 'Dev' },
    linked: '@doctor',
  },
  {
    role: { roleId: 3, roleName: 'Gamer', roleDesc: 'Dev' },
    linked: '@doctor',
  },
  {
    role: { roleId: 4, roleName: 'Assistance', roleDesc: 'Dev' },
    linked: '@doctor',
  },
  {
    role: { roleId: 5, roleName: 'Sub', roleDesc: 'Dev' },
    linked: '@doctor',
  },
  {
    role: { roleId: 6, roleName: 'Support', roleDesc: 'Dev' },
    linked: '@doctor',
  },
  {
    role: { roleId: 7, roleName: 'Doctor', roleDesc: 'Dev' },
    linked: '@Support',
  },
  {
    role: { roleId: 8, roleName: 'Gamer', roleDesc: 'Dev' },
    linked: '@doctor',
  },
  {
    role: { roleId: 9, roleName: 'Helper', roleDesc: 'Dev' },
    linked: '@Pharmacist',
  },
  {
    role: { roleId: 10, roleName: 'Support', roleDesc: 'Dev' },
    linked: '@doctor',
  },
  {
    role: { roleId: 11, roleName: 'Pharmacist', roleDesc: 'Dev' },
    linked: '@doctor',
  },
  {
    role: { roleId: 12, roleName: 'Pharmacist', roleDesc: 'Dev' },
    linked: '@doctor',
  },
];
interface RoleType {
  role: Role;
  linked?: string;
}
interface RoleListProps {
  selected?: number;
  height: number | string;
  defaultSelected?: number;
}
export default function RoleList({ defaultSelected = 0 }: RoleListProps) {
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
  //TODO add new Role function //
  return (
    <div className={`role-list`}>
      <NewRole />
      <DragDropContext onDragEnd={handleDrop}>
        <Droppable droppableId="content-list">
          {({ droppableProps, innerRef, placeholder }) => (
            <div className="content-list" {...droppableProps} ref={innerRef}>
              {itemList.map((item, index) => (
                <Draggable
                  key={item.role.roleId + index}
                  draggableId={item.role.roleName + index}
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
                        roleName={item.role.roleName}
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
