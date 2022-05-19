import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import PreviewList from '@components/preview_list';
import DocumentPreviewItem from './document_preview_item';
interface DocumentPreviewPanelProps {
  documentList: any[];
  onUpload: () => void;
}
export default function DocumentPreviewPanel({
  documentList = [],
  onUpload,
}: DocumentPreviewPanelProps) {
  return (
    <PreviewList
      title="Documents"
      buttonNode={
        <DarkLightCornerButton
          title="Upload"
          isActive={true}
          onPress={onUpload}
        />
      }
    >
      {documentList.map(
        ({ documentName, publishDate, onDelete, onPressHistory }) => (
          <DocumentPreviewItem
            documentName={documentName}
            publishDate={publishDate}
            onDelete={onDelete}
            onPressHistory={onPressHistory}
            key={documentName}
          />
        ),
      )}
    </PreviewList>
  );
}
