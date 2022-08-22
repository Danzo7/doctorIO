// import { contextBridge, ipcRenderer, shell } from 'electron';

// contextBridge.exposeInMainWorld('electronAPI', {
//   sayHello: () => ipcRenderer.invoke('hello'),
// });
// contextBridge.exposeInMainWorld('electron', {
//   on(
//     eventName: string,
//     callback: (event: Electron.IpcRendererEvent, ...args: any[]) => void,
//   ) {
//     ipcRenderer.on(eventName, callback);
//   },

//   async invoke(eventName: string, ...params: any[]) {
//     return ipcRenderer.invoke(eventName, ...params);
//   },

//   async shellOpenExternal(url: string) {
//     await shell.openExternal(url);
//   },

//   async shellOpenPath(file: string) {
//     await shell.openPath(file);
//   },

//   async shellTrashItem(file: string) {
//     await shell.trashItem(file);
//   },
// });
