import { Logger } from '@libs/Logger';
import { OverlayItem, OverlayOptions } from '@libs/overlay';
import { nanoid } from '@reduxjs/toolkit';
import { ReactNode } from 'react';
import create from 'zustand';

type ItemType = {
  node?: ReactNode;
  id: string;
  previousId?: string;
};

type ControlReturnVoids = {
  open: (data?: {
    closePrevious?: boolean;
    force?: boolean;
  }) => Pick<ControlReturnVoids, 'close' | 'hide'>;
  hide: () => Pick<ControlReturnVoids, 'close' | 'open'>;
  close: () => void;
};
type ModalTarget =
  | { node: ReactNode; props?: OverlayOptions }
  | ((props: Pick<ControlReturnVoids, 'close' | 'hide' | 'open'>) => {
      node: ReactNode;
      props?: OverlayOptions;
    });

interface ModalState {
  items: ItemType[];
  openedId?: string;
  _forceRerender: boolean;
  init: (
    target?: ModalTarget,
    id?: string,
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
}

const useModalStore = create<ModalState>((set, get) => ({
  items: [],
  _forceRerender: false,
  getNode: (id: string) => {
    const currentState = get();

    const item = currentState.items.find((i) => i.id === id);
    return item?.node;
  },
  getIndex: (id: string) => {
    const currentState = get();

    const index = currentState.items.findIndex((it) => it.id === id);
    return index >= 0 ? index : undefined;
  },
  init: (target, idd) => {
    const currentState = get();

    Logger.log('InitOverlay', 'Total items: ' + currentState.items.length);
    let id: string;
    if (idd && currentState.getIndex(idd) !== undefined && !target) {
      id = idd;
      Logger.log('InitOverlay', 'Item already exists');
    } else {
      id = idd ?? nanoid();
      const plainTarget =
        typeof target === 'function'
          ? target({
              close: () => currentState.close(id),
              hide: () => currentState.hide(id),
              open: (data) => currentState.open(id, data),
            })
          : target;
      const item: ItemType = {
        node: plainTarget
          ? OverlayItem({
              children: plainTarget.node,
              ...plainTarget.props,
              onClose: () => currentState.close(id),
            })
          : undefined,
        id,
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
      close: () => currentState.close(id),
      open: (data) => currentState.open(id, data),
      hide: () => currentState.hide(id),
      id,
    };
  },
  open: (id, data) => {
    const currentState = get();
    if (currentState.items.length === 0)
      Logger.warn('openOverlay', "No items in overlay, can't open");
    else {
      Logger.log(
        'OpenOverlay',
        'Open overlay with id: "' +
          id +
          '", Total items: ' +
          currentState.items.length,
      );
      const index = id ? currentState.getIndex(id) : undefined;
      if (index == undefined && id)
        Logger.warn('openOverlay', 'No item with id: "' + id + '"');
      else {
        const item = index
          ? currentState.items[index]
          : currentState.items[currentState.items.length - 1];
        item.previousId = !data?.closePrevious
          ? currentState.openedId
          : undefined;
        if (item.node != undefined) {
          set((state) => ({
            openedId: item.id,
            _forceRerender: data?.force
              ? !state._forceRerender
              : state._forceRerender,
          }));
          return {
            close: () => currentState.close(item.id),
            hide: () => currentState.hide(item.id),
          };
        } else
          Logger.warn(
            'openOverlay',
            `Overlay "${id}" has not been initialized`,
          );
      }
    }
    return {
      close: () => currentState.close(id),
      hide: () => currentState.hide(id),
    };
  },

  close: (id) => {
    const currentState = get();

    Logger.log('closeOverlay', 'Closing ' + (id ? id : 'the last overlay'));
    if (currentState.items.length === 0) {
      Logger.warn('closeOverlay', 'There are no items to close');
      if (currentState.openedId) set(() => ({ openedId: undefined }));
      return;
    }
    const index = id ? currentState.getIndex(id) : undefined;

    if (id && index == undefined)
      Logger.warn('closeOverlay', 'No item found with id "' + id + '"');
    else {
      set((state) => {
        const items = state.items;
        const item = items[index ?? items.length - 1];

        return {
          items: items.filter((i) => i.id != item.id),
          openedId: item.previousId,
        };
      });
    }
  },
  hide: (id) => {
    const currentState = get();

    Logger.log('hideOverlay', currentState.items.length);
    if (currentState.items.length === 0)
      Logger.warn('hideOverlay', 'There are no items to hide');
    else {
      const index = id ? currentState.getIndex(id) : undefined;
      if (id && index == undefined) {
        Logger.warn(`Item with id ${id} not found`);
      } else {
        const item = index
          ? currentState.items[index]
          : currentState.items[currentState.items.length - 1];

        set(() => ({
          openedId: item.previousId,
        }));
        return {
          close: () => currentState.close(item.id),
          open: () => currentState.open(item.id),
        };
      }
    }
    return {
      close: () => currentState.close(id),
      open: () => currentState.open(id),
    };
  },
  isOpen: (id) => {
    const currentState = get();

    const index = currentState.getIndex(id);
    if (index != undefined && currentState.openedId == id) return true;
    else return false;
  },
  clear: () => {
    const currentState = get();

    Logger.log('clearOverlay :', currentState.items.length);
    set(() => ({
      items: [],
      openedId: undefined,
    }));
  },
}));
export const useIsOpenModal = () =>
  useModalStore(
    (state) => ({
      openId: state.openedId,
      _forceRerender: state._forceRerender,
    }),
    (oldState, newState) =>
      oldState.openId == newState.openId &&
      oldState._forceRerender == newState._forceRerender,
  ).openId;

export const useModalNode = () =>
  useModalStore((state) =>
    state.openedId ? state.getNode(state.openedId) : undefined,
  );
const modal = (
  node:
    | ReactNode
    | ((
        props: Pick<ControlReturnVoids, 'open' | 'hide' | 'close'>,
      ) => ReactNode),
  props?: OverlayOptions,
  id?: string,
) =>
  useModalStore.getState().init(
    (prop) => ({
      node: typeof node == 'function' ? node(prop) : node,
      props,
    }),
    id,
  );
modal.close = (id?: string) => useModalStore.getState().close(id);
modal.hide = (id?: string) => useModalStore.getState().hide(id);
modal.clear = () => useModalStore.getState().clear();
export default modal;
export const useIsModalEmpty = () =>
  useModalStore(
    (state) => state.items.length == 0,
    (oldState, newState) => oldState == newState,
  );
