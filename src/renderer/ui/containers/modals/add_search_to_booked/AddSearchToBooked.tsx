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
import { useFindPatientByNameMutation } from '@redux/instance/record/patient_api';
import LoadingSpinner from '@components/loading_spinner';
import { useRef } from 'react';
import { PatientBrief, ServerError } from '@models/instance.model';

interface SearchInput {
  searchField: string;
}

interface AddSearchToBookedProps {}
export default function AddSearchToBooked({}: AddSearchToBookedProps) {
  const searchRef = useRef<string>('');

  const { control, handleSubmit } = useForm<SearchInput>({
    mode: 'onSubmit',
    defaultValues: { searchField: searchRef.current },
  });
  const [FindPatientByName, result] = useFindPatientByNameMutation();
  const errorRef = useRef<ServerError>();
  const serverError: ServerError | undefined = (result.error as any)
    ?.data as ServerError;
  if (result.isError || result.isSuccess) errorRef.current = serverError;

  const { open } = useOverlay();
  return (
    <ModalContainer
      title="Select a patient"
      controls={
        <div className="suggestions-container">
          {errorRef.current == undefined && result.isLoading ? (
            <LoadingSpinner />
          ) : (
            result.isSuccess &&
            (() => {
              const patients = result.data as PatientBrief[];
              return patients?.map((pat) => (
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
              ));
            })()
          )}
        </div>
      }
    >
      <form
        css={{ flexGrow: 1 }}
        onSubmit={handleSubmit((value) => {
          // result.reset();
          if (searchRef.current != value.searchField) {
            searchRef.current = value.searchField.trim();
            FindPatientByName(value.searchField);
          }
        })}
      >
        <Input
          errorMessage={
            errorRef.current?.statusCode == 400
              ? errorRef.current.message[0]
              : errorRef.current?.statusCode == 404
              ? 'No patient found'
              : undefined
          }
          hintAlignment="center"
          fillContainer
          placeholder="search for a patient"
          trailing={<TextButton Icon={search} blank />}
          type="search"
          name="searchField"
          control={control}
        />
      </form>
    </ModalContainer>
  );
}
