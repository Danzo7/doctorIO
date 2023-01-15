import './style/index.scss';
import trashCan from 'toSvg/trash_can.svg?icon';
import plusIcon from 'toSvg/add.svg?icon';
import minusIcon from 'toSvg/minus.svg?icon';
import ControlTooltip from '@components/text_editor/components/control_tooltip';
import { color } from '@assets/styles/color';
import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
import { TablesEditor } from '../../TablesEditor';
import { useSlateStatic } from 'slate-react';
interface TableControlProps {}
export default function TableControl({}: TableControlProps) {
  const editor = useSlateStatic();
  return (
    <ControlTooltip>
      <SquareIconButton
        borderColor={color.cold_red}
        iconColor={color.cold_red}
        afterBgColor={color.cold_red}
        Icon={trashCan}
        iconAfterColor={color.white}
        unFocusable
        onPress={() => {
          TablesEditor.removeTable(editor);
        }}
      />
      <SquareIconButton
        borderColor={color.cold_blue}
        iconColor={color.cold_blue}
        afterBgColor={color.cold_blue}
        Icon={plusIcon}
        iconAfterColor={color.white}
        unFocusable
        onPress={() => {
          TablesEditor.insertColumnLeft(editor);
        }}
      />
      <SquareIconButton
        borderColor={color.cold_blue}
        iconColor={color.cold_blue}
        afterBgColor={color.cold_blue}
        Icon={minusIcon}
        iconAfterColor={color.white}
        unFocusable
        onPress={() => {
          TablesEditor.removeColumn(editor);
        }}
      />
    </ControlTooltip>
  );
}
