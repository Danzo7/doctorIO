import './style/index.scss';
interface BorderSeparatorProps {
  direction: 'vertical' | 'horizontal';
}
export default function BorderSeparator({ direction }: BorderSeparatorProps) {
  return (
    <div
      className={`border-separator ${
        direction == 'vertical' ? 'vertical' : 'horizontal'
      }`}
    />
  );
}
