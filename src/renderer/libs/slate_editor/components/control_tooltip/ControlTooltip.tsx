import { ReactNode } from 'react';
import './style/index.scss';
interface ControlTooltipProps {
  children: ReactNode | ReactNode[];
  direction?: 'top' | 'bottom';
}
export default function ControlTooltip({
  children,
  direction,
}: ControlTooltipProps) {
  return (
    <span
      className="control-tooltip"
      contentEditable={false}
      css={
        direction == 'top'
          ? { bottom: 'calc(100% + 5px)' }
          : { top: 'calc(100% + 5px)' }
      }
    >
      {children}
    </span>
  );
}
