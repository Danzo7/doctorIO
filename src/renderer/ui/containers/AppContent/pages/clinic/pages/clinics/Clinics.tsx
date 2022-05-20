import color from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import ClinicItem from '@components/clinic_item';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
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
                if (selected === index) navigate('123', { replace: true });
              }}
            />
          ),
        )}
        <div className="join-button-container">
          <TextButton
            text="Join  a new server..."
            fontSize={15}
            fontColor={color.white}
            borderColor={color.border_color}
            radius={7}
            backgroundColor={color.darkersec_color}
          />
        </div>
      </div>
    </div>
  );
}
