import { ipcRenderer } from 'electron';

export const invokeWindow: (
  str: 'minimize' | 'maximize' | 'close',
) => Promise<void> = async (str) => {
  return ipcRenderer.invoke('window-channel', str);
};
