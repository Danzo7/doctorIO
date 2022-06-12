import ConversationSearch from '@components/conversation_search';
import MessagesCategories from './messages_categories';
import './style/index.scss';
import DmHistory from '@components/dm_history';
import client from '@assets/pictures/test.png';

const lastDmMessage = [
  {
    imgSrc: client,
    status: true,
    lastMessage: 'hello there hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh!',
    dmId: (Math.random() * 10000000000).toFixed(),
  },
  {
    imgSrc: client,
    status: true,
    lastMessage: 'hello there!',
    dmId: (Math.random() * 10000000000).toFixed(),
  },
  {
    imgSrc: client,
    status: true,
    lastMessage: 'hello there!',
    dmId: (Math.random() * 10000000000).toFixed(),
  },
  {
    imgSrc: client,
    status: true,
    lastMessage: 'hello there!',
    dmId: (Math.random() * 10000000000).toFixed(),
  },
  {
    imgSrc: client,
    status: true,
    lastMessage: 'hello there long text here okayhhhhhhhhhhhhhhhhhhhhhhhhhhh!',
    dmId: (Math.random() * 10000000000).toFixed(),
  },
  {
    imgSrc: client,
    status: true,
    lastMessage: 'hello there!',
    dmId: (Math.random() * 10000000000).toFixed(),
  },
  {
    imgSrc: client,
    status: true,
    lastMessage: 'hello there!',
    dmId: (Math.random() * 10000000000).toFixed(),
  },
  {
    imgSrc: client,
    status: true,
    lastMessage: 'the last one !',
    dmId: (Math.random() * 10000000000).toFixed(),
  },
];
interface MessagesSideBarProps {}
export default function MessagesSideBar({}: MessagesSideBarProps) {
  return (
    <div className="messages-side-bar">
      <div className="messages-side-bar-content">
        <ConversationSearch />
        <MessagesCategories />
        <DmHistory lastDmMessage={lastDmMessage} />
      </div>
    </div>
  );
}
