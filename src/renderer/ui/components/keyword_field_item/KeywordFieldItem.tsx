import './style/index.scss';
import TrashCan from 'toSvg/trash_can.svg?icon';
import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
import Edit from 'toSvg/pencil.svg?icon';
import AppointmentHistoryIcon from 'toSvg/appointment_history.svg?icon';
interface KeywordFieldItemProps {
  onEdit?: () => void;
  onDelete?: () => void;
  id: number;
  name: string;
  mode: 'edit' | 'view';
  gap?: number;
}
export default function KeywordFieldItem({
  name,
  onEdit,
  onDelete,
  mode,
  gap,
  id,
}: KeywordFieldItemProps) {
  return (
    <div
      className="keyword-field-item"
      css={{ gap: gap, justifyContent: gap ? undefined : 'space-between' }}
    >
      <span>{name}</span>
      <div className="keyword-controls">
        {mode == 'edit' ? (
          <>
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
              onPress={onDelete}
            />
          </>
        ) : (
          <SquareIconButton
            Icon={AppointmentHistoryIcon}
            iconSize={10}
            tip="View"
            onPress={() => {
              //TODO show certificate content
            }}
          />
        )}
      </div>
    </div>
  );
}
