import { AppClinics, LocalClinicData } from '@models/local.models';
import { Clinic } from '@models/server.models';
import create from 'zustand';
import { persist } from 'zustand/middleware';

interface ClinicsState {
  clinicData: AppClinics;
  test?: string;
  setSelectedClinic(index?: number): void;
  addNewClinic(name: string, serverLocation: string, memberId: number): void;
  setCurrentLocation(ip: string): void;
  setLocation(index: number, ip: string): void;
  hasSelectedClinic(): boolean;
  getSelectedClinic(): LocalClinicData;
  getSelectedIndex(): number | undefined;
  getClinics(): LocalClinicData[];
  getClinic(index: number): LocalClinicData;
  syncCurrentClinic(clinic: Clinic): void;
}
export const useClinicsStore = create<ClinicsState>()(
  persist(
    (set, get) => ({
      clinicData: new AppClinics(),
      getClinic(index: number) {
        return get().clinicData.getClinic(index);
      },
      setLocation(index, ip) {
        set((state) => {
          const clinicData = new AppClinics(state.clinicData);
          clinicData.setLocation(index, ip);
          return { clinicData };
        });
      },
      setCurrentLocation: (ip: string) => {
        set((state) => {
          const clinicData = new AppClinics(state.clinicData);
          clinicData.setCurrentLocation(ip);
          return { clinicData };
        });
      },

      setSelectedClinic(index) {
        set((state) => {
          const clinicData = new AppClinics(state.clinicData);
          clinicData.setSelected(index);
          return { clinicData };
        });
      },
      addNewClinic(name, serverLocation, memberId) {
        set((state) => {
          const clinicData = new AppClinics(state.clinicData);
          clinicData.add = { name, serverLocation, memberId };
          return { clinicData };
        });
      },
      hasSelectedClinic() {
        return get().clinicData.selected != undefined;
      },
      getSelectedClinic() {
        return get().clinicData.clinic;
      },
      getClinics() {
        return get().clinicData.clinics;
      },
      getSelectedIndex() {
        return get().clinicData.selected;
      },
      syncCurrentClinic(clinic) {
        set((state) => {
          const clinicData = new AppClinics(state.clinicData);
          clinicData.syncCurrent(clinic);
          return { clinicData };
        });
      },
    }),

    {
      name: 'ClinicsStore', // unique name

      deserialize(str) {
        const state = JSON.parse(str);
        if (state.state == undefined || state.version == undefined)
          throw new Error('invalid data');
        state.state.clinicData = new AppClinics(state.state.clinicData);
        return state;
      },
    },
  ),
);

export const useSelectedClinicCheck = () =>
  useClinicsStore((state) => state.hasSelectedClinic());
export const useSelectedClinic = () =>
  useClinicsStore((state) => state.clinicData.clinic);
