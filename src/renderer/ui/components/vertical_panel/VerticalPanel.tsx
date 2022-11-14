import { FunctionComponent, SVGProps } from 'react';
import './style/index.scss';
interface VerticalPanelProps {
  Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  iconSize?: number | string;
  title: string;
  description: string;
  action?: { text: string; onClick?: () => void };
  IconBtn?: {
    icon: FunctionComponent<SVGProps<SVGSVGElement>>;
    onClick?: () => void;
  };
}
export default function VerticalPanel({
  Icon,
  iconSize = 40,
  title,
  description,
  action,
  IconBtn,
}: VerticalPanelProps) {
  return (
    <div className="vertical-panel">
      <Icon width={iconSize} height={iconSize} />
      <span>{title}</span>
      <div className="description-div">
        <span>{description}</span>
        {action && <span onClick={action.onClick}>{action.text}</span>}
      </div>
      {IconBtn && (
        <IconBtn.icon className="iconBtn" onClick={IconBtn.onClick} />
      )}
    </div>
  );
}
