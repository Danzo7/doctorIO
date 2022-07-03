import PreviewList from '@components/preview_list';
import { ReactNode } from 'react';
import './style/index.scss';
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
  const sentenceCase = (val: string) =>
    val
      .replace(/([A-Z])/g, ' $1')
      .split(' ')
      .map((str, index) =>
        index == 0
          ? str.replace(str.charAt(0), str.charAt(0).toUpperCase())
          : str.toLowerCase(),
      )
      .join(' ');
  return (
    <PreviewList title={title} buttonNode={buttonNode} notScrollable>
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
