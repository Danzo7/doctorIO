import { color } from '@assets/styles/color';
import { ReactNode } from 'react';
import './style/index.scss';
import Arrow from 'toSvg/arrow.svg?icon';
import IconicButton from '@components/buttons/iconic_button';
import { SETTINGS, useAppSettingsStore } from '@stores/appSettingsStore';

interface SnakeBarProps {
  description: string;
  type?: 'error' | 'info' | 'warning';
  children?: ReactNode;
  backgroundColor?: string;
}
export default function SnakeBar({
  description,
  children,
  type = 'error',
  backgroundColor = color.lighter_background,
}: SnakeBarProps) {
  const promptPosition = SETTINGS.promptPosition;
  return (
    <div
      className={`snake-bar ${type}`}
      css={{ backgroundColor: backgroundColor }}
      key={+new Date()} // To force animation replay when rerender  (https://stackoverflow.com/questions/52231320/how-to-replay-a-css3-animation-in-reactjs)
    >
      <div
        className="position-control"
        css={promptPosition == 'bottom' ? { top: 0 } : { bottom: 0 }}
      >
        <IconicButton
          Icon={
            <Arrow
              css={{
                rotate: promptPosition == 'bottom' ? '180deg' : undefined,
              }}
            />
          }
          radius={5}
          width={20}
          iconSize={10}
          afterBgColor={color.light}
          onPress={() => {
            useAppSettingsStore
              .getState()
              .setPromptPosition(promptPosition == 'top' ? 'bottom' : 'top');
          }}
        />
      </div>
      <span>{description}</span>
      {children}
    </div>
  );
}
