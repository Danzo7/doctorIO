import React from 'react';
import TitleButton from '@components/buttons/title_button';
import { css } from '@emotion/css';
import './style/index.scss';
interface CurrentPatientProps {
  fullName: string;
  age: number;
}
function CurrentPatient({ fullName, age }: CurrentPatientProps) {
  return (
    <div className="current-patient">
      <span className="name">{fullName}</span>
      <span className="age">Age {age}</span>
      <TitleButton
        css={css`
          width: 85%;
          align-self: center;
          margin-bottom: 10px;
        `}
        title="In progress"
      />
    </div>
  );
}

export default CurrentPatient;
