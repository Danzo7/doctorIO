import { appointmentQueueData } from '@api/fake';
import { AppointmentQueue } from '@models/instance.model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AppointmentQueue = appointmentQueueData;

const updateQueue = (appointmentQueueState: AppointmentQueue) => {
  appointmentQueueState.state = {
    state: 'waiting',
    position: appointmentQueueState.appointments[0].position,
    patientId: appointmentQueueState.appointments[0].patientId,
    patientName: appointmentQueueState.appointments[0].patientName,
    date: appointmentQueueState.appointments[0].date,
    diagnosis: appointmentQueueState.appointments[0].diagnosis,
  };
};

const appointmentQueueSlice = createSlice({
  name: 'appointmentQueue',
  initialState: initialState,
  reducers: {
    clearAppointmentQueue: (appointmentQueueState: AppointmentQueue) => {
      /* this is just for testing */
      appointmentQueueState.appointments = [];
      appointmentQueueState.state = 'empty';
    },
    pauseAppointmentQueue: (state: AppointmentQueue) => {
      state.state = 'paused';
    },
    resumeAppointmentQueue: (appointmentQueueState: AppointmentQueue) => {
      if (appointmentQueueState.appointments.length > 0)
        updateQueue(appointmentQueueState);
      else appointmentQueueState.state = 'empty';
    },
    removePatientFromQueueByID: (
      state: AppointmentQueue,
      action: PayloadAction<number>,
    ) => {
      if (state.appointments[0].patientId == action.payload) {
        state.appointments.splice(0, 1);
        if (state.appointments.length > 0) updateQueue(state);
        else state.state = 'empty';
      } else
        state.appointments = state.appointments.filter(
          (app) => app.patientId != action.payload,
        );
    },
    dequeuePatient: (appointmentQueueState: AppointmentQueue) => {
      appointmentQueueState.appointments.shift();
      if (appointmentQueueState.appointments.length > 0)
        updateQueue(appointmentQueueState);
      else appointmentQueueState.state = 'empty';
    },
    startSession: (appointmentQueueState: AppointmentQueue) => {
      if (typeof appointmentQueueState.state != 'string') {
        const info = appointmentQueueState.state;
        appointmentQueueState.state = {
          ...info,
          state: 'inProgress',
        };
      }
    },
  },
});

export const {
  clearAppointmentQueue,
  pauseAppointmentQueue,
  resumeAppointmentQueue,
  removePatientFromQueueByID,
  dequeuePatient,
  startSession,
} = appointmentQueueSlice.actions;

export default appointmentQueueSlice.reducer;
