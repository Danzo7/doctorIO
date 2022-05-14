import ConversationSearch from '@components/conversation_search';
import MessagesCategories from './messages_categories';
import './style/index.scss';
import Doctor from 'toSvg/doctor_icon.svg?icon';
import Nurse from 'toSvg/nurse_icon.svg?icon';
import DmHistory from '@components/dm_history';
import client from '@assets/pictures/test.png';

const categories = [
  {
    Icon: Doctor,
    categoryName: 'Clinic',
  },
  {
    Icon: Nurse,
    categoryName: 'Public',
  },
];
const lastDmMessage = [
  {
    imgSrc: client,
    status: true,
    lastMessage: 'hello there hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh!',
  },
  {
    imgSrc: client,
    status: true,
    lastMessage: 'hello there!',
  },
  {
    imgSrc: client,
    status: true,
    lastMessage: 'hello there!',
  },
  {
    imgSrc: client,
    status: true,
    lastMessage: 'hello there!',
  },
  {
    imgSrc: client,
    status: true,
    lastMessage: 'hello there long text here okayhhhhhhhhhhhhhhhhhhhhhhhhhhh!',
  },
  {
    imgSrc: client,
    status: true,
    lastMessage: 'hello there!',
  },
  {
    imgSrc: client,
    status: true,
    lastMessage: 'hello there!',
  },
  {
    imgSrc: client,
    status: true,
    lastMessage: 'the last one !',
  },
];
interface MessagesSideBarProps {}
export default function MessagesSideBar({}: MessagesSideBarProps) {
  return (
    <div className="messages-side-bar">
      {/* add new div for content just for organizing */}
      <div className="content">
        <ConversationSearch />
        <MessagesCategories categories={categories} />
        <DmHistory lastDmMessage={lastDmMessage} />
      </div>
    </div>
  );
}
