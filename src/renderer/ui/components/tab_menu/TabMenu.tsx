import colors from '@assets/styles/color';
import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import { useState } from 'react';
import './style/index.scss';
interface TabMenuProps {
  items: Array<string>;
  defaultSelected?: number;
  onChanged?: ({ item, index }: { item: string; index: number }) => void;
  borderBottom?: boolean;
}
export default function TabMenu({
  items,
  defaultSelected = 0,
  onChanged,
  borderBottom = true,
}: TabMenuProps) {
  const [selected, setSelected] = useState(defaultSelected);
  function setTab(index: number) {
    setSelected(index);
    onChanged?.({ item: items[index], index: index });
  }
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
  );
}
