import CircleAvatar from '@components/avatars/circle_avatar';
import MemberCard from '@components/member_card';
import { useOverlay } from '@libs/overlay/useOverlay';
import './style/index.scss';
interface ContentMessageProps {
  messengerId: number;
  imgSrc: string;
  messengerName: string;
  messageTime: string;
  messageContent: string;
  isLastMessageSent: boolean;
}
function ContentMessage({
  messengerId,
  messengerName,
  messageTime,
  messageContent,
  imgSrc,
  isLastMessageSent,
}: ContentMessageProps) {
  const { open } = useOverlay();
  return (
    <div
      className={`content-message ${
        isLastMessageSent ? 'last-message-sent' : ''
      } `}
    >
      <div>
        <CircleAvatar
          src={imgSrc}
          width={40}
          onClick={(e) => {
            open(
              <MemberCard
                member={{
                  name: 'Aymen Daouadji',
                  avatar: 'build/renderer/assets/pictures/test.png',
                  memberStatus: true,
                  accessKey: '12346678',
                  addedBy: 'Brahim aymen',
                  age: 18,
                  gender: 'Men',
                  address: 'blida',
                  userId: 12346789,
                  phoneNumber: '054681349',
                  memberId: 123456789,
                  roles: [{ roleId: 1, roleName: 'gamer', roleDesc: 'gaming' }],
                  joinDate: new Date('2022-01-01'),
                }}
              />,
              {
                popperTarget: e.currentTarget,
                clickThrough: true,
                closeOnBlur: true,
              },
            );
          }}
        />
      </div>

      <div className="info-container">
        <div className="title-container">
          <span
            onClick={(e) => {
              open(
                <MemberCard
                  member={{
                    name: 'Aymen Daouadji',
                    avatar: 'build/renderer/assets/pictures/test.png',
                    memberStatus: true,
                    accessKey: '12346678',
                    addedBy: 'Brahim aymen',
                    age: 18,
                    gender: 'Men',
                    address: 'blida',
                    userId: 12346789,
                    phoneNumber: '054681349',
                    memberId: 123456789,
                    roles: [
                      { roleId: 1, roleName: 'gamer', roleDesc: 'gaming' },
                    ],
                    joinDate: new Date('2022-01-01'),
                  }}
                />,
                {
                  popperTarget: e.currentTarget,
                  clickThrough: true,
                  closeOnBlur: true,
                },
              );
            }}
          >
            {messengerName}
          </span>
          <span>{messageTime}</span>
        </div>
        <span>{messageContent}</span>
      </div>
    </div>
  );
}

export default ContentMessage;
