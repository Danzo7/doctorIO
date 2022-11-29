import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import LoadingSpinner from '@components/loading_spinner';
import PreviewList from '@components/preview_list';
import UploadFileModal from '@containers/modals/upload_file_modal';
import { useGetMedicalDocumentsQuery } from '@redux/instance/record/medical_document_api';
import { modal } from '@stores/overlayStore';
import DocumentPreviewItem from './document_preview_item';
interface DocumentPreviewPanelProps {
  patientId: number;
}
export default function DocumentPreviewPanel({
  patientId,
}: DocumentPreviewPanelProps) {
  const { isSuccess, isError, isLoading, data, isFetching } =
    useGetMedicalDocumentsQuery(patientId);

  return (
    <PreviewList
      maxHeight={300}
      flexGrow
      title="Documents"
      buttonNode={
        <DarkLightCornerButton
          text="Upload"
          onPress={() => {
            modal(() => <UploadFileModal patientId={patientId} />, {
              closeOnClickOutside: true,
              isDimmed: true,
              clickThrough: false,
              closeBtn: 'inner',
              width: '30%',
            }).open();
          }}
        />
      }
    >
      {isError ? (
        <div>error</div> //TODO show error panel
      ) : isLoading || isFetching ? (
        <LoadingSpinner />
      ) : (
        isSuccess &&
        data.map(({ id, fileName, fileType, status, date }, index) => (
          <DocumentPreviewItem
            id={id}
            fileName={fileName}
            fileType={fileType}
            status={status}
            key={id + index}
            date={date}
          />
        ))
      )}
    </PreviewList>
  );
}
