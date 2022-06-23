import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
import PreviewWithControls from '@components/preview_with_controls';
import TrashCan from 'toSvg/trash_can.svg?icon';
import AppointmentHistoryIcon from 'toSvg/appointment_history.svg?icon';
import { MedicalDocument } from '@models/instance.model';
import { format } from 'date-fns';
import { DATE_ONLY } from '@constants/data_format';

export default function DocumentPreviewItem({
  date,
  fileName,
}: MedicalDocument) {
  return (
    <PreviewWithControls
      primaryText={fileName}
      secondaryText={format(date, DATE_ONLY)}
    >
      <SquareIconButton
        svg={
          AppointmentHistoryIcon //todo preview file with id
        }
      />
      <SquareIconButton
        svg={
          TrashCan //todo:deleteFile with warning
        }
      />
    </PreviewWithControls>
  );
}
