import UserProfileStatus from '@components/user_profile_status';
import './style/index.scss';
import IsOwner from 'toSvg/host.svg';
import threeDots from 'toSvg/threedots.svg?icon';
import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
import SmallRoleList from '@components/members_preview/small_role_list';
import MemberBigCard from '@containers/modals/member_big_card';
import { FIT_MODAL, modal, tooltip } from '@libs/overlay';
import { MemberBrief } from '@models/server.models';
import { format } from 'date-fns';
import { SETTINGS } from '@stores/appSettingsStore';

import {
  useAssignRoleMutation,
  useRevokeRoleMutation,
} from '@redux/clinic/rbac/role/roleApi';
//TODO render IsOwner svg if the user is owner
export default function MemberItem({
  avatar,
  name,
  joinDate,
  id,
  roles,
  status,
}: MemberBrief) {
  const [AssignRole] = useAssignRoleMutation();
  const [RevokeRole] = useRevokeRoleMutation();
  return (
    <div className="member-item">
      <div className="item-container">
        <div className="member-Info">
          <UserProfileStatus
            imgSrc={avatar}
            status={status}
            width={30}
            alt={name + id}
          />
          <div className="id-container">
            <span>{name}</span>
            <span>#{id}</span>
          </div>
          <IsOwner />
        </div>

        <div className="date-container">
          <span>{format(joinDate, SETTINGS.dateFormat)}</span>
        </div>
        <SmallRoleList
          roleList={roles}
          onAdd={(role) => {
            AssignRole({ memberId: id, roleId: role.id });
          }}
          onDelete={(role) => {
            RevokeRole({ memberId: id, roleId: role.id });
          }}
        />
      </div>

      <div className="option-menu">
        <SquareIconButton
          Icon={threeDots}
          tip="More"
          onPress={(e) => {
            if (e)
              tooltip(
                () => [
                  {
                    text: 'show profile',
                    onPress: () => {
                      modal(() => <MemberBigCard id={id} />, FIT_MODAL).open();
                    },
                  },
                ],
                e.currentTarget,
                { autoClose: true },
              ).open();
          }}
        />
      </div>
    </div>
  );
}
