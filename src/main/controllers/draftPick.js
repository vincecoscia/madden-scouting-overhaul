const { ipcMain } = require('electron')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const Franchise = require('madden-franchise')
const fs = require('fs')

export function draftPickController() {
  ipcMain.handle('get-draft-pick', (event, draftPickId) => {
    try {
      console.log('Received get-draft-pick request')
      // Get draftPick from database using Prisma
      const draftPick = prisma.draftPick.findUnique({
        where: {
          id: draftPickId
        }
      })
      console.log('Prisma draftPick result:', draftPick)
      return draftPick
    } catch (error) {
      console.error('Error handling get-draftPick:', error)
    }
  })

  ipcMain.handle('get-draft-picks-by-season', async (event, seasonId) => {
    try {
      console.log('Received get-draft-picks request from season:', seasonId)
      // Get draftPicks by season from database using Prisma
      const draftPicks = await prisma.draftPick.findMany({
        where: {
          seasonId: seasonId
        }
      })
      console.log('Prisma draftPicks result:', draftPicks)
      return draftPicks
    } catch (error) {
      console.error('Error handling get-draftPicks:', error)
    }
  })

  ipcMain.handle('refresh-draft-picks', async (event, data) => {
    const { seasonId, filePath } = data

    try {
      let franchise = new Franchise(filePath)
      console.log('Franchise object created:', !!franchise)

      franchise.on('ready', async function () {
        console.log('Franchise is ready')

        // Import DraftPick table
        const draftPickTable = franchise.getTableById(5593)
        console.log('DraftPick table obtained:', !!draftPickTable)

        // Get all records from the DraftPick table
        const draftPickRecords = await draftPickTable.readRecords()

        console.log('DraftPick table records read:', draftPickRecords.records.length)

        // filter out all where YearOffset is not 0
        const filteredDraftPickRecords = draftPickRecords.records.filter(
          (record) => record.YearOffset === 0
        )

        console.log('Filtered draft pick records:', filteredDraftPickRecords.length)

        // Grab only necessary fields from the records
        const simplifiedDraftPickRecords = filteredDraftPickRecords.map((record) => ({
          round: record.Round + 1,
          pick: record.PickNumber,
          currentTeam: binaryToDecimal(record.CurrentTeam.substring(16)),
          originalTeam: binaryToDecimal(record.OriginalTeam.substring(16)),
          seasonId: seasonId
        }))

        console.log('Simplified draft pick records:', simplifiedDraftPickRecords.length)

        // Import Team table
        const teamTable = franchise.getTableById(6030)
        console.log('Team table obtained:', !!teamTable)

        // Get all records from the Team table and grab only necessary fields and index them
        const teamRecords = await teamTable.readRecords()

        console.log('Team table records read:', teamRecords.records.length)

        const indexedTeamRecords = teamRecords.records.map((record, index) => ({
          teamId: index,
          name: record.ShortName
        }))

        console.log('Indexed team records:', indexedTeamRecords.length)

        // Filter out all records where name is "AFC", "NFC", "FA", or "HOF"
        const filteredTeamRecords = indexedTeamRecords.filter(
          (record) =>
            record.name !== 'AFC' &&
            record.name !== 'NFC' &&
            record.name !== 'FA' &&
            record.name !== 'HOF'
        )

        console.log('Filtered team records:', filteredTeamRecords.length)

        // replace originalTeam and currentTeam with filteredTeamRecords.name where teamId matches
        const updatedDraftPickRecords = simplifiedDraftPickRecords.map((record) => ({
          ...record,
          currentTeam: filteredTeamRecords.find((team) => team.teamId === record.currentTeam).name,
          originalTeam: filteredTeamRecords.find((team) => team.teamId === record.originalTeam).name
        }))

        console.log('DRAFT PICKS', updatedDraftPickRecords[1])

        // Delete all draft picks for the season
        await prisma.draftPick.deleteMany({
          where: {
            seasonId: seasonId
          }
        })

        // Create draft picks for the season
        const createDraftPicksPromises = updatedDraftPickRecords.map((record) =>
          prisma.draftPick.create({ data: record })
        )

        const result = await Promise.all(createDraftPicksPromises)

        // Update franchise updatedAt timestamp to current time
        await prisma.franchise.update({
          where: {
            seasonId: seasonId
          },
          data: {
            updatedAt: new Date()
          }
        })

        return result
      })
    } catch (error) {
      console.error('Error refreshing draft picks:', error)
    }
  })
}
