import * as React from 'react';
import './style/index.scss';
import { NavLink } from 'react-router-dom';
interface MenuOptionProps {
  items: {
    name: string;
    svg: React.FunctionComponent<React.SVGProps<SVGSVGElement>> | string;
  }[];
}

function MenuOption({ items }: MenuOptionProps) {
  return (
    <nav className="MenuOption">
      {items.map(
        ({ name, svg: Svg }) =>
          name !== 'logo' && (
            <NavLink
              key={name}
              className={({ isActive }) =>
                `menuItem${isActive ? ' isActive' : ''}`
              }
              to={name}
              draggable={false}
            >
              <Svg />
            </NavLink>
          ),
      )}
    </nav>
  );
}

export default MenuOption;
