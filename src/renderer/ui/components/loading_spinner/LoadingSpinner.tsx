import { color } from '@assets/styles/color';
import './style/index.scss';
interface LoadingSpinnerProps {
  borderTopColor?: string;
  borderColor?: string;
  borderWidth?: number;
}
export default function LoadingSpinner({
  borderTopColor = color.border_color,
  borderColor = color.secondary_color,
  borderWidth = 3,
}: LoadingSpinnerProps) {
  return (
    <div className="loading-container">
      <div
        className="loading-spinner"
        css={{
          borderWidth: borderWidth,
          borderColor: borderColor,
          borderTopColor: borderTopColor,
        }}
      />
    </div>
  );
}
