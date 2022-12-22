import UserProfileStatus from '@components/user_profile_status';
import './style/index.scss';
import { MouseEventHandler } from 'react';
interface SmallUserStatusProps {
  alt: string;
  imgSrc?: string;
  status?: boolean;
  width?: number;
  avatarRadius?: number;
  onClick?: MouseEventHandler<HTMLDivElement>;
  name: string;
}
export default function SmallUserStatus({
  name,
  alt,
  imgSrc,
  status,
  width = 25,
  avatarRadius,
  onClick,
}: SmallUserStatusProps) {
  return (
    <div className="small-user-status">
      <UserProfileStatus
        alt={alt}
        imgSrc={imgSrc}
        avatarRadius={avatarRadius}
        onClick={onClick}
        status={status}
        width={width}
      />
      <span>{name}</span>
    </div>
  );
}
