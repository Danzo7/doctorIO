import MembersPanel from '@components/members_panel';
import ShortStatsPanel from '@components/short_stats_panel';
import SmallClinicStatus from '@components/small_clinic_status';
import WelcomeBox from '@components/welcome_box';
import useNavigation from '@libs/hooks/useNavigation';
import './style/index.scss';
interface HomeProps {}
export default function Home({}: HomeProps) {
  const { navigate } = useNavigation();
  return (
    <>
      <div>
        <WelcomeBox message="Welcome Boy" />
        <ShortStatsPanel />
      </div>
      <div className="home-body">
        <MembersPanel />
        <SmallClinicStatus
          OnViewClinic={() => {
            navigate('clinic/TimingAndSchedule');
          }}
        />
      </div>
    </>
  );
}
