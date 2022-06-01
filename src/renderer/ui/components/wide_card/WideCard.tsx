import BorderSeparator from '@components/border_separator';
import { ReactNode } from 'react';
import './style/index.scss';
interface WideCardProps {
  children: ReactNode[];
  borderColor?: string;
}
export default function WideCard({ borderColor, children }: WideCardProps) {
  return (
    <div
      className="wide-card"
      css={{
        border: borderColor && `1px solid ${borderColor}`,
        boxShadow:
          borderColor &&
          `0 0px 1px ${borderColor} inset, 0 0 3px 
      ${borderColor}`,
      }}
    >
      {children.map((child, index) => (
        <>
          {child}
          {index != children.length - 1 && (
            <BorderSeparator color={borderColor} direction="vertical" />
          )}
        </>
      ))}
    </div>
  );
}