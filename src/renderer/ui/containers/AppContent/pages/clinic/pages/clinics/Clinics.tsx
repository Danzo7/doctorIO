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

const clinicsArray = [
  {
    id: 0,
    numOfPatients: 18,
    numOfAssistants: 20,
    timeToClose: '12:00PM',
  },
  {
    id: 1,
    numOfPatients: 18,
    numOfAssistants: 20,
    timeToClose: '12:00PM',
  },
  {
    id: 2,
    numOfPatients: 18,
    numOfAssistants: 20,
    timeToClose: '12:00PM',
  },
];
export default function Clinics({ selected = 0 }: ClinicsProps) {
  const { toParent } = useNavigation();
  const { open } = useOverlay();
  return (
    <div className="clinics">
      <span>Clinics</span>
      <div className="servers-container">
        {clinicsArray.map(
          ({ id, numOfPatients, numOfAssistants, timeToClose }, index) => (
            <ClinicItem
              selected={selected == index}
              key={id}
              //just for testing
              isHost={index == 2}
              numOfPatients={numOfPatients}
              numOfAssistants={numOfAssistants}
              timeToClose={timeToClose}
              onClick={() => {
                if (selected === index) toParent();
              }}
            />
          ),
        )}
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
