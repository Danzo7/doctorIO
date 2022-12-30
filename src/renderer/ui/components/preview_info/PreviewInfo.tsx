import PreviewList from '@components/preview_list';
import { ReactNode } from 'react';
import './style/index.scss';
import { sentenceCase } from '@shipengine/capitalization';
interface PreviewInfoProps {
  title: string;
  buttonNode?: ReactNode;
  data: { [key: string]: any };
}

export default function PreviewInfo({
  title,
  buttonNode,
  data,
}: PreviewInfoProps) {
  return (
    <PreviewList title={title} buttonNode={buttonNode} overflow="visible">
      <div className="preview-list-container">
        {Object.entries(data).map(([key, value]) => (
          <div className="preview-list-row" key={key}>
            <span>{sentenceCase(key)}</span>
            <span>{value}</span>
          </div>
        ))}
      </div>
    </PreviewList>
  );
}
