import ShortStatsPanel from '@components/short_stats_panel';
import WelcomeBox from '@components/welcome_box';
import './style/index.scss';
interface HomeProps {}
export default function Home({}: HomeProps) {
  return (
    <div className="home">
      <WelcomeBox />
      <ShortStatsPanel />
    </div>
  );
}
