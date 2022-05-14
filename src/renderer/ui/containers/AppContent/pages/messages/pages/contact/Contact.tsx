import ContactTabMenu from './contact_tab_menu';
import './style/index.scss';
import ContactList from './contact_list';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

interface ContactProps {}
export default function Contact({}: ContactProps) {
  const filters = ['online', 'all'];
  const [filter, setFilter] = useState(0);
  const { category } = useParams();

  return (
    <div className="contact">
      <ContactTabMenu
        category={category === '@public' ? 'public' : 'clinic'}
        filters={filters}
        onChanged={(selected) => {
          setFilter(selected);
        }}
      />
      <ContactList contactType={filters[filter].toUpperCase()} />
    </div>
  );
}
