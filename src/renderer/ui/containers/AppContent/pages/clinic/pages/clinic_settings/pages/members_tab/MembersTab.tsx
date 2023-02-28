import Can from '@ability/index';
import DarkAddButton from '@components/buttons/dark_add_button';
import LoadingSpinner from '@components/loading_spinner';
import RefetchPanel from '@components/refetch_panel';
import CreateInvitationModal from '@containers/modals/create_invitation_modal';
import { DEFAULT_MODAL, modal } from '@libs/overlay';
import { useGetBriefRolesQuery } from '@redux/clinic/rbac/role/roleApi';

import RoleMembers from './role_members';
import './style/index.scss';

interface MembersTabProps {}
export default function MembersTab({}: MembersTabProps) {
  const { data, isLoading, isSuccess, refetch } = useGetBriefRolesQuery();
  return (
    <div className="members-tab">
      <div className="add-member-wrapper">
        <Can I="add" or={['manage']} a="members">
          <DarkAddButton
            onPress={() => {
              modal(() => <CreateInvitationModal />, {
                ...DEFAULT_MODAL,
                position: { top: '30%' },
              }).open();
            }}
          />
        </Can>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : isSuccess ? (
        data.map((role, index) => <RoleMembers {...role} key={index} />)
      ) : (
        <RefetchPanel action={refetch} />
      )}
    </div>
  );
}
