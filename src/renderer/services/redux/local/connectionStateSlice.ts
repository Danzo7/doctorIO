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
  Promise.resolve(dispatch(connectionStateSlice.actions.disconnect())).then(
    () => {
      dispatch(setSelectedServer(0));
    },
  );
};
export const connect = (dispatch: Dispatch) => {
  Promise.resolve(dispatch(connectionStateSlice.actions.connect())).then(() => {
    dispatch(setSelectedServer(1));
  });
};

export const { refresh, connected, unreachable } = connectionStateSlice.actions;
export default connectionStateSlice;
