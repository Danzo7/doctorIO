import { Drug, Session } from '@models/instance.model';
import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

interface SessionType {
  sessionInfo: Session;
  sessionParameter: {
    bookAppointment: { isAllowed: boolean; date: Date };
    payment: { isAllowed: boolean; value: number; handPayment: boolean };
  };
}

const initialState: SessionType = {
  sessionInfo: { diagnosis: '', prescription: [] },
  sessionParameter: {
    bookAppointment: { isAllowed: true, date: new Date() },
    payment: { value: 0, handPayment: false, isAllowed: true },
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
    setBookAppointmentValue: (
      state: SessionType,
      action: PayloadAction<Date>,
    ) => {
      if (state.sessionParameter.bookAppointment.isAllowed)
        state.sessionParameter.bookAppointment.date = action.payload;
    },
    updateBookAppointmentPermission: (state: SessionType) => {
      state.sessionParameter.bookAppointment.isAllowed =
        !state.sessionParameter.bookAppointment.isAllowed;
    },
    updatePaymentOptionPermission: (state: SessionType) => {
      state.sessionParameter.payment.isAllowed =
        !state.sessionParameter.payment.isAllowed;
    },
    updatePaymentValue: (
      state: SessionType,
      action: PayloadAction<{ value: 0; handPayment: false; isAllowed: true }>,
    ) => {
      if (state.sessionParameter.payment.isAllowed)
        state.sessionParameter.payment = action.payload;
    },
    updateHandPaymentOption: (state: SessionType) => {
      if (state.sessionParameter.payment.isAllowed)
        state.sessionParameter.payment.handPayment =
          !state.sessionParameter.payment.handPayment;
    },
  },
});
export const {
  updateNotice,
  addDrug,
  clearPrescription,
  updatePrescription,
  resetSession,
  setBookAppointmentValue,
  updateBookAppointmentPermission,
  updatePaymentValue,
  updateHandPaymentOption,
  updatePaymentOptionPermission,
} = sessionSlice.actions;

export default sessionSlice;
