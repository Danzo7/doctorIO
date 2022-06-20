import UserProfileStatus from '@components/user_profile_status';
import './style/index.scss';
import MemberActionControls from '@components/member_action_controls';

interface MemberCardProps {
  fullName: string;
  imgSrc: string;
  roleArray: string[];
}
export default function MemberCard({ fullName, imgSrc }: MemberCardProps) {
  return (
    <div className="member-card">
      <UserProfileStatus imgSrc={imgSrc} status width={60} avatarRadius={17} />
      <span>{fullName}</span>
      <div className="member-card-controls">
        <MemberActionControls memberID="123456789" />
      </div>
    </div>
  );
}
