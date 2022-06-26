import { FunctionComponent, SVGProps } from 'react';
import { color } from '@assets/styles/color';
import { NavButton } from '@libs/smart_link/SmartLink';
import { IS_PREVIEW } from '@constants/env';
interface MessagesCategoryItemProps {
  Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  categoryName: string;
}
export default function MessagesCategoryItem({
  Icon,
  categoryName,
}: MessagesCategoryItemProps) {
  return (
    <NavButton
      to={'/messages/@' + categoryName.toLowerCase()}
      keepLevel={true}
      buttonProps={({ isMatch }) => ({
        padding: 10,
        alignment: 'flex-start',
        fontSize: 18,
        width: '100%',
        fontColor: isMatch ? color.white : color.text_gray,
        backgroundColor: isMatch ? color.secondary_color : undefined,
        afterBgColor: color.secondary_color,
        Icon: {
          svg: <Icon width={18} height={21} />,
          iconColor: isMatch ? color.white : color.text_gray,
        },
        text: categoryName,
        // disabled: categoryName == 'Public' && IS_PREVIEW ? true : undefined,
      })}
    />
  );
}
