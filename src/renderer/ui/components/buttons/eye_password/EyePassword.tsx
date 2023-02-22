import IconicButton from '../iconic_button';
import './style/index.scss';
import Eye from 'toSvg/eye.svg?icon';
import NoEye from 'toSvg/no_eye.svg?icon';

interface EyePasswordProps {
  onPress: () => void;
  value: boolean;
}
export default function EyePassword({ onPress, value }: EyePasswordProps) {
  return (
    <IconicButton
      Icon={!value ? NoEye : Eye}
      onPress={onPress}
      iconSize={17}
      blank
      type="button"
      unFocusable
    />
  );
}
