import colors from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import ClinicItem from '@components/clinic_item';
import ConnectMemberModal from '@containers/modals/connect_member_modal';
import JoinNewClinicModal from '@containers/modals/join_new_clinic_modal';
import useNavigation from '@libs/hooks/useNavigation';
import { DEFAULT_MODAL } from '@libs/overlay';
import { useClinicsStore } from '@stores/clinicsStore';
import { modal } from '@stores/overlayStore';
import './style/index.scss';

export default function Clinics() {
  const { toParent } = useNavigation();

  const clinics = useClinicsStore();
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
              else
                modal(
                  () => <ConnectMemberModal selectedIndex={index} />,
                  DEFAULT_MODAL,
                ).open();
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
            onPress={() =>
              modal(() => <JoinNewClinicModal />, DEFAULT_MODAL).open()
            }
          />
        </div>
      </div>
    </div>
  );
}
