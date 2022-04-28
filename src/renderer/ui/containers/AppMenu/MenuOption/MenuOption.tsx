import LinkyIcon from '@components/LinkyIcon';
import { strokeTypes } from '../svgList';
import { useState } from 'react';
import * as React from 'react';
import './style/index.scss';
interface MenuOptionProps {
  items: {
    name: string;
    svg: React.FunctionComponent<React.SVGProps<SVGSVGElement>> | string;
  }[];
}

function MenuOption({ items }: MenuOptionProps) {
  const [currentPage, setCurrentPge] = useState('home');

  return (
    <ul className="MenuOption">
      {items.map(
        ({ name, svg }) =>
          name !== 'logo' && (
            <li
              key={name}
              onClick={() => setCurrentPge(name)}
              className={`menuItem${currentPage === name ? ' isActive' : ''}`}
            >
              <LinkyIcon
                svgClassName={strokeTypes[name]}
                Src={svg}
                viewBox="0 -27 38 90"
                alt={name}
              />
            </li>
          ),
      )}
    </ul>
  );
}

export default MenuOption;
