import './style/index.scss';
interface LoadingSpinnerProps {}
export default function LoadingSpinner({}: LoadingSpinnerProps) {
  return (
    <div className="loading-container">
      <div className="loading-spinner" />
    </div>
  );
}
