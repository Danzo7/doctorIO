import './style/index.scss';
import TooltipItem from './tooltip_item';
interface TooltipProps {
  actionList: any[];
}
export default function Tooltip({ actionList }: TooltipProps) {
  return (
    <div className="tooltip">
      {actionList?.map(({ text, selectedColor, Icon, onPress }, index) => (
        <TooltipItem
          key={index}
          text={text}
          selectedColor={selectedColor}
          Icon={Icon}
          onPress={onPress}
        />
      ))}
    </div>
  );
}
