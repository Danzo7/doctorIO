import BorderSeparator from '@components/border_separator';
import { ReactNode } from 'react';
import './style/index.scss';
interface WideCardProps {
  children: ReactNode[];
}
export default function WideCard({ children }: WideCardProps) {
  return (
    <div className="wide-card">
      {children.map((child, index) => (
        <>
          {child}
          {index != children.length - 1 && (
            <BorderSeparator direction="vertical" />
          )}
        </>
      ))}
    </div>
  );
}
