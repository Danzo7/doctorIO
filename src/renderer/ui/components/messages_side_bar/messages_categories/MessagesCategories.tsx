import { useState } from 'react';
import MessagesCategoryItem from './messages_category_item';
import './style/index.scss';

interface MessagesCategoriesProps {
  categories: any[];
}
export default function MessagesCategories({
  categories,
}: MessagesCategoriesProps) {
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
