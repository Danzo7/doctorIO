import { useState } from 'react';
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
  const [selectedCategory, setSelectedCategory] = useState(0);
  return (
    <div className="messages-categories">
      {categories.map(({ Icon, categoryName }, index) => (
        <MessagesCategoryItem
          selected={selectedCategory == index}
          Icon={Icon}
          categoryName={categoryName}
          key={categoryName}
          onSelect={() => {
            setSelectedCategory(index);
          }}
        />
      ))}
    </div>
  );
}
