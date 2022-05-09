import HomeContent from './pages/home';
import './index.scss';
import { Routes, Route } from 'react-router-dom';
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

        {/* lazy route example */}
        <Route
          path="messages"
          element={
            <Suspense fallback={<>Loading</>}>
              <Messages />
            </Suspense>
          }
        />
        <Route path="clinic" element={<Clinics selected={0} />} />
      </Routes>
    </div>
  );
}

export default AppContent;
