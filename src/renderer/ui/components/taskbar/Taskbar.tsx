import './style/index.scss';
import X from 'toSvg/x_mark.svg?icon';
import minus from 'toSvg/minus.svg?icon';
import IconicButton from '@components/buttons/iconic_button';
import { color } from '@assets/styles/color';
interface TaskbarProps {}
export default function Taskbar({}: TaskbarProps) {
  return (
    <div className="taskbar">
      <span>Clinicord</span>
      <div className="items">
        <IconicButton
          Icon={minus}
          height={25}
          width={30}
          iconSize={10}
          radius={0}
          afterBgColor={color.light}
          onPress={() => {
            window._ELECTRON_WINDOW_COMMAND.invokeWindow('minimize');
          }}
        />

        <IconicButton
          Icon={X}
          height={25}
          width={30}
          radius={0}
          iconSize={10}
          afterBgColor={color.hot_red}
          onPress={() => {
            window._ELECTRON_WINDOW_COMMAND.invokeWindow('close');
          }}
        />
      </div>
    </div>
  );
}
