import { PopperTargetType } from '@libs/overlay/types';
import create from 'zustand';
//FIx tooltip open multiple

type AltType = {
  alt: string;
  id: string;
  popperTarget: HTMLElement | PopperTargetType;
};
interface AltState {
  alt?: AltType;

  clear: () => void;
  set: (alt: AltType) => void;
}

const useAltStore = create<AltState>((set) => ({
  set(alt) {
    set(() => ({ alt }));
  },
  clear() {
    set(() => ({ alt: undefined }));
  },
}));

const alt = (altObj: AltType) => useAltStore.getState().set(altObj);
alt.clear = () => useAltStore.getState().clear();
export default alt;

export const useIsAltEmpty = () =>
  useAltStore(
    (state) => state.alt != undefined,
    (oldState, newState) => oldState == newState,
  );
export const useAlt = () => useAltStore((state) => state.alt);
