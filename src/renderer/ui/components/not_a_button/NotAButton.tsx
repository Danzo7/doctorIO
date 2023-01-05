import { ComponentProps } from 'react';
import TextButton from '@components/buttons/text_button';

function NotAButton({
  color,
  ...props
}: Omit<
  ComponentProps<typeof TextButton>,
  'onPress' | 'onHold' | 'blank' | 'cursor'
> & { color?: string }) {
  return (
    <TextButton
      {...props}
      cursor={'default'}
      borderColor={color ?? props.borderColor}
      fontColor={color ?? props.fontColor}
      activeBgColor={'transparent' ?? props.activeBgColor}
      width={props.width ?? 'fit-content'}
      blank
      fake
    />
  );
}

export default NotAButton;
