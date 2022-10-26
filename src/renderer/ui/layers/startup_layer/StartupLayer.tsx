import LoadingSpinner from '@components/loading_spinner';
import { useSelectedClinicCheck } from '@stores/clinicsStore';

import { useUserStore } from '@stores/userStore';
import { lazy, Suspense } from 'react';
const RegisterLayer = lazy(() => import('@layers/register_layer'));
const MainLayer = lazy(() => import('@layers/main_layer'));
const OfflineLayer = lazy(() => import('@layers/offline_layer'));
interface StartupLayerProps {}
export default function StartupLayer({}: StartupLayerProps) {
  const user = useUserStore();
  const hasClinic = useSelectedClinicCheck();
  return user.firstName != undefined ? (
    hasClinic ? (
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
