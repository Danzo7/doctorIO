import { User } from '@models/local.models';
import { store } from '@redux/store';
import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { setSelectedServer } from './user/userSlice';

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

export const { refresh, connected, unreachable } = connectionStateSlice.actions;
export default connectionStateSlice;
