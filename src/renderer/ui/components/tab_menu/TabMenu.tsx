import colors from '@assets/styles/color';
import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import { ReactNode, useState } from 'react';
import './style/index.scss';
interface TabMenuProps {
  items: Array<string>;
  defaultSelected?: number;
  onChanged?: ({ item, index }: { item: string; index: number }) => void;
  borderBottom?: boolean;
  children?: ReactNode[];
}
export default function TabMenu({
  items,
  defaultSelected = 0,
  onChanged,
  borderBottom = true,
  children,
}: TabMenuProps) {
  const [selected, setSelected] = useState(defaultSelected);
  function setTab(index: number) {
    setSelected(index);
    onChanged?.({ item: items[index], index: index });
  }
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
          {items.map((text, index) => (
            <DarkLightCornerButton
              key={index}
              title={text}
              isActive={selected == index}
              onPress={() => setTab(index)}
            />
          ))}
        </div>
      </div>
      {children?.find((child, index) => index == selected)}
    </div>
  );
}
