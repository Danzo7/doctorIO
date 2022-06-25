import UserProfileStatus from '@components/user_profile_status';
import './style/index.scss';
import MemberActionControls from '@components/member_action_controls';
import { Member } from '@models/server.models';

export default function MemberCard({
  memberId,
  name,
  avatar,
}: Pick<Member, 'memberId' | 'name' | 'avatar'>) {
  return (
    <div className="member-card">
      <UserProfileStatus imgSrc={avatar} status width={60} avatarRadius={17} />
      <span>{name}</span>
      <div className="member-card-controls">
        <MemberActionControls memberId={memberId} />
      </div>
    </div>
  );
}
