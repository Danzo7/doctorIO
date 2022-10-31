import { refreshTokens } from '@redux/dynamic_queries';
import store from '@store';
import { io, Socket } from 'socket.io-client';
import create from 'zustand';
import { useAuthStore } from './authStore';
import { useClinicsStore } from './clinicsStore';

interface SocketState {
  socket?: Socket;
  url?: string;
  status?: 'connected' | 'connecting' | 'unreachable' | 'disconnected'; //TODO add "reconnecting","reauthenticate"
  connect: () => void;
  disconnect: () => void;
  unreachable: () => void;
  connected: () => void;
  reconnect: () => void;
  pseudoConnect: (url: string) => void;
  getUrl: () => string;
}

export const useConnectionStore = create<SocketState>()((set) => ({
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
      if (state.status == undefined) {
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
          useConnectionStore.getState().unreachable();
        });
        socket.on('reconnect', () => {
          console.log('reconnect');

          useConnectionStore.getState().connected();
        });
        socket.on('error', async (data) => {
          if (data?.status == 401) {
            const refreshed = await refreshTokens();
            if (refreshed) useConnectionStore.getState().reconnect();
          }
        });

        return { url, socket, status: 'connecting' };
      } else return state;
    });
  },
  reconnect: () => {
    set((state) => {
      if (state.socket) {
        state.socket.auth = { token: useAuthStore.getState().accessToken };
        state.socket.connect();
        return { ...state, status: 'connecting' };
      } else return { status: 'disconnected' };
    });
  },
  disconnect: () => {
    set((state) => {
      useClinicsStore.getState().setSelectedClinic();
      store.dispatch({ type: 'REST' });
      state.socket?.disconnect().close();
      return { status: 'disconnected' };
    });
  },
  connected: () => {
    set((state) => ({ ...state, status: 'connected' }));
  },
  unreachable: () => {
    set((state) => ({ ...state, status: 'unreachable' }));
  },
  pseudoConnect: (url) => {
    set(() => ({ url }));
  },
  getUrl() {
    if (this.url) return 'http://' + this.url;
    else throw new Error('No url');
  },
}));
export const useSocket = () => useConnectionStore((state) => state.socket);
