import { color } from '@assets/styles/color';
import CircleAvatar from '@components/avatars/circle_avatar';
import './style/index.scss';
import AddImage from 'toSvg/add_image.svg?icon';
interface LogoChangerProps {
  src: string;
  width: number;
  onPress?: () => void;
}
export default function LogoChanger({
  src,
  width = 100,
  onPress,
}: LogoChangerProps) {
  return (
    <div className="logo-changer" onClick={onPress}>
      <div
        className="logo-changer-small-indicator"
        css={{ width: width * 0.3, height: width * 0.3 }}
      >
        <AddImage
          width={width / 8}
          height={width / 8}
          css={{ '>path': { fill: color.silver_gray } }}
        />
      </div>
      <div className="circle-avatar-wrapper">
        <CircleAvatar
          src={src}
          width={width}
          alt="Change Logo"
          border={`${(width * 5) / 100}px solid ${color.hot_purple} `}
        />
      </div>
    </div>
  );
}
