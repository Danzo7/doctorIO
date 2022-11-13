import './style/index.scss';
interface SimpleInfoContainerProps {
  text: string;
  alignSelf?: 'center' | 'flex-start' | 'flex-end' | 'stretch';
}
export default function SimpleInfoContainer({
  text,
  alignSelf,
}: SimpleInfoContainerProps) {
  return (
    <div className="simple-info-container" css={{ alignSelf: alignSelf }}>
      <span>{text}</span>
    </div>
  );
}
//UI: add good comp
