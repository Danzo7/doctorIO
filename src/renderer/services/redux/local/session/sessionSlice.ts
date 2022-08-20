import { Drug, Session } from '@models/instance.model';
import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

const initialState: Session = { diagnosis: '', prescription: [] };
const sessionSlice = createSlice({
  name: 'session',
  initialState: initialState,
  reducers: {
    updateNotice: (state: Session, action: PayloadAction<string>) => {
      state.diagnosis = action.payload;
    },
    clearPrescription: (state: Session) => {
      state.prescription = [];
    },
    resetSession: (state: Session) => {
      state.diagnosis = '';
      state.prescription = [];
    },
    addDrug: (state: Session, action: PayloadAction<Omit<Drug, 'id'>>) => {
      state.prescription.push({ id: nanoid(), ...action.payload });
    },
    updatePrescription: (
      state: Session,
      action: PayloadAction<{ index: number; drug: Omit<Drug, 'id'> }>,
    ) => {
      state.prescription[action.payload.index] = {
        id: state.prescription[action.payload.index].id,
        ...action.payload.drug,
      };
    },
  },
});
export const {
  updateNotice,
  addDrug,
  clearPrescription,
  updatePrescription,
  resetSession,
} = sessionSlice.actions;

export default sessionSlice;
