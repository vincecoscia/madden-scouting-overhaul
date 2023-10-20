const { ipcMain } = require('electron')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const Franchise = require('madden-franchise')
const fs = require('fs')
// const collegesJson = require('./src/main/json/colleges.json')

const collegesPath = './src/main/json/colleges.json'

let collegesJson = null

fs.readFile(collegesPath, 'utf8', (err, jsonString) => {
  if (err) {
    console.error('Error reading colleges file:', err)
    return
  }
  try {
    collegesJson = JSON.parse(jsonString)
    console.log('Colleges file parsed successfully')
  } catch (err) {
    console.error('Error parsing JSON string:', err)
  }
})

export function playerController() {
  ipcMain.handle('get-player', (event, playerId) => {
    try {
      console.log('Received get-player request')
      // Get player from database using Prisma
      const player = prisma.player.findUnique({
        where: {
          id: playerId
        }
      })
      console.log('Prisma player result:', player)
      return player
    } catch (error) {
      console.error('Error handling get-player:', error)
    }
  })

  ipcMain.handle('get-players', async (event, seasonId) => {
    try {
      console.log('Received get-players request')
      console.log('seasonId:', seasonId)
      // Get players by season from database using Prisma and sort by overall initialDraftRank

      const players = await prisma.player.findMany({
        where: {
          seasonId: seasonId
        },
        orderBy: [
          {
            initialDraftRank: 'asc'
          }
        ]
      })
      // console.log('Prisma players result:', players);
      return players
    } catch (error) {
      console.error('Error handling get-players:', error)
    }
  })

  ipcMain.handle('create-players', (event, data) => {
    console.log('Attempting to open file at:', data.filePath)
    console.log('THIS IS seasonId:', data.seasonId)

    // Test with static data
    // event.sender.send('player-data', { test: 'This is a test' });

    let franchise = new Franchise(data.filePath)
    console.log('Franchise object created:', !!franchise)

    franchise.on('ready', async function () {
      try {
        // Get all players in the Player table
        let playerTable = franchise.getTableByName('Player')
        console.log('Player table obtained:', !!playerTable)

        let table = await playerTable.readRecords()
        console.log('Player table records read:', table.records.length)

        const adjustPlayerWeights = (n) => {
          if (n > 100) {
            return 260 + (n - 100)
          } else {
            return 260 - (100 - n)
          }
        }

        const binaryToDecimal = (binary) => {
          return parseInt(binary, 2)
        }

        function assignCollege(n) {
          const college = collegesJson.find((college) => college.id === n)

          if (!college) {
            return n + ' not found'
          }
          console.log('College:', college)
          return college.school
        }

        function assignConference(n) {
          const conference = collegesJson.find((college) => college.id === n)
          if (!conference) {
            return n + ' not found'
          }
          return conference.conference
        }

        console.log('First ACTUAL record:', typeof table.records[0].ContractStatus)

        const indexedRecords = table.records.map((record, index) => ({
          playerID: index,
          firstName: record.FirstName,
          lastName: record.LastName,
          position: record.Position,
          portrait: record.PLYR_PORTRAIT,
          college: assignCollege(binaryToDecimal(record.College.substring(16))),
          conference: assignConference(binaryToDecimal(record.College.substring(16))),
          age: record.Age,
          height: record.Height,
          weight: adjustPlayerWeights(record.Weight),
          overall: record.OverallRating,
          traitDevelopment: record.TraitDevelopment,
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
          catch: record.CatchingRating,
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
          longSnapping: record.LongSnapRating,
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
          passBlockFinesse: record.PassBlockFinesseRating,
          seasonId: data.seasonId
        }))

        // indexedRecords.forEach((record, index) => {
        //   if (index < 10) {
        //     // Print the ContractStatus of the first 10 records
        //     console.log(record.contractStatus)
        //   }
        // })

        const filteredPlayerTable = indexedRecords.filter(
          (record) => record.contractStatus === 'Draft'
        )

        // Read first record from Player table
        console.log('First record:', filteredPlayerTable[0])

        console.log('Filtered player table:', filteredPlayerTable.length)

        let draftTable = franchise.getTableByName('DraftPlayer')
        console.log('DraftPlayer table obtained:', !!draftTable)

        let draftRecords = await draftTable.readRecords()
        console.log('DraftPlayer table records read:', draftRecords.records.length)

        // filter out players where InitialDraftRank is 0
        const filteredRecords = draftRecords.records.filter(
          (record) => record.InitialDraftRank !== 0
        )

        // Grab only necessary fields from the records
        const simplifiedRecords = filteredRecords.map((record) => ({
          playerID: binaryToDecimal(record.Player.substring(16)),
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

        const combinedRecordsWithPlayerData = simplifiedRecords.map((record) => ({
          ...filteredPlayerTable.find((player) => player.playerID === record.playerID),
          ...record
        }))

        const prismaRecords = combinedRecordsWithPlayerData.map((record) => ({
          // Player fields
          playerID: record.playerID,
          firstName: record.firstName,
          lastName: record.lastName,
          position: record.position,
          portrait: record.portrait,
          college: record.college,
          conference: record.conference,
          age: record.age,
          height: record.height,
          weight: record.weight,
          overall: record.overall,
          // Get average of speed, acceleration, agility, strength, changeOfDirection and jumping
          sparq: Math.round(
            (record.speed +
              record.acceleration +
              record.agility +
              record.strength +
              record.changeOfDirection +
              record.jumping) /
              6
          ),
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
          seasonId: record.seasonId,
          franchiseId: data.franchiseId,

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

        // Get all players using only position and overall
        const players = prismaRecords.map((record) => ({
          position: record.position,
          overall: record.overall
        }))

        // Get the average overall for each position based on the top 10 players at each position
        const averageOverallByPosition = players.reduce((acc, player) => {
          if (!acc[player.position]) {
            acc[player.position] = []
          }
          acc[player.position].push(player.overall)
          return acc
        }, {})
        for (const position in averageOverallByPosition) {
          // Round to 2 decimal places
          averageOverallByPosition[position] = Math.round(
            averageOverallByPosition[position].reduce((a, b) => a + b, 0) /
              averageOverallByPosition[position].length *
              100
          ) / 100
        }

        // Get the average of the offense and defense overall
        const averageOverall = Math.round(
          Object.values(averageOverallByPosition).reduce((a, b) => a + b, 0) /
            Object.values(averageOverallByPosition).length *
            100
        ) / 100

        const averageOffenseOverall = Math.round(
          (averageOverallByPosition.QB +
            averageOverallByPosition.HB +
            averageOverallByPosition.WR +
            averageOverallByPosition.TE +
            averageOverallByPosition.RT +
            averageOverallByPosition.RG +
            averageOverallByPosition.C +
            averageOverallByPosition.LG +
            averageOverallByPosition.LT) /
            9 *
            100
        ) / 100

        const averageDefenseOverall = Math.round(
          (averageOverallByPosition.LE +
            averageOverallByPosition.RE +
            averageOverallByPosition.DT +
            averageOverallByPosition.LOLB +
            averageOverallByPosition.MLB +
            averageOverallByPosition.ROLB +
            averageOverallByPosition.CB +
            averageOverallByPosition.FS +
            averageOverallByPosition.SS) /
            9 *
            100
        ) / 100

        const prismaReportRecords = {
          avgOverall: averageOverall,
          offenseOverall: averageOffenseOverall,
          defenseOverall: averageDefenseOverall,
          qbOverall: averageOverallByPosition.QB,
          hbOverall: averageOverallByPosition.HB,
          fbOverall: averageOverallByPosition.FB,
          wrOverall: averageOverallByPosition.WR,
          teOverall: averageOverallByPosition.TE,
          ltOverall: averageOverallByPosition.LT,
          lgOverall: averageOverallByPosition.LG,
          cOverall: averageOverallByPosition.C,
          rgOverall: averageOverallByPosition.RG,
          rtOverall: averageOverallByPosition.RT,
          leOverall: averageOverallByPosition.LE,
          reOverall: averageOverallByPosition.RE,
          dtOverall: averageOverallByPosition.DT,
          lolbOverall: averageOverallByPosition.LOLB,
          mlbOverall: averageOverallByPosition.MLB,
          rolbOverall: averageOverallByPosition.ROLB,
          cbOverall: averageOverallByPosition.CB,
          fsOverall: averageOverallByPosition.FS,
          ssOverall: averageOverallByPosition.SS,
          kOverall: averageOverallByPosition.K,
          pOverall: averageOverallByPosition.P,
          seasonId: data.seasonId,
          franchiseId: data.franchiseId
        }

        await prisma.report.create({ data: prismaReportRecords })

        // Get 3 highest average overall by position
        const topThree = Object.entries(averageOverallByPosition)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 3)
          .map(([position], index) => ({
            position,
            rank: index + 1,
            seasonId: data.seasonId
          }))

        // Get 3 lowest average overall by position
        const bottomThree = Object.entries(averageOverallByPosition)
          .sort(([, a], [, b]) => a - b)
          .slice(0, 3)
          // add rank to each entry
          .map(([position], index) => ({
            position,
            rank: index + 1,
            seasonId: data.seasonId
          }))

        // Insert top 3 and bottom 3 into the Best table and Worst table respectively. Remember we can't use createMany with sqlite
        const createBestPromises = topThree.map((record) => prisma.best.create({ data: record }))
        const createWorstPromises = bottomThree.map((record) => prisma.worst.create({ data: record }))

        await Promise.all(createBestPromises)
        await Promise.all(createWorstPromises)

        // Import DraftPick table
        const draftPickTable = franchise.getTableById(5593)
        // console.log('DraftPick table obtained:', !!draftPickTable)

        // Get all records from the DraftPick table
        const draftPickRecords = await draftPickTable.readRecords()

        // console.log('DraftPick table records read:', draftPickRecords.records.length)

        // filter out all where YearOffset is not 0
        const filteredDraftPickRecords = draftPickRecords.records.filter(
          (record) => record.YearOffset === 0
        )

        // console.log('Filtered draft pick records:', filteredDraftPickRecords.length)

        // Grab only necessary fields from the records
        const simplifiedDraftPickRecords = filteredDraftPickRecords.map((record) => ({
          round: record.Round + 1,
          pick: record.PickNumber,
          currentTeam: binaryToDecimal(record.CurrentTeam.substring(16)),
          originalTeam: binaryToDecimal(record.OriginalTeam.substring(16)),
          seasonId: data.seasonId
        }))

        // console.log('Simplified draft pick records:', simplifiedDraftPickRecords.length)

        // Import Team table
        const teamTable = franchise.getTableById(6030)
        console.log('Team table obtained:', !!teamTable)

        // Get all records from the Team table and grab only necessary fields and index them
        const teamRecords = await teamTable.readRecords()

        // console.log('Team table records read:', teamRecords.records.length)

        const indexedTeamRecords = teamRecords.records.map((record, index) => ({
          teamId: index,
          name: record.ShortName
        }))

        // console.log('Indexed team records:', indexedTeamRecords.length)

        // Filter out all records where name is "AFC", "NFC", "FA", or "HOF"
        const filteredTeamRecords = indexedTeamRecords.filter(
          (record) =>
            record.name !== 'AFC' &&
            record.name !== 'NFC' &&
            record.name !== 'FA' &&
            record.name !== 'HOF'
        )

        // console.log('Filtered team records:', filteredTeamRecords.length)

        // replace originalTeam and currentTeam with filteredTeamRecords.name where teamId matches
        const updatedDraftPickRecords = simplifiedDraftPickRecords.map((record) => ({
          ...record,
          currentTeam: filteredTeamRecords.find((team) => team.teamId === record.currentTeam).name,
          originalTeam: filteredTeamRecords.find((team) => team.teamId === record.originalTeam).name
        }))

        // console.log('DRAFT PICKS', updatedDraftPickRecords[1])

        const createDraftPicksPromises = updatedDraftPickRecords.map((record) =>
          prisma.draftPick.create({ data: record })
        )

        await Promise.all(createDraftPicksPromises)

        const createPlayersPromises = prismaRecords.map((record) =>
          prisma.player.create({ data: record })
        )

        // Update franchise updatedAt timestamp to current time
        await prisma.franchise.update({
          where: {
            id: data.franchiseId
          },
          data: {
            updatedAt: new Date()
          }
        })

        const result = await Promise.all(createPlayersPromises)
        return result

        // console.log('Simplified records:', simplifiedRecords);
      } catch (error) {
        console.error('Error reading franchise:', error)
      }
    })
  })
}
