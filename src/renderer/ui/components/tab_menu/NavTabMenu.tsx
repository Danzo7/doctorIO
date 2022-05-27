import colors from '@assets/styles/color';
import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import SmartLink from '@components/smart_link';
import './style/index.scss';

type RouteDef = { name: string; route: string };
interface NavTabMenuProps {
  items: (string | RouteDef)[];
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
          <SmartLink
            to={{ route: (item as RouteDef)?.route ?? item }}
            key={index}
          >
            {({ isMatch }) => (
              <DarkLightCornerButton
                title={(item as RouteDef)?.name ?? item}
                isActive={isMatch}
                blank
              />
            )}
          </SmartLink>
        ))}
      </div>
    </div>
  );
}
