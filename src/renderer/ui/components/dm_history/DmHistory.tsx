import LastDmMessage from '@components/last_dm_message';
import add from 'toSvg/add.svg?icon';
import PreviewList from '@components/preview_list';
import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
import { DirectMessage, Message } from '@models/local.models';
interface DmHistoryProps {
  list: (Omit<DirectMessage, 'messages'> & { lastMessage: Message })[];
}
export default function DmHistory({ list }: DmHistoryProps) {
  return (
    <PreviewList title="DM’s" buttonNode={<SquareIconButton svg={add} />}>
      {list.length > 0
        ? list.map(({ dmAvatar, dmId, lastMessage, dmName }, index) => (
            <LastDmMessage
              avatar={dmAvatar}
              lastMessage={lastMessage}
              id={dmId}
              dmName={dmName}
              key={dmId.toString() + index}
            />
          ))
        : 'No DM’s messages '}
    </PreviewList>
  );
}
