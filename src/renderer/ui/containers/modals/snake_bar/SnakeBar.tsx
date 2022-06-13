import { ReactNode } from 'react';
import './style/index.scss';
interface SnakeBarProps {
  description: string;
  type?: 'error' | 'info' | 'warning';
  children?: ReactNode;
}
export default function SnakeBar({
  description,
  children,
  type = 'error',
}: SnakeBarProps) {
  return (
    <div className={`snake-bar ${type}`}>
      <span>{description}</span>
      {children}
    </div>
  );
}
