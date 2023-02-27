import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
import PreviewWithControls from '@components/preview_with_controls';
import TrashCan from 'toSvg/trash_can.svg?icon';
import AppointmentHistoryIcon from 'toSvg/appointment_history.svg?icon';
import damaged from 'toSvg/damaged.svg?icon';
import { MedicalDocument } from '@models/instance.model';
import { format } from 'date-fns';
import { SETTINGS } from '@stores/appSettingsStore';
import { DEFAULT_MODAL, FIT_MODAL, modal } from '@libs/overlay';
import { color } from '@assets/styles/color';
import { useRef } from 'react';
import { useDownloadDocumentMutation } from '@redux/instance/record/medical_document_api';
import AlertModal from '@containers/modals/dialog_modal';
import TextButton from '@components/buttons/text_button';
import DeleteDocumentModal from '@containers/modals/delete_document_modal';

export default function DocumentPreviewItem({
  fileName,
  id,
  status,
  date,
}: MedicalDocument) {
  const statusRef = useRef(status);
  const consumedError = useRef(false);
  const [download, result] = useDownloadDocumentMutation();
  const downError = result.isError
    ? ((result.error as any).error?.data as ServerError)
    : undefined;
  if (downError?.errorCode === 1300) {
    statusRef.current = 'LOST';
  }
  if (downError?.errorCode && !consumedError.current) {
    consumedError.current = true;

    modal(
      () => (
        <AlertModal
          status="error"
          title={`${downError.message}`}
          description={downError.message as string}
        />
      ),

      DEFAULT_MODAL,
    ).open();
  }

  return (
    <PreviewWithControls
      primaryText={fileName}
      secondaryText={format(date, SETTINGS.dateFormat)}
    >
      <SquareIconButton
        tip="View Document"
        Icon={statusRef.current == 'LOST' ? damaged : AppointmentHistoryIcon}
        iconColor={statusRef.current == 'LOST' ? color.text_gray : undefined}
        onPress={() => {
          consumedError.current = false;
          if (statusRef.current == 'LOST') {
            modal(
              () => (
                <AlertModal
                  status="error"
                  title="Document Lost"
                  description="This document is lost. Please contact the administrator."
                  controls={
                    <TextButton
                      text="Confirm"
                      backgroundColor={color.good_green}
                    />
                  }
                />
              ),
              {
                ...DEFAULT_MODAL,
              },
            ).open();
          } else download({ id, name: fileName });
        }}
      />

      <SquareIconButton
        Icon={TrashCan}
        tip="Delete Document"
        onPress={() => {
          modal(
            ({ close }) => (
              <DeleteDocumentModal
                id={id}
                fileName={fileName}
                onSucceed={close}
              />
            ),
            { ...FIT_MODAL, style: { maxWidth: '30%' }, closeBtn: undefined },
          ).open();
        }}
      />
    </PreviewWithControls>
  );
}
