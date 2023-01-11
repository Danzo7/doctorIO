import './style/index.scss';
interface ImageItemProps {
  url: string;
  width?: number;
  height?: number;
  alt: string;
  onClick?: () => void;
}
export default function ImageItem({
  url,
  width = 200,
  height = 200,
  alt,
  onClick,
}: ImageItemProps) {
  return (
    <div className="image-item" onClick={onClick}>
      <img src={url} width={width} height={height} alt={alt} />
    </div>
  );
}
