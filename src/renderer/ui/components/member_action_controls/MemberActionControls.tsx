import IconicButton from '@components/buttons/iconic_button';
import colors from '@assets/styles/color';
import IdCard from 'toSvg/id_card.svg?icon';
import Messages from 'toSvg/messages_small.svg?icon';
import Call_Icon from 'toSvg/phone.svg?icon';
import { useOverlay } from '@libs/overlay/useOverlay';
import MemberBigCard from '@containers/modals/member_big_card';
import useNavigation from '@libs/hooks/useNavigation';
import './style/index.scss';
import { Member } from '@models/server.models';

interface MemberActionControlsProps {
  member: Member;
  messagesRoutePath?: string;
  showCard?: boolean;
}
export default function MemberActionControls({
  member,
  messagesRoutePath = 'messages/@clinic/',
  showCard = true,
}: MemberActionControlsProps) {
  const { open } = useOverlay();
  const { navigate } = useNavigation();

  return (
    <div className="member-action-controls">
      {showCard && (
        <IconicButton
          Icon={IdCard}
          afterBgColor={colors.light}
          width={40}
          iconSize={15}
          onPress={() => {
            open(<MemberBigCard {...member} />, {
              closeOnClickOutside: true,
              isDimmed: true,
              clickThrough: false,
              closeBtn: 'inner',
            });
          }}
        />
      )}
      <IconicButton
        Icon={Messages}
        afterBgColor={colors.light}
        width={40}
        iconSize={15}
        onPress={() => {
          navigate(`${messagesRoutePath + member.memberId}`);
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
