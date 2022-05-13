import './style/index.scss';
import { FunctionComponent, SVGProps } from 'react';
import color from '@assets/styles/color';
interface MessagesCategoryItemProps {
  Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  categoryName: string;
  selected: boolean;
}
export default function MessagesCategoryItem({
  Icon,
  categoryName,
  selected,
}: MessagesCategoryItemProps) {
  return (
    <div
      className="messages-category-item"
      css={{ backgroundColor: selected ? color.border_color : undefined }}
    >
      <Icon width={18} height={21} />
      <span>{categoryName}</span>
    </div>
  );
}
