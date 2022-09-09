/* eslint-disable @typescript-eslint/naming-convention */
import { invokeWindow } from './window/window_invoker';
declare global {
  type InvokeWindow = typeof invokeWindow;
  declare interface Window {
    _ELECTRON_WINDOW_COMMAND: _ELECTRON_WINDOW_COMMAND;
  }
  declare interface _ELECTRON_WINDOW_COMMAND {
    invokeWindow: InvokeWindow;
  }
}
