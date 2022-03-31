import React from 'react';
import './style/index.scss';
interface TextIconButtonProps {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  text: string;
}

function TextIconButton({ Icon, text }: TextIconButtonProps) {
  return (
    <div className="text-icon-button">
      <div className="text">{text}</div>
      <div className="icon">{Icon && <Icon />}</div>
    </div>
  );
}

export default TextIconButton;
