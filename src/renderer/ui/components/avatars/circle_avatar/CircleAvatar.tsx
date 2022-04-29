import './style/index.scss';
interface CircleAvatarProps {
  src: string;
  width: number;
  alt?: string;
  radius?: number;
}
function CircleAvatar({ src, width, alt, radius }: CircleAvatarProps) {
  return (
    <div className="circle-avatar" css={{ borderRadius: radius }}>
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
