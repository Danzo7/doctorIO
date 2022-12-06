import { color } from '@assets/styles/color';
import BorderSeparator from '@components/border_separator';
import { Fragment, ReactNode } from 'react';
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
      {children
        .filter((c) => c && c != undefined)
        .map((child, index, arr) => (
          <Fragment key={index}>
            {child}
            {index != arr.length - 1 && (
              <BorderSeparator color={color.silver_gray} direction="vertical" />
            )}
          </Fragment>
        ))}
    </div>
  );
}
