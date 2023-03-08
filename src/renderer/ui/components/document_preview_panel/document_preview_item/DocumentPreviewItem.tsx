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
import PdfViewerModal from '@containers/modals/pdf_viewer_modal';
import ImageViewer from '@components/image_viewer';

export default function DocumentPreviewItem({
  fileName,
  id,
  status,
  date,
  fileType,
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
        onPress={async () => {
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
          } else {
            const res = await download({ id, name: fileName }).unwrap();
            if (res != null)
              if (fileType == 'application/pdf')
                modal(<PdfViewerModal file={res} fileName={fileName} />, {
                  ...FIT_MODAL,
                  height: '85%',
                }).open();
              else if (fileType.startsWith('image/')) {
                modal(<ImageViewer file={res} fileName={fileName} />, {
                  ...FIT_MODAL,
                  style: {
                    // maxHeight: '85%',
                  },
                }).open();
              } else {
                const url = window.URL.createObjectURL(res);
                const a = document.createElement('a');
                a.href = url;
                a.download = fileName;
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
              }
          }
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
