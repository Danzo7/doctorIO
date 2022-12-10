import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import LogoChanger from '@components/logo_changer';
import ModalContainer from '@components/modal_container';
import './style/index.scss';
interface ProfilePictureModalProps {}
export default function ProfilePictureModal({}: ProfilePictureModalProps) {
  return (
    <ModalContainer
      title="Set a profile picture"
      controls={
        <div className="profile-picture-controls">
          <span onClick={() => {}}> Skip</span>
          <TextButton
            text="Upload"
            backgroundColor={color.cold_blue}
            fontSize={12}
            fontWeight={700}
            padding={'5px 15px'}
          />
        </div>
      }
    >
      <div className="logo-changer-wrapper">
        <LogoChanger width={100} onChange={(newSrc) => {}} />
      </div>
    </ModalContainer>
  );
}
