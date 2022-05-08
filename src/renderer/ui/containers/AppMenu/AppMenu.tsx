import MenuOption from './MenuOption';
import './style/index.scss';
import menuI from './svgList';

interface AppMenuProps {}

function AppMenu({}: AppMenuProps) {
  return (
    <div className="AppMenu">
      <menuI.logo css={{ width: '70%', height: 'auto' }}></menuI.logo>

      <MenuOption
        items={Object.entries(menuI).map((n) => {
          return { name: n[0], svg: n[1] };
        })}
      />
    </div>
  );
}

export default AppMenu;
