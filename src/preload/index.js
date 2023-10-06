import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

const safeIpcRenderer = {
  send: (channel, data) => {
    let validChannels = ['channel1', 'channel2', 'upload-file'] // Define the channels you want to allow
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data)
    }
  },
  on: (channel, callback) => {
    let validChannels = ['player-data'] // Define the channels you want to allow
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (event, ...args) => callback(...args))
    }
  },
  removeListener: (channel, callback) => {
    let validChannels = ['player-data'] // Define the channels you want to allow
    if (validChannels.includes(channel)) {
      ipcRenderer.removeListener(channel, callback)
    }
  }
}

// Custom APIs for renderer
const api = {
  ipcRenderer: safeIpcRenderer
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
