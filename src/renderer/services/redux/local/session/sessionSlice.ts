import { Drug, Session } from '@models/instance.model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Session = { notice: '', prescription: [] };
const sessionSlice = createSlice({
  name: 'session',
  initialState: initialState,
  reducers: {
    updateNotice: (state: Session, action: PayloadAction<string>) => {
      state.notice = action.payload;
    },
    clearPrescription: (state: Session) => {
      state.prescription = [];
    },
    addDrug: (state: Session, action: PayloadAction<Drug>) => {
      state.prescription.push(action.payload);
    },
    updatePrescription: (
      state: Session,
      action: PayloadAction<{ index: number; drug: Drug }>,
    ) => {
      state.prescription[action.payload.index] = action.payload.drug;
    },
  },
});
export const { updateNotice, addDrug, clearPrescription, updatePrescription } =
  sessionSlice.actions;

export default sessionSlice;
