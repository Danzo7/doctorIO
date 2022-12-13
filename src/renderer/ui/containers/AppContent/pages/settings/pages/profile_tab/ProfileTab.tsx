import { color } from '@assets/styles/color';
import IconicButton from '@components/buttons/iconic_button';
import LoadingSpinner from '@components/loading_spinner';
import TextPair from '@components/text_pair/TextPair';
import UserProfileStatus from '@components/user_profile_status';
import { DATE_ONLY } from '@constants/data_format';
import ProfilePictureModal from '@containers/modals/profile_picture_modal';
import { FIT_MODAL } from '@libs/overlay';
import { useGetMyMemberDetailQuery } from '@redux/clinic/rbac/member/memberApi';
import { modal } from '@stores/overlayStore';
import { format } from 'date-fns';
import Edit from 'toSvg/pencil.svg?icon';
import './style/index.scss';
interface ProfileTabProps {}
export default function ProfileTab({}: ProfileTabProps) {
  const { data, isSuccess, isLoading } = useGetMyMemberDetailQuery();
  return isLoading ? (
    <LoadingSpinner />
  ) : isSuccess ? (
    <div className="profile-tab">
      <UserProfileStatus
        imgSrc={data.avatar}
        status={data.status}
        width={100}
        alt={data.name}
        onClick={() => {
          modal(<ProfilePictureModal registration={false} />, FIT_MODAL).open();
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
            text: format(data.joinDate, DATE_ONLY),
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
          onPress={() => {}}
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
