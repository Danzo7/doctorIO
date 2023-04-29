import UserProfileStatus from '@components/user_profile_status';
import './style/index.scss';
import TextButton from '@components/buttons/text_button';
import Bell from 'toSvg/bell.svg?icon';
import color from '@assets/styles/color';

interface AssistantItemProps {
  id: number;
  name: string;
  status: boolean;
  avatar?: string;
}
export default function AssistantItem({
  name,
  id,
  avatar,
  status,
}: AssistantItemProps) {
  return (
    <div className="assistant-item">
      <div className="member-Info">
        <UserProfileStatus
          imgSrc={avatar}
          status={status}
          width={30}
          alt={name + id}
        />
        <div className="id-container">
          <span>{name}</span>
          <span>#{id}</span>
        </div>
      </div>
      <TextButton
        Icon={Bell}
        backgroundColor={color.warm_orange}
        radius={'100%'}
        padding={8}
        onPress={() => {
          //TODO notify the assistant
        }}
      />
    </div>
  );
}
