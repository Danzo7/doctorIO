import { Socket } from 'socket.io-client';
import create from 'zustand';

interface SocketState {
  socket: Socket | undefined;
  set: (socket: Socket) => void;
}

export const useSocketStore = create<SocketState>((set) => ({
  socket: undefined,
  set: (socket) => set(() => ({ socket })),
}));
export const useSocket = () => useSocketStore((state) => state.socket);
