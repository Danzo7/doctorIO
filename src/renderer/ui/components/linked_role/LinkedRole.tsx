import './style/index.scss';
import Icon from 'toSvg/link.svg?icon';
interface LinkedRoleProps {
  linkedRole: string;
  linkedText: string;
}
export default function LinkedRole({
  linkedText,
  linkedRole,
}: LinkedRoleProps) {
  return (
    <div className="linked-role">
      <span>{linkedText}</span>
      <Icon />
      <div className="linked-role-span">
        <span>{linkedRole}</span>
      </div>
    </div>
  );
}
