import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

const validChannels = [
  'channel1',
  'channel2',
  'upload-file',
  'get-franchise',
  'create-franchise',
  'get-franchises',
  'update-franchise',
  'delete-franchise',
  'get-season',
  'get-seasons',
  'create-season',
  'update-season',
  'delete-season',
  'get-player',
  'get-players',
  'create-players',
] // Define the channels you want to expose to Electron, channels should match the ones in main.js

const safeIpcRenderer = {
  send: (channel, data) => {
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data)
    }
  },
  on: (channel, callback) => {
    // let validChannels = ['player-data', 'get-franchise', 'create-franchise', 'get-franchises'] // Define the channels you want to allow
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (event, ...args) => callback(...args))
    }
  },
  handle: (channel, callback) => {
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.handle(channel, (event, ...args) => callback(...args))
    }
  },
  invoke: (channel, data) => {
    if (validChannels.includes(channel)) {
      return ipcRenderer.invoke(channel, data)
    }
  },
  removeListener: (channel, callback) => {
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
