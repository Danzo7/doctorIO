import UserProfileStatus from '@components/user_profile_status';
import './style/index.scss';
import { NavLink } from 'react-router-dom';
import MemberActionControls from '@components/member_action_controls';
import { useOverlay } from '@libs/overlay/useOverlay';
import WarningModal from '@containers/modals/warning_modal';
import { FIT_MODAL } from '@libs/overlay';
import TextButton from '@components/buttons/text_button';
import { color } from '@assets/styles/color';
import useNavigation from '@libs/hooks/useNavigation';
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
  const { open } = useOverlay();
  const { navigate } = useNavigation();
  return (
    <div
      className="contact-item"
      onClick={
        dmId == undefined
          ? () => {
              open(
                <WarningModal
                  warningDescription="This is the first time you are messaging this user. You have to wait for them to accept your request."
                  warningTitle="Start a conversasion"
                >
                  <TextButton
                    text="Send a request"
                    backgroundColor={color.good_green}
                  />
                </WarningModal>,
                FIT_MODAL,
              );
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
          memberId={memberId}
          messagesRoutePath=""
          notFriend={dmId == undefined}
        />
      </div>
    </div>
  );
}

export default ContactItem;
