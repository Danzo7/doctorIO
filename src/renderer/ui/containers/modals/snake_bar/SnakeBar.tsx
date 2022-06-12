import MultiOptionSwitcher from '@components/buttons/multi_option_switcher';
import './style/index.scss';
interface SnakeBarProps {
  description: string;
  actionList: string[];
}
export default function SnakeBar({ description, actionList }: SnakeBarProps) {
  return (
    <div className="snake-bar">
      <span>{description}</span>
      <MultiOptionSwitcher textList={actionList} noBorder={true} noSep={true} />
    </div>
  );
}
