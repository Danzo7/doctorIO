import ModalContainer from '@components/modal_container';
import { useClinicsStore } from '@stores/clinicsStore';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import TextButton from '@components/buttons/text_button';
import Input from '@components/inputs/input';
import ErrorPanel from '@components/error_panel';
import { useConnectionStore } from '@stores/ConnectionStore';
import { color } from '@assets/styles/color';
import { zodResolver } from '@hookform/resolvers/zod';
interface UpdateIpModalProps {
  onCancel?: () => void;
  onConfirm?: () => void;
  selectedIndex?: number;
}
const schema = z.object({
  ip: z
    .string()
    .regex(
      /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/,
      'Please enter a valid IP address',
    ),
});
export default function UpdateIpModal({
  onCancel,
  selectedIndex,
  onConfirm,
}: UpdateIpModalProps) {
  const clinicStore = useClinicsStore.getState();
  const { control, handleSubmit } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });
  return (
    <ModalContainer
      title={'Update server location'}
      controls={
        <>
          <TextButton
            backgroundColor={color.cold_blue}
            onPress={handleSubmit((data) => {
              if (selectedIndex !== undefined) {
                clinicStore.setLocation(selectedIndex, data.ip + ':3000');
                onConfirm?.();
              } else {
                clinicStore.setCurrentLocation(data.ip + ':3000');
                useConnectionStore.getState().reconnect();
              }
            })}
            text="Update"
            width={'100%'}
          />
          {onCancel && (
            <TextButton
              backgroundColor={color.light}
              onPress={onCancel}
              text="Cancel"
            />
          )}
        </>
      }
    >
      {clinicStore.hasSelectedClinic() || selectedIndex ? (
        <Input
          control={control}
          hint="The server IP address of can be retrieved from a connected devices"
          name="ip"
          label="IP address"
          type="text"
          defaultValue={
            selectedIndex
              ? clinicStore
                  .getClinic(selectedIndex)
                  .serverLocation.replace(':3000', '')
              : clinicStore
                  .getSelectedClinic()
                  .serverLocation.replace(':3000', '')
          }
        />
      ) : (
        <ErrorPanel />
      )}
    </ModalContainer>
  );
}
