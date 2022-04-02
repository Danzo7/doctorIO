import React from 'react';
import './style/index.scss';
interface IconicButtonProps {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  backgroundColor: string;
}
function IconicButton({ Icon, backgroundColor }: IconicButtonProps) {
  return (
    <div
      className={`iconic-button `}
      style={{ backgroundColor: backgroundColor }}
    >
      {<Icon width={17} height={17} />}
    </div>
  );
}

export default IconicButton;
