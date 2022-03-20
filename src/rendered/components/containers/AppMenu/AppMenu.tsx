import React from 'react';
import MenuOption from './MenuOption';
import './style/index.scss';
import menuI from '@data/menuSvgs';
import LinkyIcon from '@components/LinkyIcon';
interface AppMenu {}

function AppMenu({}: AppMenu) {
  return (
    <div className="AppMenu">
      <div className="AppLogo">
        <LinkyIcon
          Src={menuI.logo}
          viewBox="-6 -8 70 70"
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
