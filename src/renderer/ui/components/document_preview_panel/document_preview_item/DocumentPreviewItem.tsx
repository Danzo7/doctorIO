import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
import PreviewWithControls from '@components/preview_with_controls';
import TrashCan from 'toSvg/trash_can.svg?icon';
import AppointmentHistoryIcon from 'toSvg/appointment_history.svg?icon';
import damaged from 'toSvg/damaged.svg?icon';
import { MedicalDocument } from '@models/instance.model';
import { format } from 'date-fns';
import { DATE_ONLY } from '@constants/data_format';
import { useOverlay } from '@libs/overlay/useOverlay';
import WarningModal from '@containers/modals/warning_modal';
import { DEFAULT_MODAL } from '@libs/overlay';
import { color } from '@assets/styles/color';

import { useRef } from 'react';
import {
  useDeleteDocumentMutation,
  useDownloadDocumentMutation,
} from '@redux/instance/record/medical_document_api';
import AlertModal from '@containers/modals/dialog_modal';
import TextButton from '@components/buttons/text_button';
//TODO move to file
const DeleteDocumentModal = ({
  fileName,
  id,
  onSucceed,
}: {
  fileName: string;
  id: string;
  onSucceed?: () => void;
}) => {
  const [deleting, { isLoading }] = useDeleteDocumentMutation();

  return (
    <AlertModal
      title={`You are about to delete ${fileName} ? `}
      description="the file will no longer be available after this action "
      status="warning"
      controls={
        <TextButton
          text={`${isLoading ? 'Deleting...' : 'Delete'}`}
          backgroundColor={color.hot_red}
          disabled={isLoading}
          width="100%"
          onPress={() => {
            deleting({ id }).then(() => {
              onSucceed?.();
            });
          }}
        />
      }
    />
  );
};

export default function DocumentPreviewItem({
  fileName,
  id,
  status,
  date,
}: MedicalDocument) {
  const { open, close } = useOverlay();
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
    //TODO convert to error modal
    open(
      <WarningModal
        title={`${downError.message}`}
        description={downError.message as string}
      />,
      {
        ...DEFAULT_MODAL,
      },
    );
  }

  return (
    <PreviewWithControls
      primaryText={fileName}
      secondaryText={format(date, DATE_ONLY)}
    >
      <SquareIconButton
        Icon={statusRef.current == 'LOST' ? damaged : AppointmentHistoryIcon}
        iconColor={statusRef.current == 'LOST' ? color.text_gray : undefined}
        onPress={() => {
          consumedError.current = false;
          if (statusRef.current == 'LOST') {
            open(
              <WarningModal
                title="Document Lost"
                description="This document is lost. Please contact the administrator."
              />,
              {
                ...DEFAULT_MODAL,
              },
            );
          } else download({ id, name: fileName });
        }}
      />

      <SquareIconButton
        Icon={TrashCan}
        onPress={() => {
          open(
            <DeleteDocumentModal
              id={id}
              fileName={fileName}
              onSucceed={close}
            />,
            DEFAULT_MODAL,
          );
        }}
      />
    </PreviewWithControls>
  );
}
