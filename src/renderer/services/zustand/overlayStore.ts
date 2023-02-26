import AlertToast from '@components/alert_toast';
import Tooltip, { ActionProps } from '@components/poppers/tooltip';
import { Logger } from '@libs/Logger';
import { OverlayItem, OverlayOptions } from '@libs/overlay';
import { PopperTargetType } from '@libs/overlay/types';
import { nanoid } from '@reduxjs/toolkit';
import { ComponentProps, ReactNode } from 'react';
import create from 'zustand';
//FIx tooltip open multiple
export enum OverlayType {
  MODAL = 1,
  TOOLTIP,
}
type Item = {
  node?: ReactNode;
  id: string;
  previousId?: string;
  overlayType?: OverlayType;
};
type ControlReturnVoids = {
  open: (data?: {
    closePrevious?: boolean;
    force?: boolean;
  }) => Pick<ControlReturnVoids, 'close' | 'hide'>;
  hide: () => Pick<ControlReturnVoids, 'close' | 'open'>;
  close: () => void;
};
type Target =
  | { node: ReactNode; props?: OverlayOptions }
  | ((props: Pick<ControlReturnVoids, 'close' | 'hide' | 'open'>) => {
      node: ReactNode;
      props?: OverlayOptions;
    });

type Alter = {
  alt: string;
  id: string;
  popperTarget: HTMLElement | PopperTargetType;
};
interface OverlayState {
  items: Item[];
  alt?: Alter;
  toasts: (ComponentProps<typeof AlertToast> & {
    id: string;
  })[];

  openOverlayId: { modalId?: string; tooltipId?: string };
  _forceRerender: boolean;
  init: (
    target?: Target,
    id?: string,
    config?: { type: OverlayType },
  ) => Pick<ControlReturnVoids, 'close' | 'hide' | 'open'> & { id: string };
  open: (
    id?: string,
    data?: { closePrevious?: boolean; force?: boolean },
  ) => Pick<ControlReturnVoids, 'close' | 'hide'>;
  hide: (id?: string) => Pick<ControlReturnVoids, 'close' | 'open'>;
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
  setAlt: (alt: Alter) => void;
  clearAlt: () => void;
  portalElement?: HTMLElement;
  setPortalElement: (element: HTMLElement) => void;
}

const useOverlayStore = create<OverlayState>((set, get) => ({
  items: [],
  toasts: [],
  openOverlayId: {},

  _forceRerender: false,
  getNode: (id: string) => {
    const item = get().items.find((i) => i.id === id);
    return item?.node;
  },
  getIndex: (id: string) => {
    const index = get().items.findIndex((it) => it.id === id);
    return index >= 0 ? index : undefined;
  },
  init: (target, idd, config = { type: OverlayType.MODAL }) => {
    Logger.log('InitOverlay', 'Total items: ' + get().items.length);
    let id: string;
    if (idd && get().getIndex(idd) !== undefined && !target) {
      id = idd;
      Logger.log('InitOverlay', 'Item already exists');
    } else {
      id = idd ?? nanoid();
      const plainTarget =
        typeof target === 'function'
          ? target({
              close: () => get().close(id),
              hide: () => get().hide(id),
              open: (data) => get().open(id, data),
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
        overlayType: config.type,
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
    }
    return {
      close: () => get().close(id),
      open: (data) => get().open(id, data),
      hide: () => get().hide(id),
      id,
    };
  },
  open: (id, data) => {
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
          item.previousId =
            item.overlayType == OverlayType.MODAL &&
            state.openOverlayId?.modalId != item.id &&
            !data?.closePrevious
              ? state.openOverlayId?.modalId
              : undefined;

          if (item.node != undefined) {
            const openOverlay = state.openOverlayId;
            if (item.overlayType == OverlayType.MODAL)
              openOverlay.modalId = item.id;
            else if (item.overlayType == OverlayType.TOOLTIP)
              openOverlay.tooltipId = item.id;

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
    Logger.log('closeOverlay', 'Closing ' + (id ? id : 'the last overlay'));
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

        if (
          item.overlayType == OverlayType.MODAL &&
          item.id == openOverlayId.modalId
        )
          openOverlayId.modalId = item.previousId;
        else if (
          item.overlayType == OverlayType.TOOLTIP &&
          item.id == openOverlayId.tooltipId
        )
          openOverlayId.tooltipId = undefined;

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

          if (
            item.overlayType == OverlayType.MODAL &&
            item.id == openOverlayId.modalId
          )
            openOverlayId.modalId = item.previousId;
          else if (
            item.overlayType == OverlayType.TOOLTIP &&
            item.id == openOverlayId.tooltipId
          )
            openOverlayId.tooltipId = undefined;

          return {
            openOverlayId,
          };
        });
      }
    }
    return {
      close: () => get().close(id),
      open: () => get().open(id),
    };
  },
  isOpen: (id) => {
    const index = get().getIndex(id);
    if (
      index != undefined &&
      (get().openOverlayId.modalId == id || get().openOverlayId.tooltipId == id)
    )
      return true;
    else return false;
  },
  clear: () => {
    Logger.log('clearOverlay', get().items.length);
    set(() => ({ items: [], openOverlayId: {}, toasts: [], alt: undefined }));
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
  setAlt(alt) {
    set(() => ({ alt }));
  },
  clearAlt() {
    set(() => ({ alt: undefined }));
  },

  setPortalElement: (element) => {
    set(() => ({ portalElement: element }));
  },
}));
export const useIsOpenModal = () =>
  useOverlayStore(
    (state) => ({
      openId: state.openOverlayId?.modalId,
      _forceRerender: state._forceRerender,
    }),
    (oldState, newState) =>
      oldState.openId == newState.openId &&
      oldState._forceRerender == newState._forceRerender,
  ).openId;
export const useOpenTooltipId = () =>
  useOverlayStore(
    (state) => ({ openId: state.openOverlayId?.tooltipId }),
    (oldState, newState) => oldState.openId == newState.openId,
  ).openId;
// export const useOpenHelptipId = () =>
//   useOverlayStore(
//     (state) => ({ openId: state.openOverlayId?.helpTipId }),
//     (oldState, newState) => oldState.openId == newState.openId,
//   ).openId;
export const getOverlayNode = (id: string) =>
  useOverlayStore.getState().getNode(id);
export const Overlay_u = {
  init: (target: Target, id?: string, config?: { type: OverlayType }) =>
    useOverlayStore.getState().init(target, id, config),
  clear: () => useOverlayStore.getState().clear(),
  close: (id?: string) => useOverlayStore.getState().close(id),
  modal: (
    node:
      | ReactNode
      | ((
          props: Pick<ControlReturnVoids, 'open' | 'hide' | 'close'>,
        ) => ReactNode),
    props?: OverlayOptions,
    id?: string,
  ) =>
    useOverlayStore.getState().init(
      (prop) => ({
        node: typeof node == 'function' ? node(prop) : node,
        props,
      }),
      id,
    ),
  toast: (
    text: string,
    status: 'error' | 'Success' | 'warning',
    timeout?: number,
    id?: string,
  ) => useOverlayStore.getState().toast(text, status, timeout, id),
  openTooltip: (
    target: (
      props: Pick<ControlReturnVoids, 'close' | 'hide' | 'open'>,
    ) => ActionProps[] | ReactNode,
    popperTarget: HTMLElement,
    autoClose?: true,
    options?: OverlayOptions,
  ) =>
    useOverlayStore
      .getState()
      .init(
        ({ close, open, hide }) => {
          const node = target({ close, open, hide });
          return {
            node: !Array.isArray(node)
              ? node
              : Tooltip({
                  actionList: node,
                  closeOnSelect: autoClose && close,
                }),
            props: {
              clickThrough: true,
              closeOnClickOutside: true,
              closeOnBlur: true,
              popperTarget,
              ...options,
            },
          };
        },
        undefined,
        { type: OverlayType.TOOLTIP },
      )
      .open(),
  tooltip: (
    target: (
      props: Pick<ControlReturnVoids, 'close' | 'hide' | 'open'>,
    ) => ActionProps[] | ReactNode,
    popperTarget: HTMLElement,
    options?: OverlayOptions,
    id?: string,
    autoClose?: true,
  ) =>
    useOverlayStore.getState().init(
      ({ close, open, hide }) => {
        const node = target({ close, open, hide });
        return {
          node: !Array.isArray(node)
            ? node
            : Tooltip({
                actionList: node,
                closeOnSelect: autoClose && close,
              }),
          props: {
            clickThrough: true,
            closeOnClickOutside: true,
            closeOnBlur: true,
            popperTarget,
            ...options,
          },
        };
      },
      id,
      { type: OverlayType.TOOLTIP },
    ),
  getPortalEntry: () => useOverlayStore.getState().portalElement,
  setPortalElement: (element: HTMLElement) =>
    useOverlayStore.getState().setPortalElement(element),
  alt: (alt: Alter) => useOverlayStore.getState().setAlt(alt),
  clearAlt: () => useOverlayStore.getState().clearAlt(),
};
export const useToast = () => useOverlayStore((state) => state.toasts);
export const toast = Overlay_u.toast;
export const modal = Overlay_u.modal;
export const tooltip = Overlay_u.tooltip;
export const useIsNotEmpty = () =>
  useOverlayStore(
    (state) => state.items.length > 0,
    (oldState, newState) => oldState == newState,
  );
export const useAlt = () => useOverlayStore((state) => state.alt);
