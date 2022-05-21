import './style/index.scss';
interface CircleAvatarProps {
  src: string;
  width: number;
  alt?: string;
  radius?: number | string;
  border?: string;
}
function CircleAvatar({
  src,
  width,
  alt,
  radius = '100%',
  border,
}: CircleAvatarProps) {
  return (
    <div
      className="circle-avatar"
      css={{
        borderRadius: radius,
        border: border,
      }}
    >
      <img
        css={{
          width: width,
        }}
        src={src}
        alt={alt}
      />
    </div>
  );
}

export default CircleAvatar;
