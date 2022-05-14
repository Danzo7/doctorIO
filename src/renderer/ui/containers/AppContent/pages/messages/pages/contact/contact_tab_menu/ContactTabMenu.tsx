import color from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import TabMenu from '@components/tab_menu';
import { FunctionComponent, SVGProps } from 'react';
import './style/index.scss';
interface ContactTabMenuProps {
  messagesCategoryIcon: FunctionComponent<SVGProps<SVGSVGElement>>;
  messagesCategoryName: string;
}
export default function ContactTabMenu({
  messagesCategoryIcon,
  messagesCategoryName,
}: ContactTabMenuProps) {
  return (
    <div className="contact-tab-menu">
      <div className="messages-category-container">
        <TextButton
          text={messagesCategoryName}
          Icon={messagesCategoryIcon}
          fontColor={color.white}
          fontSize={17}
          fontWeight={600}
          iconWidth={30}
          iconHeight={30}
          padding={0}
        />
        <div className="sep" />
      </div>
      <TabMenu textList={['OnLine', 'All']} borderBottom={false} />
    </div>
  );
}
