import { ReactNode } from 'react';
import './style/index.scss';
import { color as colors } from '@colors';
interface BadgeProps {
  text?: string;
  color?: string;
}
export default function Badge({ text, color }: BadgeProps) {
  return (
    <div className="badge" css={{ backgroundColor: color }}>
      {text}
    </div>
  );
}
interface BadgedProps extends BadgeProps {
  children: ReactNode;
  skip?: boolean;
  pre?: 'preview' | 'new';
}

export function Badged({
  text,
  color,
  children,
  skip,
  pre,
}: Partial<BadgedProps>) {
  const set =
    pre == 'preview'
      ? { text: 'preview', color: colors.hot_red }
      : pre == 'new'
      ? { text: 'new', color: colors.hot_red }
      : { text, color };
  console.log(skip);
  return skip ? (
    <>{children}</>
  ) : (
    <div className="badged-item">
      <Badge text={set.text} color={set.color} />
      {children}
    </div>
  );
}
