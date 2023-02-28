import { color } from '@assets/styles/color';
import TextButton from '../text_button';
import Arrow from 'toSvg/arrow.svg?icon';
import './style/index.scss';
import { useState } from 'react';
interface SortButtonProps {
  title: string;
}
export default function SortButton({ title }: SortButtonProps) {
  const [direction, setDirection] = useState('up');
  const changeDirection = () => {
    if (direction == 'up') {
      setDirection('down');
    } else {
      setDirection('up');
    }
  };
  return (
    <TextButton
      text={title}
      fontColor={color.silver_gray}
      fontSize={12}
      fontWeight={400}
      backgroundColor={color.darkersec_color}
      padding={'5px 10px'}
      itemsDirection="row-reverse"
      alignment="center"
      onPress={() => {
        changeDirection();
      }}
    >
      <Arrow
        css={{ transform: direction == 'up' ? 'rotate(180deg)' : 'unset' }}
        className="arrow"
        width={12}
        height={8}
      />
    </TextButton>
  );
}
