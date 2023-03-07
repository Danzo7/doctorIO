import './style/index.scss';
import Loading from 'toSvg/loading_logo.svg?icon';

interface LoadingSpinnerProps {
  width?: number | string;
  height?: number | string;
}
export default function LoadingSpinner({
  width,
  height = 50,
}: LoadingSpinnerProps) {
  return (
    <div className="loading-container" css={{ width: width, height: height }}>
      <div className="loading-spinner">
        <Loading width={50} height={50} />
      </div>
    </div>
  );
}
