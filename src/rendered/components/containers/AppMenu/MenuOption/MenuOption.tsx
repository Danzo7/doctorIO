import LinkyIcon from '@components/LinkyIcon';
import { strokeTypes } from '@data/menuSvgs';
import React, { useState } from 'react';
import './style/index.scss';
interface MenuOption {
  items: {
    name: string;
    svg:
      | React.FunctionComponent<React.SVGProps<SVGSVGElement>>
      | string;
  }[];
}

function MenuOption({ items }: MenuOption) {
  const [currentPage, setCurrentPge] = useState('home');

  return (
    <ul className="MenuOption">
      {items.map(
        ({ name, svg }) =>
          name !== 'logo' && (
            <li key={name}
              onClick={(e) => setCurrentPge(name)}
              className={`menuItem ${
                currentPage === name ? ' isActive' : 'menuItem'
              }`}
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
