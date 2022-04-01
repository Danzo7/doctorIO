import React from 'react';
import './style/index.scss';
interface TitleButtonProps {
  title: string;
  css?: string;
}
function TitleButton({ title, css }: TitleButtonProps) {
  return (
    <div className={`title-button ${css}`}>
      <span>{title}</span>
    </div>
  );
}

export default TitleButton;
