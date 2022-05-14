import TextButton from '@components/buttons/text_button';
import LastDmMessage from '@components/last_dm_message';
import './style/index.scss';
import add from 'toSvg/add.svg?icon';
import color from '@assets/styles/color';
interface DmHistoryProps {
  lastDmMessage: Array<any>;
}
export default function DmHistory({ lastDmMessage = [] }: DmHistoryProps) {
  return (
    <div className="dm-history">
      <div className="header">
        <span>DM’s</span>
        <TextButton
          Icon={add}
          afterBgColor={color.darkersec_color}
          fontSize={30}
          width={'unset'}
          fontWeight={100}
          radius={7}
          padding={'15px'}
        />
      </div>
      <div className="lastDmMessages-container">
        {lastDmMessage.length > 0
          ? lastDmMessage.map(
              ({ imgSrc, lastMessage, status, dmId }, index) => (
                <LastDmMessage
                  imgSrc={imgSrc}
                  lastMessage={lastMessage}
                  status={status}
                  id={dmId}
                  key={index}
                />
              ),
            )
          : 'No DM’s messages '}
      </div>
    </div>
  );
}
