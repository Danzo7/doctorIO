import { color } from '@assets/styles/color';
import TextPair from '@components/text_pair/TextPair';
import UserProfileStatus from '@components/user_profile_status';
import './style/index.scss';
import SmallRoleList from '@components/members_preview/small_role_list';
import MemberActionControls from '@components/member_action_controls';
import { Member } from '@models/server.models';
import { format } from 'date-fns';
import { DATE_ONLY } from '@constants/data_format';
import { members } from '@api/fake';

export default function MemberBigCard({ memberId }: Pick<Member, 'memberId'>) {
  //todo:redux fetch
  const {
    avatar,
    memberStatus,
    name,
    age,
    gender,
    phoneNumber,
    address,
    joinDate: JoinDate,
    addedBy,
    roles,
  } = members.filter(({ memberId: id }) => id == memberId)[0];
  return (
    <div className="member-big-card">
      <UserProfileStatus imgSrc={avatar} status={memberStatus} width={100} />
      <div className="fullName-id-container">
        <span>{name}</span>
        <span>#{memberId}</span>
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
      {phoneNumber && (
        <TextPair
          first={{
            text: 'Phone number',
            fontSize: 15,
            fontColor: color.text_gray,
          }}
          second={{
            text: phoneNumber,
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
          text: format(JoinDate, DATE_ONLY),
          fontSize: 17,
          fontColor: color.white,
        }}
        alignItems={'center'}
      />
      <TextPair
        first={{ text: 'Added by', fontSize: 15, fontColor: color.text_gray }}
        second={{
          text: addedBy,
          fontSize: 17,
          fontColor: color.white,
        }}
        alignItems={'center'}
      />
      <div className="role-container">
        <span>Role</span>
        <SmallRoleList roleList={roles} />
      </div>
      <MemberActionControls showCard={false} memberId={memberId} />
    </div>
  );
}
