import colors from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import ClinicItem from '@components/clinic_item';
import JoinNewClinicModal from '@containers/modals/join_new_clinic_modal';
import useNavigation from '@libs/hooks/useNavigation';
import { FIT_MODAL } from '@libs/overlay';
import { useOverlay } from '@libs/overlay/useOverlay';
import { connect } from '@redux/local/connectionStateSlice';
import { useAppSelector } from '@store';
import { useDispatch } from 'react-redux';
import './style/index.scss';

export default function Clinics() {
  const { toParent } = useNavigation();
  const { open } = useOverlay();
  const dispatch = useDispatch();
  const userInfo = useAppSelector((state) => state.user);
  return (
    <div className="clinics">
      <span>Clinics</span>
      <div className="servers-container">
        {userInfo.clinic &&
          userInfo.clinic.map((clinicInfo, index) => (
            <ClinicItem
              selected={userInfo.selectedClinic == index}
              key={clinicInfo.clinicId.toString() + index}
              //just for testing
              isHost={index == 2} //FEATURE check if clinic is localhost
              clinicInfo={clinicInfo}
              onClick={() => {
                if (userInfo.selectedClinic === index) toParent();
                else {
                  connect(dispatch, index);
                  // toParent();
                }
              }}
            />
          ))}
        <div className="join-button-container">
          <TextButton
            text="Join  a new server..."
            fontSize={15}
            fontColor={colors.white}
            borderColor={colors.border_color}
            radius={7}
            backgroundColor={colors.darkersec_color}
            onPress={() => open(<JoinNewClinicModal />, FIT_MODAL)}
          />
        </div>
      </div>
    </div>
  );
}
