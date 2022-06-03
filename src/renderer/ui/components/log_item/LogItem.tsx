import BorderSeparator from '@components/border_separator';
import TextPair from '@components/text_pair/TextPair';
import './style/index.scss';
interface LogItemProps {
  actionDispatcher: string;
  id: string;
  logTime: string;
  actionName: string;
  actionTo: string;
}
export default function LogItem({
  actionDispatcher,
  id,
  logTime,
  actionName,
  actionTo,
}: LogItemProps) {
  return (
    <div className="log-item">
      <div className="log-info-container">
        <div className="name-id-container">
          <span>{actionDispatcher}</span>
          <span>#{id}</span>
        </div>
        <span>{logTime}</span>
      </div>
      <BorderSeparator direction="vertical" />
      <TextPair first={actionName} second={actionTo} />
    </div>
  );
}
