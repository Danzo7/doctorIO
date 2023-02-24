import Can from '@ability/index';
import BackToSessionBar from '@components/back_to_session_bar';
import ErrorPanel from '@components/error_panel';
import LoadingSpinner from '@components/loading_spinner';
import AppContent from '@containers/AppContent';
import AppMenu from '@containers/AppMenu';
import AppSidebar from '@containers/AppSidebar';
import { Portal } from '@libs/overlay';
import { useGetMyPermissionQuery } from '@redux/clinic/rbac/member/memberApi';
import {
  useGetQueueStateQuery,
  useGetIsQueueOwnerQuery,
} from '@redux/instance/appointmentQueue/AppointmentQueueApi';
import { useAbility } from '@stores/abilityStore';
import { useSelectedQueue } from '@stores/queueSelectionStore';

interface AppLayoutProps {}
export default function AppLayout({}: AppLayoutProps) {
  const abilities = useAbility();
  const { isLoading, isSuccess } = useGetMyPermissionQuery();
  const selectedQueue = useSelectedQueue();
  const isQueueOwnerQuery = useGetIsQueueOwnerQuery(selectedQueue, {
    skip: !isSuccess,
  });
  const queueStateQuery = useGetQueueStateQuery(selectedQueue, {
    skip:
      !(abilities.can('have', 'queue') || abilities.can('manage', 'queue')) ||
      !isQueueOwnerQuery.data,
  });

  const state = queueStateQuery.isSuccess
    ? queueStateQuery.data.state
    : undefined;

  return isLoading ? (
    <LoadingSpinner />
  ) : isSuccess ? (
    <>
      <AppMenu />
      <AppContent />
      <Can I="manage" or={['have']} a="queue">
        <AppSidebar />
      </Can>
      {state == 'IN_PROGRESS' && <BackToSessionBar />}
    </>
  ) : (
    <Portal isDimmed width={'30%'} overall>
      <ErrorPanel />
    </Portal>
  );
}
