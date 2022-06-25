import ConversationSearch from '@components/conversation_search';
import MessagesCategories from './messages_categories';
import './style/index.scss';
import DmHistory from '@components/dm_history';
import { DMs } from '@api/fake';

const dmHistoryList = DMs.map(
  ({ dmAvatar, dmId, messages, userId, dmName }) => {
    return {
      dmAvatar,
      dmId,
      userId,
      dmName,
      lastMessage: messages[messages.length - 1],
    };
  },
);
interface MessagesSideBarProps {}
export default function MessagesSideBar({}: MessagesSideBarProps) {
  return (
    <div className="messages-side-bar">
      <div className="messages-side-bar-content">
        <ConversationSearch />
        <MessagesCategories />
        <DmHistory list={dmHistoryList} />
      </div>
    </div>
  );
}
