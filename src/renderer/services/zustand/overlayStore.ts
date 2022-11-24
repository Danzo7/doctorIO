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
  isHelpTip?: boolean;
  isModal?: boolean;
};
type Target =
  | { node: ReactNode; props?: OverlayOptions }
  | ((props: Pick<OverlayState, 'close' | 'hide' | 'open'>) => {
      node: ReactNode;
      props?: OverlayOptions;
    });
interface OverlayState {
  items: Item[];
  openOverlayId: { modalId?: string; tooltipId?: string; helpTipId?: string };

  _forceRerender: boolean;
  toasts: (ComponentProps<typeof AlertToast> & {
    id: string;
  })[];
  init: (
    target?: Target,
    id?: string,
    config?: { isTooltip?: boolean; isHelpTip?: boolean; isModal?: boolean },
  ) => Pick<OverlayState, 'close' | 'hide' | 'open'>;
  open: (
    target?: Target,
    id?: string,
    data?: { closePrevious?: boolean; force?: boolean },
  ) => Pick<OverlayState, 'close' | 'hide'>;
  hide: (id?: string) => Pick<OverlayState, 'close' | 'open'>;
  close: (id?: string) => void;
  getNode: (id: string) => ReactNode | undefined;
  getIndex: (id: string) => number | undefined;
  isOpen: (id: string) => boolean;
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
  openOverlayId: {},
  toasts: [],
  _forceRerender: false,
  getNode: (id: string) => {
    const item = get().items.find((i) => i.id === id);
    return item?.node;
  },
  getIndex: (id: string) => {
    const index = get().items.findIndex((it) => it.id === id);
    return index >= 0 ? index : undefined;
  },
  init: (target, idd, config = { isModal: true }) => {
    if (
      Number(config?.isTooltip) +
        Number(config?.isHelpTip) +
        Number(config?.isModal) >
      1
    )
      throw new Error('Only one of isTooltip, isHelpTip, isModal can be true');
    Logger.log('InitOverlay', 'Total items: ' + get().items.length);
    const id: string = idd ?? nanoid();
    const plainTarget =
      typeof target === 'function'
        ? target({
            close: () => get().close(id),
            hide: () => get().hide(id),
            open: (tg, _, force) => get().open(tg, id, force),
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
      isTooltip: config?.isTooltip,
      isHelpTip: config?.isHelpTip,
      isModal: config?.isModal,
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
      close: () => get().close(id),
      open: (tg, _, force) => get().open(tg, id, force),
      hide: () => get().hide(id),
    };
  },
  open: (target, id, data) => {
    if (get().items.length === 0)
      Logger.warn('openOverlay', "No items in overlay, can't open");
    else {
      Logger.log(
        'OpenOverlay',
        'Open overlay with id: "' +
          id +
          '", Total items: ' +
          get().items.length,
      );
      const index = id ? get().getIndex(id) : undefined;
      if (index == undefined && id)
        Logger.warn('openOverlay', 'No item with id: "' + id + '"');
      else {
        set((state) => {
          const item = index
            ? state.items[index]
            : state.items[state.items.length - 1];
          if (target != undefined) {
            const plainTarget =
              typeof target === 'function'
                ? target({
                    close: () => state.close(id),
                    hide: () => state.hide(id),
                    open: (tg, _, force) => state.open(tg, id, force),
                  })
                : target;
            item.node = OverlayItem({
              children: plainTarget.node,
              onClose: () => state.close(id),
              ...plainTarget.props,
            });
          }

          item.previousId =
            item.isModal &&
            state.openOverlayId?.modalId != item.id &&
            !data?.closePrevious
              ? state.openOverlayId?.modalId
              : undefined;

          if (item.node != undefined) {
            const openOverlay = state.openOverlayId;
            if (item.isModal) openOverlay.modalId = item.id;
            else if (item.isTooltip) openOverlay.tooltipId = item.id;
            else if (item.isHelpTip) openOverlay.helpTipId = item.id;
            return {
              openOverlayId: openOverlay,
              _forceRerender: data?.force
                ? !state._forceRerender
                : state._forceRerender,
            };
          } else
            Logger.warn(
              'openOverlay',
              `Overlay "${id}" has not been initialized`,
            );
          return {};
        });
      }
    }
    return {
      close: () => get().close(id),
      hide: () => get().hide(id),
    };
  },

  close: (id) => {
    Logger.log(
      'closeOverlay',
      'Closing' + (id ? id : 'the last overlay'),
      get().items.length - 1,
    );
    if (get().items.length === 0) {
      Logger.warn('closeOverlay', 'There are no items to close');
      if (get().openOverlayId) set(() => ({ openOverlayId: {} }));
      return;
    }
    const index = id ? get().getIndex(id) : undefined;
    if (id && index == undefined)
      Logger.warn('closeOverlay', 'No item found with id "' + id + '"');
    else {
      set((state) => {
        const items = state.items;
        const item = items[index ?? items.length - 1];
        const openOverlayId = state.openOverlayId;
        if (item?.isModal && item.id == openOverlayId.modalId)
          openOverlayId.modalId = item.previousId;
        else if (item?.isTooltip && item.id == openOverlayId.tooltipId)
          openOverlayId.tooltipId = undefined;
        else if (item?.isHelpTip && item.id == openOverlayId.helpTipId)
          openOverlayId.helpTipId = undefined;
        return {
          items: items.filter((i) => i.id != item.id),
          openOverlayId,
        };
      });
    }
  },
  hide: (id) => {
    Logger.log('hideOverlay', get().items.length);
    if (get().items.length === 0)
      Logger.warn('hideOverlay', 'There are no items to hide');
    else {
      const index = id ? get().getIndex(id) : undefined;
      if (id && index == undefined) {
        Logger.warn(`Item with id ${id} not found`);
      } else {
        const item = index
          ? get().items[index]
          : get().items[get().items.length - 1];

        set((state) => {
          const openOverlayId = state.openOverlayId;
          if (item?.isModal && item.id == openOverlayId.modalId)
            openOverlayId.modalId = item.previousId;
          else if (item?.isTooltip && item.id == openOverlayId.tooltipId)
            openOverlayId.tooltipId = undefined;
          else if (item?.isHelpTip && item.id == openOverlayId.helpTipId)
            openOverlayId.helpTipId = undefined;

          return {
            openOverlayId,
          };
        });
      }
    }
    return {
      close: () => get().close(id),
      open: (target) => get().open(target, id),
    };
  },
  isOpen: (id) => {
    const index = get().getIndex(id);
    if (
      index != undefined &&
      (get().items[index].isModal ||
        get().items[index].isTooltip ||
        get().items[index].isHelpTip)
    )
      return true;
    else return false;
  },
  clear: () => {
    Logger.log('clearOverlay', get().items.length);
    set(() => ({ items: [], openOverlayId: {} }));
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
export const useIsOpenModal = () =>
  useOverlayStore(
    (state) => ({
      openId: state.openOverlayId?.modalId,
      _forceRerender: state._forceRerender,
    }),
    (oldState, newState) => oldState.openId == newState.openId,
  ).openId;
export const useOpenTooltipId = () =>
  useOverlayStore(
    (state) => ({ openId: state.openOverlayId?.tooltipId }),
    (oldState, newState) => oldState.openId == newState.openId,
  ).openId;
export const useOpenHelptipId = () =>
  useOverlayStore(
    (state) => ({ openId: state.openOverlayId?.helpTipId }),
    (oldState, newState) => oldState.openId == newState.openId,
  ).openId;
export const getOverlayNode = (id: string) =>
  useOverlayStore.getState().getNode(id);
export const Overlay_u = {
  init: (
    target?: Target,
    id?: string,
    config?: { isTooltip?: boolean; isHelpTip?: boolean; isModal?: boolean },
  ) => useOverlayStore.getState().init(target, id, config),
  clear: () => useOverlayStore.getState().clear(),
  close: (id?: string) => useOverlayStore.getState().close(id),
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
        { isTooltip: true },
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
