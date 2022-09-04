import DarkAddButton from '@components/buttons/dark_add_button';
import LoadingSpinner from '@components/loading_spinner';
import CreateInvitationModal from '@containers/modals/create_invitation_modal';
import { DEFAULT_MODAL } from '@libs/overlay';
import { useOverlay } from '@libs/overlay/useOverlay';
import { useGetBriefRolesQuery } from '@redux/clinic/rbac/role/roleApi';
import { clearAddedRoles } from '@redux/local/small_role_invSlice';
import { useAppDispatch } from '@store';
import RoleMembers from './role_members';
import './style/index.scss';

interface MembersTabProps {}
export default function MembersTab({}: MembersTabProps) {
  const { open } = useOverlay();
  const dispatch = useAppDispatch();

  const { data, isLoading, isSuccess, error } = useGetBriefRolesQuery();
  return (
    <div className="members-tab">
      <div className="add-member-wrapper">
        <DarkAddButton
          onPress={() => {
            dispatch(clearAddedRoles());
            open(<CreateInvitationModal />, {
              ...DEFAULT_MODAL,
              position: { top: '30%' },
            });
          }}
        />
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : isSuccess ? (
        data.map((role, index) => <RoleMembers {...role} key={index} />)
      ) : (
        <div> No roles </div>
      )}
    </div>
  );
}
