import { useContext } from 'react';
import { History } from 'history';

import {
  UNSAFE_NavigationContext as NavigationContext,
  Navigator as IncorrectType,
} from 'react-router-dom';
import create from 'zustand';
import { Logger } from './Logger';
type Navigator = IncorrectType & Pick<History, 'block' | 'listen'>;

type ListenerStoreState = {
  listeners: { [key: string]: () => void };
  addEventListener: (key: string, listener: () => void) => void;
  removeEventListener: (key: string) => void;
};
const useNavigationListeners = create<ListenerStoreState>((set) => ({
  listeners: {},
  addEventListener: (key, listener) => {
    Logger.log('Navigation listener', 'Adding listener-> ' + key);
    return set((state) => {
      state.listeners?.[key]?.();
      return {
        listeners: {
          ...state.listeners,
          [key]: listener,
        },
      };
    });
  },
  removeEventListener: (key) => {
    Logger.log('Navigation listener', 'Removing listener-> ' + key);
    return set((state) => {
      const { [key]: unlisten, ...listeners } = state.listeners;
      if (!unlisten) return state;
      unlisten();
      return {
        listeners,
      };
    });
  },
}));

export function useRouteChange({
  key,
  onChange,
}: {
  onChange: () => void;
  key: string;
}) {
  const { navigator } = useContext(NavigationContext) as unknown as {
    navigator: Navigator;
  };

  const unlisten = navigator.listen(() => {
    onChange();
  });
  useNavigationListeners.getState().addEventListener(key, unlisten);
}
