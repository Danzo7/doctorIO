import AlertToast from '@components/alert_toast';
import Tooltip, { ActionProps } from '@components/poppers/tooltip';
import { Logger } from '@libs/Logger';
import { OverlayItem, OverlayOptions } from '@libs/overlay';
import { nanoid } from '@reduxjs/toolkit';
import { ComponentProps, ReactNode } from 'react';
import create from 'zustand';
type Item = {
  node?: ReactNode;
  id: string;
  previousId?: string;
  isTooltip?: boolean;
};
type Target =
  | { node: ReactNode; props?: OverlayOptions }
  | ((props: Pick<OverlayState, 'close' | 'hide' | 'open'>) => {
      node: ReactNode;
      props?: OverlayOptions;
    });
interface OverlayState {
  items: Item[];
  openId?: string;
  openTooltipId?: string;
  toasts: (ComponentProps<typeof AlertToast> & {
    id: string;
  })[];
  init: (
    target?: Target,
    id?: string,
    isTooltip?: boolean,
  ) => Pick<OverlayState, 'close' | 'hide' | 'open'>;
  open: (
    target?: Target,
    id?: string,
    closePrevious?: boolean,
  ) => Pick<OverlayState, 'close' | 'hide'>;
  hide: (id?: string) => Pick<OverlayState, 'close' | 'open'>;

  close: (id?: string) => void;
  getNode: (id: string) => ReactNode | undefined;
  getIndex: (id: string) => number | undefined;
  clear: () => void;
  toast: (
    message: string,
    status: 'error' | 'Success' | 'warning',
    timeout?: number,
    id?: string,
  ) => void;
  closeToast: (id: string) => void;
}

const useOverlayStore = create<OverlayState>((set, get) => ({
  items: [],
  toasts: [],
  getNode: (id: string) => {
    const item = get().items.find((i) => i.id === id);
    return item?.node;
  },
  getIndex: (id: string) => {
    const index = get().items.findIndex((it) => it.id === id);
    return index >= 0 ? index : undefined;
  },
  init: (target, idd, isTooltip) => {
    Logger.log('InitOverlay', get().items.length);
    const id: string = idd ?? nanoid();
    const close = () => get().close(id);
    const plainTarget =
      typeof target === 'function'
        ? target({
            close,
            hide: () => get().hide(id),
            open: (tg) => get().open(tg, id),
          })
        : target;
    const item: Item = {
      node: plainTarget
        ? OverlayItem({
            children: plainTarget.node,
            ...plainTarget.props,
            onClose: () => get().close(id),
          })
        : undefined,
      id,
      isTooltip,
    };

    set((state) => {
      if (state.items.length > 16) {
        Logger.warn(
          'initOverlay',
          'Overlay limit reached. an item will be removed',
        );
        return { items: [...state.items.slice(1), item] };
      }
      const oldItem = state.getIndex(id);
      if (oldItem != undefined) state.items[oldItem] = item;
      else state.items.push(item);
      return { items: [...state.items] };
    });
    return {
      close,
      open: (tg) => get().open(tg, id),
      hide: () => get().hide(id),
    };
  },
  open: (target, id, closePrevious) => {
    Logger.log('openOverlay', get().items.length);
    if (get().items.length === 0)
      Logger.warn('openOverlay', "No items in overlay, can't open");
    else {
      let item: Item | undefined;
      if (id == undefined) item = get().items[get().items.length - 1];
      else item = get().items.find((i) => i.id === id);

      if (item != undefined) {
        if (target != undefined) {
          const plainTarget =
            typeof target === 'function'
              ? target({
                  close,
                  hide: () => get().hide(id),
                  open: (tg) => get().open(tg, id),
                })
              : target;
          item.node = OverlayItem({
            children: plainTarget.node,
            onClose: () => get().close(id),
            ...plainTarget.props,
          });
        }
        if (item.isTooltip) {
          set(() => {
            return { openTooltipId: item?.id };
          });
        } else {
          item.previousId =
            get().openId != item.id && !closePrevious
              ? get().openId
              : undefined;
          if (item.node != undefined) set(() => ({ openId: id }));
          else Logger.warn('openOverlay', 'Item was not initialized');
        }
      } else
        Logger.warn(
          'openOverlay',
          'No item found with id "' +
            id +
            '". Maybe the item was closed before',
        );
    }
    return {
      close: () => get().close(id),
      hide: () => get().hide(id),
    };
  },

  close: (id) => {
    Logger.log('closeOverlay', get().items.length - 1);
    if (get().items.length === 0) {
      Logger.warn('closeOverlay', 'There are no items to close');
      if (get().openId != undefined) set(() => ({ openId: undefined }));
      return;
    }
    if (id == undefined) {
      set((state) => {
        const items = [...state.items];
        const deleted = items.pop();
        return {
          items,
          openId: state.openId == deleted?.id ? undefined : state.openId,
        };
      });
    } else {
      const index = get().getIndex(id);
      if (index != undefined)
        set((state) => {
          return {
            items: state.items.filter(({ id: ids }) => ids != id),
            openId:
              state.openId == id ? state.items[index].previousId : state.openId,
            openTooltipId:
              state.openTooltipId == id ? undefined : state.openTooltipId,
          };
        });
      else
        Logger.warn(
          'closeOverlay',
          'No item found with id "' +
            id +
            '". Maybe the item was closed before',
        );
    }
  },
  hide: (id) => {
    Logger.log('hideOverlay', get().items.length);
    if (get().openId == id || id == undefined) {
      set((state) => ({
        openId: get().openId == id ? undefined : state.openId,
        openTooltipId:
          get().openTooltipId == id ? undefined : state.openTooltipId,
      }));
    } else Logger.warn('hideOverlay', ' id "' + id + '" is not open.');

    return {
      close: () => get().close(id),
      open: (target) => get().open(target, id),
    };
  },
  clear: () => {
    Logger.log('clearOverlay', get().items.length);
    set(() => ({ items: [], openId: undefined }));
  },
  closeToast: (id) => {
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
            close: () => get().closeToast(id),
          },
        ],
      };
    });
  },
}));
export const useIsOpen = () => useOverlayStore((state) => state.openId);
export const useOpenTooltipId = () =>
  useOverlayStore((state) => state.openTooltipId);

export const getOverlayNode = (id: string) =>
  useOverlayStore.getState().getNode(id);
export const Overlay_u = {
  init: (target?: Target, id?: string) =>
    useOverlayStore.getState().init(target, id),
  clear: () => useOverlayStore.getState().clear(),
  quickOpen: (node: ReactNode, props?: OverlayOptions) =>
    useOverlayStore.getState().init({ node, props }).open(),
  openTooltip: (
    target: ActionProps[] | ReactNode,
    popperTarget: HTMLElement,
    autoClose?: true,
  ) =>
    useOverlayStore
      .getState()
      .init(
        ({ close }) => ({
          node: !Array.isArray(target)
            ? target
            : Tooltip({
                actionList: target,
                closeOnSelect: autoClose && close,
              }),
          props: {
            clickThrough: true,
            closeOnClickOutside: true,
            closeOnBlur: true,
            popperTarget,
          },
        }),
        undefined,
        true,
      )
      .open(),
};
export const useToast = () => useOverlayStore((state) => state.toasts);
export const toast = (
  text: string,
  status: 'error' | 'Success' | 'warning',
  timeout?: number,
  id?: string,
) => useOverlayStore.getState().toast(text, status, timeout, id);
