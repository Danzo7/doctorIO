import SmallClinicStatus from '@components/small_clinic_status';
import WelcomeBox from '@components/welcome_box';
import './index.scss';
interface AppContentProps {}

function AppContent({}: AppContentProps) {
  return (
    <div className="AppContent">
      <WelcomeBox />
      <SmallClinicStatus />
    </div>
  );
}

export default AppContent;
