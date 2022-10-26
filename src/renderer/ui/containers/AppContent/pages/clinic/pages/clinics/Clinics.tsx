import colors from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import ClinicItem from '@components/clinic_item';
import ConnectMemberModal from '@containers/modals/connect_member_modal';
import JoinNewClinicModal from '@containers/modals/join_new_clinic_modal';
import useNavigation from '@libs/hooks/useNavigation';
import { FIT_MODAL } from '@libs/overlay';
import { useOverlay } from '@libs/overlay/useOverlay';
import { connect } from '@redux/local/connectionStateSlice';
import { useAppSelector } from '@store';
import { useClinicsStore } from '@stores/clinicsStore';
import { useDispatch } from 'react-redux';
import './style/index.scss';

export default function Clinics() {
  const { toParent } = useNavigation();
  const { open } = useOverlay();
  const dispatch = useDispatch();
  //const user = useAppSelector((state) => state.user);
  const clinics = useClinicsStore();
  const tokens = useAppSelector((state) => state.authSlice);
  return (
    <div className="clinics">
      <span>Clinics</span>
      <div className="servers-container">
        {clinics.getClinics().map((clinicData, index) => (
          <ClinicItem
            selected={clinics.getSelectedIndex() == index}
            key={clinicData.name + index}
            isHost={clinicData.serverLocation == '127.0.0.1'}
            name={clinicData.name}
            onClick={() => {
              if (clinics.getSelectedIndex() == index) toParent();
              else {
                if (
                  tokens.accessToken == undefined ||
                  tokens.refreshToken == undefined
                ) {
                  open(<ConnectMemberModal selectedIndex={index} />, FIT_MODAL);
                } else connect(dispatch, index);
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
