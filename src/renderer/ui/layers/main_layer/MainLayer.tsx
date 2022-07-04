import AppContent from '@containers/AppContent';
import AppMenu from '@containers/AppMenu';
import AppSidebar from '@containers/AppSidebar';

interface MainLayerProps {}
export default function MainLayer({}: MainLayerProps) {
  return (
    <>
      <AppMenu />
      <AppContent />
      <AppSidebar />
    </>
  );
}
