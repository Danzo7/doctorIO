import Chat from './pages/chat';
import './style/index.scss';
interface MessagesProps {}
export default function Messages({}: MessagesProps) {
  return (
    <div className="messages">
      <Chat></Chat>
    </div>
  );
}
