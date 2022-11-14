import { ReactNode } from 'react';
import './style/index.scss';
interface VerticalPanelProps {
  Icon: ReactNode;
  title: string;
  description: string;
  action?: { text: string; onClick?: () => void };
  IconBtn?: ReactNode;
}
export default function VerticalPanel({
  Icon,
  title,
  description,
  action,
  IconBtn,
}: VerticalPanelProps) {
  return (
    <div className="vertical-panel">
      {Icon}
      <span>{title}</span>
      <div className="description-div">
        <span>
          {description}{' '}
          {action && <span onClick={action.onClick}>{action.text}</span>}
        </span>
      </div>
      <div className="top-left-btn">{IconBtn}</div>
    </div>
  );
}
