import UserProfileStatus from '@components/user_profile_status';
import './style/index.scss';
import MemberActionControls from '@components/member_action_controls';
import { MemberBrief } from '@models/server.models';

export default function MemberCard({
  id,
  name,
  avatar,
}: Pick<MemberBrief, 'id' | 'name' | 'avatar'>) {
  return (
    <div className="member-card">
      <UserProfileStatus
        imgSrc={avatar}
        status
        width={60}
        avatarRadius={17}
        alt={name + id}
      />
      <span>{name}</span>
      <div className="member-card-controls">
        <MemberActionControls id={id} />
      </div>
    </div>
  );
}
