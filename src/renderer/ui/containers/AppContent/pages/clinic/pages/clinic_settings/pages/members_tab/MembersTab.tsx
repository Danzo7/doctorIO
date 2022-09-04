import { rolesBrief } from '@api/fake';
import DarkAddButton from '@components/buttons/dark_add_button';
import CreateInvitationModal from '@containers/modals/create_invitation_modal';
import { DEFAULT_MODAL } from '@libs/overlay';
import { useOverlay } from '@libs/overlay/useOverlay';
import { clearAddedRoles } from '@redux/local/small_role_invSlice';
import { useAppDispatch } from '@store';
import RoleMembers from './role_members';
import './style/index.scss';

interface MembersTabProps {}
export default function MembersTab({}: MembersTabProps) {
  const { open } = useOverlay();
  const dispatch = useAppDispatch();
  return (
    <div className="members-tab">
      <DarkAddButton
        onPress={() => {
          dispatch(clearAddedRoles());
          open(<CreateInvitationModal />, {
            ...DEFAULT_MODAL,
            position: { top: '30%' },
          });
        }}
      />
      {rolesBrief.map((role, index) => (
        <RoleMembers {...role} key={index} />
      ))}
    </div>
  );
}
