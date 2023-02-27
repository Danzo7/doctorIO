import create from 'zustand';
//FIx tooltip open multiple

interface OverlayState {
  portalElement?: HTMLElement;
  setPortalElement: (element: HTMLElement) => void;
}

const useOverlayStore = create<OverlayState>((set, get) => ({
  getPortalEntry: () => get().portalElement,
  setPortalElement: (element: HTMLElement) =>
    set(() => ({ portalElement: element })),
}));

const portal = (element: HTMLElement) =>
  useOverlayStore.getState().setPortalElement(element);
export const usePortalElement = () =>
  useOverlayStore((state) => state.portalElement);
export default portal;
