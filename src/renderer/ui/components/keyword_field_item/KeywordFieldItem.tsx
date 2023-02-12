import './style/index.scss';
import TrashCan from 'toSvg/trash_can.svg?icon';
import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
import Edit from 'toSvg/pencil.svg?icon';
import AppointmentHistoryIcon from 'toSvg/appointment_history.svg?icon';
interface KeywordFieldItemProps {
  name: string;
  textGrow?: true;
  onEdit?: () => void;
  onDelete?: () => void;
  onView?: () => void;
  gap?: number;
}
export default function KeywordFieldItem({
  name,
  onEdit,
  onDelete,
  onView,
  gap,
  textGrow,
}: KeywordFieldItemProps) {
  return (
    <div
      className="keyword-field-item"
      css={{ gap: gap, justifyContent: gap ? undefined : 'space-between' }}
    >
      <span
        css={{
          maxWidth: textGrow ? 400 : 150,
        }}
      >
        {name}
      </span>
      <div className="keyword-controls">
        {onEdit && (
          <SquareIconButton
            // disabled={res.isLoading}
            Icon={Edit}
            iconSize={10}
            tip="Edit"
            onPress={onEdit}
          />
        )}
        {onDelete && (
          <SquareIconButton
            // disabled={res.isLoading}
            Icon={TrashCan}
            iconSize={15}
            tip="Delete field"
            onPress={onDelete}
          />
        )}

        {onView && (
          <SquareIconButton
            Icon={AppointmentHistoryIcon}
            iconSize={10}
            tip="View"
            onPress={onView}
          />
        )}
      </div>
    </div>
  );
}
