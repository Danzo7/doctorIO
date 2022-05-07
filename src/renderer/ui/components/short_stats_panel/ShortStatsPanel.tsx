import MultiOptionSwitcher from '@components/buttons/multi_option_switcher';
import MiniStats from '@components/mini_stats';
import './style/index.scss';
import exclamation from 'toSvg/exclamation.svg?icon';
import colors from '@colors';
interface ShortStatsPanelProps {}
export default function ShortStatsPanel({}: ShortStatsPanelProps) {
  const timeSortList = ['Today', 'Monthly'];
  const miniStatsList = [
    {
      text: 'Revenue',
      value: 1.4,
      Icon: exclamation,
      percentage: 5,
    },
    {
      text: 'Visitors',
      value: 24,
      Icon: exclamation,
      percentage: 10,
    },
    {
      text: 'Messages',
      value: 19,
      Icon: exclamation,
      backgroundColor: colors.hot_red,
    },
    {
      text: 'Queue',
      value: 18,
      Icon: exclamation,
    },
  ];
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
              key={text + value}
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
