import * as React from 'react';
import './style/index.scss';
import SmartLink, { ToRoute } from '@libs/smart_link';
interface MenuOptionProps {
  items: {
    name: string;
    svg: React.FunctionComponent<React.SVGProps<SVGSVGElement>> | string;
  }[];
}

function MenuOption({ items }: MenuOptionProps) {
  const routes: { [key: string]: ToRoute } = {
    home: { route: '', exact: true },
    messages: {
      to: 'messages/@clinic',
      include: ['messages/@public'],
    },
    queue: 'queue',
    stats: 'stats',
    records: 'records',
    database: 'database',
    clinic: 'clinic',
    settings: 'settings',
  };
  return (
    <nav className="MenuOption">
      {items.map(
        ({ name, svg: Svg }) =>
          name !== 'logo' && (
            <SmartLink
              key={name}
              className={({ isMatch }) =>
                `menuItem${isMatch ? ' isActive' : ''}`
              }
              to={routes[name]}
              draggable={false}
            >
              <Svg />
            </SmartLink>
          ),
      )}
    </nav>
  );
}

export default MenuOption;
