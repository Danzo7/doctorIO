import UserProfileStatus from '@components/user_profile_status';
import './style/index.scss';
import IsOwner from 'toSvg/host.svg';
import threeDots from 'toSvg/threedots.svg?icon';
import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
import SmallRoleList from '@components/members_preview/small_role_list';
interface MemberItemProps {
  memberImgSrc: string;
  memberStatus: boolean;
  memberFullName: string;
  memberID: string;
  roleArray: string[];
  timeAdded: string;
}
export default function MemberItem({
  memberImgSrc,
  memberStatus,
  memberFullName,
  memberID,
  roleArray = [],
  timeAdded,
}: MemberItemProps) {
  return (
    <div className="member-item">
      <div className="item-container">
        <div className="member-Info">
          <UserProfileStatus
            imgSrc={memberImgSrc}
            status={memberStatus}
            width={30}
          />
          <div className="id-container">
            <span>{memberFullName}</span>
            <span>{memberID}</span>
          </div>
          <IsOwner />
        </div>

        <div className="date-container">
          <span>{timeAdded}</span>
        </div>
        <SmallRoleList roleList={roleArray} />
      </div>

      <div className="option-menu">
        <SquareIconButton svg={threeDots} />
      </div>
    </div>
  );
}
