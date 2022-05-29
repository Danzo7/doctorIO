import HomeContent from './pages/home';
import './index.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Statistics from './pages/statistics';
import Records from './pages/records';
import Data from './pages/data';
import Queues from './pages/queues';
const Messages = lazy(() => import('./pages/messages'));
const Clinic = lazy(() => import('./pages/clinic'));

interface AppContentProps {}

function AppContent({}: AppContentProps) {
  return (
    <div className="AppContent">
      <Routes>
        {/* route example */}
        <Route path="/" element={<HomeContent />} />
        <Route path="queue" element={<Queues />} />
        <Route
          path="messages/:category/*"
          element={
            <Suspense fallback={<>Loading</>}>
              <Messages />
            </Suspense>
          }
        />
        <Route path="stats" element={<Statistics />} />
        <Route path="records" element={<Records />} />
        <Route path="data" element={<Data />} />
        <Route
          path="clinic/*"
          element={
            <Suspense fallback={<>Loading</>}>
              <Clinic />
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to={''} replace={true} />} />
      </Routes>
    </div>
  );
}

export default AppContent;
