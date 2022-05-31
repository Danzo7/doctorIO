import colors from '@colors';
import './style/index.scss';
interface BorderSeparatorProps {
  direction: 'vertical' | 'horizontal';
  color?: string;
}
export default function BorderSeparator({
  direction,
  color = colors.border_color,
}: BorderSeparatorProps) {
  return (
    <div
      className={`border-separator`}
      css={{
        borderRight: direction == 'vertical' ? `1px solid ${color}` : undefined,
        borderTop: direction == 'horizontal' ? `1px solid ${color}` : undefined,
      }}
    />
  );
}
