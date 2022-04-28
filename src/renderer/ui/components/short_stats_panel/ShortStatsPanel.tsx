import MultiOptionSwitcher from '@components/buttons/multi_option_switcher';
import MiniStats from '@components/mini_stats';
import './style/index.scss';
interface ShortStatsPanelProps {
  miniStatsList: Array<any>;
}
export default function ShortStatsPanel({
  miniStatsList = [],
}: ShortStatsPanelProps) {
  const timeSortList = ['Today', 'Monthly'];
  return (
    <div className="short-stats-panel">
      <div className="header">
        <span>Dashboard</span>
        <MultiOptionSwitcher textList={timeSortList} />
      </div>
      <div className="stats-container">
        {miniStatsList.map(
          ({ text, Icon, value, backgroundColor, percentage }) => (
            <MiniStats
              text={text}
              Icon={Icon}
              value={value}
              backgroundColor={backgroundColor ? backgroundColor : ''}
              percentage={percentage ? percentage : -1}
            />
          ),
        )}
      </div>
    </div>
  );
}
