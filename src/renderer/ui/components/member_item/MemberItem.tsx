import UserProfileStatus from '@components/user_profile_status';
import './style/index.scss';
import IsOwner from 'toSvg/host.svg';
import threeDots from 'toSvg/threedots.svg?icon';
import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
import SmallRoleList from '@components/members_preview/small_role_list';
import { useOverlay } from '@libs/overlay/useOverlay';
import MemberBigCard from '@containers/modals/member_big_card';
import { FIT_MODAL } from '@libs/overlay';
import { MemberBrief } from '@models/server.models';
import { format } from 'date-fns';
import { DATE_ONLY } from '@constants/data_format';
import {
  useAssignRoleMutation,
  useRevokeRoleMutation,
} from '@redux/clinic/rbac/role/roleApi';

export default function MemberItem({
  avatar,
  name,
  joinDate,
  id,
  roles,
  status,
}: MemberBrief) {
  const { openTooltip, open } = useOverlay();
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
          <span>{format(joinDate, DATE_ONLY)}</span>
        </div>
        <SmallRoleList
          roleList={roles}
          onAdd={(role) => {
            //FIXME fetch error
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
          onPress={(e) => {
            if (e)
              openTooltip(
                [
                  {
                    text: 'show profile',
                    onPress: () => {
                      open(<MemberBigCard id={id} />, FIT_MODAL);
                    },
                  },
                ],
                e.currentTarget,
                true,
              );
          }}
        />
      </div>
    </div>
  );
}
