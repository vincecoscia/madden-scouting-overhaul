import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const Franchise = require('madden-franchise')
import { initializeIpcControllers } from './controllers/main'

// let mainWindow

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    minWidth: 1200,
    minHeight: 800,
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

  initializeIpcControllers()
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// IPC listener for file uploads
ipcMain.on('upload-file', (event, filePath) => {
  console.log('Attempting to open file at:', filePath)

  // Test with static data
  // event.sender.send('player-data', { test: 'This is a test' });

  try {
    let franchise = new Franchise(filePath)
    console.log('Franchise object created:', !!franchise)

    franchise.on('ready', function () {
      console.log('Franchise is ready')
      let playerTable = franchise.getTableByName('Player')
      let draftTable = franchise.getTableByName('DraftPlayer')

      let players = []
      console.log('Player table obtained:', !!playerTable)

      // Get all records from the Player table
      playerTable
        .readRecords()
        .then(async function (table) {
          console.log('Records read:', table.records.length)

          const adjustPlayerWeights = (n) => {
            if (n > 100) {
              return 260 + (n - 100)
            } else {
              return 260 - (100 - n)
            }
          }

          const indexedRecords = table.records.map((record, index) => ({
            ...record,
            index
          }))

          const binaryToDecimal = (binary) => {
            return parseInt(binary, 2)
          }

          function assignCollege(n) {
            switch (n) {
              case 1886:
                return 'LSU'
              case 1926:
                return 'N.C. State'
              case 1842:
                return 'Georgia'
              case 1746:
                return 'Alabama'
              case 2030:
                return 'Texas'
              case 1904:
                return 'Minnesota'
              case 1802:
                return 'Colorado'
              case 2051:
                return 'USC'
              case 1957:
                return 'Oklahoma'
              case 1906:
                return 'Mississippi State'
              case 2014:
                return 'Stanford'
              case 1754:
                return 'Arkansas'
              case 1831:
                return 'Florida'
              case 1950:
                return 'Notre Dame'
              case 1961:
                return 'Oregon State'
              case 2077:
                return 'Washington'
              case 1864:
                return 'Iowa'
              case 1965:
                return 'Penn State'
              case 1833:
                return 'Florida State'
              case 2075:
                return 'Washington State'
              case 2046:
                return 'UCF'
              case 1885:
                return 'Louisville'
              case 1901:
                return 'Michigan State'
              case 1766:
                return 'Boise State'
              case 2031:
                return 'Texas A&M'
              case 1779:
                return 'California'
              case 2047:
                return 'UCLA'
              case 1898:
                return 'Miami'
              case 1758:
                return 'Auburn'
              case 1767:
                return 'Boston College'
              case 1796:
                return 'Clemson'
              case 2052:
                return 'USF'
              case 1991:
                return 'San Jose State'
              case 2053:
                return 'Utah'
              case 1948:
                return 'Northwestern'
              case 2073:
                return 'Wake Forest'
              case 1822:
                return 'Eastern Michigan'
              case 1865:
                return 'Iowa State'
              case 1956:
                return 'Ohio State'
              case 1979:
                return 'Rutgers'
              case 1774:
                return 'Butler'
              case 1900:
                return 'Michigan'
              case 1933:
                return 'Nevada'
              case 1959:
                return 'Ole Miss'
              case 1820:
                return 'East Carolina'
              case 1872:
                return 'Kansas State'
              case 2062:
                return 'Virginia'
              case 1941:
                return 'North Carolina'
              case 1744:
                return 'Air Force'
              case 2027:
                return 'Tennessee'
              case 1837:
                return 'Fresno State'
              case 2023:
                return 'TCU'
              case 1815:
                return 'Duke'
              case 2092:
                return 'Wisconsin'
              case 1871:
                return 'Kansas'
              case 2020:
                return 'Syracuse'
              case 1859:
                return 'Illinois'
              case 1999:
                return 'SMU'
              case 2001:
                return 'South Carolina'
              case 2034:
                return 'Texas Tech'
              case 2088:
                return 'William & Mary'
              case 1804:
                return 'Columbia'
              case 1892:
                return 'Maryland'
              case 2024:
                return 'Temple'
              case 1943:
                return 'North Dakota State'
              case 1942:
                return 'North Dakota'
              case 1960:
                return 'Oregon'
              case 1850:
                return 'Hawaii'
              case 1828:
                return 'FAU'
              case 2060:
                return 'Vanderbilt'
              case 2039:
                return 'Troy'
              case 1931:
                return 'Nebraska'
              case 1839:
                return 'Georgia Southern'
              case 1935:
                return 'New Mexico State'
              case 1975:
                return 'Rice'
              case 1944:
                return 'North Texas'
              case 1862:
                return 'Indiana State'
              case 1843:
                return 'Georgia Tech'
              case 2081:
                return 'West Virginia'
              case 1902:
                return 'Middle Tennessee State'
              case 1857:
                return 'Idaho'
              case 1855:
                return 'Houston'
              case 1895:
                return 'Memphis'
              case 1775:
                return 'BYU'
              case 1764:
                return 'Bethune-Cookman'
              case 1964:
                return 'Penn'
              case 1803:
                return 'Colorado State'
              case 2096:
                return 'Yale'
              case 1861:
                return 'Indiana'
              case 1907:
                return 'Missouri'
              case 1982:
                return 'Southern Illinois'
              case 1845:
                return 'Grand Valley State'
              case 1805:
                return 'Connecticut'
              case 1936:
                return 'New Mexico'
              case 1756:
                return 'Arkansas State'
              case 1772:
                return 'Buffalo'
              case 1888:
                return 'Maine'
              case 2068:
                return 'W. Kentucky'
              case 1954:
                return 'Ohio'
              case 1874:
                return 'Kentucky'
              case 1958:
                return 'Oklahoma State'
              case 1788:
                return 'Central Michigan'
              case 1761:
                return 'Ball State'
              case 1887:
                return 'Mississippi Valley State'
              case 2002:
                return 'South Dakota'
              case 2095:
                return 'Wyoming'
              case 1841:
                return 'Georgetown'
              case 1752:
                return 'Arizona'
              case 1988:
                return 'Sam Houston'
              case 1925:
                return 'Northern Illinois'
              case 1893:
                return 'Massachusetts'
              case 1873:
                return 'Kent State'
              case 2097:
                return 'Youngstown State'
              case 1762:
                return 'Baylor'
              case 1918:
                return 'Mount Union'
              case 1793:
                return 'Cincinnati'
              case 2042:
                return 'Tulsa'
              case 2041:
                return 'Tulane'
              case 1983:
                return 'South Carolina State'
              case 1899:
                return 'Miami of Ohio'
              case 1768:
                return 'Bowling Green State'
              case 2048:
                return 'UL Lafayette'
              case 1976:
                return 'Richmond'
              case 1814:
                return 'Drake'
              case 1883:
                return 'Liberty'
              case 2055:
                return 'UTEP'
              case 2063:
                return 'Virginia Tech'
              case 2045:
                return 'UAB'
              case 1968:
                return 'Pittsburgh'
              case 1745:
                return 'Akron'
              case 1753:
                return 'Arizona State'
              case 1830:
                return 'FIU'
              case 1824:
                return 'Eastern Washington'
              case 1934:
                return 'New Hampshire'
              case 1812:
                return 'Delaware State'
              case 1912:
                return 'Montana'
              case 1946:
                return 'Northern Iowa'
              case 1971:
                return 'Purdue'
              case 1832:
                return 'Florida A&M'
              case 1757:
                return 'Army'
              case 1928:
                return 'Navy'
              case 1860:
                return 'Illinois State'
              case 1879:
                return 'Lafayette'
              case 1882:
                return 'Lehigh'
              case 1858:
                return 'Idaho State'
              case 2054:
                return 'Utah State'
              case 1878:
                return 'LA Tech'
              case 2028:
                return 'Tennessee State'
              case 1970:
                return 'Princeton'
              case 7762:
                return 'UTSA'
              case 2049:
                return 'UL Monroe'
              case 2036:
                return 'Toledo'
              case 1981:
                return 'South Dakota State'
              case 2069:
                return 'W. Michigan'
              case 1791:
                return 'Charleston Southern'
              case 59066:
                return 'South Alabama'
              case 2050:
                return 'UNLV'
              case 1891:
                return 'Marshall'
              case 2080:
                return 'West Georgia'
              case 2061:
                return 'Villanova'
              case 2005:
                return 'Southern Miss'
              case 1984:
                return 'San Diego State'
              case 1811:
                return 'Delaware'
              case 2004:
                return 'Southern Arkansas'
              case 1848:
                return 'Harvard'
              case 1787:
                return 'Central Arkansas'
              case 1751:
                return 'Appalachian State'
              case 1974:
                return 'Rhode Island'
              case 2006:
                return 'Southern Utah'
              case 1829:
                return 'Ferris State'
              case 33353:
                return 'Charlotte'
              case 1869:
                return 'Jacksonville State'
              case 2033:
                return 'Texas State'
              case 1810:
                return 'Dayton'
              case 2032:
                return 'Texas Southern'
              default:
                return n
            }
          }

          const filteredPlayerTable = indexedRecords
            .filter((record) => record.getValueByKey('ContractStatus') === 'Draft')
            .map((record) => ({
              playerID: record.index,
              firstName: record.Firstname,
              lastName: record.LastName,
              position: record.Position,
              college: assignCollege(binaryToDecimal(record.College.substring(16))),
              age: record.Age,
              height: record.Height,
              weight: adjustPlayerWeights(record.Weight),
              overall: record.OverallRating,
              traitDevelopment: record.traitDevelopment,
              contractStatus: record.ContractStatus,
              motivation1: record.Motivation1,
              motivation2: record.Motivation2,
              motivation3: record.Motivation3,
              hitPower: record.HitPowerRating,
              jumping: record.JumpingRating,
              agility: record.AgilityRating,
              acceleration: record.AccelerationRating,
              kickPower: record.KickPowerRating,
              kickAccuracy: record.KickAccuracyRating,
              breakSack: record.BreakSackRating,
              blockShed: record.BlockSheddingRating,
              bcVision: record.BCVisionRating,
              awareness: record.AwarenessRating,
              catchInTraffic: record.CatchInTrafficRating,
              catch: record.CatchRating,
              carrying: record.CarryingRating,
              breakTackle: record.BreakTackleRating,
              deepRoute: record.DeepRouteRunningRating,
              mediumRoute: record.MediumRouteRunningRating,
              shortRoute: record.ShortRouteRunningRating,
              confidence: record.ConfidenceRating,
              changeOfDirection: record.ChangeOfDirectionRating,
              impactBlocking: record.ImpactBlockingRating,
              finesseMoves: record.FinesseMovesRating,
              powerMoves: record.PowerMovesRating,
              jukeMove: record.JukeMoveRating,
              injury: record.InjuryRating,
              kickReturn: record.KickReturnRating,
              manCoverage: record.ManCoverageRating,
              longSnapping: record.LongSnappingRating,
              leadBlock: record.LeadBlockRating,
              press: record.PressRating,
              runBlock: record.RunBlockRating,
              runBlockPower: record.RunBlockPowerRating,
              runBlockFinesse: record.RunBlockFinesseRating,
              release: record.ReleaseRating,
              pursuit: record.PursuitRating,
              speed: record.SpeedRating,
              spectacularCatch: record.SpectacularCatchRating,
              strength: record.StrengthRating,
              stiffArm: record.StiffArmRating,
              stamina: record.StaminaRating,
              spinMove: record.SpinMoveRating,
              throwAccuracy: record.ThrowAccuracyRating,
              throwAccuracyShort: record.ThrowAccuracyShortRating,
              throwAccuracyMid: record.ThrowAccuracyMidRating,
              throwAccuracyDeep: record.ThrowAccuracyDeepRating,
              tackle: record.TackleRating,
              throwUnderPressure: record.ThrowUnderPressureRating,
              throwPower: record.ThrowPowerRating,
              throwOnTheRun: record.ThrowOnTheRunRating,
              zoneCoverage: record.ZoneCoverageRating,
              trucking: record.TruckingRating,
              toughness: record.ToughnessRating,
              playAction: record.PlayActionRating,
              passBlock: record.PassBlockRating,
              passBlockPower: record.PassBlockPowerRating,
              passBlockFinesse: record.PassBlockFinesseRating
            }))

          // Set filteredPlayerTable to players from outside this scope
          players = filteredPlayerTable
          // try {
          //   // await prisma.player.createMany({
          //   //   data: prismaRecords,
          //   //   skipDuplicates: true,
          //   // });
          //   const createPlayersPromises = prismaRecords.map((record) =>
          //     prisma.player.create({ data: record })
          //   )
          //   await Promise.all(createPlayersPromises)
          // } catch (error) {
          //   console.error('Error creating records:', error)
          // } finally {
          //   console.log('Records created')

          //   await prisma.$disconnect()
          // }

          // console.log('Simplified records:', simplifiedRecords);
        })
        .catch((error) => {
          console.error('Error reading records:', error)
        })

      // Get all records from the DraftPlayer table
      draftTable
        .readRecords()
        .then(async function (table) {
          const binaryToDecimal = (binary) => {
            return parseInt(binary, 2)
          }

          // filter out players where InitialDraftRank is 0
          const filteredRecords = table.records.filter((record) => record.InitialDraftRank !== 0)

          // Grab only necessary fields from the records
          const simplifiedRecords = filteredRecords.map((record) => ({
            isVisible: record.IsVisible,
            proDayThreeConeDrill: record.ProDayThreeConeDrillRating,
            proDayTwentyYardShuttle: record.ProDayTwentyYardShuttleRating,
            proDayVerticalJump: record.ProDayVerticalJumpRating,
            proDayFortyYardDash: record.ProDayFortyYardDashRating,
            proDayBenchPress: record.ProDayBenchPressRating,
            proDayBroadJump: record.ProDayBroadJumpRating,
            combineThreeConeDrill: record.CombineThreeConeDrillRating,
            combineTwentyYardShuttle: record.CombineTwentyYardShuttleRating,
            combineVerticalJump: record.CombineVerticalJumpRating,
            combineFortyYardDash: record.CombineFortyYardDashRating,
            combineBenchPress: record.CombineBenchPressRating,
            combineBroadJump: record.CombineBroadJumpRating,
            initialDraftRank: record.InitialDraftRank,
            trueOverallRanking: record.TrueOverallRanking,
            combineOverallRanking: record.CombineOverallRanking,
            productionGrade: record.ProductionGrade
          }))

          // Combine the two tables on the players' playerID field and the draft table's Player field
          const combinedRecords = table.records.map((record) => ({
            ...record,
            playerID: binaryToDecimal(record.Player.substring(16))
          }))

          const combinedRecordsWithPlayerData = combinedRecords.map((record) => ({
            ...record,
            ...players.find((player) => player.playerID === record.playerID)
          }))

          const prismaRecords = combinedRecordsWithPlayerData.map((record) => ({
            // Player fields
            firstName: record.firstName,
            lastName: record.lastName,
            position: record.position,
            college: record.college,
            age: record.age,
            height: record.height,
            weight: record.weight,
            overall: record.overall,
            traitDevelopment: record.traitDevelopment,
            contractStatus: record.contractStatus,
            motivation1: record.motivation1,
            motivation2: record.motivation2,
            motivation3: record.motivation3,
            hitPower: record.hitPower,
            jumping: record.jumping,
            agility: record.agility,
            acceleration: record.acceleration,
            kickPower: record.kickPower,
            kickAccuracy: record.kickAccuracy,
            breakSack: record.breakSack,
            blockShed: record.blockShed,
            bcVision: record.bcVision,
            awareness: record.awareness,
            catchInTraffic: record.catchInTraffic,
            catch: record.catch,
            carrying: record.carrying,
            breakTackle: record.breakTackle,
            deepRoute: record.deepRoute,
            mediumRoute: record.mediumRoute,
            shortRoute: record.shortRoute,
            confidence: record.confidence,
            changeOfDirection: record.changeOfDirection,
            impactBlocking: record.impactBlocking,
            finesseMoves: record.finesseMoves,
            powerMoves: record.powerMoves,
            jukeMove: record.jukeMove,
            injury: record.injury,
            kickReturn: record.kickReturn,
            manCoverage: record.manCoverage,
            longSnapping: record.longSnapping,
            leadBlock: record.leadBlock,
            press: record.press,
            runBlock: record.runBlock,
            runBlockPower: record.runBlockPower,
            runBlockFinesse: record.runBlockFinesse,
            release: record.release,
            pursuit: record.pursuit,
            speed: record.speed,
            spectacularCatch: record.spectacularCatch,
            strength: record.strength,
            stiffArm: record.stiffArm,
            stamina: record.stamina,
            spinMove: record.spinMove,
            throwAccuracy: record.throwAccuracy,
            throwAccuracyShort: record.throwAccuracyShort,
            throwAccuracyMid: record.throwAccuracyMid,
            throwAccuracyDeep: record.throwAccuracyDeep,
            tackle: record.tackle,
            throwUnderPressure: record.throwUnderPressure,
            throwPower: record.throwPower,
            throwOnTheRun: record.throwOnTheRun,
            zoneCoverage: record.zoneCoverage,
            trucking: record.trucking,
            toughness: record.toughness,
            playAction: record.playAction,
            passBlock: record.passBlock,
            passBlockPower: record.passBlockPower,
            passBlockFinesse: record.passBlockFinesse,

            // DraftPlayer fields
            isVisible: record.isVisible,
            proDayThreeConeDrill: record.proDayThreeConeDrill,
            proDayTwentyYardShuttle: record.proDayTwentyYardShuttle,
            proDayVerticalJump: record.proDayVerticalJump,
            proDayFortyYardDash: record.proDayFortyYardDash,
            proDayBenchPress: record.proDayBenchPress,
            proDayBroadJump: record.proDayBroadJump,
            combineThreeConeDrill: record.combineThreeConeDrill,
            combineTwentyYardShuttle: record.combineTwentyYardShuttle,
            combineVerticalJump: record.combineVerticalJump,
            combineFortyYardDash: record.combineFortyYardDash,
            combineBenchPress: record.combineBenchPress,
            combineBroadJump: record.combineBroadJump,
            initialDraftRank: record.initialDraftRank,
            trueOverallRanking: record.trueOverallRanking,
            combineOverallRanking: record.combineOverallRanking,
            productionGrade: record.productionGrade
          }))
          console.log('Records read:', table.records.length)
          console.log('Filtered records:', filteredRecords.length)
          console.log('Simplified records:', simplifiedRecords.length)
          console.log('Combined records:', combinedRecords.length)
          console.log('Combined records with player data:', combinedRecordsWithPlayerData.length)
          console.log('Prisma records:', prismaRecords.length)
          console.log('Prisma records:', prismaRecords)

          try {
            // await prisma.player.createMany({
            //   data: prismaRecords,
            //   skipDuplicates: true,
            // });
            const createPlayersPromises = prismaRecords.map((record) =>
              prisma.player.create({ data: record })
            )
            await Promise.all(createPlayersPromises)
          } catch (error) {
            console.error('Error creating records:', error)
          } finally {
            console.log('Records created')

            await prisma.$disconnect()
          }

          // console.log('Simplified records:', simplifiedRecords);
        })
        .catch((error) => {
          console.error('Error reading records:', error)
        })
    })
  } catch (error) {
    console.error('Error in upload-file listener:', error)
  }
})

app.on('before-quit', async () => {
  await prisma.$disconnect()
})

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
