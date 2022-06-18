import { color } from '@assets/styles/color';
import DarkAddButton from '@components/buttons/dark_add_button';
import SmallRolePreview from '@components/members_preview/small_role_preview';
import TextPair from '@components/text_pair/TextPair';
import UserProfileStatus from '@components/user_profile_status';
import './style/index.scss';
import IdCard from 'toSvg/id_card.svg?icon';
import Messages from 'toSvg/messages_small.svg?icon';
import Call_Icon from 'toSvg/phone.svg?icon';
import IconicButton from '@components/buttons/iconic_button';
import SmallRoleList from '@components/members_preview/small_role_list';

interface MemberBigCardProps {
  imgSrc: string;
  status: boolean;
  fullName: string;
  id: string;
  age: number;
  gender: 'Female' | 'Men';
  PhoneNumber: string;
  Address: string;
  JoinDate: string;
  AddedBy: string;
  roleArray: string[];
}
export default function MemberBigCard({
  imgSrc,
  status,
  fullName,
  id,
  age,
  gender,
  PhoneNumber,
  Address,
  JoinDate,
  AddedBy,
  roleArray,
}: MemberBigCardProps) {
  return (
    <div className="member-big-card">
      <UserProfileStatus imgSrc={imgSrc} status={status} width={100} />
      <div className="fullName-id-container">
        <span>{fullName}</span>
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
      <TextPair
        first={{
          text: 'Phone number',
          fontSize: 15,
          fontColor: color.text_gray,
        }}
        second={{
          text: PhoneNumber,
          fontSize: 17,
          fontColor: color.white,
        }}
        alignItems={'center'}
      />
      <TextPair
        first={{ text: 'Address', fontSize: 15, fontColor: color.text_gray }}
        second={{
          text: Address,
          fontSize: 17,
          fontColor: color.white,
        }}
        alignItems={'center'}
      />
      <TextPair
        first={{ text: 'Join date', fontSize: 15, fontColor: color.text_gray }}
        second={{
          text: JoinDate,
          fontSize: 17,
          fontColor: color.white,
        }}
        alignItems={'center'}
      />
      <TextPair
        first={{ text: 'Added by', fontSize: 15, fontColor: color.text_gray }}
        second={{
          text: AddedBy,
          fontSize: 17,
          fontColor: color.white,
        }}
        alignItems={'center'}
      />
      <div className="role-container">
        <span>Role</span>
        <SmallRoleList roleList={roleArray} />
      </div>
      <div className="bottom-controls">
        <IconicButton
          Icon={IdCard}
          afterBgColor={color.secondary_color}
          width={40}
          iconSize={15}
        />
        <IconicButton
          Icon={Messages}
          afterBgColor={color.secondary_color}
          width={40}
          iconSize={15}
        />
        <IconicButton
          Icon={Call_Icon}
          afterBgColor={color.good_green}
          width={40}
          iconSize={15}
        />
      </div>
    </div>
  );
}
