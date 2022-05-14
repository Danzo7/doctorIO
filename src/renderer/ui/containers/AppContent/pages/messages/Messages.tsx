import MessagesSideBar from '@components/messages_side_bar';
import { Routes, Route } from 'react-router-dom';
import Chat from './pages/chat';
import './style/index.scss';
interface MessagesProps {}
export default function Messages({}: MessagesProps) {
  return (
    <div className="messages">
      <MessagesSideBar />
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path=":dmId" element={<Chat />} />
      </Routes>
    </div>
  );
}
