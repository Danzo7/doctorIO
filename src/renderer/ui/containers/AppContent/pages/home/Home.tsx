import ShortStatsPanel from '@components/short_stats_panel';
import SmallClinicStatus from '@components/small_clinic_status';
import WelcomeBox from '@components/welcome_box';
import './style/index.scss';
interface HomeProps {}
export default function Home({}: HomeProps) {
  return (
    <>
      <WelcomeBox />
      <ShortStatsPanel />
      <div>
        <SmallClinicStatus />
      </div>
    </>
  );
}
