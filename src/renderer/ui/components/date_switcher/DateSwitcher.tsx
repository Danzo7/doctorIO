import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import { SETTINGS } from '@stores/appSettingsStore';

import { format } from 'date-fns';
import Arrow from 'toSvg/arrow.svg?icon';
import './style/index.scss';
interface DateSwitcherProps {
  date: Date;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  alignSelf?:
    | 'center'
    | 'baseline'
    | 'end'
    | 'flex-end'
    | 'flex-start'
    | 'start'
    | 'stretch';
}
export default function DateSwitcher({
  date,
  onLeftPress,
  onRightPress,
  alignSelf,
}: DateSwitcherProps) {
  return (
    <div className="date-switcher" css={{ alignSelf: alignSelf }}>
      <TextButton
        borderColor={color.border_color}
        padding="10px"
        afterBgColor={color.darkersec_color}
        onPress={onLeftPress}
      >
        <Arrow css={{ transform: 'rotate(90deg)' }} />
      </TextButton>
      <div className="date-div">
        <span>{format(date, SETTINGS.dateFormat)}</span>
      </div>
      <TextButton
        borderColor={color.border_color}
        padding="10px"
        afterBgColor={color.darkersec_color}
        onPress={onRightPress}
      >
        <Arrow css={{ transform: 'rotate(-90deg)' }} />
      </TextButton>
    </div>
  );
}
