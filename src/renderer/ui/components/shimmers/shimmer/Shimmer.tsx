import { CSSProperties, ComponentProps } from 'react';
import './style/index.scss';
import ShimmerDiv from '../shimmer_div';
interface ShimmerProps extends ComponentProps<typeof ShimmerDiv> {
  length: number;
  direction?: CSSProperties['flexDirection'];
}
export default function Shimmer({ length, direction, ...props }: ShimmerProps) {
  return (
    <div className="shimmer" css={{ flexDirection: direction }}>
      {Array(length)
        .fill(0)
        .map((_, index) => (
          <ShimmerDiv key={index} {...props} />
        ))}
    </div>
  );
}
