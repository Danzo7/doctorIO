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
  return (
    <ModalContainer title="Select a patient">
      <div className="add-search-to-booked">
        <form>
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
        </form>
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
              />
            </PresentationItem>
          ))}
        </div>
      </div>
    </ModalContainer>
  );
}
