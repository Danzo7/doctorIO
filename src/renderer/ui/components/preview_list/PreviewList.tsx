import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import { ReactNode } from 'react';
import './style/index.scss';
interface PreviewListProps {
  title: string;
  buttonText: string;
  children?: ReactNode;
}
export default function PreviewList({
  title,
  buttonText,
  children,
}: PreviewListProps) {
  return (
    <div className="preview-list">
      <div className="preview-list-header">
        <span>{title}</span>
        <DarkLightCornerButton title={buttonText} isActive={true} />
      </div>
      <div className="preview-list-wrapper">{children}</div>
    </div>
  );
}
