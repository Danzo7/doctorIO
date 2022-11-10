import './style/index.scss';
import Loading from 'toSvg/loading_logo.svg?icon';

interface LoadingSpinnerProps {}
export default function LoadingSpinner({}: LoadingSpinnerProps) {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <Loading width={50} height={50} />
      </div>
    </div>
  );
}
