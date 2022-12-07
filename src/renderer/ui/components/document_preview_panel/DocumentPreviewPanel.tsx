import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import LoadingSpinner from '@components/loading_spinner';
import PreviewList from '@components/preview_list';
import RefetchPanel from '@components/refetch_panel';
import VerticalPanel from '@components/vertical_panel';
import UploadFileModal from '@containers/modals/upload_file_modal';
import { useGetMedicalDocumentsQuery } from '@redux/instance/record/medical_document_api';
import { modal } from '@stores/overlayStore';
import DocumentPreviewItem from './document_preview_item';
import Schedule from 'toSvg/schedule.svg?icon';
interface DocumentPreviewPanelProps {
  patientId: number;
}
export default function DocumentPreviewPanel({
  patientId,
}: DocumentPreviewPanelProps) {
  const { isSuccess, isLoading, data, isFetching, refetch } =
    useGetMedicalDocumentsQuery(patientId);
  const openUploadFileModal = () => {
    modal(() => <UploadFileModal patientId={patientId} />, {
      closeOnClickOutside: true,
      isDimmed: true,
      clickThrough: false,
      closeBtn: 'inner',
      width: '30%',
    }).open();
  };
  return (
    <PreviewList
      maxHeight={300}
      flexGrow
      overflow="visible"
      title="Documents"
      buttonNode={
        <DarkLightCornerButton text="Upload" onPress={openUploadFileModal} />
      }
    >
      {isLoading || isFetching ? (
        <LoadingSpinner />
      ) : isSuccess ? (
        data.length > 0 ? (
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
        ) : (
          <VerticalPanel
            title="No Documents available"
            description="Start by upload a document. "
            Icon={<Schedule width={'80%'} height="50%" />} //UI change the Icon to document icon
            backgroundColor={'none'}
            padding={'15px 0px 0 0px'}
            action={{
              text: 'Upload document',
              onClick: openUploadFileModal,
            }}
          />
        )
      ) : (
        <RefetchPanel action={refetch} />
      )}
    </PreviewList>
  );
}
