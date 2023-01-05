import TextPair from '@components/text_pair/TextPair';
import './style/index.scss';
import { color } from '@assets/styles/color';
import TrashCan from 'toSvg/trash_can.svg?icon';
import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
import Edit from 'toSvg/pencil.svg?icon';
interface KeywordFieldItemProps {
  onEdit?: () => void;
  name: string;
}
export default function KeywordFieldItem({
  name,
  onEdit,
}: KeywordFieldItemProps) {
  return (
    <div className="keyword-field-item">
      <div className="keywords-info-div">
        <TextPair
          flexDirection="row"
          alignItems="center"
          first={{
            text: 'Name:',
            fontSize: 14,
            fontWeight: 400,
            fontColor: color.text_gray,
          }}
          second={{
            text: `/${name}`,
            fontSize: 15,
            fontWeight: 500,
            fontColor: color.white,
            border: true,
          }}
        />
      </div>
      <div className="keyword-controls">
        <SquareIconButton
          // disabled={res.isLoading}
          Icon={Edit}
          iconSize={10}
          tip="Edit"
          onPress={onEdit}
        />
        <SquareIconButton
          // disabled={res.isLoading}
          Icon={TrashCan}
          iconSize={15}
          tip="Delete field"
          onPress={() => {}}
        />
      </div>
    </div>
  );
}
