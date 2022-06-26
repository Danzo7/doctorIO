import UserProfileStatus from '@components/user_profile_status';
import './style/index.scss';
import IsOwner from 'toSvg/host.svg';
import threeDots from 'toSvg/threedots.svg?icon';
import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
import SmallRoleList from '@components/members_preview/small_role_list';
import { useOverlay } from '@libs/overlay/useOverlay';
import MemberBigCard from '@containers/modals/member_big_card';
import { FIT_MODAL } from '@libs/overlay';
import { Member } from '@models/server.models';
import { format } from 'date-fns';
import { DATE_ONLY } from '@constants/data_format';

export default function MemberItem({
  avatar,
  memberStatus,
  name,
  age,
  gender,
  phoneNumber,
  address,
  joinDate,
  addedBy,
  memberId,
  roles,
  userId,
  accessKey,
}: Member) {
  const { openTooltip, open } = useOverlay();

  return (
    <div className="member-item">
      <div className="item-container">
        <div className="member-Info">
          <UserProfileStatus imgSrc={avatar} status={memberStatus} width={30} />
          <div className="id-container">
            <span>{name}</span>
            <span>{memberId}</span>
          </div>
          <IsOwner />
        </div>

        <div className="date-container">
          <span>{format(joinDate, DATE_ONLY)}</span>
        </div>
        <SmallRoleList roleList={roles} />
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
                      open(
                        <MemberBigCard
                          {...{
                            avatar,
                            memberStatus,
                            name,
                            age,
                            gender,
                            phoneNumber,
                            address,
                            joinDate,
                            addedBy,
                            memberId,
                            roles,
                            userId,
                            accessKey,
                          }}
                        />,
                        FIT_MODAL,
                      );
                    },
                  },
                ],
                e?.currentTarget,
                true,
              );
          }}
        />
      </div>
    </div>
  );
}
