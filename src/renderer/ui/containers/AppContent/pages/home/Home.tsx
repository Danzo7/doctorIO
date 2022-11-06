import LoadingSpinner from '@components/loading_spinner';
import MembersPanel from '@components/members_panel';
import ShortStatsPanel from '@components/short_stats_panel';
import SmallClinicStatus from '@components/small_clinic_status';
import WelcomeBox from '@components/welcome_box';
import { useGetMyMemberDetailQuery } from '@redux/clinic/rbac/member/memberApi';
import './style/index.scss';
interface HomeProps {}
export default function Home({}: HomeProps) {
  const { data, isSuccess, error, isLoading } = useGetMyMemberDetailQuery();
  return (
    <>
      <div>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          isSuccess && (
            <WelcomeBox
              message={`Welcome ${data?.gender == 'male' ? 'mr' : 'ms'} ${
                data.name
              }`}
            />
          )
        )}
        <ShortStatsPanel />
      </div>
      <div className="home-body">
        <MembersPanel />
        <SmallClinicStatus hasViewClinic />
      </div>
    </>
  );
}
