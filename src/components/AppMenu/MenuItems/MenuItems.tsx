import React from 'react';
import './style/index.scss';
interface MenuItems {
  items: { name: String; svg: String }[];
}

function MenuItems({ items }: MenuItems) {
  return (
    <div className="menu-items">
      <h1>{}</h1>
      {items.map((item) => (
        <div>{item.name}</div>
      ))}
    </div>
  );
}

export default MenuItems;
