import KeyValueItem from './key_value_item';
import './style/index.scss';
interface LatestTestResultPanelProps {
  data: { [key: string]: string };
}
export default function LatestTestResultPanel({
  data,
}: LatestTestResultPanelProps) {
  return (
    <div className="latest-test-result-panel">
      {Object.entries(data).map(([key, value]) => (
        <KeyValueItem primaryText={key} secondaryText={value} key={key} />
      ))}
    </div>
  );
}
