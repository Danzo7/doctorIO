import MultiOptionSwitcher from '@components/buttons/multi_option_switcher';
import MiniStats from '@components/mini_stats';
import './style/index.scss';
import exclamation from 'toSvg/exclamation.svg?icon';
import colors from '@colors';
import { FIT_MODAL } from '@libs/overlay';
import { useGetMyMemberDetailQuery } from '@redux/clinic/rbac/member/memberApi';
import MemberBigCard from '@containers/modals/member_big_card';
import LoadingSpinner from '@components/loading_spinner';
import UserProfileStatus from '@components/user_profile_status';
import { useGetQueueAppointmentsQuery } from '@redux/instance/appointmentQueue/AppointmentQueueApi';
import Header from '@components/header';
import { useAbility } from '@stores/abilityStore';
import { Badged } from '@components/badge/Badge';
import { useSelectedQueue } from '@stores/queueSelectionStore';
import { modal } from '@stores/overlayStore';
import { FunctionComponent, SVGProps } from 'react';
interface ShortStatsPanelProps {}
export default function ShortStatsPanel({}: ShortStatsPanelProps) {
  const abilities = useAbility();
  const selectedQueue = useSelectedQueue();
  const appointmentsQuery = useGetQueueAppointmentsQuery(selectedQueue, {
    skip: !(abilities.can('have', 'queue') || abilities.can('manage', 'queue')),
  });
  const count = appointmentsQuery.isSuccess ? appointmentsQuery.data.length : 0;
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
    (abilities.can('have', 'queue') || abilities.can('manage', 'queue')) && {
      text: 'Queue',
      value: count,
      Icon: exclamation,
    },
  ].filter(Boolean) as any;
  const { data, isSuccess, isLoading } = useGetMyMemberDetailQuery();

  return (
    <div className="short-stats-panel">
      <Header
        title="Dashboard"
        buttonNode={
          <div className="add-container">
            <MultiOptionSwitcher textList={timeSortList} />
            {!(
              abilities.can('have', 'queue') || abilities.can('manage', 'queue')
            ) ? (
              isLoading ? (
                <LoadingSpinner />
              ) : (
                isSuccess && (
                  <UserProfileStatus
                    width={40}
                    status={data.status}
                    imgSrc={data.avatar}
                    alt={data.name + data.id}
                    onClick={() => {
                      modal(
                        () => <MemberBigCard id={data.id} />,
                        FIT_MODAL,
                      ).open();
                    }}
                  />
                )
              )
            ) : null}
          </div>
        }
      />
      <div className="stats-container">
        {miniStatsList.map(
          ({ text, Icon, value, backgroundColor, percentage }) => (
            <Badged pre="preview" key={text + value}>
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
    </div>
  );
}
