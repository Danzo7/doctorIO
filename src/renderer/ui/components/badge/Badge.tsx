import { ReactNode } from 'react';
import './style/index.scss';
import { color as colors } from '@colors';
import { IS_PREVIEW } from '@constants/env';
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
  badge?: 'preview' | 'new';
}

export function Badged({
  text,
  color,
  children,
  skip,
  badge,
}: Partial<BadgedProps>) {
  if (badge == 'preview' && !IS_PREVIEW && !skip) return <></>;
  const set =
    badge == 'preview'
      ? { text: 'pre', color: colors.hot_red }
      : badge == 'new'
      ? { text: 'new', color: colors.hot_red }
      : { text, color };
  return skip ? (
    <>{children}</>
  ) : (
    <div className="badged-item">
      <Badge text={set.text} color={set.color} />
      {children}
    </div>
  );
}
