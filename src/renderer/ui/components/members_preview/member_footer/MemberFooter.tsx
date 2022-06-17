import IconicButton from '@components/buttons/iconic_button';
import './style/index.scss';
import colors from '@assets/styles/color';
import IdCard from 'toSvg/id_card.svg?icon';
import Messages from 'toSvg/messages_small.svg?icon';
import Call_Icon from 'toSvg/phone.svg?icon';
import { useOverlay } from '@libs/overlay/useOverlay';
import MemberBigCard from '@containers/modals/member_big_card';
import profile from '@assets/pictures/test.png';
import useNavigation from '@libs/hooks/useNavigation';
interface MemberFooterProps {
  memberID: string;
  status: string;
}
function MemberFooter({ memberID, status }: MemberFooterProps) {
  const { open } = useOverlay();
  const { navigate } = useNavigation();
  return (
    <div className="member-footer">
      <div className="member-container">
        <span>Member ID</span>
        <span className="member-span">{memberID}</span>
      </div>
      <div className="member-container">
        <span>Status</span>
        <span className="member-span">{status}</span>
      </div>
      <div className="controls-container">
        <IconicButton
          Icon={IdCard}
          afterBgColor={colors.secondary_color}
          width={40}
          iconSize={15}
          onPress={(e) => {
            open(
              <MemberBigCard
                fullName="Aymen Daouadji"
                age={23}
                AddedBy="Brahim Aymen"
                Address="Blida"
                JoinDate="02/02/1999"
                PhoneNumber="051549726"
                id="123456789"
                imgSrc={profile}
                gender="Men"
                status={true}
                roleArray={['Gamer', 'Cool', 'Assistant']}
              />,
              {
                closeOnClickOutside: true,
                clickThrough: false,
                width: '30%',
                closeOnBlur: true,
                popperTarget: e?.currentTarget,
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
            navigate(`messages/@clinic/${memberID}`);
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
    </div>
  );
}

export default MemberFooter;
