import { color } from '@assets/styles/color';
import { ReactNode } from 'react';
import './style/index.scss';
interface SnakeBarProps {
  description: string;
  type?: 'error' | 'info' | 'warning';
  children?: ReactNode;
  backgroundColor?: string;
}
export default function SnakeBar({
  description,
  children,
  type = 'error',
  backgroundColor = color.lighter_background,
}: SnakeBarProps) {
  return (
    <div
      className={`snake-bar ${type}`}
      css={{ backgroundColor: backgroundColor }}
    >
      <span>{description}</span>
      {children}
    </div>
  );
}
