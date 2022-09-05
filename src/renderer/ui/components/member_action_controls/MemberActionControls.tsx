import IconicButton from '@components/buttons/iconic_button';
import colors, { color } from '@assets/styles/color';
import IdCard from 'toSvg/id_card.svg?icon';
import Messages from 'toSvg/messages_small.svg?icon';
import Call_Icon from 'toSvg/phone.svg?icon';
import { useOverlay } from '@libs/overlay/useOverlay';
import MemberBigCard from '@containers/modals/member_big_card';
import useNavigation from '@libs/hooks/useNavigation';
import './style/index.scss';
import TextButton from '@components/buttons/text_button';
import WarningModal from '@containers/modals/warning_modal';
import { DEFAULT_MODAL, FIT_MODAL } from '@libs/overlay';
import { IS_PREVIEW } from '@constants/env';
import { MemberBrief } from '@models/server.models';
import Can from '@ability/index';

interface MemberActionControlsProps {
  dmId?: number;
  messagesRoutePath?: string;
  showCard?: boolean;
  notFriend?: boolean;
}
export default function MemberActionControls({
  messagesRoutePath = 'messages/@clinic/',
  showCard = true,
  dmId,
  notFriend,
  id,
}: MemberActionControlsProps & Pick<MemberBrief, 'id'>) {
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
            open(<MemberBigCard id={id} />, {
              ...DEFAULT_MODAL,
              width: '20%',
            });
          }}
        />
      )}
      {(dmId || notFriend) && (
        <Can I="have" a="messages">
          <IconicButton
            Icon={Messages}
            afterBgColor={notFriend ? colors.cold_red : colors.light}
            backgroundColor={notFriend ? colors.hot_red : undefined}
            width={40}
            iconSize={15}
            onPress={() => {
              if (notFriend)
                open(
                  <WarningModal
                    description="This is the first time you are messaging this user. You have to wait for them to accept your request."
                    title="Start a conversasion"
                  >
                    <TextButton
                      text="Send a request"
                      backgroundColor={color.good_green}
                    />
                  </WarningModal>,
                  FIT_MODAL,
                );
              else navigate(`${messagesRoutePath + dmId}`);
            }}
          />
        </Can>
      )}
      <IconicButton
        Icon={Call_Icon}
        afterBgColor={colors.good_green}
        width={40}
        iconSize={15}
        disabled={IS_PREVIEW}
        onPress={() => {
          //FEATURE open(callModel)}
        }}
      />
    </div>
  );
}
