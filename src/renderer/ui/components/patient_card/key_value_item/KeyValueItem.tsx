import './style/index.scss';
interface KeyValueItemProps {
  primaryText: string;
  secondaryText: string;
  width?: number | string;
}
export default function KeyValueItem({
  primaryText,
  secondaryText,
  width = '30%',
}: KeyValueItemProps) {
  return (
    <div className="key-value-item" css={{ width: width }}>
      <span>{primaryText}</span>
      <span>{secondaryText}</span>
    </div>
  );
}
