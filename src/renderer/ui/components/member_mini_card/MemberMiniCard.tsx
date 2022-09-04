import UserProfileStatus from '@components/user_profile_status';
import { ReactNode } from 'react';
import './style/index.scss';

interface MemberMiniCardProps {
  status: boolean;
  avatar?: string;
  fullName: string;
  memberId: number;
  buttonNode: ReactNode;
}
export default function MemberMiniCard({
  status,
  avatar,
  fullName,
  memberId,
  buttonNode,
}: MemberMiniCardProps) {
  return (
    <div className="member-mini-card">
      <div className="info-container">
        <UserProfileStatus
          status={status}
          imgSrc={avatar}
          alt={fullName + memberId}
        />
        <span>{fullName}</span>
      </div>
      <div className="avatars-container">{buttonNode}</div>
    </div>
  );
}
