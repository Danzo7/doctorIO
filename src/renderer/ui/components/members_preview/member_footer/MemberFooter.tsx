import IconicButton from '@components/buttons/iconic_button';
import './style/index.scss';
import colors from '@assets/styles/color';
import IdCard from 'toSvg/id_card.svg?icon'; //Add ?icon to be able to resize svg
import Messages from 'toSvg/messages_small.svg?icon';
import Call_Icon from 'toSvg/phone.svg?icon';
interface MemberFooterProps {
  memberID: string;
  status: string;
}
function MemberFooter({ memberID, status }: MemberFooterProps) {
  return (
    <div className="member-footer">
      <div className="member-container">
        <span>Member ID</span>
        <span className="member-span">{memberID}</span>
      </div>
      <div className="member-container">
        <span>Status</span>
        <span className="member-span">{status}</span>
      </div>
      <div className="controls-container">
        <IconicButton
          Icon={IdCard}
          afterColor={colors.secondary_color}
          width={40}
          iconSize={15}
        />
        <IconicButton
          Icon={Messages}
          afterColor={colors.secondary_color}
          width={40}
          iconSize={15}
        />
        <IconicButton
          Icon={Call_Icon}
          afterColor={colors.good_green}
          width={40}
          iconSize={15}
        />
      </div>
    </div>
  );
}

export default MemberFooter;
