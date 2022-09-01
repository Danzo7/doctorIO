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
        {contactList.map(({ id, userId, name, avatar, status }) => (
          <ContactItem
            fullName={name}
            avatar={avatar}
            status={status}
            key={id}
            memberId={id}
            dmId={DMs.filter((dm) => dm.userId === userId)[0]?.dmId}
          />
        ))}
      </div>
    </div>
  );
}
