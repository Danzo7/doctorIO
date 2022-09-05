import { AbilityContext } from '@ability/Ability';
import { useAbility } from '@casl/react';
import MenuOption from './MenuOption';
import './style/index.scss';
import menuI, { MenuKeys } from './svgList';

interface AppMenuProps {}

function AppMenu({}: AppMenuProps) {
  const getItem = (item: MenuKeys) => ({ name: item, svg: menuI[item] });
  const ability = useAbility(AbilityContext);
  const menuOptions = [
    getItem('home'),
    (ability.can('have', 'queue') || ability.can('manage', 'queue')) &&
      getItem('queue'),
    ability.can('have', 'messages') && getItem('messages'),
    //  isAllowed('ability.canViewClinicInsight', permissions) && getItem('stats'),
    ability.can('view', 'records') && getItem('records'),
    //    isAllowed('ability.canManageDataCollection', permissions) && getItem('database'),
    ability.can('manage', 'clinic') && getItem('clinic'),
    //  getItem('settings'),
  ].filter(Boolean) as { name: MenuKeys; svg: any }[];

  return (
    <div className="AppMenu">
      <menuI.logo css={{ width: '70%', height: 'auto' }} />

      <MenuOption items={menuOptions} />
    </div>
  );
}

export default AppMenu;
