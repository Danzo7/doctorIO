import ClinicOverviewCard from '@components/clinic_overview_card';
import OverviewInfoForm from './overview_info_form';
import './style/index.scss';
import { useAppSelector } from '@store';
import { useGetClinicQuery } from '@redux/clinic/clinicApi';
import {
  useOverViewInfo,
  useSetDefaults,
  useSetOverViewInfo,
} from '@stores/overViewinfoStore';
import { clinic } from '@api/fake';
import LoadingSpinner from '@components/loading_spinner';

interface OverviewTabProps {}
export default function OverviewTab({}: OverviewTabProps) {
  //REDUX fetch clinic info
  const clinicInfo = useAppSelector((state) => state.settings);
  // const setOverviewInfo = useSetOverViewInfo();

  // const info = useOverViewInfo();
  const setDefaults = useSetDefaults();
  const info = useOverViewInfo();

  const { data, error, isSuccess, isLoading } = useGetClinicQuery();
  if (info.defaults == undefined && !isLoading) {
    setDefaults({
      name: isSuccess ? data.name : 'bs',
      description: isSuccess ? data.description : 'bs',
      address: isSuccess ? data.address : '',
      phone: isSuccess ? data.phone : '',
    });
  }
  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        isSuccess && (
          <div className="overview-tab">
            <ClinicOverviewCard {...clinicInfo} />
            <div className="overview-tab-sep" />
            <OverviewInfoForm />
          </div>
        )
      )}
    </>
  );
}
