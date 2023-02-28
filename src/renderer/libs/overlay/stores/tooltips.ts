import Tooltip, { ActionProps } from '@components/poppers/tooltip';
import { Logger } from '@libs/Logger';
import { OverlayItem, OverlayOptions } from '@libs/overlay';
import { nanoid } from '@reduxjs/toolkit';
import { ReactNode } from 'react';
import create from 'zustand';

type ItemType = {
  node?: ReactNode;
  id: string;
};

type ControlReturnVoids = {
  open: (data?: OpenOptions) => Pick<ControlReturnVoids, 'close' | 'id'>;
  close: () => void;
  id?: string;
};
type Target =
  | { node: ReactNode; props?: OverlayOptions }
  | ((props: ControlReturnVoids) => {
      node: ReactNode;
      props?: OverlayOptions;
    });

type OpenOptions = {
  keepPrevious?: boolean;
  force?: boolean;
  closeAll?: boolean;
};
interface TooltipOverlayState {
  items: ItemType[];
  _forceRerender: boolean;
  init: (target?: Target, id?: string) => ControlReturnVoids;
  open: (
    id?: string,
    options?: OpenOptions,
  ) => ReturnType<ControlReturnVoids['open']>;
  close: (id?: string) => void;
  getNode: (id: string) => ReactNode | undefined;
  getIndex: (id: string) => number | undefined;
  isOpen: (id: string) => boolean;
  clear: () => void;
}

const useTooltipStore = create<TooltipOverlayState>((set, get) => ({
  items: [],
  tooltips: [],
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
  init: (target, idd) => {
    Logger.log('InitTooltip', 'Total items: ' + get().items.length);
    let id: string;
    if (idd && get().getIndex(idd) !== undefined && !target) {
      id = idd;
      Logger.log('InitTooltip', 'Item already exists');
    } else {
      id = idd ?? nanoid();
      const plainTarget =
        typeof target === 'function'
          ? target({
              close: () => get().close(id),
              open: (data) => get().open(id, data),
              id,
            })
          : target;
      const item: ItemType = {
        node: plainTarget
          ? OverlayItem({
              children: plainTarget.node,
              closeMethod: () => get().close(id),
              type: 'tooltip',
              ...plainTarget.props,
            })
          : undefined,
        id,
      };

      set((state) => {
        if (state.items.length > 16) {
          Logger.warn(
            'initTooltip',
            'Tooltip limit reached. an item will be removed',
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
      id,
    };
  },
  open: (id, data) => {
    const currentState = get();
    if (currentState.items.length === 0)
      Logger.warn('openTooltip', "No items in Tooltip, can't open");
    else {
      Logger.log(
        'OpenTooltip',
        'OpenTooltip  with id: "' +
          id +
          '", Total items: ' +
          currentState.items.length,
      );
      const index = id ? currentState.getIndex(id) : undefined;
      if (index == undefined && id)
        Logger.warn('openTooltip', 'No item with id: "' + id + '"');
      else {
        const item = index
          ? currentState.items[index]
          : currentState.items[currentState.items.length - 1];
        if (item.node != undefined) {
          set((state) => ({
            items: data?.closeAll
              ? [item]
              : data?.keepPrevious
              ? [...state.items]
              : [...state.items.slice(0, -2), item],
            _forceRerender: data?.force
              ? !state._forceRerender
              : state._forceRerender,
          }));
          return {
            close: () => get().close(item.id),
            id: item.id,
          };
        } else
          Logger.warn(
            'openTooltip',
            `Tooltip "${id}" has not been initialized`,
          );
      }
    }
    return {
      close: () => get().close(id),
      id,
    };
  },

  close: () => {
    Logger.log('closeTooltip', 'Closing ' + 'the last Tooltip');
    if (get().items.length === 0) {
      Logger.warn('closeTooltip', 'There are no items to close');
      return;
    }

    set((state) => {
      return {
        items: [...state.items.slice(0, -1)],
      };
    });
  },

  isOpen: (id) => {
    const index = get().getIndex(id);
    if (index != undefined) return true;
    else return false;
  },
  clear: () => {
    Logger.log('clearTooltip', get().items.length);
    set(() => ({
      items: [],
    }));
  },
}));

export const useTooltipItems = () => useTooltipStore((state) => state.items);

const tooltip = (
  target:
    | ActionProps[]
    | ReactNode
    | ((props: ControlReturnVoids) => ActionProps[] | ReactNode),
  popperTarget: HTMLElement,
  options?: OverlayOptions & { autoClose?: true },
  id?: string,
) =>
  useTooltipStore.getState().init(({ close, open, id: iid }) => {
    const node =
      typeof target == 'function' ? target({ close, open, id: iid }) : target;
    const autoClose = options?.autoClose;
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
  }, id);
tooltip.close = (id?: string) => useTooltipStore.getState().close(id);
tooltip.clear = () => useTooltipStore.getState().clear();
export default tooltip;
export const useIsTooltipEmpty = () =>
  useTooltipStore(
    (state) => state.items.length == 0,
    (oldState, newState) => oldState == newState,
  );
