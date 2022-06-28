import './style/index.scss';
import Close from 'toSvg/x_mark.svg?icon';
import TextButton from '@components/buttons/text_button';
import { color } from '@colors';
interface SmallRolePreviewProps {
  roleName: string;
  onClick?: () => void;
}

function SmallRolePreview({ roleName, onClick }: SmallRolePreviewProps) {
  return (
    <TextButton
      borderColor={color.border_color}
      onPress={onClick}
      className="small-role"
    >
      <span>{roleName}</span>
      <Close css={{ width: 7, height: 7 }} />
    </TextButton>
  );
}

export default SmallRolePreview;
