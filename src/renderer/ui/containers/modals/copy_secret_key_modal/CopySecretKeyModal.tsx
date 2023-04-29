import ModalContainer from '@components/modal_container';
import './style/index.scss';
import TextButton from '@components/buttons/text_button';
import { color } from '@assets/styles/color';
import CopyField from '@components/copy_field';
interface CopySecretKeyModalProps {
  secretKey: string;
}
export default function CopySecretKeyModal({
  secretKey,
}: CopySecretKeyModalProps) {
  return (
    <ModalContainer
      className="copy-secret-key-modal"
      title="Secret key"
      overflowHidden={false}
      controls={
        <TextButton
          text="Continue"
          backgroundColor={color.cold_blue}
          fontSize={13}
          fontWeight={700}
          alignSelf="center"
          padding={5}
          onPress={() => {
            window.location.reload();
          }}
        />
      }
    >
      <CopyField
        text={secretKey}
        hint="Please backup your secret key, you will need it to login to your account."
      />
    </ModalContainer>
  );
}
