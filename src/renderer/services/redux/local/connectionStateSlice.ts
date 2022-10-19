import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { useSocketStore } from '@stores/socketStore';
import { setSelectedServer } from './user/userSlice';
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
  Promise.resolve(dispatch(setSelectedServer())).then(() => {
    dispatch(connectionStateSlice.actions.disconnect());
    dispatch({ type: 'REST' });
  });
};
export const connect = (dispatch: Dispatch, selectedIndex: number) => {
  Promise.resolve(dispatch(setSelectedServer(selectedIndex))).then(() => {
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
