import { VitalField } from '@models/local.models';
import create from 'zustand';
import { persist } from 'zustand/middleware';

interface VitalFieldsState {
  vitalFields: VitalField[];
  switchField: (field: VitalField) => void;
  isActive: (name: string) => boolean;
  syncFields: (fields: VitalField[]) => void;
}
export const useVitalFieldsStore = create<VitalFieldsState>()(
  persist(
    (set, get) => ({
      vitalFields: [],
      switchField(field: VitalField) {
        if (get().isActive(field.name)) {
          set({
            vitalFields: get().vitalFields.filter((f) => f.name !== field.name),
          });
        } else {
          const fields = get().vitalFields;
          fields.push(field);
          set({ vitalFields: fields });
        }
      },
      isActive(name: string) {
        const fields = get().vitalFields;
        return fields.some((field) => field.name === name);
      },
      syncFields(fields: VitalField[]) {
        set((state) => ({
          vitalFields: state.vitalFields.filter((f) =>
            fields.some((field) => field.name === f.name && !field.deleted),
          ),
        }));
      },
    }),

    {
      name: 'VitalFieldsStore', // unique name
    },
  ),
);
