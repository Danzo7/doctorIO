import { AbilityContext } from '@ability/Ability';
import { buildAbilityFor } from '@ability/utils';
import LoadingSpinner from '@components/loading_spinner';
import AppContent from '@containers/AppContent';
import AppMenu from '@containers/AppMenu';
import AppSidebar from '@containers/AppSidebar';
import { useGetMyPermissionQuery } from '@redux/clinic/rbac/member/memberApi';
interface AppLayoutProps {}
export default function AppLayout({}: AppLayoutProps) {
  const { data, isLoading, isSuccess } = useGetMyPermissionQuery();

  return isLoading ? (
    <LoadingSpinner />
  ) : isSuccess ? (
    <AbilityContext.Provider
      value={buildAbilityFor(data.permissions, data.lvl == 0)}
    >
      <AppMenu />
      <AppContent />
      <AppSidebar />
    </AbilityContext.Provider>
  ) : (
    <div>error here</div> //REFACTOR unothorized handle error
  );
}
