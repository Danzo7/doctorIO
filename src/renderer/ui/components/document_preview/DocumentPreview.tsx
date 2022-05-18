import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
import PreviewWithControls from '@components/preview_with_controls';
import TrashCan from 'toSvg/trash_can.svg?icon';
import AppointmentHistoryIcon from 'toSvg/appointment_history.svg?icon';

interface DocumentPreviewProps {
  documentName: string;
  publishDate: string;
  onPressHistory: () => void;
  onDelete: () => void;
}
export default function DocumentPreview({
  documentName,
  publishDate,
  onPressHistory,
  onDelete,
}: DocumentPreviewProps) {
  return (
    <div className="document-preview">
      <PreviewWithControls
        primaryText={documentName}
        secondaryText={publishDate}
      >
        <SquareIconButton
          svg={AppointmentHistoryIcon}
          onPress={onPressHistory}
        />
        <SquareIconButton svg={TrashCan} onPress={onDelete} />
      </PreviewWithControls>
    </div>
  );
}
