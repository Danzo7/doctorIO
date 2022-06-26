import './style/index.scss';
interface BadgeProps {
  text: string;
  backgroundColor?: string;
}
export default function Badge({ text, backgroundColor }: BadgeProps) {
  return (
    <div className="badge" css={{ backgroundColor: backgroundColor }}>
      {text}
    </div>
  );
}
