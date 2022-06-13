import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import TextButton from '@components/buttons/text_button';
import SnakeBar from '@containers/modals/snake_bar';
import { History, Transition } from 'history';
import { useCallback, useContext, useEffect } from 'react';
import {
  UNSAFE_NavigationContext as NavigationContext,
  Navigator as IncorrectType,
} from 'react-router-dom';
import { Overlay } from './overlay';

type Navigator = IncorrectType & Pick<History, 'block'>;
export function useBlocker(blocker: (tx: Transition) => void, when = true) {
  const { navigator } = useContext(NavigationContext) as unknown as {
    navigator: Navigator;
  };

  useEffect(() => {
    if (!when) return;

    const unblock = navigator.block((tx) => {
      const autoUnblockingTx = {
        ...tx,
        retry() {
          unblock();
          tx.retry();
        },
      };

      blocker(autoUnblockingTx);
    });

    return unblock;
  }, [navigator, blocker, when]);
}

export default function usePrompt(message: string, when = true) {
  const blocker = useCallback(
    (tx: Transition) => {
      Overlay.open(
        SnakeBar({
          description:
            'This is a messsage that apear cause you did something that is not very ',
          children: DarkLightCornerButton({
            title: 'dismis',
            onPress: () => {
              Overlay.pop();
              tx.retry();
            },
          }),
        }),
        { closeOnClickOutside: true, position: { top: 0 } },
      );
      // tx.retry();
    },
    [message],
  );

  useBlocker(blocker, when);
}
