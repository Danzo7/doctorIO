import { color } from '@assets/styles/color';
import './style/index.scss';

interface ShimmerDivProps {
  backgroundColor?: string;
  borderRadius?: number | string;
  width?: string | number;
  height?: string | number;
  padding?: string | number;
}
export default function ShimmerDiv({
  backgroundColor = color.light,
  borderRadius = 7,
  width = '100%',
  height = '100%',
  padding,
}: ShimmerDivProps) {
  return (
    <div
      className="shimmer-div"
      css={{
        backgroundColor: backgroundColor,
        borderRadius: borderRadius,
        width: width,
        height: height,
        padding: padding,
      }}
    />
  );
}
