import BackButton from '@components/buttons/back_button';
import InputField, { evolvedTypes } from '@components/inputs/input_field';
import RecentAppsItem from '@components/recent_apps_item';
import Svg from '@libs/svg';
import React, { useState } from 'react';
import search from 'toSvg/search.svg?icon';

import './style/index.scss';
interface QueueAddSearchModalProps {}
const usersData = [
  {
    fullName: 'brahim aymen',
    age: 24,
  },
  {
    fullName: 'daouadji aymen',
    age: 24,
  },
  {
    fullName: 'amine bou',
    age: 24,
  },
  {
    fullName: 'John Doe',
    age: 24,
  },
];
export default function QueueAddSearchModal({}: QueueAddSearchModalProps) {
  const [, setUserInput] = useState('');
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
        name="QueueAddSearch"
        label="Add a patient to appointment queue"
        placeholder="search for a patients"
        leading={<Svg>{search}</Svg>}
        type={{ rawType: 'search', evolvedType: evolvedTypes.raw }}
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
