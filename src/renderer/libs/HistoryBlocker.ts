import SnakeBar from '@containers/modals/snake_bar';
import { History, Transition } from 'history';
import { ReactNode, useCallback, useContext, useEffect, useRef } from 'react';
import {
  UNSAFE_NavigationContext as NavigationContext,
  Navigator as IncorrectType,
} from 'react-router-dom';
import { SETTINGS } from '@stores/appSettingsStore';
import { Overlay_u, modal } from '@stores/overlayStore';
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
  const isOpen = useRef(false);
  const close = useCallback(() => {
    if (isOpen.current) {
      Overlay_u.close('prompt');
      isOpen.current = false;
    }
  }, []);

  useEffect(() => {
    if (forceShow && when) {
      isOpen.current = true;
      modal(
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
          position:
            SETTINGS.promptPosition == 'bottom'
              ? { bottom: '2vh' }
              : { top: '2vh' },
          transition:
            SETTINGS.promptPosition == 'top' ? 'appear-top' : 'appear-bottom',
          autoFocus: false,
        },
        'prompt',
      ).open({ force: true });
    }

    return () => {
      close();
    };
  }, [actionList, close, forceShow, message, when]);

  if (!forceShow && !when) close();
  const blocker = useCallback(
    (tx: TransitionD) => {
      isOpen.current = true;

      modal(
        SnakeBar({
          description: message,
          type: 'error',
          children: actionList({
            closeOverlay: close,
            dismiss: tx.dismiss,
            retry: tx.retry,
          }),
        }),
        {
          closeOnClickOutside: true,
          clickThrough: true,
          position:
            SETTINGS.promptPosition == 'bottom'
              ? { bottom: '2vh' }
              : { top: '2vh' },
          transition:
            SETTINGS.promptPosition == 'top' ? 'appear-top' : 'appear-bottom',
          autoFocus: false,
        },
        'prompt',
      ).open({ force: true });
    },
    [message, actionList, close],
  );

  useBlocker(blocker, when);
}
