import { color } from '@assets/styles/color';
import { ReactNode } from 'react';
import './style/index.scss';
interface VerticalPanelProps {
  Icon: ReactNode;
  title: string;
  description?: string;
  action?: { text: string; onClick?: () => void };
  IconBtn?: ReactNode;
  backgroundColor?: string;
  padding?: number | string;
  alignSelf?: 'center' | 'stretch' | 'start' | 'end';
}
export default function VerticalPanel({
  Icon,
  title,
  description,
  action,
  IconBtn,
  backgroundColor = color.secondary_color,
  padding = 20,
  alignSelf,
}: VerticalPanelProps) {
  return (
    <div
      className="vertical-panel"
      css={{
        background: backgroundColor,
        padding: padding,
        boxShadow:
          backgroundColor == 'none' ? undefined : `0 0 5px 2px ${color.darker}`,
        alignSelf: alignSelf,
      }}
    >
      {Icon}
      <span>{title}</span>
      <div className="description-div">
        <span>
          {description}
          {action && <span onClick={action.onClick}>{action.text}</span>}
        </span>
      </div>
      <div className="top-left-btn">{IconBtn}</div>
    </div>
  );
}
