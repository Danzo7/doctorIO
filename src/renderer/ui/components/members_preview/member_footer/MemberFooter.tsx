import './style/index.scss';
import MemberActionControls from '@components/member_action_controls';
import { Member } from '@models/server.models';
import { DMs, members } from '@api/fake';

function MemberFooter({ id, status }: Pick<Member, 'id' | 'status'>) {
  const dm = DMs.filter(
    //REDUX:get DM List
    ({ userId }) =>
      userId == members.filter(({ id: mId }) => mId === id)?.[0]?.userId,
  )?.[0]; //REDUX select target member
  return (
    <div
      className="member-footer"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="member-container">
        <span>Member ID</span>
        <span className="member-span">{id}</span>
      </div>
      <div className="member-container">
        <span>Status</span>
        <span className="member-span">{status ? 'Online' : 'Offline'}</span>
      </div>
      <MemberActionControls
        id={id}
        dmId={dm?.dmId}
        notFriend={dm?.dmId == undefined}
      />
    </div>
  );
}

export default MemberFooter;
