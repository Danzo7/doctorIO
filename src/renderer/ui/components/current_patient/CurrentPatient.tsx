import React from 'react';
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
      <div className="state">
        <span>In progress</span>
      </div>
    </div>
  );
}

export default CurrentPatient;
