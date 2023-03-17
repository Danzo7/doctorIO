import NotAButton from '@components/not_a_button';
import './style/index.scss';
import { color } from '@assets/styles/color';
import UserProfileStatus from '@components/user_profile_status';
interface MemberStatisticItemProps {
  score: number;
  name: string;
  avatar: string;
  status: boolean;
  rank: number;
}
export default function MemberStatisticItem({
  name,
  avatar,
  status,
  score,
  rank,
}: MemberStatisticItemProps) {
  //TODO add rank 1 logo instead of number
  return (
    <div className="member-statistic-item">
      <div className="left-container">
        <NotAButton
          text={rank.toString()}
          backgroundColor={color.warm_orange}
          width={25}
          height={25}
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
        <span>31000</span>
        <span>20</span>
        <span>20</span>
        <span>0</span>
      </div>
    </div>
  );
}
