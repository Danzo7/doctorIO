import PreviewList from '@components/preview_list';
import DocumentPreviewItem from './document_preview_item';
interface DocumentPreviewPanelProps {
  documentList: any[];
}
export default function DocumentPreviewPanel({
  documentList = [],
}: DocumentPreviewPanelProps) {
  return (
    <PreviewList title="Documents" buttonText="Upload">
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
