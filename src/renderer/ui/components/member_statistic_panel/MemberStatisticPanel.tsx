import MemberStatisticItem from '@components/member_statistic_item';
import test from 'toPng/test.png';
import './style/index.scss';

const memberStatistic = [
  {
    name: 'Aymen Daouadji',
    avatar: test,
    status: true,
    score: 100,
    numOfAppointments: 10,
    finishedSessions: 10,
    numOfPat: 10,
    revenue: 100,
  },
  {
    name: 'John Doe',
    avatar: test,
    status: false,
    score: 100,
    numOfAppointments: 10,
    finishedSessions: 10,
    numOfPat: 10,
    revenue: 100,
  },
  {
    name: 'John Doe',
    avatar: test,
    status: true,
    score: 100,
    numOfAppointments: 10,
    finishedSessions: 10,
    numOfPat: 10,
    revenue: 100,
  },
  {
    name: 'John Doe',
    avatar: test,
    status: false,
    score: 100,
    numOfAppointments: 10,
    finishedSessions: 10,
    numOfPat: 10,
    revenue: 100,
  },
  {
    name: 'John Doe',
    avatar: test,
    status: true,
    score: 100,
    numOfAppointments: 10,
    finishedSessions: 10,
    numOfPat: 10,
    revenue: 100,
  },
];
interface MemberStatisticPanelProps {}
export default function MemberStatisticPanel({}: MemberStatisticPanelProps) {
  //API call to get member statistic
  return (
    <div className="member-statistic-panel">
      <div className="members-stats-header">
        <div className="members-stats-header-title">
          <span>Members stats</span>
        </div>

        <div className="menu">
          <span>Booked appointment</span>
          <span>Finished session</span>
          <span>New patients</span>
          <span>Revenue</span>
        </div>
      </div>
      <div className="members-stats-panel">
        {memberStatistic.map((item, index) => (
          <MemberStatisticItem key={index} {...item} rank={index + 1} />
        ))}
      </div>
    </div>
  );
}
