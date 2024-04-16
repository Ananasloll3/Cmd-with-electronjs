const { contextBridge, ipcRenderer } = require('electron');

//API pour communication entre la partie vue et 'system'
contextBridge.exposeInMainWorld('electronAPI', {

  getPath: async () => {
    try {
      return await ipcRenderer.invoke('getPath');
      
    } catch (erreur) {
    }
  },
  
  getVisiblePath: async () => {
    try {
      return await ipcRenderer.invoke('getVisiblePath');
    } catch (erreur) {
    }
  },

  setPath: async (newPath) => {
    try {
      await ipcRenderer.invoke('setPath', newPath);
    } catch (erreur) {
    }
  },

  setVisiblePath: async (newVisiblePath) => {
    try {
      await ipcRenderer.invoke('setVisiblePath', newVisiblePath);
    } catch (erreur) {
    }
  },

  commandStart: async (programme) => {
    try {
      return await ipcRenderer.invoke('commandStart', programme);
    } catch (erreur) {
    }
  },

  commandSystemInfo: async () => {
    try {
      return await ipcRenderer.invoke('commandSystemInfo');
    } catch (erreur) {
    }
  },

  testFolderExist: async (chemin) => {
    try {
      return await ipcRenderer.invoke('testFolderExist', chemin);
    } catch (erreur) {
    }
  },

  getFileInFolder: async (argument, chemin) => {
    try {
      return await ipcRenderer.invoke('getFileInFolder', argument, chemin);
    } catch (erreur) {
    }
  },

});