import IconicButton from '@components/buttons/iconic_button';
import MemberStatus from './member_status';
import './style/index.scss';
import Call_Icon from 'toSvg/phone.svg?icon';
import colors from '@assets/styles/color';
import ChatAddButton from '@components/buttons/chat_add_button';
import ContentMessage from './content_message';
import { useParams } from 'react-router-dom';
import { DMs, members } from '@api/fake';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@components/inputs/input';
import { useGetMyMemberDetailQuery } from '@redux/clinic/rbac/member/memberApi';
import LoadingSpinner from '@components/loading_spinner';

const schema = z.object({
  message: z.string().trim().min(1),
});

interface ChatProps {}
export default function Chat({}: ChatProps) {
  const { dmId } = useParams();
  const dm = DMs.filter(
    ({ dmId: id }) => id === Number.parseInt(dmId ?? '404'),
  )[0]; //REDUX fetch for selected dm

  const contactMember = members.filter(({ userId }) => userId == dm.userId)[0]; //REDUX check if dm is assigned to a member

  const [currentMessagesList, setcurrentMessagesList] = useState(dm.messages); //REDUX update message list

  const { control, handleSubmit, reset } = useForm<{ message: string }>({
    resolver: zodResolver(schema),
    defaultValues: { message: '' },
  });
  const onSubmit: SubmitHandler<{ message: string }> = (data) => {
    setcurrentMessagesList([
      ...currentMessagesList,
      { date: new Date(), text: data.message, sent: true },
    ]);
    reset({ message: '' });
  };
  const { data, isSuccess, error, isLoading } = useGetMyMemberDetailQuery();
  return (
    <div className="chat">
      {dmId}
      <div className="chat-header">
        <MemberStatus
          memberFullName={contactMember.name}
          status={contactMember.status}
        />
        <IconicButton
          Icon={Call_Icon}
          backgroundColor={colors.secondary_color}
          afterBgColor={colors.good_green}
          width={35}
          iconSize={15}
        />
      </div>
      <div className="chat-content">
        <div
          className="content-message-List"
          ref={(e) => {
            (e?.lastChild as HTMLElement)?.scrollIntoView?.({
              behavior: 'smooth',
            });
          }}
        >
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            isSuccess &&
            currentMessagesList.map((message, index) => (
              <ContentMessage
                status={data.status}
                message={message}
                key={index}
                avatar={message.sent ? data.avatar : dm.dmAvatar}
                id={dm.dmId}
                name={message.sent ? data.name : dm.dmName}
                memberId={message.sent ? data.id : contactMember.id}
              />
            ))
          )}
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          radius={17}
          background={colors.lighter_background}
          fillContainer
          type="text"
          name="message"
          control={control}
          leading={
            <ChatAddButton
              onPress={() => {
                handleSubmit(onSubmit)();
              }}
            />
          }
        />
      </form>
    </div>
  );
}
