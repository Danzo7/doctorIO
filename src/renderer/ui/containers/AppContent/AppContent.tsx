import HomeContent from './pages/home';
import './index.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Clinics from './pages/clinics';
const Messages = lazy(() => import('./pages/messages'));

interface AppContentProps {}

function AppContent({}: AppContentProps) {
  return (
    <div className="AppContent">
      <Routes>
        {/* route example */}
        <Route path="/" element={<HomeContent />} />
        <Route path="messages" element={<Navigate to="@clinic" />} />
        <Route
          path="messages/:category/*"
          element={
            <Suspense fallback={<>Loading</>}>
              <Messages />
            </Suspense>
          }
        />
        {/* lazy route example */}

        <Route path="clinic" element={<Clinics selected={0} />} />
      </Routes>
    </div>
  );
}

export default AppContent;
