import { clinicsArray } from '@api/fake';
import colors from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import ClinicItem from '@components/clinic_item';
import JoinNewClinicModal from '@containers/modals/join_new_clinic_modal';
import useNavigation from '@libs/hooks/useNavigation';
import { FIT_MODAL } from '@libs/overlay';
import { useOverlay } from '@libs/overlay/useOverlay';
import './style/index.scss';

interface ClinicsProps {
  selected: number;
}
export const generateTime = (hour: number, min: number) => {
  const time = new Date();
  time.setHours(hour, min);
  return time;
};

export default function Clinics({ selected = 0 }: ClinicsProps) {
  const { toParent } = useNavigation();
  const { open } = useOverlay();
  return (
    <div className="clinics">
      <span>Clinics</span>
      <div className="servers-container">
        {clinicsArray.map((clinicInfo, index) => (
          <ClinicItem
            selected={selected == index}
            key={clinicInfo.clinicId}
            //just for testing
            isHost={index == 2} //TODO? set isHost Value
            clinicInfo={clinicInfo}
            onClick={() => {
              if (selected === index) toParent();
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
