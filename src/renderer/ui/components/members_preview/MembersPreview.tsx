import UserProfileStatus from '@components/user_profile_status';
import { useState } from 'react';
import './style/index.scss';
import UpArrow from 'toSvg/arrow.svg?icon';
import MemberFooter from './member_footer';
import SmallRoleList from './small_role_list';
import { MemberBrief } from '@models/server.models';
import { blurWithin } from '@helpers/dom.helper';
import {
  useAssignRoleMutation,
  useRevokeRoleMutation,
} from '@redux/clinic/rbac/role/roleApi';

function MembersPreview({ name, id, status, avatar, roles }: MemberBrief) {
  const [hideFooter, setHideFooter] = useState(true);
  const [AssignRole] = useAssignRoleMutation();
  const [RevokeRole] = useRevokeRoleMutation();
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
          status={status}
          width={60}
          avatarRadius={17}
          alt={name + id}
        />
        <div className="info-container">
          <span>{name}</span>
          {
            <SmallRoleList
              roleList={roles}
              onAdd={(role) => {
                AssignRole({ memberId: id, roleId: role.id });
                setHideFooter(true);
              }}
              onDelete={(role) => {
                RevokeRole({ memberId: id, roleId: role.id });
              }}
            />
          }
        </div>
        <div className={`arrow-container`}>
          <UpArrow width={15} />
        </div>
      </div>
      {<MemberFooter id={id} status={status} />}
    </div>
  );
}

export default MembersPreview;
