import './style/index.scss';
import Close from 'toSvg/x_mark.svg?icon';
interface SmallRolePreviewProps {
  roleName: string;
  onClick?: () => void;
}

function SmallRolePreview({ roleName, onClick }: SmallRolePreviewProps) {
  return (
    <div onClick={onClick} className="small-roll">
      <span>{roleName}</span>
      <Close css={{ width: 7, height: 7 }} />
    </div>
  );
}

export default SmallRolePreview;
