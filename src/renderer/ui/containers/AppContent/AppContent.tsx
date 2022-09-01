import './index.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { currentMemberPermissions } from '@api/fake';
import { isAllowed } from '@helpers/permission.helper';
import LoadingSpinner from '@components/loading_spinner';
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
              <Suspense fallback={<LoadingSpinner />}>
                <HomeContent />
              </Suspense>
            }
          />
        }
        {isAllowed('CAN_HAVE_QUEUE', permissions) && (
          <Route
            path="queue"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <Queues />
              </Suspense>
            }
          />
        )}
        {isAllowed('CAN_VIEW_RECORDS', permissions) && (
          <Route
            path="records/*"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <Records />
              </Suspense>
            }
          />
        )}
        {isAllowed('CAN_HAVE_MESSAGES', permissions) && (
          <Route
            path="messages/:category/*"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <Messages />
              </Suspense>
            }
          />
        )}
        {isAllowed('CAN_MANAGE_CLINIC', permissions) && (
          <Route
            path="statistics"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <Statistics />
              </Suspense>
            }
          />
        )}
        {isAllowed('CAN_MANAGE_CLINIC', permissions) && (
          <Route
            path="data"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <Records />
              </Suspense>
            }
          />
        )}
        {isAllowed('CAN_HAVE_QUEUE', permissions) && (
          <Route
            path="queue"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <Data />
              </Suspense>
            }
          />
        )}
        {isAllowed('CAN_MANAGE_CLINIC', permissions) && (
          <Route
            path="clinic/*"
            element={
              <Suspense fallback={<LoadingSpinner />}>
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
