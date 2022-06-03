import PreviewList from '@components/preview_list';
import { ReactNode } from 'react';
import './style/index.scss';
interface PreviewInfoProps {
  title: string;
  buttonNode?: ReactNode;
  data: { [key: string]: string };
}
export default function PreviewInfo({
  title,
  buttonNode,
  data,
}: PreviewInfoProps) {
  return (
    <PreviewList title={title} buttonNode={buttonNode} notScrollable>
      <div className="preview-list-container">
        {Object.entries(data).map(([key, value]) => (
          <div className="preview-list-row" key={key}>
            <span>{key}</span>
            <span>{value}</span>
          </div>
        ))}
      </div>
    </PreviewList>
  );
}
