import './index.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import LoadingSpinner from '@components/loading_spinner';
import { AbilityContext } from '@ability/Ability';
import { useAbility } from '@casl/react';
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
  const ability = useAbility(AbilityContext);
  return (
    <div className="AppContent">
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <HomeContent />
            </Suspense>
          }
        />

        {(ability.can('have', 'queue') || ability.can('manage', 'queue')) && (
          <Route
            path="queue"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <Queues />
              </Suspense>
            }
          />
        )}
        {ability.can('view', 'admin') && (
          <Route
            path="records/*"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <Records />
              </Suspense>
            }
          />
        )}
        {ability.can('have', 'messages') && (
          <Route
            path="messages/:category/*"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <Messages />
              </Suspense>
            }
          />
        )}
        {ability.can('manage', 'clinic') && (
          <Route
            path="statistics"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <Statistics />
              </Suspense>
            }
          />
        )}
        {ability.can('manage', 'clinic') && (
          <Route
            path="data"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <Records />
              </Suspense>
            }
          />
        )}
        {(ability.can('have', 'queue') || ability.can('manage', 'queue')) && (
          <Route
            path="queue"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <Data />
              </Suspense>
            }
          />
        )}
        {ability.can('manage', 'clinic') && (
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
