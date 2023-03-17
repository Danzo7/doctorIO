import { useAbility } from '@stores/abilityStore';
import MenuOption from './MenuOption';
import './style/index.scss';
import menuI, { MenuKeys } from './svgList';

interface AppMenuProps {}

function AppMenu({}: AppMenuProps) {
  const getItem = (item: MenuKeys) => ({ name: item, svg: menuI[item] });
  const ability = useAbility();
  const menuOptions = [
    getItem('home'),
    (ability.can('have', 'queue') || ability.can('manage', 'queue')) &&
      getItem('queue'),
    ability.can('have', 'messages') && getItem('messages'),
    getItem('stats'),
    ability.can('view', 'records') && getItem('records'),
    //    isAllowed('ability.canManageDataCollection', permissions) && getItem('database'),
    getItem('clinic'),
    getItem('settings'),
  ].filter(Boolean) as { name: MenuKeys; svg: any }[];

  return (
    <div className="AppMenu">
      <menuI.logo css={{ width: '70%', height: 'auto' }} />

      <MenuOption items={menuOptions} />
    </div>
  );
}

export default AppMenu;
