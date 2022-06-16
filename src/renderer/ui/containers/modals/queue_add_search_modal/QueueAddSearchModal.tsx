import RecentAppsItem from '@components/recent_apps_item';
import Svg from '@libs/svg';
import search from 'toSvg/search.svg?icon';
import { useForm } from 'react-hook-form';
import './style/index.scss';
import Input from '@components/inputs/input';
import Header from '@components/header';
import useSearchPatient from '@libs/hooks/useSearchPatient';
import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import { useOverlay } from '@libs/overlay/useOverlay';
import AddPatientModal from '../add_patient_modal';
interface QueueAddSearchModalProps {}
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
export default function QueueAddSearchModal({}: QueueAddSearchModalProps) {
  const { register, watch } = useForm<SearchInput>();
  const watchSearch = watch('searchField', '');
  const matches = useSearchPatient(watchSearch, usersData, true);
  const { open } = useOverlay();
  return (
    <div className="queue-add-search-modal">
      <Header title="Add a Patient to appointment queue" />
      <form>
        <Input
          hint={
            matches?.length == 0
              ? 'Can’t find any patient with the same name'
              : undefined
          }
          fillContainer
          placeholder="search for a patient"
          trailing={<Svg>{search}</Svg>}
          type="search"
          {...register('searchField')}
        />
      </form>

      {matches?.length == 0 ? (
        <TextButton
          text="Add new patient"
          backgroundColor={color.lighter_background}
          padding="10px 15px"
          fontSize={13}
          fontWeight={700}
          borderColor={color.border_color}
          onPress={() => {
            open(<AddPatientModal />, {
              closeOnClickOutside: true,
              isDimmed: true,
              clickThrough: false,
              width: '30%',
              closeBtn: 'inner',
            });
          }}
        />
      ) : (
        <div className="suggestions-container">
          {matches?.map(({ fullName, age }, index) => (
            <RecentAppsItem fullName={fullName} age={age} key={index} />
          ))}
        </div>
      )}
    </div>
  );
}
