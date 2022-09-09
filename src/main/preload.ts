import { contextBridge } from 'electron';
import { invokeWindow } from './channels/window/window_invoker';
const wincom: _ELECTRON_WINDOW_COMMAND = {
  invokeWindow,
};
contextBridge.exposeInMainWorld('_ELECTRON_WINDOW_COMMAND', wincom);
