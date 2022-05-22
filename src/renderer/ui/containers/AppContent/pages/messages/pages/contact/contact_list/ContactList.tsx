import ContactItem from './contact_item';
import './style/index.scss';
import profile from '@assets/pictures/test.png';

const contactList = [
  {
    cId: (Math.random() * 10000000000).toFixed(),
    status: true,
    imgSrc: profile,
    fullName: 'John Doe1',
  },
  {
    cId: (Math.random() * 10000000000).toFixed(),
    status: true,
    imgSrc: profile,
    fullName: 'John Doe2',
  },
  {
    cId: (Math.random() * 10000000000).toFixed(),
    status: true,
    imgSrc: profile,
    fullName: 'John Doe3',
  },
  {
    cId: (Math.random() * 10000000000).toFixed(),
    status: true,
    imgSrc: profile,
    fullName: 'John Doe4',
  },
  {
    cId: (Math.random() * 10000000000).toFixed(),
    status: true,
    imgSrc: profile,
    fullName: 'John Doe5',
  },
  {
    cId: (Math.random() * 10000000000).toFixed(),
    status: true,
    imgSrc: profile,
    fullName: 'John Doe6',
  },
  {
    cId: (Math.random() * 10000000000).toFixed(),
    status: true,
    imgSrc: profile,
    fullName: 'John Doe7',
  },
  {
    cId: (Math.random() * 10000000000).toFixed(),
    status: true,
    imgSrc: profile,
    fullName: 'John Doe8',
  },
  {
    cId: (Math.random() * 10000000000).toFixed(),
    status: true,
    imgSrc: profile,
    fullName: 'John Doe9',
  },
  {
    cId: (Math.random() * 10000000000).toFixed(),
    status: true,
    imgSrc: profile,
    fullName: 'John Doe10',
  },
  {
    cId: (Math.random() * 10000000000).toFixed(),
    status: true,
    imgSrc: profile,
    fullName: 'John Doe11',
  },
  {
    cId: (Math.random() * 10000000000).toFixed(),
    status: true,
    imgSrc: profile,
    fullName: 'John Doe12',
  },
  {
    cId: (Math.random() * 10000000000).toFixed(),
    status: true,
    imgSrc: profile,
    fullName: 'John Doe13',
  },
  {
    cId: (Math.random() * 10000000000).toFixed(),
    status: true,
    imgSrc: profile,
    fullName: 'John Doe14',
  },
  {
    cId: (Math.random() * 10000000000).toFixed(),
    status: true,
    imgSrc: profile,
    fullName: 'John Doe15',
  },
];
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
        {contactList.map(({ fullName, imgSrc, status, cId }) => (
          <ContactItem
            fullName={fullName}
            imgSrc={imgSrc}
            status={status}
            key={fullName}
            cId={cId}
          />
        ))}
      </div>
    </div>
  );
}
