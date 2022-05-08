import HomeContent from './pages/home';
import './index.scss';
import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
const Messages = lazy(() => import('./pages/messages'));

interface AppContentProps {}

function AppContent({}: AppContentProps) {
  return (
    <div className="AppContent">
      <Routes>
        {/* lazy route example */}

        <Route
          path="messages"
          element={
            <Suspense fallback={<>Loading</>}>
              <Messages />
            </Suspense>
          }
        />
        {/* route example */}

        <Route path="/" element={<HomeContent />} />
      </Routes>
    </div>
  );
}

export default AppContent;
