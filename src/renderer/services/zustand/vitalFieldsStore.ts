import { Logger } from '@libs/Logger';
import { VitalField } from '@models/local.models';
import create from 'zustand';
import { persist } from 'zustand/middleware';

interface VitalFieldsState {
  vitalFields: VitalField[];
  getActiveFields: () => VitalField[];
  activateField: (name: string) => void;
  deactivateField: (name: string) => void;
  switchField: (name: string) => void;
}
export const useVitalFieldsStore = create<VitalFieldsState>()(
  persist(
    (set, get) => ({
      vitalFields: [
        { name: 'weight', unit: 'kg', display: true },
        { name: 'height', unit: 'cm', display: true },
        { name: 'bloodPressure', unit: 'mmHg', display: true },
        { name: 'bloodSugar', unit: 'mg/dL', display: true },
        { name: 'temperature', unit: '°C' },
        { name: 'heartRate', unit: 'bpm' },
        { name: 'respiratoryRate', unit: 'bpm' },
        { name: 'oxygenSaturation', unit: '%' },
        { name: 'pain', unit: 'out of 10' },
      ],
      getActiveFields() {
        return get().vitalFields.filter((field) => field.display);
      },
      activateField(name: string) {
        const fields = get().vitalFields;
        const index = fields.findIndex((field) => field.name === name);
        if (!index) Logger.error('vitalStore', 'Field not found');
        if (!fields[index].display) {
          fields[index].display = true;
          set({ vitalFields: fields });
        }
      },
      deactivateField(name: string) {
        const fields = get().vitalFields;
        const index = fields.findIndex((field) => field.name === name);
        if (!index) Logger.error('vitalStore', 'Field not found');
        if (fields[index].display) {
          fields[index].display = undefined;
          set({ vitalFields: fields });
        }
      },
      switchField(name: string) {
        const fields = get().vitalFields;
        const index = fields.findIndex((field) => field.name === name);
        if (!index) Logger.error('vitalStore', 'Field not found');
        fields[index].display = !fields[index].display;
        set({ vitalFields: fields });
      },
    }),

    {
      name: 'VitalFieldsStore', // unique name
    },
  ),
);
