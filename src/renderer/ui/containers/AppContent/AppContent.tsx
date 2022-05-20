import HomeContent from './pages/home';
import './index.scss';
import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Statistics from './pages/statistics';
import Records from './pages/records';
import Data from './pages/data';
import Clinic from './pages/clinic';
const Messages = lazy(() => import('./pages/messages'));

interface AppContentProps {}

function AppContent({}: AppContentProps) {
  return (
    <div className="AppContent">
      <Routes>
        {/* route example */}
        <Route path="/" element={<HomeContent />} />
        <Route
          path="messages/:category/*"
          element={
            <Suspense fallback={<>Loading</>}>
              <Messages />
            </Suspense>
          }
        />{' '}
        <Route path="stats" element={<Statistics />} />
        <Route path="records" element={<Records />} />
        <Route path="data" element={<Data />} />
        <Route path="clinic/*" element={<Clinic />} />
      </Routes>
    </div>
  );
}

export default AppContent;
