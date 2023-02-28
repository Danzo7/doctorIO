import AlertToast from '@components/alert_toast';
import { Logger } from '@libs/Logger';
import { nanoid } from '@reduxjs/toolkit';
import { ComponentProps } from 'react';
import create from 'zustand';

interface OverlayState {
  toasts: (ComponentProps<typeof AlertToast> & {
    id: string;
  })[];

  clear: () => void;
  toast: (
    message: string,
    status: 'error' | 'success' | 'warning',
    timeout?: number,
    id?: string,
  ) => void;
  close: (id: string) => void;
}

const tooltipStore = create<OverlayState>((set, get) => ({
  toasts: [],

  clear: () => {
    set(() => ({
      toasts: [],
    }));
  },
  close: (id) => {
    Logger.log('closeToast', get().toasts.length - 1);
    set((state) => {
      return {
        toasts: state.toasts.filter((t) => t.id != id),
      };
    });
  },

  toast: (text, status, timeout, idd) => {
    Logger.log('toast', get().toasts.length);
    const id = idd || nanoid();

    set((state) => {
      if (state.toasts.length > 5) {
        Logger.warn('toast', 'Toast limit reached. an item will be removed');
        state.toasts = state.toasts.slice(1);
      }
      state.toasts = state.toasts.filter((t) => t.id != id);
      return {
        toasts: [
          ...state.toasts,
          {
            text,
            status,
            id,
            timeout: timeout || 5000,
            close: () => get().close(id),
          },
        ],
      };
    });
  },
}));

export const useToast = () => tooltipStore((state) => state.toasts);
const toast = (
  text: string,
  status: 'error' | 'success' | 'warning',
  timeout?: number,
  id?: string,
) => tooltipStore.getState().toast(text, status, timeout, id);
toast.close = (id: string) => tooltipStore.getState().close(id);
toast.clear = () => tooltipStore.getState().clear();
export default toast;

export const useIsToastEmpty = () =>
  tooltipStore(
    (state) => state.toasts.length == 0,
    (oldState, newState) => oldState == newState,
  );
