import IconicButton from '@components/buttons/iconic_button';
import MemberStatus from './member_status';
import './style/index.scss';
import Call_Icon from 'toSvg/phone.svg?icon';
import colors from '@assets/styles/color';
import ChatAddButton from '@components/buttons/chat_add_button';
import ContentMessage from './content_message';
import { useParams } from 'react-router-dom';
import InputWrapper from '@components/inputs/input_wrapper';
import { currentMember, DMs, members } from '@api/fake';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

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

  const { register, handleSubmit, reset } = useForm<{ message: string }>({
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<{ message: string }> = (data) => {
    setcurrentMessagesList([
      ...currentMessagesList,
      { date: new Date(), text: data.message, sent: true },
    ]);
    reset({ message: '' });
  };
  return (
    <div className="chat">
      {dmId}
      <div className="chat-header">
        <MemberStatus
          memberFullName={contactMember.name}
          status={contactMember.memberStatus}
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
          {currentMessagesList.map((message, index) => (
            <ContentMessage
              message={message}
              key={index}
              dmAvatar={message.sent ? currentMember.avatar : dm.dmAvatar}
              dmId={dm.dmId}
              dmName={message.sent ? currentMember.name : dm.dmName}
              memberId={
                message.sent ? currentMember.memberId : contactMember.memberId
              }
            />
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper
          leading={
            <ChatAddButton
              onPress={() => {
                handleSubmit(onSubmit)();
              }}
            />
          }
          radius={17}
          background={colors.lighter_background}
          fillContainer
        >
          <input {...register('message', { required: true })} />
        </InputWrapper>
      </form>
    </div>
  );
}
