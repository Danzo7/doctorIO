import SnakeBar from '@containers/modals/snake_bar';
import SnakeBarActionsControls from '@containers/modals/snake_bar/snake_bar_actions_controls';
import TextButton from '@components/buttons/text_button';
import { color } from '@assets/styles/color';
import useNavigation from '@libs/hooks/useNavigation';
import { SETTINGS } from '@stores/appSettingsStore';
import { Portal } from '@libs/overlay';

interface BackToSessionBarProps {}
export default function BackToSessionBar({}: BackToSessionBarProps) {
  const { navigate } = useNavigation();

  return (
    <Portal
      clickThrough
      position={
        SETTINGS.promptPosition == 'bottom' ? { bottom: '2vh' } : { top: '2vh' }
      }
      width={'40%'}
      autoFocus={false}
    >
      <SnakeBar description="Session is still in progress" type="warning">
        <SnakeBarActionsControls>
          <TextButton
            text="Go back to session"
            backgroundColor={color.good_green}
            onPress={async () => {
              navigate('session');
            }}
          />
        </SnakeBarActionsControls>
      </SnakeBar>
    </Portal>
  );
}
