import { color } from '@assets/styles/color';
import IconicButton from '@components/buttons/iconic_button';
import LoadingSpinner from '@components/loading_spinner';
import LogoChanger from '@components/logo_changer';
import TextPair from '@components/text_pair/TextPair';
import { SETTINGS } from '@stores/appSettingsStore';

import CropPictureModal from '@containers/modals/crop_picture_modal';
import { DEFAULT_MODAL, modal, toast } from '@libs/overlay';
import { useGetMyMemberDetailQuery } from '@redux/clinic/rbac/member/memberApi';

import { format } from 'date-fns';
import Edit from 'toSvg/pencil.svg?icon';
import './style/index.scss';
import UserRegister from '@containers/modals/user_regisiter';

interface ProfileTabProps {}
export default function ProfileTab({}: ProfileTabProps) {
  const { data, isSuccess, isLoading } = useGetMyMemberDetailQuery();
  return isLoading ? (
    <LoadingSpinner />
  ) : isSuccess ? (
    <div className="profile-tab">
      <LogoChanger
        width={100}
        src={data.avatar}
        alt={data.name}
        onChange={(file) => {
          if (file.size > 1024 * 1024 * 5) {
            toast('File size must be less than 5MB', 'error');
            return;
          }
          modal(
            <CropPictureModal src={URL.createObjectURL(file)} />,
            { ...DEFAULT_MODAL, transition: 'appear-bottom' },
            'avatarCropper',
          ).open();
        }}
      />
      <div className="fullName-id-container">
        <span>{data.name}</span>
        <span>#{data.id}</span>
      </div>
      <div className="member-info">
        <TextPair
          first={{ text: 'Age', fontSize: 15, fontColor: color.text_gray }}
          second={{
            text: data.age.toString(),
            fontSize: 17,
            fontColor: color.white,
          }}
          alignItems={'center'}
        />
        <TextPair
          first={{
            text: 'Gender',
            fontSize: 15,
            fontColor: color.text_gray,
          }}
          second={{
            text: data.gender,
            fontSize: 17,
            fontColor: color.white,
          }}
          alignItems={'center'}
        />
        {data.phone && (
          <TextPair
            first={{
              text: 'Phone number',
              fontSize: 15,
              fontColor: color.text_gray,
            }}
            second={{
              text: data.phone,
              fontSize: 17,
              fontColor: color.white,
            }}
            alignItems={'center'}
          />
        )}
        {data.address && (
          <TextPair
            first={{
              text: 'Address',
              fontSize: 15,
              fontColor: color.text_gray,
            }}
            second={{
              text: data.address,
              fontSize: 17,
              fontColor: color.white,
            }}
            alignItems={'center'}
          />
        )}
        <TextPair
          first={{
            text: 'Join date',
            fontSize: 15,
            fontColor: color.text_gray,
          }}
          second={{
            text: format(data.joinDate, SETTINGS.dateFormat),
            fontSize: 17,
            fontColor: color.white,
          }}
          alignItems={'center'}
        />
        {data.addedBy && (
          <TextPair
            first={{
              text: 'Added by',
              fontSize: 15,
              fontColor: color.text_gray,
            }}
            second={{
              text: data.addedBy.name,
              fontSize: 17,
              fontColor: color.white,
            }}
            alignItems={'center'}
          />
        )}
      </div>
      <span className="note-span">
        Note: any update to this information will be applied to other clinic
        servers the next time you connected to them.
      </span>
      <div className="edit-div-button">
        <IconicButton
          tip="Edit"
          onPress={() => {
            modal(
              <UserRegister
                defaultValues={{
                  firstName: data.name.split(' ')[0],
                  lastName: data.name.split(' ')[1],
                  age: data.age,
                  address: data.address ?? '',
                  email: 'email@example.com',
                  gender: data.gender,
                  phone: data.phone ?? '',
                }}
              />,
              DEFAULT_MODAL,
            ).open();
          }}
          blank
          width={25}
          radius={7}
          backgroundColor={color.cold_blue}
          Icon={<Edit width={10} height={10} />}
        />
      </div>
    </div>
  ) : (
    <div>error</div>
  );
}
