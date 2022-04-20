import React from 'react';
import MenuOption from './MenuOption';
import './style/index.scss';
import menuI, { logo } from './svgList';
import LinkyIcon from '@components/LinkyIcon';
interface AppMenuProps {}

function AppMenu({}: AppMenuProps) {
  return (
    <div className="AppMenu">
      <div className="AppLogo">
        <LinkyIcon
          Src={logo}
          viewBox="-10 -10 70 70"
          alt={'home'}
          width="80%"
        />
      </div>

      <MenuOption
        items={Object.entries(menuI).map((n) => {
          return { name: n[0], svg: n[1] };
        })}
      />
    </div>
  );
}

export default AppMenu;
