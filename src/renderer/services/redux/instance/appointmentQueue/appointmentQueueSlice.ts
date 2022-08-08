import { appointmentQueueData } from '@api/fake';
import { AppointmentQueue, AppointmentQueueItem } from '@models/instance.model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AppointmentQueue = appointmentQueueData;

const updateQueue = (appointmentQueueState: AppointmentQueue) => {
  appointmentQueueState.state = 'WAITING';
  appointmentQueueState.selected = {
    position: appointmentQueueState.appointments[0].position,
    patientId: appointmentQueueState.appointments[0].patientId,
    patientName: appointmentQueueState.appointments[0].patientName,
    date: appointmentQueueState.appointments[0].date,
    test: appointmentQueueState.appointments[0].test,
  };
};

const appointmentQueueSlice = createSlice({
  name: 'appointmentQueue',
  initialState: initialState,
  reducers: {
    clearAppointmentQueue: (appointmentQueueState: AppointmentQueue) => {
      /* this is just for testing */
      appointmentQueueState.appointments = [];
      appointmentQueueState.state = 'IDLE';
      appointmentQueueState.selected = undefined;
    },
    pauseAppointmentQueue: (state: AppointmentQueue) => {
      state.state = 'PAUSED';
    },
    resumeAppointmentQueue: (appointmentQueueState: AppointmentQueue) => {
      if (appointmentQueueState.appointments.length > 0)
        updateQueue(appointmentQueueState);
      else {
        appointmentQueueState.state = 'IDLE';
        appointmentQueueState.selected = undefined;
      }
    },
    removePatientFromQueueByID: (
      state: AppointmentQueue,
      action: PayloadAction<number>,
    ) => {
      if (state.appointments[0].patientId == action.payload) {
        state.appointments.splice(0, 1);
        if (state.appointments.length > 0) updateQueue(state);
        else {
          state.state = 'IDLE';
          state.selected = undefined;
        }
      } else {
        state.appointments = state.appointments.filter(
          (app) => app.patientId != action.payload,
        );
        updateQueue(state);
      }
    },

    startSession: (
      appointmentQueueState: AppointmentQueue,
      action: PayloadAction<number>,
    ) => {
      appointmentQueueState.state = 'IN_PROGRESS';
      appointmentQueueState.selected = appointmentQueueState.appointments.find(
        (app) => app.position == action.payload,
      );
    },
    addToQueue: (
      appointmentQueueState: AppointmentQueue,
      action: PayloadAction<AppointmentQueueItem>,
    ) => {
      appointmentQueueState.appointments.push(action.payload);
    },
  },
});

export const {
  clearAppointmentQueue,
  pauseAppointmentQueue,
  resumeAppointmentQueue,
  removePatientFromQueueByID,
  startSession,
  addToQueue,
} = appointmentQueueSlice.actions;

export default appointmentQueueSlice.reducer;
