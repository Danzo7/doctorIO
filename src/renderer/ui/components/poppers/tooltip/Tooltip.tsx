import { IconType, PressHandler } from '@components/buttons/text_button';
import './style/index.scss';
import TooltipItem from './tooltip_item';
export interface TooltipProps {
  actionList: ActionProps[];
  closeOnSelect?: () => void;
}
export type ActionProps = {
  text: string;
  Icon?: IconType;
  type?: 'warning' | 'normal';
  afterColor?: string;
  onPress?: PressHandler;
};
export default function Tooltip({ actionList, closeOnSelect }: TooltipProps) {
  return (
    <div className="tooltip">
      {actionList?.map(({ text, Icon, onPress, type, afterColor }, index) => (
        <TooltipItem
          key={index}
          text={text}
          selectedColor={afterColor}
          Icon={Icon}
          onPress={() => {
            if (onPress) {
              onPress();
            }

            closeOnSelect?.();
          }}
          type={type}
        />
      ))}
    </div>
  );
}
