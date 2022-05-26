import colors from '@assets/styles/color';
import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import { NavLink } from 'react-router-dom';
import './style/index.scss';
interface NavTabMenuProps {
  items: Array<string>;
  defaultSelected?: number;
  onChanged?: ({ item, index }: { item: string; index: number }) => void;
  borderBottom?: boolean;
}
export default function NavTabMenu({
  items,

  borderBottom = true,
}: NavTabMenuProps) {
  return (
    <div
      className="tab-menu"
      css={
        borderBottom
          ? { borderBottom: `1px solid ${colors.border_color}` }
          : undefined
      }
    >
      <div className="menu-items">
        {items.map((item, index) => (
          <NavLink to={item} key={index}>
            {({ isActive }) => (
              <DarkLightCornerButton title={item} isActive={isActive} blank />
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
