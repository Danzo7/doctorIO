import { MemberQueue } from '@models/server.models';
import create from 'zustand';

interface QueueSelectionState {
  queues: MemberQueue[];
  selectedQueue: number;
  setSelectedQueue: (index: number) => void;
  getSelectedQueue: () => MemberQueue;
  getQueueByRoleId: (roleId: number) => MemberQueue | undefined;
  setQueues: (queues: MemberQueue[]) => void;
}

export const useQueueSelectionStore = create<QueueSelectionState>(
  (set, get) => ({
    queues: [],
    selectedQueue: 0,
    setSelectedQueue: (index: number) => set({ selectedQueue: index }),
    getSelectedQueue: () => {
      return get().queues[get().selectedQueue];
    },
    setQueues: (queues: MemberQueue[]) => set({ queues }),
    getQueueByRoleId: (roleId: number) => {
      return get().queues.find((queue) => queue.roleId === roleId);
    },
  }),
);
