import LoadingSpinner from '@components/loading_spinner';

import { useAppSelector } from '@store';
import { lazy, Suspense } from 'react';
const RegisterLayer = lazy(() => import('@layers/register_layer'));
const MainLayer = lazy(() => import('@layers/main_layer'));
const OfflineLayer = lazy(() => import('@layers/offline_layer'));
interface StartupLayerProps {}
export default function StartupLayer({}: StartupLayerProps) {
  const user = useAppSelector((state) => state.user);
  return user.userId ? (
    user?.selectedClinic != undefined ? (
      <Suspense fallback={<LoadingSpinner />}>
        <MainLayer />
      </Suspense>
    ) : (
      <Suspense fallback={<LoadingSpinner />}>
        <OfflineLayer />
      </Suspense>
    )
  ) : (
    <Suspense fallback={<LoadingSpinner />}>
      <RegisterLayer />
    </Suspense>
  );
}
