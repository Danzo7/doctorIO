import { Route, Routes } from 'react-router-dom';
import './style/index.scss';
import { NavTabMenu } from '@components/tab_menu';
import GeneralStatisticTab from './pages/general_statistic_tab';
interface StatisticsProps {}
export default function Statistics({}: StatisticsProps) {
  return (
    <div className="statistics">
      <span>Growth & Earning</span>
      <NavTabMenu
        items={[
          { name: 'General', route: { to: '', include: 'GeneralStatistics' } },
        ]}
      />
      <Routes>
        <Route path="" element={<GeneralStatisticTab />} />
        <Route path="GeneralStatistics" element={<GeneralStatisticTab />} />
      </Routes>
    </div>
  );
}
