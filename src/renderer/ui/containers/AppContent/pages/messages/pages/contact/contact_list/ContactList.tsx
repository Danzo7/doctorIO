import ContactItem from './contact_item';
import './style/index.scss';
import profile from '@assets/pictures/test.png';

interface ContactListProps {
  contactType: string;
}

export default function ContactList({ contactType }: ContactListProps) {
  const contactList = [
    {
      status: true,
      imgSrc: profile,
      fullName: 'John Doe1',
    },
    {
      status: true,
      imgSrc: profile,
      fullName: 'John Doe2',
    },
    {
      status: true,
      imgSrc: profile,
      fullName: 'John Doe3',
    },
    {
      status: true,
      imgSrc: profile,
      fullName: 'John Doe4',
    },
    {
      status: true,
      imgSrc: profile,
      fullName: 'John Doe5',
    },
    {
      status: true,
      imgSrc: profile,
      fullName: 'John Doe6',
    },
    {
      status: true,
      imgSrc: profile,
      fullName: 'John Doe7',
    },
    {
      status: true,
      imgSrc: profile,
      fullName: 'John Doe8',
    },
    {
      status: true,
      imgSrc: profile,
      fullName: 'John Doe9',
    },
    {
      status: true,
      imgSrc: profile,
      fullName: 'John Doe10',
    },
    {
      status: true,
      imgSrc: profile,
      fullName: 'John Doe11',
    },
    {
      status: true,
      imgSrc: profile,
      fullName: 'John Doe12',
    },
    {
      status: true,
      imgSrc: profile,
      fullName: 'John Doe13',
    },
    {
      status: true,
      imgSrc: profile,
      fullName: 'John Doe14',
    },
    {
      status: true,
      imgSrc: profile,
      fullName: 'John Doe15',
    },
  ];
  return (
    <div className="contact-list">
      <span>
        {contactType}--{contactList.length}
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
