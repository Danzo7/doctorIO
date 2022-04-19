import BackButton from '@components/buttons/back_button';
import InputField from '@components/inputs/input_field';
import React from 'react';
import './style/index.scss';
interface QueueAddSearchModalProps {}
export default function QueueAddSearchModal({}: QueueAddSearchModalProps) {
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
      />
    </div>
  );
}
