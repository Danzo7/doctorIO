import { BrowserWindow, ipcMain } from 'electron';

export function handleWindow(window: BrowserWindow) {
  ipcMain.handle('window-channel', async (event, ...args) => {
    const [str] = args;
    switch (str) {
      case 'minimize':
        window.minimize();
        break;
      case 'maximize':
        window.maximize();
        break;
      case 'close':
        window.close();
        break;
      default:
        break;
    }
  });
}
