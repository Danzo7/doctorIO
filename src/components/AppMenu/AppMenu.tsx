import React from 'react';
import MenuItems from './MenuItems';
import './style/index.scss';
import menuI from '@data/menuSvgs';
interface AppMenu {}

function AppMenu({}: AppMenu) {
  return (
    <div className="AppMenu">
      <MenuItems items={menuI} />
    </div>
  );
}

export default AppMenu;
