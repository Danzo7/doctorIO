import UserProfileStatus from '@components/user_profile_status';
import { useState } from 'react';
import './style/index.scss';
import UpArrow from 'toSvg/arrow.svg?icon';
import MemberFooter from './member_footer';
import SmallRoleList from './small_role_list';
import { Member } from '@models/server.models';

function MembersPreview({
  name,
  memberId,
  age,
  gender,
  joinDate,
  addedBy,
  userId,
  accessKey,
  address,
  phoneNumber,
  memberStatus,
  avatar,
  roles,
}: Member) {
  const [hideFooter, setHideFooter] = useState(true);

  return (
    <div
      className={`preview-container${
        hideFooter ? ' preview-container-hidden' : ''
      }`}
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
        <div
          className={`arrow-container`}
          onClick={() => setHideFooter(!hideFooter)}
        >
          <UpArrow width={15} />
        </div>
      </div>
      <MemberFooter
        member={{
          name,
          memberId,
          age,
          gender,
          joinDate,
          addedBy,
          userId,
          accessKey,
          address,
          phoneNumber,
          memberStatus,
          avatar,
          roles,
        }}
      />
    </div>
  );
}

export default MembersPreview;
