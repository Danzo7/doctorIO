import DarkAddButton from '@components/buttons/dark_add_button';
import SmallRolePreview from '@components/members_preview/small_role_preview';
import UserProfileStatus from '@components/user_profile_status';
import './style/index.scss';
import MemberActionControls from '@components/member_action_controls';

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
        <MemberActionControls memberID="123456789" />
      </div>
    </div>
  );
}
