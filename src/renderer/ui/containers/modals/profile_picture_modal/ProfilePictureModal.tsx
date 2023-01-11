import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import LogoChanger from '@components/logo_changer';
import ModalContainer from '@components/modal_container';
import {
  useGetMyMemberDetailQuery,
  useSetAvatarMutation,
} from '@redux/clinic/rbac/member/memberApi';
import { useState } from 'react';
import './style/index.scss';
interface ProfilePictureModalProps {}
export default function ProfilePictureModal({}: ProfilePictureModalProps) {
  //TODO delete this component (useless)
  const [setAvatar] = useSetAvatarMutation();
  const [formData, setFormData] = useState<string>();
  const { data, isSuccess, isLoading } = useGetMyMemberDetailQuery();
  return (
    <ModalContainer
      isLoading={isLoading}
      title="Set a profile picture"
      controls={
        <div className="profile-picture-controls">
          <TextButton
            text="Select"
            backgroundColor={color.cold_blue}
            fontSize={12}
            fontWeight={700}
            padding={'5px 15px'}
            disabled={!formData}
            onPress={() => {
              // modal(
              //   <CropPictureModal
              //     src={formData}
              //     onSave={(img) => {
              //       setAvatar({ data: img });
              //     }}
              //   />,
              //   FIT_MODAL,
              // ).open();
              //FEATURE:update avatar in electron local file system
            }}
          />

          <span
            onClick={() => {
              //TODO: close current modal
            }}
          >
            Skip
          </span>
        </div>
      }
    >
      {isSuccess ? (
        <div className="logo-changer-wrapper">
          <LogoChanger
            width={100}
            src={formData || data.avatar}
            alt={data.name}
            onChange={(newSrc) => {
              setFormData(URL.createObjectURL(newSrc));
            }}
            direct={!!formData}
          />
        </div>
      ) : (
        <div>error</div>
      )}
    </ModalContainer>
  );
}
