import TabMenu from '@components/tab_menu';
import Doctor from 'toSvg/doctor_icon.svg?icon';
import Nurse from 'toSvg/nurse_icon.svg?icon';

import './style/index.scss';
interface ContactTabMenuProps {
  category: 'public' | 'clinic';
  filters: string[];
  onChanged?: (selected: number) => void;
}
export default function ContactTabMenu({
  category,
  filters: filter,
  onChanged,
}: ContactTabMenuProps) {
  return (
    <div className="contact-tab-menu">
      {category === 'public' ? (
        <Doctor css={{ width: 25, height: 'auto' }} />
      ) : (
        <Nurse css={{ width: 25, height: 'auto' }} />
      )}
      <span>{category}</span>
      <div className="sep" />
      <TabMenu
        items={filter}
        borderBottom={false}
        onChanged={({ index }) => {
          onChanged?.(index);
        }}
      />
    </div>
  );
}
