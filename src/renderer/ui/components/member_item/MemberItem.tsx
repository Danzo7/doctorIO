import UserProfileStatus from '@components/user_profile_status';
import './style/index.scss';
import IsOwner from 'toSvg/isOwner.svg';
import Menu from 'toSvg/menu.svg';
import SmallRolePreview from '@components/members_preview/small_role_preview';
import AddButton from '@components/members_preview/add_button';
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
  const addRole = () => {};
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
        <div className="roles-container">
          {roleArray.length > 0 &&
            roleArray.map((rollName, index) => (
              <SmallRolePreview
                roleName={rollName}
                //todo RoleID
                key={index}
              />
            ))}
          <div onClick={addRole} className="add-btn-container">
            <AddButton />
          </div>
        </div>
      </div>

      <div className="option-menu">
        <Menu />
      </div>
    </div>
  );
}
