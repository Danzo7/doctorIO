import { currentMemberPermissions } from '@api/fake';
import { isAllowed } from '@helpers/permission.helper';
import MenuOption from './MenuOption';
import './style/index.scss';
import menuI, { MenuKeys } from './svgList';

interface AppMenuProps {}

function AppMenu({}: AppMenuProps) {
  //REDUX getCurrentPermissions
  const permissions = currentMemberPermissions;
  const getItem = (item: MenuKeys) => ({ name: item, svg: menuI[item] });
  const menuOptions = [
    getItem('home'),
    isAllowed('canHaveQueue', permissions) && getItem('queue'),
    isAllowed('canUseMessages', permissions) && getItem('messages'),
    //  isAllowed('canViewClinicInsight', permissions) && getItem('stats'),
    isAllowed('canViewMedicalRecords', permissions) && getItem('records'),
    //    isAllowed('canManageDataCollection', permissions) && getItem('database'),
    isAllowed('canManageClinic', permissions) && getItem('clinic'),
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
