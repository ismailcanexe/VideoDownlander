const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    selectFolder: () => ipcRenderer.invoke('select-folder'),
    openFolder: (folderPath) => ipcRenderer.invoke('open-folder', folderPath),
    getVideoInfo: (url) => ipcRenderer.invoke('get-video-info', url),
    downloadVideo: (options) => ipcRenderer.invoke('download-video', options),
    cancelDownload: () => ipcRenderer.invoke('cancel-download'),
    getAppSettings: () => ipcRenderer.invoke('get-app-settings'),
    saveAppSettings: (partial) => ipcRenderer.invoke('save-app-settings', partial),
    onProgress: (callback) => ipcRenderer.on('download-progress', (event, data) => callback(data))
});
