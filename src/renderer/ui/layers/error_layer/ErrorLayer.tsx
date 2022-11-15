import ErrorPanel from '@components/error_panel';

interface ErrorLayerProps {}

export default function ErrorLayer({}: ErrorLayerProps) {
  return (
    <div className="app-container" css={{ alignItems: 'center' }}>
      <ErrorPanel />
    </div>
  );
}
