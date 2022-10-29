import { AppClinics, LocalClinicData } from '@models/local.models';
import create from 'zustand';
import { persist } from 'zustand/middleware';

interface ClinicsState {
  clinicData: AppClinics;
  test?: string;
  setSelectedClinic(index?: number): void;
  addNewClinic(name: string, serverLocation: string, memberId: number): void;
  setCurrentLocation(ip: string): void;
  hasSelectedClinic(): boolean;
  getSelectedClinic(): LocalClinicData;
  getSelectedIndex(): number | undefined;
  getClinics(): LocalClinicData[];
}
export const useClinicsStore = create<ClinicsState>()(
  persist(
    (set) => ({
      clinicData: new AppClinics(),
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
        return this.clinicData.selected != undefined;
      },
      getSelectedClinic() {
        return this.clinicData.clinic;
      },
      getClinics() {
        return this.clinicData.clinics;
      },
      getSelectedIndex() {
        return this.clinicData.selected;
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
