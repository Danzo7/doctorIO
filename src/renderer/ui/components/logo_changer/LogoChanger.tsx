import { color } from '@assets/styles/color';
import CircleAvatar from '@components/avatars/circle_avatar';
import './style/index.scss';
import AddImage from 'toSvg/add_image.svg?icon';
import { useState } from 'react';
interface LogoChangerProps {
  src?: string;
  width: number;
  onChange?: (src: string) => void;
}

export default function LogoChanger({
  src,
  width = 100,
  onChange,
}: LogoChangerProps) {
  const [selectedImage, setSelectedImage] = useState(src);
  const uploadImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (_) => {
      const files: FileList = input.files as FileList;
      setSelectedImage(URL.createObjectURL(files[0]));
      onChange?.(URL.createObjectURL(files[0]));
    };
    input.click();
  };
  return (
    <div className="logo-changer" onClick={uploadImage}>
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
          src={selectedImage}
          width={width}
          alt="Change Logo"
          border={`${(width * 5) / 100}px solid ${color.hot_purple} `}
        />
      </div>
      <span className="change-logo-span">Change Icon</span>
    </div>
  );
}
