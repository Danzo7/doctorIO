import './style/index.scss';
interface PreviewInfoProps {
  title: string;
  data: { [key: string]: string };
}
export default function PreviewInfo({ title, data }: PreviewInfoProps) {
  return (
    <div className="preview-info">
      <span>{title}</span>
      <div className="preview-list-container">
        {Object.entries(data).map(([key, value]) => (
          <div className="preview-list-row" key={key}>
            <span>{key}</span>
            <span>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
