import Backdrop from '@components/backdrop';
import './style/index.scss';
import addIcon from 'toSvg/add.svg?icon';
import removeIcon from 'toSvg/trash_can.svg?icon';
import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
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
        <>
          <SquareIconButton Icon={addIcon} onPress={onAdd} />
          <SquareIconButton Icon={removeIcon} onPress={onRemove} />
        </>
      }
      when={'blur'}
    >
      <div className="image-item" css={{ height, width }}>
        <img src={url} alt={alt} />
      </div>
    </Backdrop>
  );
}
