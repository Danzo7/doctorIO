import MessagesCategoryItem from './messages_category_item';
import Doctor from 'toSvg/doctor_icon.svg?icon';
import Nurse from 'toSvg/nurse_icon.svg?icon';
import './style/index.scss';

interface MessagesCategoriesProps {}
export default function MessagesCategories({}: MessagesCategoriesProps) {
  const categories = [
    {
      Icon: Nurse,
      categoryName: 'Clinic',
    },
    {
      Icon: Doctor,
      categoryName: 'Public',
    },
  ];
  return (
    <div className="messages-categories">
      {categories.map(({ Icon, categoryName }) => (
        <MessagesCategoryItem
          Icon={Icon}
          categoryName={categoryName}
          key={categoryName}
        />
      ))}
    </div>
  );
}
