import './style/index.scss';
import SmartLink, { ToRoute } from '@libs/smart_link';
import { Badged } from '@components/badge/Badge';
import { FunctionComponent, SVGProps } from 'react';
interface MenuOptionProps {
  items: {
    name: string;
    svg: FunctionComponent<SVGProps<SVGSVGElement>> | string;
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
    stats: 'statistics',
    records: 'records',
    database: 'database',
    clinic: 'clinic',
    settings: 'settings',
  };
  return (
    <nav className="MenuOption">
      {items.map(
        ({ name, svg: Svg }, index) =>
          name !== 'logo' &&
          (name == 'messages' ? (
            <Badged badge="preview" key={index}>
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
            </Badged>
          ) : (
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
          )),
      )}
    </nav>
  );
}

export default MenuOption;
