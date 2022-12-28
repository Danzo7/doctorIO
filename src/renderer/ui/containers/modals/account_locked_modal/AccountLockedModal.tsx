import TextButton from '@components/buttons/text_button';
import AlertModal from '../dialog_modal';
import { color } from '@colors';
import { useConnectionStore } from '@stores/ConnectionStore';
interface AccountLockedModalProps {
  onUnlock: () => void;
}
export default function AccountLockedModal({
  onUnlock,
}: AccountLockedModalProps) {
  const { disconnect } = useConnectionStore();
  return (
    <AlertModal
      title="Account is Locked"
      description="To unlock your account, you must provide your secret key"
      status="warning"
      controls={
        <>
          <TextButton
            text="Unlock"
            backgroundColor={color.good_green}
            onPress={onUnlock}
          />
          <TextButton
            text="Disconnect"
            backgroundColor={color.hot_red}
            onPress={disconnect}
          />
        </>
      }
    />
  );
}
