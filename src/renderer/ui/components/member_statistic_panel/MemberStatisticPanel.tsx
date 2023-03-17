import MemberStatisticItem from '@components/member_statistic_item';
import test from 'toPng/test.png';
import './style/index.scss';
interface MemberStatisticPanelProps {}
export default function MemberStatisticPanel({}: MemberStatisticPanelProps) {
  //TODO add children prop or list
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
        <MemberStatisticItem
          score={500}
          name="Aymen Daouadji"
          status={true}
          rank={2}
          avatar={test}
        />
        <MemberStatisticItem
          score={500}
          name="Aymen Daouadji"
          status={true}
          rank={2}
          avatar={test}
        />
        <MemberStatisticItem
          score={500}
          name="Aymen Daouadji"
          status={true}
          rank={2}
          avatar={test}
        />
        <MemberStatisticItem
          score={500}
          name="Aymen Daouadji"
          status={true}
          rank={2}
          avatar={test}
        />
        <MemberStatisticItem
          score={500}
          name="Aymen Daouadji"
          status={true}
          rank={2}
          avatar={test}
        />
      </div>
    </div>
  );
}
