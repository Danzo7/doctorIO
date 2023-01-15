import { ReactNode } from 'react';
import './style/index.scss';
interface ControlTooltipProps {
  children: ReactNode | ReactNode[];
}
export default function ControlTooltip({ children }: ControlTooltipProps) {
  return (
    <span className="control-tooltip" contentEditable={false}>
      {children}
    </span>
  );
}
