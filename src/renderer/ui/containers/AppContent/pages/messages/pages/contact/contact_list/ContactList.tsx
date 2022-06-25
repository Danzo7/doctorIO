import ContactItem from './contact_item';
import './style/index.scss';
import { DMs, members } from '@api/fake';

const contactList = members;
interface ContactListProps {
  contactType: string;
}

export default function ContactList({ contactType }: ContactListProps) {
  return (
    <div className="contact-list">
      <span>
        {contactType}--{contactList.length}
      </span>
      <div className="contact-container">
        {contactList.map(({ memberId, userId, name, avatar, memberStatus }) => (
          <ContactItem
            fullName={name}
            avatar={avatar}
            status={memberStatus}
            key={memberId}
            memberId={memberId}
            dmId={DMs.filter((dm) => dm.userId === userId)[0]?.dmId}
          />
        ))}
      </div>
    </div>
  );
}
