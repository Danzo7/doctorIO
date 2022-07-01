import RecentAppsItem from '@components/recent_apps_item';
import Svg from '@libs/svg';
import search from 'toSvg/search.svg?icon';
import { useForm } from 'react-hook-form';
import './style/index.scss';
import Input from '@components/inputs/input';
import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import { useOverlay } from '@libs/overlay/useOverlay';
import AddPatientModal from '../add_patient_modal';
import ModalContainer from '@components/modal_container';
import { DEFAULT_MODAL } from '@libs/overlay';
import { patients } from '@api/fake';
interface QueueAddSearchModalProps {}
interface SearchInput {
  searchField: string;
}

export default function QueueAddSearchModal({}: QueueAddSearchModalProps) {
  const { register, watch } = useForm<SearchInput>();
  const watchSearch = watch('searchField', '');
  const { open } = useOverlay();

  const searchPatient = () => {
    if (
      watchSearch &&
      watchSearch.length > 0 &&
      watchSearch.trim().length > 0
    ) {
      return patients.find(
        (pat) =>
          pat.patId.toString() == watchSearch ||
          pat.firstName.toLowerCase() == watchSearch.toLowerCase() ||
          pat.lastName.toLowerCase() == watchSearch.toLowerCase(),
      );
    }
  };
  const selectedPatient = searchPatient();
  return (
    <ModalContainer
      title="Add a Patient to appointment queue"
      controls={
        selectedPatient == undefined ? (
          <TextButton
            text="Add new patient"
            backgroundColor={color.lighter_background}
            padding="10px 15px"
            fontSize={13}
            fontWeight={700}
            borderColor={color.border_color}
            onPress={() => {
              open(<AddPatientModal />, DEFAULT_MODAL);
            }}
          />
        ) : (
          <RecentAppsItem
            firstName={selectedPatient.firstName}
            lastName={selectedPatient.lastName}
            patId={selectedPatient.patId}
          />
        )
      }
    >
      <Input
        hint={
          watchSearch.length > 0 && selectedPatient == undefined
            ? 'Can’t find any patient with the same name'
            : undefined
        }
        fillContainer
        placeholder="search for a patient"
        trailing={<Svg>{search}</Svg>}
        type="search"
        {...register('searchField')}
      />
    </ModalContainer>
  );
}
