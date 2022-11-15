import { ReactNode } from 'react';
import './style/index.scss';
interface SimpleInfoContainerProps {
  text: string;
  alignSelf?: 'center' | 'flex-start' | 'flex-end' | 'stretch';
  children?: ReactNode;
}
export default function SimpleInfoContainer({
  text,
  alignSelf,
  children,
}: SimpleInfoContainerProps) {
  return (
    <div className="simple-info-container" css={{ alignSelf: alignSelf }}>
      <span>{text}</span>
      {children}
    </div>
  );
}
