import MultiOptionSwitcher from '@components/buttons/multi_option_switcher';
import MiniStats from '@components/mini_stats';
import './style/index.scss';
import exclamation from 'toSvg/exclamation.svg?icon';
import colors from '@colors';
import { DEFAULT_MODAL } from '@libs/overlay';
import { useOverlay } from '@libs/overlay/useOverlay';
import { useGetMyMemberDetailQuery } from '@redux/clinic/rbac/member/memberApi';
import MemberBigCard from '@containers/modals/member_big_card';
import Can from '@ability/index';
import LoadingSpinner from '@components/loading_spinner';
import UserProfileStatus from '@components/user_profile_status';
import { useGetQueueAppointmentsQuery } from '@redux/instance/appointmentQueue/AppointmentQueueApi';
import Header from '@components/header';
import { useAbility } from '@stores/abilityStore';
interface ShortStatsPanelProps {}
export default function ShortStatsPanel({}: ShortStatsPanelProps) {
  const appointmentsQuery = useGetQueueAppointmentsQuery();
  const count = appointmentsQuery.isSuccess ? appointmentsQuery.data.length : 0;
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
      value: count,
      Icon: exclamation,
    },
  ];
  const { data, isSuccess, error, isLoading } = useGetMyMemberDetailQuery();
  const { open } = useOverlay();
  const abilities = useAbility();
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
                    status={true}
                    imgSrc={data.avatar}
                    alt={data.name + data.id}
                    onClick={() => {
                      open(<MemberBigCard id={data.id} />, {
                        ...DEFAULT_MODAL,
                        width: '20%',
                      });
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
