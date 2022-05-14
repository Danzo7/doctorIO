import MessagesSideBar from '@components/messages_side_bar';
import { Routes, Route } from 'react-router-dom';
import Chat from './pages/chat';
import Contact from './pages/contact';
import './style/index.scss';
interface MessagesProps {}
export default function Messages({}: MessagesProps) {
  return (
    <div className="messages">
      <MessagesSideBar />
      <Routes>
        <Route path="/" element={<Contact />} />
        <Route path=":dmId" element={<Chat />} />
      </Routes>
    </div>
  );
}
