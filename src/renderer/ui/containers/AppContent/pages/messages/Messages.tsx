import Chat from './pages/chat';
import './style/index.scss';
interface MessagesProps {}
export default function Messages({}: MessagesProps) {
  return (
    <div className="messages">
      {/**Replace with messagesSidebar */}
      <div style={{ width: 320, background: 'red', borderRadius: 10 }}></div>
      <Chat />
    </div>
  );
}
