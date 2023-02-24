import { ModalPortal } from '@libs/overlay/OverlayContainer';
import SnakeBar from '@containers/modals/snake_bar';
import SnakeBarActionsControls from '@containers/modals/snake_bar/snake_bar_actions_controls';
import TextButton from '@components/buttons/text_button';
import { color } from '@assets/styles/color';
import useNavigation from '@libs/hooks/useNavigation';
import Arrow from 'toSvg/arrow_line.svg';
import { useState } from 'react';

interface BackToSessionBarProps {}
export default function BackToSessionBar({}: BackToSessionBarProps) {
  const { navigate } = useNavigation();
  const [position, setPosition] = useState<'bottom' | 'top'>('bottom');

  return (
    <ModalPortal
      clickThrough
      position={{
        bottom: position == 'bottom' ? '2%' : undefined,
        top: position == 'top' ? '2%' : undefined,
      }}
      width={'40%'}
    >
      <SnakeBar description="Session is still in progress" type="warning">
        <SnakeBarActionsControls>
          <TextButton
            text="Drag"
            Icon={
              <Arrow
                css={{ rotate: position == 'bottom' ? '-90deg' : '90deg' }}
              />
            }
            backgroundColor={color.cold_blue}
            onPress={() => {
              if (position == 'bottom') {
                setPosition('top');
              } else {
                setPosition('bottom');
              }
            }}
            itemsDirection="row-reverse"
          />
          <TextButton
            text="Go back to session"
            backgroundColor={color.good_green}
            onPress={async () => {
              navigate('session');
            }}
          />
        </SnakeBarActionsControls>
      </SnakeBar>
    </ModalPortal>
  );
}
