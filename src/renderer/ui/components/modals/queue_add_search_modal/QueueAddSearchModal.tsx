import BackButton from '@components/buttons/back_button';
import InputField from '@components/inputs/input_field';
import RecentAppsItem from '@components/recent_apps_item';
import React, { useState } from 'react';
import './style/index.scss';
interface QueueAddSearchModalProps {
  usersData: any[];
}
export default function QueueAddSearchModal({
  usersData,
}: QueueAddSearchModalProps) {
  const [userInput, setUserInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const onChangeHandler = (event: Event) => {
    const text = (event.target as HTMLInputElement).value;
    let matches = [];
    if (text.length > 0 && text.trim().length > 0) {
      matches = usersData?.filter((user) => {
        const regex = new RegExp(`${text}`, 'gi');
        return user.fullName.match(regex);
      });
      setSuggestions(matches as any);
      //  setUserInput(textLowerCase);
    } else {
      setUserInput('');
      setSuggestions([]);
    }
  };
  return (
    <div className="queue-add-search-modal">
      <div className="back-btn-container">
        <BackButton />
      </div>
      <InputField
        label="Add a patient to appointment queue"
        placeholder="search for a patients"
        searchIcon={true}
        inputType="search"
        onChange={(e) => {
          onChangeHandler(e);
        }}
        //  value={userInput}
      />
      <div className="suggestions-container">
        {suggestions &&
          suggestions.map(({ fullName, age }) => (
            <RecentAppsItem fullName={fullName} age={age} />
          ))}
      </div>
    </div>
  );
}
