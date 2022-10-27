import Can from '@ability/index';
import LoadingSpinner from '@components/loading_spinner';
import AppContent from '@containers/AppContent';
import AppMenu from '@containers/AppMenu';
import AppSidebar from '@containers/AppSidebar';
import { useGetMyPermissionQuery } from '@redux/clinic/rbac/member/memberApi';
interface AppLayoutProps {}
export default function AppLayout({}: AppLayoutProps) {
  const { isLoading, isSuccess } = useGetMyPermissionQuery();

  return isLoading ? (
    <LoadingSpinner />
  ) : isSuccess ? (
    <>
      <AppMenu />
      <AppContent />
      <Can I="manage" or={['have']} a="queue">
        <AppSidebar />
      </Can>
    </>
  ) : (
    <div>error here</div> //REFACTOR unothorized handle error
  );
}
