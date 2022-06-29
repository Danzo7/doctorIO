import './style/index.scss';
import MemberActionControls from '@components/member_action_controls';
import { Member } from '@models/server.models';
import { DMs, members } from '@api/fake';

function MemberFooter({
  memberId,
  memberStatus,
}: Pick<Member, 'memberId' | 'memberStatus'>) {
  //TODO:search for DM for current memberUD
  const dm = DMs.filter(
    ({ userId }) =>
      userId ==
      members.filter(({ memberId: id }) => memberId === id)?.[0]?.userId,
  )?.[0];
  return (
    <div
      className="member-footer"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="member-container">
        <span>Member ID</span>
        <span className="member-span">{memberId}</span>
      </div>
      <div className="member-container">
        <span>Status</span>
        <span className="member-span">
          {memberStatus ? 'Online' : 'Offline'}
        </span>
      </div>
      <MemberActionControls
        memberId={memberId}
        dmId={dm?.dmId}
        notFriend={dm?.dmId == undefined}
      />
    </div>
  );
}

export default MemberFooter;
