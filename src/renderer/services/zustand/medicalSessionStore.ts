import { Drug, MedicalCertificate, Session } from '@models/instance.model';
import { nanoid } from '@reduxjs/toolkit';
import create from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface MedicalSessionStore {
  session: Required<Session>;
  sessionParameter: {
    booked?: Date;
    payment?: { value: number; isHandPayment: boolean };
  };
  setDiagnosis(text: string): void;
  addDrug(drug: Omit<Drug, 'id'>): void;
  //   removeDrug(id: number): void;

  updateDrug(id: string, drug: Omit<Drug, 'id'>): void;
  removeDrug(id: string): void;
  setParameter(props: {
    payment?: { value: number; isHandPayment: boolean };
    booked?: Date;
  }): void;
  clear(): void;
  addCertificate(drug: Omit<MedicalCertificate, 'id'>): void;
  updateCertificate(id: string, drug: Omit<MedicalCertificate, 'id'>): void;
  removeCertificate(id: string): void;
}

export const useMedicalSessionStore = create<MedicalSessionStore>()(
  immer((set) => ({
    sessionParameter: {},
    session: { diagnosis: '', prescription: [], certificates: [] },
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
    removeDrug: (id) =>
      set((state) => {
        state.session.prescription = state.session.prescription.filter(
          ({ id: pId }) => id !== pId,
        );
      }),
    updateCertificate: (id, certificate) =>
      set((state) => {
        const targetedIndex = state.session.certificates.findIndex(
          ({ id: cId }) => id === cId,
        );

        state.session.certificates[targetedIndex] = {
          id: state.session.certificates[targetedIndex].id,
          ...certificate,
        };
      }),
    removeCertificate: (id) =>
      set((state) => {
        state.session.certificates = state.session.certificates.filter(
          ({ id: cId }) => id !== cId,
        );
      }),
    addCertificate: (certificate) =>
      set((state) => {
        state.session.certificates.push({ id: nanoid(), ...certificate });
      }),

    setParameter: (props) =>
      set((state) => {
        state.sessionParameter = { ...state.sessionParameter, ...props };
      }),
    clear: () =>
      set(() => ({ sessionParameter: {}, session: { prescription: [] } })),
  })),
);
export const usePrescription = () =>
  useMedicalSessionStore((state) => state.session.prescription);
export const useDiagnosis = () =>
  useMedicalSessionStore((state) => state.session.diagnosis);
