import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
const Franchise = require('madden-franchise')

// let mainWindow

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// IPC listener for file uploads
ipcMain.on('upload-file', (event, filePath) => {
  console.log('Attempting to open file at:', filePath);

  // Test with static data
  event.sender.send('player-data', { test: 'This is a test' });

  try {
    let franchise = new Franchise(filePath);
    console.log('Franchise object created:', !!franchise);

    franchise.on('ready', function () {
      console.log('Franchise is ready');
      let playerTable = franchise.getTableByName('Player');
      console.log('Player table obtained:', !!playerTable);

      playerTable
        .readRecords()
        .then(function (table) {
          console.log('Records read:', table.records.length);

          const adjustPlayerWeights = (n) => {
            if (n > 100) {
              return 260 + (n - 100);
            } else {
              return 260 - (100 - n);
            }
          };



          const simplifiedRecords = table.records
            .filter(record => record.getValueByKey('ContractStatus') === 'Draft')
            .map((record) => ({
            FirstName: record.FirstName,
            LastName: record.LastName,
            ContractStatus: record.ContractStatus,
            Tag1: record.Tag1,
            Tag2: record.Tag2,
            Motivation1: record.Motivation1,
            Motivation2: record.Motivation2,
            Motivation3: record.Motivation3,
            ForcePass: record.TRAIT_FORCE_PASS,
            Age: record.Age,
            Height: record.Height,
            Weight: adjustPlayerWeights(record.Weight),
            OverallRating: record.OverallRating,
            TraitDevelopment: record.TraitDevelopment,
            OriginalHitPowerRating: record.OriginalHitPowerRating,
            OriginalJumpingRating: record.OriginalJumpingRating,
            AgilityRating: record.AgilityRating,

          }));

          console.log('Simplified records:', simplifiedRecords);

          // Send simplified records
          event.sender.send('player-data', simplifiedRecords);
        })
        .catch((error) => {
          console.error('Error reading records:', error);
        });
    });
  } catch (error) {
    console.error('Error in upload-file listener:', error);
  }
});


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
