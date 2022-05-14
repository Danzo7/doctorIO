import ContactItem from './contact_item';
import './style/index.scss';
interface ContactListProps {
  contactType: string;
  numContact: number;
  contactList: any[];
}
export default function ContactList({
  contactType,
  numContact,
  contactList = [],
}: ContactListProps) {
  return (
    <div className="contact-list">
      <span>
        {contactType}--{numContact}{' '}
      </span>
      <div className="contact-container">
        {contactList.map(({ fullName, imgSrc, status }) => (
          <ContactItem
            fullName={fullName}
            imgSrc={imgSrc}
            status={status}
            key={fullName}
          />
        ))}
      </div>
    </div>
  );
}
