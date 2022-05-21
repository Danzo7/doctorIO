import DarkAddButton from '@components/buttons/dark_add_button';
import IconicButton from '@components/buttons/iconic_button';
import SmallRolePreview from '@components/members_preview/small_role_preview';
import UserProfileStatus from '@components/user_profile_status';
import './style/index.scss';
import IdCard from 'toSvg/id_card.svg?icon';
import Messages from 'toSvg/messages_small.svg?icon';
import Call_Icon from 'toSvg/phone.svg?icon';
import { color } from '@assets/styles/color';

interface MemberCardProps {
  fullName: string;
  imgSrc: string;
  roleArray: string[];
}
export default function MemberCard({
  fullName,
  imgSrc,
  roleArray = [],
}: MemberCardProps) {
  return (
    <div className="member-card">
      <div className="member-card-info">
        <UserProfileStatus
          imgSrc={imgSrc}
          status
          width={60}
          avatarRadius={17}
        />
        <div className="member-card-roles">
          <span>{fullName}</span>
          <div className="roll-container">
            {roleArray.map((rollName, index) => (
              <SmallRolePreview roleName={rollName} key={index} />
            ))}

            <DarkAddButton />
          </div>
        </div>
      </div>
      <div className="member-card-controls">
        <IconicButton
          Icon={IdCard}
          afterBgColor={color.secondary_color}
          width={40}
          iconSize={15}
        />
        <IconicButton
          Icon={Messages}
          afterBgColor={color.secondary_color}
          width={40}
          iconSize={15}
        />
        <IconicButton
          Icon={Call_Icon}
          afterBgColor={color.good_green}
          width={40}
          iconSize={15}
        />
      </div>
    </div>
  );
}
