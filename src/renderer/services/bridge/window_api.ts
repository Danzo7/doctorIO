const appWindow = FROM_TAURI
  ? (await import('@tauri-apps/api/window')).default.appWindow
  : undefined;
const windowControl = {
  minimize:
    appWindow?.minimize ?? FROM_ELECTRON
      ? () => window._ELECTRON_WINDOW_COMMAND.invokeWindow('minimize')
      : () => {},
  close:
    appWindow?.close ?? FROM_ELECTRON
      ? () => window._ELECTRON_WINDOW_COMMAND.invokeWindow('close')
      : () => {},
};
export default windowControl;
