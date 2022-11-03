import { Drug, Session } from '@models/instance.model';
import { nanoid } from '@reduxjs/toolkit';
import create from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface MedicalSessionStore {
  session: Session;
  sessionParameter: {
    booked?: Date;
    payment?: { value: number; isHandPayment: boolean };
  };
  setDiagnosis(text: string): void;
  addDrug(drug: Omit<Drug, 'id'>): void;
  //   removeDrug(id: number): void;

  updateDrug(id: string, drug: Omit<Drug, 'id'>): void;
  setParameter(props: {
    payment?: { value: number; isHandPayment: boolean };
    booked?: Date;
  }): void;
}

export const useMedicalSessionStore = create<MedicalSessionStore>()(
  immer((set) => ({
    sessionParameter: {},
    session: { prescription: [] },
    setDiagnosis: (text) =>
      set((state) => {
        state.session.diagnosis = text;
      }),
    addDrug: (drug) =>
      set((state) => {
        state.session.prescription.push({ id: nanoid(), ...drug });
      }),
    updateDrug: (id, drug) =>
      set((state) => {
        const targetedIndex = state.session.prescription.findIndex(
          ({ id: pId }) => id === pId,
        );

        state.session.prescription[targetedIndex] = {
          id: state.session.prescription[targetedIndex].id,
          ...drug,
        };
      }),
    setParameter: (props) =>
      set((state) => {
        state.sessionParameter = { ...state.sessionParameter, ...props };
      }),
  })),
);
export const usePrescription = () =>
  useMedicalSessionStore((state) => state.session.prescription);
export const useDiagnosis = () =>
  useMedicalSessionStore((state) => state.session.diagnosis);
