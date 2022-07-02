import './index.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { currentMemberPermissions } from '@api/fake';
import { isAllowed } from '@helpers/permission.helper';
const Messages = lazy(() => import('./pages/messages'));
const Clinic = lazy(() => import('./pages/clinic'));
const HomeContent = lazy(() => import('./pages/home'));
const Queues = lazy(() => import('./pages/queues'));
const Records = lazy(() => import('./pages/records'));
const Data = lazy(() => import('./pages/data'));
const Statistics = lazy(() => import('./pages/statistics'));
//const Settings = lazy(() => import('./pages/settings'));

interface AppContentProps {}

function AppContent({}: AppContentProps) {
  //REDUX getCurrentPermissions
  const permissions = currentMemberPermissions;
  return (
    <div className="AppContent">
      <Routes>
        {
          <Route
            path="/"
            element={
              <Suspense fallback={<>Loading</>}>
                <HomeContent />
              </Suspense>
            }
          />
        }
        {isAllowed('canHaveQueue', permissions) && (
          <Route
            path="queue"
            element={
              <Suspense fallback={<>Loading</>}>
                <Queues />
              </Suspense>
            }
          />
        )}
        {isAllowed('canViewMedicalRecords', permissions) && (
          <Route
            path="records/*"
            element={
              <Suspense fallback={<>Loading</>}>
                <Records />
              </Suspense>
            }
          />
        )}
        {isAllowed('canUseMessages', permissions) && (
          <Route
            path="messages/:category/*"
            element={
              <Suspense fallback={<>Loading</>}>
                <Messages />
              </Suspense>
            }
          />
        )}
        {isAllowed('canViewClinicInsight', permissions) && (
          <Route
            path="statistics"
            element={
              <Suspense fallback={<>Loading</>}>
                <Statistics />
              </Suspense>
            }
          />
        )}
        {isAllowed('canManageDataCollection', permissions) && (
          <Route
            path="data"
            element={
              <Suspense fallback={<>Loading</>}>
                <Records />
              </Suspense>
            }
          />
        )}
        {isAllowed('canHaveQueue', permissions) && (
          <Route
            path="queue"
            element={
              <Suspense fallback={<>Loading</>}>
                <Data />
              </Suspense>
            }
          />
        )}
        {isAllowed('canManageClinic', permissions) && (
          <Route
            path="clinic/*"
            element={
              <Suspense fallback={<>Loading</>}>
                <Clinic />
              </Suspense>
            }
          />
        )}
        <Route path="*" element={<Navigate to={''} replace={true} />} />
      </Routes>
    </div>
  );
}

export default AppContent;
