import { MemberQueue } from '@models/server.models';
import create from 'zustand';
import { persist } from 'zustand/middleware';

interface QueueSelectionState {
  queues: MemberQueue[];
  selectedQueue: number;
  setSelectedQueue: (index: number) => void;
  getSelectedQueue: () => MemberQueue;
  getQueueByRoleId: (roleId: number) => MemberQueue | undefined;
  setQueues: (queues: MemberQueue[]) => void;
}

export const useQueueSelectionStore = create<QueueSelectionState>()(
  persist(
    (set, get) => ({
      queues: [],
      selectedQueue: 0,
      setSelectedQueue: (index: number) => set({ selectedQueue: index }),
      getSelectedQueue: () => {
        return get().queues[get().selectedQueue];
      },
      setQueues: (queues: MemberQueue[]) => {
        set((state) => {
          if (state.queues.length === 0) {
            return {
              queues,
              selectedQueue:
                queues.length - 1 >= state.selectedQueue
                  ? state.selectedQueue
                  : 0,
            };
          }
          const currentId = state.queues[state.selectedQueue]?.id;
          const index = currentId
            ? queues.findIndex((queue) => queue.id === currentId)
            : 0;
          return {
            queues,
            selectedQueue: index === -1 ? 0 : index,
          };
        });
      },
      getQueueByRoleId: (roleId: number) => {
        return get().queues.find((queue) => queue.roleId === roleId);
      },
    }),
    {
      name: 'QueueSelection',
      partialize(state) {
        return {
          selectedQueue: state.selectedQueue,
        };
      },
      serialize(state) {
        return JSON.stringify(state);
      },
    },
  ),
);
export const useSelectedQueue = () => useQueueSelectionStore().selectedQueue;
