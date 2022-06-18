import Input from '@components/inputs/input';
import useSearchPatient from '@libs/hooks/useSearchPatient';
import { useForm } from 'react-hook-form';
import './style/index.scss';
import Svg from '@libs/svg';
import search from 'toSvg/search.svg?icon';
import PresentationItem from '@components/presentation_item';
import TextButton from '@components/buttons/text_button';
import { color } from '@assets/styles/color';
import ModalContainer from '@components/modal_container';
import { useOverlay } from '@libs/overlay/useOverlay';
import BookAppointmentModal from '../book_appointment_modal';
import { Overlay } from '@libs/overlay';

interface SearchInput {
  searchField: string;
}
const usersData = [
  {
    fullName: 'brahim aymen',
    id: '#123456789',
    age: 24,
  },
  {
    fullName: 'daouadji aymen',
    age: 24,
    id: '#1234546789',
  },
  {
    fullName: 'amine bou',
    age: 24,
    id: '#223456789',
  },
  {
    fullName: 'John Doe',
    age: 24,
    id: '#323456789',
  },
];
interface AddSearchToBookedProps {}
export default function AddSearchToBooked({}: AddSearchToBookedProps) {
  const { register, watch } = useForm<SearchInput>();
  const watchSearch = watch('searchField', '');
  const matches = useSearchPatient(watchSearch, usersData, false);
  const { open, close } = useOverlay();
  return (
    <ModalContainer
      title="Select a patient"
      controls={
        <div className="suggestions-container">
          {matches?.map(({ fullName, age }, index) => (
            <PresentationItem
              primaryText={fullName}
              secondaryText={age}
              key={index}
            >
              <TextButton
                text="Select"
                backgroundColor={color.cold_blue}
                padding="5px 10px"
                fontSize={13}
                fontWeight={600}
                onPress={() => {
                  open(
                    <BookAppointmentModal
                      patientName={fullName}
                      id={'12346789'}
                    />,
                    {
                      closeOnClickOutside: true,
                      isDimmed: true,
                      clickThrough: false,
                      width: '30%',
                      closeBtn: 'inner',
                    },
                  );
                }}
              />
            </PresentationItem>
          ))}
        </div>
      }
    >
      <Input
        hint={
          matches?.length == 0
            ? 'Can’t find any patient with the same name'
            : undefined
        }
        hintAlignment="center"
        fillContainer
        placeholder="search for a patient"
        trailing={<Svg>{search}</Svg>}
        type="search"
        {...register('searchField')}
      />
    </ModalContainer>
  );
}
