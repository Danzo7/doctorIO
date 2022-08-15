import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
import PreviewWithControls from '@components/preview_with_controls';
import TrashCan from 'toSvg/trash_can.svg?icon';
import AppointmentHistoryIcon from 'toSvg/appointment_history.svg?icon';
import { MedicalDocument } from '@models/instance.model';
import { format } from 'date-fns';
import { DATE_ONLY } from '@constants/data_format';
import { useOverlay } from '@libs/overlay/useOverlay';
import WarningModal from '@containers/modals/warning_modal';
import { DEFAULT_MODAL } from '@libs/overlay';
import TextButton from '@components/buttons/text_button';
import { color } from '@assets/styles/color';

export default function DocumentPreviewItem({
  fileName,
  fileType,
  id,
  status,
}: MedicalDocument) {
  const { open, close } = useOverlay();
  return (
    <PreviewWithControls primaryText={fileName} secondaryText={'fix date'}>
      {status == 'NORMAL' ? (
        <SquareIconButton
          Icon={AppointmentHistoryIcon}
          onPress={() => {
            //REDUX download file or preview
          }}
        />
      ) : (
        <span>{status}</span> //UI improve span
      )}
      <SquareIconButton
        Icon={TrashCan}
        onPress={() => {
          open(
            <WarningModal
              warningTitle={`You are about to delete ${fileName} (${fileType}) ? `}
              warningDescription="the file will no longer be available after this action "
            >
              <TextButton
                text="Confirm"
                backgroundColor={color.hot_red}
                width="100%"
                onPress={() => {
                  //REDUX delete file on the server
                  close();
                }}
              />
            </WarningModal>,
            DEFAULT_MODAL,
          );
        }}
      />
    </PreviewWithControls>
  );
}
