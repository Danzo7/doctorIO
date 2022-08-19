import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
import PreviewWithControls from '@components/preview_with_controls';
import TrashCan from 'toSvg/trash_can.svg?icon';
import AppointmentHistoryIcon from 'toSvg/appointment_history.svg?icon';
import damaged from 'toSvg/damaged.svg?icon';
import { MedicalDocument, ServerError } from '@models/instance.model';
import { format } from 'date-fns';
import { DATE_ONLY } from '@constants/data_format';
import { useOverlay } from '@libs/overlay/useOverlay';
import WarningModal from '@containers/modals/warning_modal';
import { DEFAULT_MODAL } from '@libs/overlay';
import TextButton from '@components/buttons/text_button';
import { color } from '@assets/styles/color';

import { useRef } from 'react';
import {
  useDeleteDocumentMutation,
  useDownloadDocumentMutation,
} from '@redux/instance/record/medical_document_api';
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
    <WarningModal
      warningTitle={`You are about to delete ${fileName} ? `}
      warningDescription="the file will no longer be available after this action "
    >
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
    </WarningModal>
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
  if (downError?.statusCode === 404) {
    statusRef.current = 'LOST';
  }
  if (downError?.statusCode && !consumedError.current) {
    consumedError.current = true;
    open(
      <WarningModal
        warningTitle={`${downError.error} (${downError.statusCode})`}
        warningDescription={downError?.message as string}
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
                warningTitle="Document Lost"
                warningDescription="This document is lost. Please contact the administrator."
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
