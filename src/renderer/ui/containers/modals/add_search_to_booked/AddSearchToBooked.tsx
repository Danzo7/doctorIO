import Input from '@components/inputs/input';
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
import { DEFAULT_MODAL } from '@libs/overlay';
import { useFindPatientByNameQuery } from '@redux/instance/record/recordApi';
import LoadingSpinner from '@components/loading_spinner';

interface SearchInput {
  searchField: string;
}

interface AddSearchToBookedProps {}
export default function AddSearchToBooked({}: AddSearchToBookedProps) {
  const { register, watch } = useForm<SearchInput>();
  const watchSearch = watch('searchField', '');
  const { data, isSuccess, isError, error } = useFindPatientByNameQuery(
    watchSearch.toLowerCase(),
  );
  const result = isSuccess && data ? data : undefined;

  const { open } = useOverlay();
  return (
    <ModalContainer
      title="Select a patient"
      controls={
        <div className="suggestions-container">
          {result &&
            isSuccess &&
            result.map((pat) => (
              <PresentationItem
                primaryText={pat.name}
                secondaryText={pat.id.toString()}
                key={pat.id}
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
                        patientName={pat.name}
                        id={pat.id}
                      />,
                      DEFAULT_MODAL,
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
          watchSearch.length > 0
            ? isError
              ? 'error from server'
              : undefined
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
