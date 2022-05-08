import './style/index.scss';
import Status from 'toSvg/status.svg?icon';
interface MemberStatusProps {
  memberFullName: string;
  status: boolean;
}
export default function MemberStatus({
  memberFullName,
  status,
}: MemberStatusProps) {
  return (
    <div className={`member-status ${status ? 'online' : 'offline'} `}>
      <span>{memberFullName}</span>
      <Status />
    </div>
  );
}
