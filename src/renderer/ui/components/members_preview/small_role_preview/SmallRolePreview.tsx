import './style/index.scss';
import Close from 'toSvg/x_mark.svg?icon';
import TextButton from '@components/buttons/text_button';
import { color } from '@colors';
interface SmallRolePreviewProps {
  roleName: string;
  onClick?: () => void;
  canRemove?: boolean;
}

function SmallRolePreview({
  roleName,
  onClick,
  canRemove,
}: SmallRolePreviewProps) {
  return (
    <TextButton
      backgroundColor={color.border_color}
      onPress={canRemove ? onClick : undefined}
      cursor={canRemove ? 'pointer' : 'default'}
      afterBgColor={canRemove ? color.hot_red : undefined}
      className="small-role"
    >
      <span>{roleName}</span>
      {canRemove && <Close css={{ width: 7, height: 7 }} />}
    </TextButton>
  );
}

export default SmallRolePreview;
