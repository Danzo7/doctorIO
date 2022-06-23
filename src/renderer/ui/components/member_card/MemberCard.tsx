import UserProfileStatus from '@components/user_profile_status';
import './style/index.scss';
import MemberActionControls from '@components/member_action_controls';
import { Member } from '@models/server.models';

interface MemberCardProps {
  member: Member;
}
export default function MemberCard({ member }: MemberCardProps) {
  const { name, avatar } = member;
  return (
    <div className="member-card">
      <UserProfileStatus imgSrc={avatar} status width={60} avatarRadius={17} />
      <span>{name}</span>
      <div className="member-card-controls">
        <MemberActionControls member={member} />
      </div>
    </div>
  );
}
