import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import PreviewList from '@components/preview_list';
import UploadFileModal from '@containers/modals/upload_file_modal';
import { useOverlay } from '@libs/overlay/useOverlay';
import { MedicalDocument } from '@models/instance.model';
import DocumentPreviewItem from './document_preview_item';
interface DocumentPreviewPanelProps {
  list: MedicalDocument[];
}
export default function DocumentPreviewPanel({
  list,
}: DocumentPreviewPanelProps) {
  const { open } = useOverlay();
  return (
    <PreviewList
      maxHeight={300}
      title="Documents"
      buttonNode={
        <DarkLightCornerButton
          title="Upload"
          onPress={() => {
            open(<UploadFileModal />, {
              closeOnClickOutside: true,
              isDimmed: true,
              clickThrough: false,
              closeBtn: 'inner',
              width: '30%',
            });
          }}
        />
      }
    >
      {list.map((props, index) => (
        <DocumentPreviewItem {...props} key={props.fileId.toString() + index} />
      ))}
    </PreviewList>
  );
}
