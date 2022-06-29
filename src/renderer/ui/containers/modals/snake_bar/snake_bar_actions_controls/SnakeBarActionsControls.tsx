import { ReactNode } from 'react';
import './style/index.scss';
interface SnakeBarActionsControlsProps {
  children: ReactNode;
}
export default function SnakeBarActionsControls({
  children,
}: SnakeBarActionsControlsProps) {
  return <div className="snake-bar-actions-controls">{children}</div>;
}
