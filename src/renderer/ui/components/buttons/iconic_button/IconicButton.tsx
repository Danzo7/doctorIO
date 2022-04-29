import { FunctionComponent, SVGProps } from 'react';
import './style/index.scss';

interface IconicButtonProps {
  Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  backgroundColor?: string;
  afterColor?: string;
  width?: number;
  iconSize?: number;
  radius?: number;
}

/**
 * @param {number} iconSize -Size of icon if ?icon query is used, Default=35vw
 * @param {number} width -Size of button use ?icon query for dynamic icon size*/
function IconicButton({
  Icon,
  backgroundColor,
  width = 40,
  afterColor,
  radius,
  iconSize,
}: IconicButtonProps) {
  return (
    <div
      className="iconic-button"
      css={{
        backgroundColor: backgroundColor,
        width: width,
        height: width,
        borderRadius: radius,
        '&:hover': {
          backgroundColor: afterColor,
        },
      }}
    >
      <Icon height={iconSize ?? width / 2} width={iconSize ?? width / 2} />
    </div>
  );
}

export default IconicButton;
