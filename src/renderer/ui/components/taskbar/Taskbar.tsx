import './style/index.scss';
import X from 'toSvg/x_mark.svg?icon';
import minus from 'toSvg/minus.svg?icon';
import IconicButton from '@components/buttons/iconic_button';
import { color } from '@assets/styles/color';
interface TaskbarProps {}
export default function Taskbar({}: TaskbarProps) {
  return (
    <div className="taskbar">
      <span>Medicord</span>
      <div className="items">
        <IconicButton
          Icon={minus}
          height={25}
          width={30}
          iconSize={10}
          radius={0}
          afterBgColor={color.light}
        />

        <IconicButton
          Icon={X}
          height={25}
          width={30}
          radius={0}
          iconSize={10}
          afterBgColor={color.hot_red}
          onPress={async () => {
            console.log(await window.api.sayHello());
          }}
        />
      </div>
    </div>
  );
}
