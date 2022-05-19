import './style/index.scss';
interface KeyValueItemProps {
  primaryText: string;
  secondaryText: string;
}
export default function KeyValueItem({
  primaryText,
  secondaryText,
}: KeyValueItemProps) {
  return (
    <div className="key-value-item">
      <span>{primaryText}</span>
      <span>{secondaryText}</span>
    </div>
  );
}
