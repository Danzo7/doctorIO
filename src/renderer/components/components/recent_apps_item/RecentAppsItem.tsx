import TextButton from '@components/buttons/text_button';
import React from 'react';
import './style/index.scss';

import colors from '@colors';
interface RecentAppsItemProps {
  fullName: string;
  age: number;
}
export default function RecentAppsItem({ fullName, age }: RecentAppsItemProps) {
  return (
    <div className="recent-apps-item">
      <div className="info-container">
        <span>{fullName}</span>
        <span>Age {age}</span>
      </div>
      <div className="controls-container">
        <TextButton
          text="Run diagnosis..."
          backgroundColor={colors.cold_blue}
          radius={7}
        />
        <TextButton text="Add" backgroundColor={colors.good_green} radius={7} />
      </div>
    </div>
  );
}
