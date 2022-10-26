import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { useClinicsStore } from '@stores/clinicsStore';
import { useSocketStore } from '@stores/socketStore';
//REFACTOR ZUSTAND

const initialState: {
  state:
    | 'connected'
    | 'connecting'
    | 'unreachable'
    | 'reconnecting'
    | 'disconnected'
    | undefined;
} = {
  state: undefined,
};

const connectionStateSlice = createSlice({
  name: 'connectionState',
  initialState: initialState,
  reducers: {
    disconnect: (state) => {
      state.state = 'disconnected';
    },
    refresh: (state) => {
      state.state = 'reconnecting';
      if (!useSocketStore.getState()?.socket?.active) {
        useSocketStore.getState().socket?.connect();
      }
    },
    connect: (state) => {
      state.state = 'connecting';
    },
    connected: (state) => {
      state.state = 'connected';
    },
    unreachable: (state) => {
      state.state = 'unreachable';
    },
  },
});

export const disconnect = (dispatch: Dispatch) => {
  Promise.resolve(useClinicsStore.getState().setSelectedClinic()).then(() => {
    dispatch(connectionStateSlice.actions.disconnect());
    dispatch({ type: 'REST' });
  });
};
export const connect = (dispatch: Dispatch, selectedIndex: number) => {
  Promise.resolve(
    useClinicsStore.getState().setSelectedClinic(selectedIndex),
  ).then(() => {
    dispatch(connectionStateSlice.actions.connect());
  });
};

export const {
  refresh,
  connected,
  unreachable,
  connect: connecting,
} = connectionStateSlice.actions;
export default connectionStateSlice;
