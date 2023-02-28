import Backdrop from '@components/backdrop';
import './style/index.scss';
import addIcon from 'toSvg/add.svg?icon';
import removeIcon from 'toSvg/trash_can.svg?icon';
import IconicButton from '@components/buttons/iconic_button';
import { color } from '@assets/styles/color';
interface ImageItemProps {
  url: string;
  height?: number;
  width?: number;
  alt?: string;
  onAdd?: () => void;
  onRemove?: () => void;
}
export default function ImageItem({
  url,
  alt,
  height = 200,
  width,
  onAdd,
  onRemove,
}: ImageItemProps) {
  return (
    <Backdrop
      node={
        <div css={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
          <IconicButton
            Icon={addIcon}
            onPress={onAdd}
            iconSize={20}
            borderColor={color.cold_blue}
            afterBgColor={color.cold_blue}
          />
          <IconicButton
            Icon={removeIcon}
            onPress={onRemove}
            borderColor={color.hot_red}
            afterBgColor={color.hot_red}
            iconAfterColor={color.white}
          />
        </div>
      }
      when={'blur'}
    >
      <div className="image-item" css={{ height, width }}>
        <img src={url} alt={alt} />
      </div>
    </Backdrop>
  );
}
