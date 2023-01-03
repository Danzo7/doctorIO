import Can from '@ability/index';
import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import ErrorPanel from '@components/error_panel';
import LoadingSpinner from '@components/loading_spinner';
import AppContent from '@containers/AppContent';
import AppMenu from '@containers/AppMenu';
import AppSidebar from '@containers/AppSidebar';
import SnakeBar from '@containers/modals/snake_bar';
import SnakeBarActionsControls from '@containers/modals/snake_bar/snake_bar_actions_controls';
import useNavigation from '@libs/hooks/useNavigation';
import { ModalPortal } from '@libs/overlay/OverlayContainer';
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

  const { navigate } = useNavigation();

  return isLoading ? (
    <LoadingSpinner />
  ) : isSuccess ? (
    <>
      <AppMenu />
      <AppContent />
      <Can I="manage" or={['have']} a="queue">
        <AppSidebar />
      </Can>
      {state == 'IN_PROGRESS' && (
        <ModalPortal clickThrough position={{ bottom: '2%' }} width={'30%'}>
          <SnakeBar description="Session is still in progress" type="warning">
            <SnakeBarActionsControls>
              <TextButton
                text="Go back to session"
                backgroundColor={color.good_green}
                onPress={async () => {
                  navigate('session');
                }}
              />
            </SnakeBarActionsControls>
          </SnakeBar>
        </ModalPortal>
      )}
    </>
  ) : (
    <ModalPortal isDimmed width={'30%'}>
      <ErrorPanel />
    </ModalPortal>
  );
}
