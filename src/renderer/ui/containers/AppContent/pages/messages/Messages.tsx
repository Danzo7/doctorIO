import MessagesSideBar from '@components/messages_side_bar';
import Chat from './pages/chat';
import Contact from './pages/contact';
import './style/index.scss';
interface MessagesProps {}
export default function Messages({}: MessagesProps) {
  return (
    <div className="messages">
      {/**Replace with messagesSidebar */}
      <MessagesSideBar />
      <Contact />
    </div>
  );
}
