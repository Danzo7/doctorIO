import './style/index.scss';
import { FunctionComponent, SVGProps } from 'react';
import color from '@assets/styles/color';
interface MessagesCategoryItemProps {
  Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  categoryName: string;
  selected: boolean;
  onSelect: () => void;
}
export default function MessagesCategoryItem({
  Icon,
  categoryName,
  selected,
  onSelect,
}: MessagesCategoryItemProps) {
  return (
    <div
      className="messages-category-item"
      css={{ backgroundColor: selected ? color.border_color : undefined }}
      onClick={onSelect}
    >
      <Icon width={18} height={21} />
      <span>{categoryName}</span>
    </div>
  );
}
