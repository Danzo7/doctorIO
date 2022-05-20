import LastDmMessage from '@components/last_dm_message';
import add from 'toSvg/add.svg?icon';
import PreviewList from '@components/preview_list';
import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
interface DmHistoryProps {
  lastDmMessage: Array<any>;
}
export default function DmHistory({ lastDmMessage = [] }: DmHistoryProps) {
  return (
    <PreviewList title="DM’s" buttonNode={<SquareIconButton svg={add} />}>
      {lastDmMessage.length > 0
        ? lastDmMessage.map(({ imgSrc, lastMessage, status, dmId }, index) => (
            <LastDmMessage
              imgSrc={imgSrc}
              lastMessage={lastMessage}
              status={status}
              id={dmId}
              key={index}
            />
          ))
        : 'No DM’s messages '}
    </PreviewList>
  );
}
