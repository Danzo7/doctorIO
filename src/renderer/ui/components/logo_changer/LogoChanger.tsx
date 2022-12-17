import { color } from '@assets/styles/color';
import CircleAvatar from '@components/avatars/circle_avatar';
import './style/index.scss';
import AddImage from 'toSvg/add_image.svg?icon';
interface LogoChangerProps {
  src?: string;
  width: number;
  alt: string;
  onChange?: (src: File) => void;
  direct?: boolean;
}

export default function LogoChanger({
  src,
  width = 100,
  onChange,
  alt,
  direct,
}: LogoChangerProps) {
  const uploadImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/png, image/jpeg';
    input.onchange = (_) => {
      const files: FileList = input.files as FileList;

      onChange?.(files[0]);
    };
    input.click();
  };
  return (
    <div className="logo-changer" onClick={uploadImage}>
      <div
        className="logo-changer-small-indicator"
        css={{ width: width * 0.3, height: width * 0.3 }}
      >
        <AddImage css={{ '>path': { fill: color.silver_gray } }} />
      </div>
      <div className="circle-avatar-wrapper">
        <CircleAvatar
          src={src}
          width={width}
          alt={alt}
          border={`${(width * 5) / 100}px solid ${color.hot_purple} `}
          direct={direct}
        />
      </div>
      <span className="change-logo-span">Change Icon</span>
    </div>
  );
}
