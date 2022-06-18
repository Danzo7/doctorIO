import IconicButton from '@components/buttons/iconic_button';
import colors from '@assets/styles/color';
import IdCard from 'toSvg/id_card.svg?icon';
import Messages from 'toSvg/messages_small.svg?icon';
import Call_Icon from 'toSvg/phone.svg?icon';
import { useOverlay } from '@libs/overlay/useOverlay';
import MemberBigCard from '@containers/modals/member_big_card';
import profile from '@assets/pictures/test.png';
import useNavigation from '@libs/hooks/useNavigation';
import './style/index.scss';

interface MemberActionControlsProps {
  memberID: string;
}
export default function MemberActionControls({
  memberID,
}: MemberActionControlsProps) {
  const { open } = useOverlay();
  const { navigate } = useNavigation();

  return (
    <div className="member-action-controls">
      <IconicButton
        Icon={IdCard}
        afterBgColor={colors.secondary_color}
        width={40}
        iconSize={15}
        onPress={() => {
          open(
            <MemberBigCard
              fullName="Aymen Daouadji"
              age={23}
              AddedBy="Brahim Aymen"
              Address="Blida"
              JoinDate="02/02/1999"
              PhoneNumber="051549726"
              id={memberID}
              imgSrc={profile}
              gender="Men"
              status={true}
              roleArray={['Gamer', 'Cool', 'Assistant']}
            />,
            {
              closeOnClickOutside: true,
              isDimmed: true,
              clickThrough: false,
              closeBtn: 'inner',
            },
          );
        }}
      />
      <IconicButton
        Icon={Messages}
        afterBgColor={colors.secondary_color}
        width={40}
        iconSize={15}
        onPress={() => {
          //  navigate(`messages/@clinic/${memberID}`);//
        }}
      />
      <IconicButton
        Icon={Call_Icon}
        afterBgColor={colors.good_green}
        width={40}
        iconSize={15}
        onPress={() => {
          //TODO? open(callModel)}//
        }}
      />
    </div>
  );
}
