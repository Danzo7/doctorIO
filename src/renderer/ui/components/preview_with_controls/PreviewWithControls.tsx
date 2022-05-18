import './style/index.scss';
import { ReactNode } from 'react';
interface PreviewWithControlsProps {
  primaryText: string;
  secondaryText: string;
  children?: ReactNode;
}
export default function PreviewWithControls({
  primaryText,
  secondaryText,
  children,
}: PreviewWithControlsProps) {
  return (
    <div className="preview-with-controls">
      <div className="preview-spans">
        <span>{primaryText}</span>
        <span>{secondaryText}</span>
      </div>
      <div className="controls-container">{children}</div>
    </div>
  );
}
