import UserProfileStatus from '@components/user_profile_status';
import { useState } from 'react';
import './style/index.scss';
import UpArrow from 'toSvg/arrow.svg?icon';
import MemberFooter from './member_footer';
import SmallRoleList from './small_role_list';
import { Member } from '@models/server.models';
import { blurWithin } from '@helpers/dom.helper';

function MembersPreview({
  name,
  memberId,
  memberStatus,
  avatar,
  roles,
}: Pick<Member, 'name' | 'avatar' | 'memberId' | 'roles' | 'memberStatus'>) {
  const [hideFooter, setHideFooter] = useState(true);

  return (
    <div
      tabIndex={-1}
      className={`preview-container${
        hideFooter ? ' preview-container-hidden' : ''
      }`}
      onClick={(e) => {
        setHideFooter(!hideFooter);
        e.currentTarget.focus();
      }}
      onBlur={(event) => blurWithin(event, () => setHideFooter(true))}
      // onFocus={() => setHideFooter(false)}
    >
      <div className="members-preview">
        <UserProfileStatus
          imgSrc={avatar}
          status
          width={60}
          avatarRadius={17}
        />
        <div className="info-container">
          <span>{name}</span>
          {<SmallRoleList roleList={roles} />}
        </div>
        <div className={`arrow-container`}>
          <UpArrow width={15} />
        </div>
      </div>
      {<MemberFooter memberId={memberId} memberStatus={memberStatus} />}
    </div>
  );
}

export default MembersPreview;
