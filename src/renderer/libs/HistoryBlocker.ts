import SnakeBar from '@containers/modals/snake_bar';
import { History, Transition } from 'history';
import { ReactNode, useCallback, useContext, useEffect } from 'react';
import {
  UNSAFE_NavigationContext as NavigationContext,
  Navigator as IncorrectType,
} from 'react-router-dom';
import { useOverlay } from './overlay/useOverlay';
type TransitionD = Transition & { dismiss: () => void };
type Navigator = IncorrectType & Pick<History, 'block' | 'listen'>;
export function useBlocker(blocker: (tx: TransitionD) => void, when = true) {
  const { navigator } = useContext(NavigationContext) as unknown as {
    navigator: Navigator;
  };

  useEffect(() => {
    if (!when) return;

    const unblock = navigator.block((tx) => {
      const autoUnblockingTx = {
        ...tx,
        dismiss() {
          unblock();
        },
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
export function useRouteChange(change: () => void) {
  const { navigator } = useContext(NavigationContext) as unknown as {
    navigator: Navigator;
  };

  navigator.listen(() => {
    change();
  });
}
export default function usePrompt(
  message: string,
  actionList: ({
    closeOverlay,
    retry,
    dismiss,
  }: {
    closeOverlay: () => void;
    dismiss: () => void;
    retry: () => void;
  }) => ReactNode,
  when = true,
  forceShow = false,
) {
  const { open, useOpen, close } = useOverlay();
  const blocker = useCallback(
    (tx: TransitionD) => {
      open(
        SnakeBar({
          description: message,
          children: actionList({
            closeOverlay: close,
            dismiss: tx.dismiss,
            retry: tx.retry,
          }),
        }),
        {
          closeOnClickOutside: true,
          clickThrough: true,
          position: { bottom: '2vh' },
          transition: 'appear-bottom',
        },
      );
    },
    [open, message, actionList, close],
  );
  useOpen(
    SnakeBar({
      description: message,
      type: 'info',
      children: actionList({
        closeOverlay: close,
        dismiss: () => {},
        retry: () => {},
      }),
    }),
    {
      closeOnClickOutside: true,
      clickThrough: true,
      position: { bottom: '2vh' },
      transition: 'appear-bottom',
      autoFocus: false,
    },
    forceShow && when,
  );
  if (!when && !forceShow) close();

  useBlocker(blocker, when);
}
