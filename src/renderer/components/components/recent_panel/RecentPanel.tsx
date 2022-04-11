import TextButton from '@components/buttons/text_button';
import React, { ReactNode } from 'react';
import './style/index.scss';
import colors from '@colors';
interface RecentPanelProps {
  headerText: string;
  children?: ReactNode;
}
export default function RecentPanel({
  headerText,
  children,
}: RecentPanelProps) {
  return (
    <div className="recent-panel">
      <div className="header">
        <span>{headerText}</span>
        <TextButton
          text="show all"
          fontColor={colors.text_gray}
          afterBgColor={colors.secondary_color}
          fontSize={14}
          radius={10}
        />
      </div>
      <div className="children-container" children={children} />
    </div>
  );
}
