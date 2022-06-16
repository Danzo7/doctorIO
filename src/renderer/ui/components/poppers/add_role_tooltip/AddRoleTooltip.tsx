import Input from '@components/inputs/input';
import './style/index.scss';
import search from 'toSvg/search.svg?icon';
import Svg from '@libs/svg';
import { IconType, PressHandler } from '@components/buttons/text_button';
import TooltipItem from '@components/poppers/tooltip/tooltip_item';
import { color } from '@assets/styles/color';

interface AddRoleTooltipProps {
  actionList: ActionProps[];
}
type ActionProps = {
  text: string;
  Icon?: IconType;
  onPress?: PressHandler;
};
export default function AddRoleTooltip({ actionList }: AddRoleTooltipProps) {
  return (
    <div className="add-role-tooltip">
      <Input trailing={<Svg>{search}</Svg>} type={'search'} />
      {actionList?.map(({ text, Icon, onPress }, index) => (
        <TooltipItem
          key={index}
          text={text}
          selectedColor={color.secondary_color}
          Icon={Icon}
          onPress={onPress}
          type={'normal'}
        />
      ))}
    </div>
  );
}
