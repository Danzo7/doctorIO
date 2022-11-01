import { refreshTokens } from '@redux/dynamic_queries';
import store from '@store';
import { io, Socket } from 'socket.io-client';
import create from 'zustand';
import { useAuthStore } from './authStore';
import { useClinicsStore } from './clinicsStore';

interface SocketState {
  socket?: Socket;
  url?: string;
  status?:
    | 'connected'
    | 'connecting'
    | 'unreachable'
    | 'disconnected'
    | 'stopped';
  connect: () => void;
  reAuthorize: () => void;
  stop: () => void;
  disconnect: () => void;
  reconnect: () => void;
  unreachable: () => void;
  connected: () => void;
  reconnecting: () => void;
  pseudoConnect: (url: string) => void;
  getUrl: () => string;
}

export const useConnectionStore = create<SocketState>()((set, get) => ({
  connect() {
    set((state) => {
      if (
        !useClinicsStore.getState().hasSelectedClinic ||
        !useAuthStore.getState().accessToken
      ) {
        useClinicsStore.getState().setSelectedClinic();
        store.dispatch({ type: 'REST' });
        state.socket?.disconnect().close();
        return { status: 'disconnected' };
      }
      if (state.status == undefined || state.status == 'stopped') {
        const url = useClinicsStore
          .getState()
          .getSelectedClinic().serverLocation;
        const socket = io(`ws://${url}/ws`, {
          auth: {
            token: useAuthStore.getState().accessToken,
          },
        });
        socket.on('connected', () => {
          console.log('connected');
          useConnectionStore.getState().connected();
        });
        socket.on('disconnect', () => {
          console.log('disconnect');
          useConnectionStore.getState().reconnecting();
        });
        socket.on('reconnect', () => {
          console.log('reconnect');
          useConnectionStore.getState().connected();
        });

        socket.io.on('reconnect_attempt', (attempt) => {
          if (attempt > 3) {
            useConnectionStore.getState().unreachable();
          }

          console.log('reconnect_attempt');
        });

        socket.on('error', async (data) => {
          if (data?.status == 401) {
            const refreshed = await refreshTokens();
            if (refreshed) useConnectionStore.getState().reAuthorize();
          }
        });

        return { url, socket, status: 'connecting' };
      } else return state;
    });
  },
  reAuthorize: () => {
    set((state) => {
      if (state.socket) {
        state.socket.auth = { token: useAuthStore.getState().accessToken };
        state.socket.connect();
        return { ...state, status: 'connecting' };
      } else return { status: 'disconnected' };
    });
  },
  stop: () => {
    set((state) => {
      state.socket?.disconnect();
      return { ...state, status: 'stopped' };
    });
  },
  reconnect() {
    if (get().status != 'stopped') get().stop();
    get().connect();
  },

  disconnect: () => {
    set((state) => {
      useClinicsStore.getState().setSelectedClinic();
      store.dispatch({ type: 'REST' });
      state.socket?.removeAllListeners();
      state.socket?.disconnect().close();
      return { status: 'disconnected' };
    });
  },
  connected: () => {
    set((state) => ({ ...state, status: 'connected' }));
  },
  reconnecting: () => {
    set((state) => {
      return { ...state, status: 'connecting' };
    });
  },
  unreachable: () => {
    set((state) => {
      return { ...state, status: 'unreachable' };
    });
  },

  pseudoConnect: (url) => {
    set(() => ({ url }));
  },
  getUrl() {
    if (get().url) return 'http://' + get().url;
    else throw new Error('No url');
  },
}));
export const useSocket = () => useConnectionStore((state) => state.socket);
