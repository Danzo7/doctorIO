import colors from '@assets/styles/color';
import { Badged } from '@components/badge/Badge';
import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import SmartLink, { ToRoute } from '@libs/smart_link';
import './style/index.scss';

type RouteDef = { name: string; route: ToRoute };
interface NavTabMenuProps {
  items: (string | RouteDef)[];
  onChanged?: ({ item, index }: { item: string; index: number }) => void;
  borderBottom?: boolean;
  previews?: number[];
}

export default function NavTabMenu({
  items,
  borderBottom = true,
  previews,
}: NavTabMenuProps) {
  return (
    <div className="tab-menu">
      <div
        className="tab-menu-bar"
        css={
          borderBottom
            ? { borderBottom: `1px solid ${colors.border_color}` }
            : undefined
        }
      >
        <div className="menu-items">
          {items.map((item, index) => (
            <Badged
              badge="preview"
              key={index}
              skip={!previews?.includes(index)}
            >
              <SmartLink to={(item as RouteDef)?.route ?? item} key={index}>
                {({ isMatch }) => (
                  <DarkLightCornerButton
                    text={(item as RouteDef)?.name ?? item}
                    isActive={isMatch}
                    blank
                  />
                )}
              </SmartLink>
            </Badged>
          ))}
        </div>
      </div>
    </div>
  );
}
