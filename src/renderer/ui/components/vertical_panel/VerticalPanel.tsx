import { color } from '@assets/styles/color';
import { MouseEvent, ReactNode } from 'react';
import './style/index.scss';
interface VerticalPanelProps {
  Icon?: ReactNode;
  title?: string;
  description?: string;
  action?: {
    text: string;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  };
  IconBtn?: ReactNode;
  backgroundColor?: string;
  padding?: number | string;
  alignSelf?: 'center' | 'stretch' | 'start' | 'end';
  height?: number | string;
  flexGrow?: true;
  bottomControls?: ReactNode;
}
export default function VerticalPanel({
  Icon,
  title,
  description,
  action,
  IconBtn,
  backgroundColor,
  padding = 20,
  alignSelf,
  height,
  flexGrow,
  bottomControls,
}: VerticalPanelProps) {
  return (
    <div
      className="vertical-panel"
      css={{
        background: backgroundColor,
        padding: padding,
        boxShadow: backgroundColor ? `0 0 5px 2px ${color.darker}` : undefined,
        alignSelf: alignSelf,
        height,
        maxHeight: height,
        minHeight: height,

        flexGrow: flexGrow ? 1 : 0,
      }}
    >
      {Icon}
      {title && <span>{title}</span>}
      {(description || action) && (
        <div className="description-div">
          <span>
            {description}
            {action && <span onClick={action.onClick}>{action.text}</span>}
          </span>
        </div>
      )}
      {bottomControls}
      {IconBtn && <div className="top-left-btn">{IconBtn}</div>}
    </div>
  );
}
