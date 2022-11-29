import Can from '@ability/index';
import DarkAddButton from '@components/buttons/dark_add_button';
import LoadingSpinner from '@components/loading_spinner';
import CreateInvitationModal from '@containers/modals/create_invitation_modal';
import { DEFAULT_MODAL } from '@libs/overlay';
import { useGetBriefRolesQuery } from '@redux/clinic/rbac/role/roleApi';
import { modal } from '@stores/overlayStore';

import RoleMembers from './role_members';
import './style/index.scss';

interface MembersTabProps {}
export default function MembersTab({}: MembersTabProps) {
  const { data, isLoading, isSuccess, error } = useGetBriefRolesQuery();
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
        <div> No roles </div> //UI show better comp
      )}
    </div>
  );
}
