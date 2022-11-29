import UserProfileStatus from '@components/user_profile_status';
import './style/index.scss';
import MemberActionControls from '@components/member_action_controls';
import { FIT_MODAL } from '@libs/overlay';
import useNavigation from '@libs/hooks/useNavigation';
import AlertModal from '@containers/modals/dialog_modal';
import TextButton from '@components/buttons/text_button';
import { color } from '@assets/styles/color';
import { modal } from '@stores/overlayStore';
interface ContactItemProps {
  status: boolean;
  avatar?: string;
  fullName: string;
  dmId?: number;
  memberId: number;
}
function ContactItem({
  status,
  avatar,
  fullName,
  dmId,
  memberId,
}: ContactItemProps) {
  const { navigate } = useNavigation();
  return (
    <div
      className="contact-item"
      onClick={
        dmId == undefined
          ? () => {
              modal(
                () => (
                  <AlertModal
                    description="This is the first time you are messaging this user. You have to wait for them to accept your request."
                    title="Start a conversation"
                    status="warning"
                    controls={
                      <TextButton
                        text="Send a request"
                        backgroundColor={color.good_green}
                      />
                    }
                  ></AlertModal>
                ),
                FIT_MODAL,
              ).open();
            }
          : () => {
              navigate(dmId?.toString());
            }
      }
    >
      <div className="info-container">
        <UserProfileStatus
          status={status}
          imgSrc={avatar}
          alt={fullName + memberId}
        />
        <span>{fullName}</span>
      </div>
      <div className="avatars-container">
        <MemberActionControls
          dmId={dmId}
          id={memberId}
          messagesRoutePath=""
          notFriend={dmId == undefined}
        />
      </div>
    </div>
  );
}

export default ContactItem;
