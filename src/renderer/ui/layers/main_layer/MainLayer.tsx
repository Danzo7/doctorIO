import AppContent from '@containers/AppContent';
import AppMenu from '@containers/AppMenu';
import AppSidebar from '@containers/AppSidebar';
import MedicalSession from '@layers/medical_session';
import { Routes, Route } from 'react-router-dom';

interface MainLayerProps {}
export default function MainLayer({}: MainLayerProps) {
  return (
    <Routes>
      <Route path="session" element={<MedicalSession />} />
      <Route
        path="*"
        element={
          <>
            <AppMenu />
            <AppContent />
            <AppSidebar />
          </>
        }
      />
    </Routes>
  );
}
