import { buildAbilityFor } from '@ability/utils';
import LoadingSpinner from '@components/loading_spinner';
import AppContent from '@containers/AppContent';
import AppMenu from '@containers/AppMenu';
import AppSidebar from '@containers/AppSidebar';
import { useGetMyPermissionQuery } from '@redux/clinic/rbac/member/memberApi';
import { useAbilityStore } from '@stores/abilityStore';
interface AppLayoutProps {}
export default function AppLayout({}: AppLayoutProps) {
  const { data, isLoading, isSuccess } = useGetMyPermissionQuery();
  const setAbility = useAbilityStore((state) => state.set);
  if (isSuccess) setAbility(buildAbilityFor(data.permissions, data.lvl == 0));

  return isLoading ? (
    <LoadingSpinner />
  ) : isSuccess ? (
    <>
      <AppMenu />
      <AppContent />
      <AppSidebar />
    </>
  ) : (
    <div>error here</div> //REFACTOR unothorized handle error
  );
}
