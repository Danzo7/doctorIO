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
  const [setAvatar] = useSetAvatarMutation();
  const [formData, setFormData] = useState<FormData>();
  const { data, isSuccess, isLoading } = useGetMyMemberDetailQuery();
  return (
    <ModalContainer
      isLoading={isLoading}
      title="Set a profile picture"
      controls={
        <div className="profile-picture-controls">
          <span
            onClick={() => {
              //TODO: close current modal
            }}
          >
            Skip
          </span>
          <TextButton
            text="Upload"
            backgroundColor={color.cold_blue}
            fontSize={12}
            fontWeight={700}
            padding={'5px 15px'}
            disabled={!formData}
            onPress={() => {
              if (formData) setAvatar({ data: formData });
              //FEATURE:update avatar in electron local file system
            }}
          />
        </div>
      }
    >
      {isSuccess ? (
        <div className="logo-changer-wrapper">
          <LogoChanger
            width={100}
            src={
              formData && formData.get('file')
                ? URL.createObjectURL(formData.get('file') as File)
                : data.avatar
            }
            alt={data.name}
            onChange={(newSrc) => {
              const fd = new FormData();
              fd.append('file', newSrc);
              setFormData(fd);
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
