import NotAButton from '@components/not_a_button';
import './style/index.scss';
import { color } from '@assets/styles/color';
import UserProfileStatus from '@components/user_profile_status';
import King from 'toSvg/king.svg?icon';
interface MemberStatisticItemProps {
  score: number;
  name: string;
  avatar: string;
  status: boolean;
  rank: number;
  numOfAppointments: number;
  finishedSessions: number;
  numOfPat: number;
  revenue: number;
}
export default function MemberStatisticItem({
  name,
  avatar,
  status,
  score,
  rank,
  numOfAppointments,
  finishedSessions,
  numOfPat,
  revenue,
}: MemberStatisticItemProps) {
  return (
    <div className="member-statistic-item">
      <div className="left-container">
        <NotAButton
          text={rank != 1 ? rank.toString() : undefined}
          backgroundColor={color.warm_orange}
          width={30}
          height={30}
          padding={0}
          Icon={rank == 1 ? <King width={15} height={15} /> : undefined}
        />
        <div className="member-Info">
          <UserProfileStatus
            imgSrc={avatar}
            status={status}
            width={40}
            alt={name + score}
          />
          <div className="id-container">
            <span>{name}</span>
            <span>#{score}</span>
          </div>
        </div>
      </div>
      <div className="right-container">
        <span>{numOfAppointments}</span>
        <span>{finishedSessions}</span>
        <span>{numOfPat}</span>
        <span>{revenue} </span>
      </div>
    </div>
  );
}
