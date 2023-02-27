import IconicButton from '@components/buttons/iconic_button';
import colors, { color } from '@assets/styles/color';
import IdCard from 'toSvg/id_card.svg?icon';
import Messages from 'toSvg/messages_small.svg?icon';
import Call_Icon from 'toSvg/phone.svg?icon';
import MemberBigCard from '@containers/modals/member_big_card';
import useNavigation from '@libs/hooks/useNavigation';
import './style/index.scss';
import TextButton from '@components/buttons/text_button';
import { FIT_MODAL, modal } from '@libs/overlay';
import { IS_PREVIEW } from '@constants/env';
import { MemberBrief } from '@models/server.models';
import Can from '@ability/index';
import AlertModal from '@containers/modals/dialog_modal';

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
  const { navigate } = useNavigation();

  return (
    <div className="member-action-controls">
      {showCard && (
        <IconicButton
          Icon={IdCard}
          tip="View Profile"
          afterBgColor={colors.light}
          width={40}
          iconSize={15}
          onPress={() => {
            modal(<MemberBigCard id={id} />, FIT_MODAL).open();
          }}
        />
      )}
      {(dmId || notFriend) && (
        <Can I="have" a="messages">
          <IconicButton
            Icon={Messages}
            tip="Message"
            afterBgColor={notFriend ? colors.cold_red : colors.light}
            backgroundColor={notFriend ? colors.hot_red : undefined}
            width={40}
            iconSize={15}
            onPress={() => {
              if (notFriend)
                modal(
                  <AlertModal
                    title="Start a conversation"
                    description="This is the first time you are messaging this user. You have to wait for them to accept your request."
                    controls={
                      <TextButton
                        text="Send a request"
                        backgroundColor={color.good_green}
                      />
                    }
                    status="warning"
                  />,
                  FIT_MODAL,
                ).open();
              else navigate(`${messagesRoutePath + dmId}`);
            }}
          />
        </Can>
      )}
      <IconicButton
        Icon={Call_Icon}
        tip="Start voice call"
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
