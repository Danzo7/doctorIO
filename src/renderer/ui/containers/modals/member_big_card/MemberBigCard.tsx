import { color } from '@assets/styles/color';
import TextPair from '@components/text_pair/TextPair';
import UserProfileStatus from '@components/user_profile_status';
import './style/index.scss';
import SmallRoleList from '@components/members_preview/small_role_list';
import MemberActionControls from '@components/member_action_controls';
import { Member, MemberBrief } from '@models/server.models';
import { format } from 'date-fns';
import { DATE_ONLY } from '@constants/data_format';
import { members } from '@api/fake';

export default function MemberBigCard({ id }: Pick<MemberBrief, 'id'>) {
  //REDUX fetch members
  const {
    avatar,
    status,
    name,
    age,
    gender,
    phone,
    address,
    joinDate,
    roles,
    addedBy,
  } = members.filter(({ id: mId }) => id == mId)[0];
  return (
    <div className="member-big-card">
      <UserProfileStatus
        imgSrc={avatar}
        status={status}
        width={100}
        alt={name + id}
      />
      <div className="fullName-id-container">
        <span>{name}</span>
        <span>#{id}</span>
      </div>
      <TextPair
        first={{ text: 'Age', fontSize: 15, fontColor: color.text_gray }}
        second={{
          text: age.toString(),
          fontSize: 17,
          fontColor: color.white,
        }}
        alignItems={'center'}
      />
      <TextPair
        first={{ text: 'Gender', fontSize: 15, fontColor: color.text_gray }}
        second={{
          text: gender,
          fontSize: 17,
          fontColor: color.white,
        }}
        alignItems={'center'}
      />
      {phone && (
        <TextPair
          first={{
            text: 'Phone number',
            fontSize: 15,
            fontColor: color.text_gray,
          }}
          second={{
            text: phone,
            fontSize: 17,
            fontColor: color.white,
          }}
          alignItems={'center'}
        />
      )}
      {address && (
        <TextPair
          first={{ text: 'Address', fontSize: 15, fontColor: color.text_gray }}
          second={{
            text: address,
            fontSize: 17,
            fontColor: color.white,
          }}
          alignItems={'center'}
        />
      )}
      <TextPair
        first={{ text: 'Join date', fontSize: 15, fontColor: color.text_gray }}
        second={{
          text: format(joinDate, DATE_ONLY),
          fontSize: 17,
          fontColor: color.white,
        }}
        alignItems={'center'}
      />
      {addedBy && (
        <TextPair
          first={{ text: 'Added by', fontSize: 15, fontColor: color.text_gray }}
          second={{
            text: addedBy?.name,
            fontSize: 17,
            fontColor: color.white,
          }}
          alignItems={'center'}
        />
      )}
      <div className="role-container">
        <span>Role</span>
        <SmallRoleList roleList={roles} memberId={id} />
      </div>
      <MemberActionControls showCard={false} id={id} />
    </div>
  );
}
