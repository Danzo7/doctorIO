import './style/index.scss';
import PreviewList from '@components/preview_list';
import MultiOptionSwitcher from '@components/buttons/multi_option_switcher';
import exclamation from 'toSvg/exclamation.svg?icon';
import { FunctionComponent, SVGProps } from 'react';
import MiniStats from '@components/mini_stats';
import { Badged } from '@components/badge/Badge';
import MemberStatisticPanel from '@components/member_statistic_panel';

const timeSortList = ['Today', 'Monthly'];
const miniStatsList: {
  text: string;
  value: number;
  Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  backgroundColor: string;
  percentage?: number;
}[] = [
  {
    text: 'Revenue',
    value: 1.4,
    Icon: exclamation,
    percentage: 5,
  },
  {
    text: 'Appointments',
    value: 24,
    Icon: exclamation,
    percentage: 10,
  },
  {
    text: 'New Comers',
    value: 19,
    Icon: exclamation,
  },
].filter(Boolean) as any;
interface GeneralStatisticTabProps {}
export default function GeneralStatisticTab({}: GeneralStatisticTabProps) {
  //UI fix scroling and static height
  //API fetch data
  return (
    <div className="general-statistic-tab">
      <PreviewList
        title="Key Metrics"
        noBorder
        buttonNode={<MultiOptionSwitcher textList={timeSortList} />}
      >
        <div className="stats-container">
          {miniStatsList.map(
            ({ text, Icon, value, backgroundColor, percentage }) => (
              <Badged badge="preview" key={text + value}>
                <MiniStats
                  text={text}
                  Icon={Icon}
                  value={value}
                  backgroundColor={backgroundColor ? backgroundColor : ''}
                  percentage={percentage ? percentage : -1}
                />
              </Badged>
            ),
          )}
        </div>
      </PreviewList>
      <MemberStatisticPanel />
    </div>
  );
}
