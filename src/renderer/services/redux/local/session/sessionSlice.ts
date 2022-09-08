import { Drug, Session } from '@models/instance.model';
import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

interface SessionType {
  sessionInfo: Session;
  sessionParameter: {
    bookAppointment: Date | undefined;
    payment: { value?: number; handPayment?: boolean };
  };
}

const initialState: SessionType = {
  sessionInfo: { diagnosis: '', prescription: [] },
  sessionParameter: {
    payment: { value: undefined, handPayment: false },
    bookAppointment: undefined,
  },
};
const sessionSlice = createSlice({
  name: 'session',
  initialState: initialState,
  reducers: {
    updateNotice: (state: SessionType, action: PayloadAction<string>) => {
      state.sessionInfo.diagnosis = action.payload;
    },
    clearPrescription: (state: SessionType) => {
      state.sessionInfo.prescription = [];
    },
    resetSession: (state: SessionType) => {
      state.sessionInfo.diagnosis = '';
      state.sessionInfo.prescription = [];
    },
    addDrug: (state: SessionType, action: PayloadAction<Omit<Drug, 'id'>>) => {
      state.sessionInfo.prescription.push({ id: nanoid(), ...action.payload });
    },
    updatePrescription: (
      state: SessionType,
      action: PayloadAction<{ index: number; drug: Omit<Drug, 'id'> }>,
    ) => {
      state.sessionInfo.prescription[action.payload.index] = {
        id: state.sessionInfo.prescription[action.payload.index].id,
        ...action.payload.drug,
      };
    },

    updateParameter: (
      state: SessionType,
      action: PayloadAction<{
        payment?: number;
        handPayment?: boolean;
        booked?: Date;
      }>,
    ) => {
      state.sessionParameter.payment.value = action.payload.payment;
      state.sessionParameter.payment.handPayment = action.payload.handPayment;
      state.sessionParameter.bookAppointment = action.payload.booked;
    },
  },
});
export const {
  updateNotice,
  addDrug,
  clearPrescription,
  updatePrescription,
  resetSession,
  updateParameter,
} = sessionSlice.actions;

export default sessionSlice;
