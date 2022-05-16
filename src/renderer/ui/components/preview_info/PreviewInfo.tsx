import './style/index.scss';
interface PreviewInfoProps {
  title: string;
  previewInfoObj: object;
}
export default function PreviewInfo({
  title,
  previewInfoObj = {},
}: PreviewInfoProps) {
  return (
    <div className="preview-info">
      <span>{title}</span>
      <div className="preview-list-container">
        {Object.entries(previewInfoObj).map(([key, value]) => (
          <div className="preview-list-row" key={key}>
            <span>{key}</span>
            <span>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
