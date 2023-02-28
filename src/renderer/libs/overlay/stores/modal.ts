import { Logger } from '@libs/Logger';
import { OverlayItem, OverlayOptions } from '@libs/overlay';
import { nanoid } from '@reduxjs/toolkit';
import { ReactNode } from 'react';
import create from 'zustand';

type ItemType = {
  node?: ReactNode;
  id: string;
  previousId?: string;
  hidden?: boolean;
};

type ControlReturnVoids = {
  id?: string;
  open: (data?: {
    previousBehavior?: 'close' | 'keep' | 'keepAndHide';
    force?: boolean;
  }) => Pick<ControlReturnVoids, 'close' | 'hide' | 'id'>;
  hide: () => Pick<ControlReturnVoids, 'close' | 'open' | 'id'>;
  close: () => void;
  asyncOpen: (
    data: Parameters<ControlReturnVoids['open']>[0] & { time?: number },
  ) => Promise<Pick<ControlReturnVoids, 'asyncClose' | 'id'>>;
  asyncClose: (data: { time?: number }) => Promise<void>;
};

type ModalTarget =
  | { node: ReactNode; props?: OverlayOptions }
  | ((props: ControlReturnVoids) => {
      node: ReactNode;
      props?: OverlayOptions;
    });

interface ModalState {
  items: ItemType[];
  openedId: string[];
  _forceRerender: boolean;
  init: (target?: ModalTarget, id?: string) => ControlReturnVoids;
  open: (
    id?: string,
    data?: Parameters<ControlReturnVoids['open']>[0],
  ) => ReturnType<ControlReturnVoids['open']>;
  hide: (id?: string) => ReturnType<ControlReturnVoids['hide']>;
  close: (id?: string) => void;
  getItem: (id: string) => ItemType | undefined;
  getIndex: (id: string) => number | undefined;
  isOpen: (id: string) => boolean;
  clear: () => void;
  asyncOpen: (
    id?: string,
    data?: Parameters<ControlReturnVoids['asyncOpen']>[0],
  ) => ReturnType<ControlReturnVoids['asyncOpen']>;
  asyncClose: (
    id?: string,
    data?: Parameters<ControlReturnVoids['asyncClose']>[0],
  ) => ReturnType<ControlReturnVoids['asyncClose']>;
}

const useModalStore = create<ModalState>((set, get) => ({
  items: [],
  _forceRerender: false,
  openedId: [],
  getItem: (id: string) => {
    const currentState = get();
    const item = currentState.items.find((i) => i.id === id);
    return item;
  },
  getIndex: (id: string) => {
    const currentState = get();

    const index = currentState.items.findIndex((it) => it.id === id);
    return index >= 0 ? index : undefined;
  },
  init: (target, idd) => {
    const currentState = get();

    Logger.log('InitModal', 'Total items: ' + currentState.items.length);
    let id: string;
    if (idd && currentState.getIndex(idd) !== undefined && !target) {
      id = idd;
      Logger.log('InitModal', 'Item already exists');
    } else {
      id = idd ?? nanoid();
      const plainTarget =
        typeof target === 'function'
          ? target({
              close: () => currentState.close(id),
              hide: () => currentState.hide(id),
              open: (data) => currentState.open(id, data),
              asyncOpen: async (data) => currentState.asyncOpen(id, data),
              asyncClose: async (data) => currentState.asyncClose(id, data),

              id: id,
            })
          : target;
      const item: ItemType = {
        node: plainTarget
          ? OverlayItem({
              children: plainTarget.node,
              closeMethod: () => currentState.close(id),
              type: 'modal',
              ...plainTarget.props,
            })
          : undefined,
        id,
      };

      set((state) => {
        if (state.items.length > 16) {
          Logger.warn('initModal', 'Limit reached. an item will be removed');
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
      asyncOpen: async (data) => currentState.asyncOpen(id, data),
      asyncClose: async (data) => currentState.asyncClose(id, data),

      id,
    };
  },
  open: (id, data) => {
    const currentState = get();
    if (currentState.items.length === 0)
      Logger.warn('openModal', "No items in modal, can't open");
    else {
      Logger.log(
        'OpenModal',
        'Open modal with id: "' +
          id +
          '", Total items: ' +
          currentState.items.length,
      );
      const index = id ? currentState.getIndex(id) : undefined;
      if (index == undefined && id)
        Logger.warn('openModal', 'No item with id: "' + id + '"');
      else {
        const item = index
          ? currentState.items[index]
          : currentState.items[currentState.items.length - 1];
        const prevId =
          currentState.openedId?.[currentState.openedId.length - 1];
        item.previousId = !data?.previousBehavior ? prevId : undefined;
        if (prevId && data?.previousBehavior == 'keepAndHide') {
          const prevItem = currentState.getItem(prevId);
          if (prevItem) prevItem.hidden = true;
        }
        if (prevId && data?.previousBehavior == 'close')
          currentState.close(prevId);
        if (item.node != undefined) {
          set((state) => ({
            openedId:
              data?.previousBehavior == 'keep' ||
              data?.previousBehavior == 'keepAndHide'
                ? [...currentState.openedId, item.id]
                : [item.id],
            _forceRerender: data?.force
              ? !state._forceRerender
              : state._forceRerender,
          }));
          return {
            close: () => currentState.close(item.id),
            hide: () => currentState.hide(item.id),
            id: item.id,
          };
        } else
          Logger.warn('openModal', `Modal "${id}" has not been initialized`);
      }
    }
    return {
      close: () => currentState.close(id),
      hide: () => currentState.hide(id),
      id,
    };
  },

  close: (id) => {
    const currentState = get();

    Logger.log('closeModal', 'Closing ' + (id ? id : 'the last Modal'));
    if (currentState.items.length === 0) {
      Logger.warn('closeModal', 'There are no items to close');
      if (currentState.openedId.length > 0) set(() => ({ openedId: [] }));
      return;
    }
    const index = id ? currentState.getIndex(id) : undefined;

    if (id && index == undefined)
      Logger.warn('closeModal', 'No item found with id "' + id + '"');
    else {
      set((state) => {
        const items = state.items;
        const item = items[index ?? items.length - 1];
        const openedId = [
          ...state.openedId.filter((i) => i != item.id),
          item.previousId,
        ].filter(Boolean) as string[];
        delete state.getItem(openedId[openedId.length - 1])?.hidden;
        return {
          items: items.filter((i) => i.id != item.id),
          openedId: [
            ...state.openedId.filter((i) => i != item.id),
            item.previousId,
          ].filter(Boolean) as string[],
        };
      });
    }
  },
  hide: (id) => {
    const currentState = get();

    Logger.log('hideModal', currentState.items.length);
    if (currentState.items.length === 0)
      Logger.warn('hideModal', 'There are no items to hide');
    else {
      const index = id ? currentState.getIndex(id) : undefined;
      if (id && index == undefined) {
        Logger.warn(`Item with id ${id} not found`);
      } else {
        const item = index
          ? currentState.items[index]
          : currentState.items[currentState.items.length - 1];

        set((state) => ({
          openedId: [
            ...state.openedId.filter((i) => i != item.id),
            item.previousId,
          ].filter(Boolean) as string[],
        }));
        return {
          close: () => currentState.close(item.id),
          open: () => currentState.open(item.id),
          id: item.id,
        };
      }
    }
    return {
      close: () => currentState.close(id),
      open: () => currentState.open(id),
      id,
    };
  },
  isOpen: (id) => {
    const currentState = get();

    const index = currentState.getIndex(id);
    if (index != undefined && currentState.openedId.includes(id)) return true;
    else return false;
  },
  clear: () => {
    const currentState = get();

    Logger.log('clearModal', 'Clearing ' + currentState.items.length);
    set(() => ({
      items: [],
      openedId: [],
    }));
  },
  asyncOpen: async (id, data) => {
    const res = await new Promise<ReturnType<ControlReturnVoids['open']>>(
      (resolve) => {
        setTimeout(() => {
          resolve(get().open(id, data));
        }, data?.time ?? 0);
      },
    );
    return {
      id: res.id,
      asyncClose: async (d) => get().asyncClose(id, d),
    };
  },
  asyncClose: (id, data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(get().close(id));
      }, data?.time ?? 0);
    });
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
    state.openedId
      ? (state.openedId
          .map((id) => state.getItem(id))
          .filter(Boolean) as ItemType[])
      : undefined,
  );
const modal = (
  node: ReactNode | ((props: ControlReturnVoids) => ReactNode),
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
modal.closeAsync = (id?: string, time?: number) =>
  useModalStore.getState().asyncClose(id, { time });
modal.hide = (id?: string) => useModalStore.getState().hide(id);
modal.clear = () => useModalStore.getState().clear();
export default modal;
export const useIsModalEmpty = () =>
  useModalStore(
    (state) => state.items.length == 0,
    (oldState, newState) => oldState == newState,
  );
