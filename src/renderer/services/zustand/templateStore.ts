import { Element } from 'slate';
import create from 'zustand';
import { persist } from 'zustand/middleware';

interface TemplateState {
  desendants: Element[];
  setDesendants: (desendants: Element[]) => void;
}

export const useTemplateStore = create<TemplateState>()(
  persist(
    (set) => ({
      desendants: [
        { type: 'p', children: [{ text: '' }] },
        { type: 'dynamic', children: [{ text: '' }] },
        { type: 'p', children: [{ text: '' }] },
      ],
      setDesendants: (desendants) => {
        set({ desendants });
      },
    }),
    {
      name: 'TemplateStore',
    },
  ),
);
