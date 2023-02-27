import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import { useDeleteDocumentMutation } from '@redux/instance/record/medical_document_api';
import AlertModal from '../dialog_modal';
import './style/index.scss';
import { modal } from '@libs/overlay';
interface DeleteDocumentModalProps {
  fileName: string;
  id: string;
  onSucceed?: () => void;
}
export default function DeleteDocumentModal({
  fileName,
  id,
  onSucceed,
}: DeleteDocumentModalProps) {
  const [deleting, { isLoading }] = useDeleteDocumentMutation();
  return (
    <AlertModal
      title={`You are about to delete ${fileName} ? `}
      description="the file will no longer be available after this action "
      status="warning"
      controls={
        <>
          <TextButton
            text="Cancel"
            afterBgColor={color.light}
            disabled={isLoading}
            onPress={() => {
              modal.close();
            }}
          />
          <TextButton
            text={`${isLoading ? 'Deleting...' : 'Delete'}`}
            backgroundColor={color.hot_red}
            disabled={isLoading}
            onPress={() => {
              deleting({ id }).then(() => {
                onSucceed?.();
              });
            }}
          />
        </>
      }
    />
  );
}
