import HomeContent from './contents/home';
import './index.scss';
interface AppContentProps {}

function AppContent({}: AppContentProps) {
  return (
    <div className="AppContent">
      <HomeContent></HomeContent>
    </div>
  );
}

export default AppContent;
