import { color } from '@assets/styles/color';
import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import { ReactNode, useState } from 'react';
import './style/index.scss';

interface TabType {
  label: string;
  content: ReactNode;
}
interface VerticalTabProps {
  items: TabType[];
  defaultSelected?: number;
  onChanged?: ({ item, index }: { item: string; index: number }) => void;
  menuItemsAlignment?: 'flex-start' | 'flex-end' | 'center';
}
export default function VerticalTab({
  items,

  menuItemsAlignment = 'flex-start',
  defaultSelected = 0,
}: VerticalTabProps) {
  const [activeTabIndex, setActiveTabIndex] = useState(defaultSelected);
  return (
    <div className="vertical-tab">
      <div className="tab-menu-bar">
        <div
          css={{ justifyContent: menuItemsAlignment }}
          className="menu-labels"
        >
          {items.length > 0 &&
            items.map(({ label }, index) => (
              <DarkLightCornerButton
                fontSize={18}
                fontWeight={600}
                fontColor={
                  index === activeTabIndex ? color.white : color.text_gray
                }
                alignment="flex-start"
                padding={10}
                width={170}
                key={index}
                text={label}
                isActive={activeTabIndex == index}
                onPress={() => {
                  if (index != activeTabIndex) setActiveTabIndex(index);
                }}
              />
            ))}
        </div>
      </div>
      {items.length > 0 && (
        <div className="menu-content">{items[activeTabIndex].content} </div>
      )}
    </div>
  );
}
