const { ipcMain } = require('electron')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

export function scoutController() {
  ipcMain.handle('get-scout', (event, scoutId) => {
    try {
      console.log('Received get-scout request')
      // Get scout from database using Prisma
      const scout = prisma.scout.findUnique({
        where: {
          id: scoutId
        }
      })
      console.log('Prisma scout result:', scout)
      return scout
    } catch (error) {
      console.error('Error handling get-scout:', error)
    }
  })

  ipcMain.handle('get-scouts-by-season', async (event, seasonId) => {
    try {
      console.log('Received get-scouts-by-season request')
      console.log('seasonId:', seasonId)
      // Get scouts by season (remember its a many to many relationship) from database using Prisma
      const scouts = await prisma.scout.findMany({
        where: {
          season: {
            some: {
              id: seasonId
            }
          }
        }
      })
      console.log('Prisma season scouts result:', scouts)
      return scouts
    } catch (error) {
      console.error('Error handling get-scouts:', error)
    }
  })

  ipcMain.handle('get-scouts-by-franchise', async (event, franchiseId) => {
    try {
      console.log('Received get-scouts request')
      console.log('franchiseId:', franchiseId)
      // Get scouts by franchise from database using Prisma
      const scouts = await prisma.scout.findMany({
        where: {
          franchiseId: franchiseId
        }
      })
      // console.log('Prisma scouts result:', scouts)
      return scouts
    } catch (error) {
      console.error('Error handling get-scouts:', error)
    }
  })

  ipcMain.handle('create-scout', async (event, data) => {
    try {
      const { scout, franchiseId } = data

      // add franchiseId to scout
      scout.franchiseId = franchiseId

      console.log('Received scout:', scout)
      // Create scout in database using Prisma
      const result = await prisma.scout.create({
        data: scout
      })
      console.log('Prisma create result:', result)
      return result
    } catch (error) {
      console.error('Error handling create-scout:', error)
    }
  })

  ipcMain.handle('hire-scout-for-season', async (event, data) => {
    const { scoutId, seasonId, cost } = data

    // Add scoutId to season by connecting the scout to the season and reduce the season's balance by the scout's cost
    try {
      console.log('Received hire-scout-for-season request')
      const updatedSeason = await prisma.season.update({
        where: {
          id: seasonId
        },
        data: {
          scouts: {
            connect: {
              id: scoutId // Connecting the scout to the season by ID
            }
          },
          balance: {
            decrement: cost // Decrementing the season's balance by the scout's cost
          }
        }
      })

      console.log('Updated season:', updatedSeason)
      return updatedSeason
    } catch (error) {
      console.error('Error hiring scout for season:', error)
      throw error // Or handle the error as needed
    }
  })

  ipcMain.handle('update-scout', (event, scout) => {
    try {
      console.log('Received scout:', scout)
      // Update scout in database using Prisma
      const result = prisma.scout.update({
        where: {
          id: scout.id
        },
        data: scout
      })
      console.log('Prisma update result:', result)
      return result
    } catch (error) {
      console.error('Error handling update-scout:', error)
      throw error
    }
  })

  ipcMain.handle('delete-scout', (event, scoutId) => {
    try {
      console.log('Received scoutId:', scoutId)
      // Delete scout in database using Prisma
      const result = prisma.scout.delete({
        where: {
          id: scoutId
        }
      })
      console.log('Prisma delete result:', result)
      return result
    } catch (error) {
      console.error('Error handling delete-scout:', error)
      throw error
    }
  })

  ipcMain.handle('fire-scout-from-season', async (event, data) => {
    const { scoutId, seasonId, cost } = data

    try {
      console.log('Received fire-scout-from-season request')
      const updatedSeason = await prisma.season.update({
        where: {
          id: seasonId
        },
        data: {
          scouts: {
            disconnect: {
              id: scoutId // Disconnecting the scout from the season by ID
            }
          },
          balance: {
            increment: cost // Incrementing the season's balance by 0
          }

        }
      })
      console.log('Updated season:', updatedSeason)
      return updatedSeason
    } catch (error) {
      console.error('Error firing scout from season:', error)
      throw error // Or handle the error as needed
    }
  })

  ipcMain.handle('generate-scouts', async (event, franchiseId) => {
    const scouts = generateRandomScouts(10, franchiseId)

    try {
      console.log('Received generate-scouts request')
      // Create scouts in database using Prisma
      const scoutPromises = scouts.map((scout) => {
        return prisma.scout.create({
          data: scout
        })
      })
      const result = await Promise.all(scoutPromises)
      return result
    } catch (error) {
      console.error('Error handling generate-scouts:', error)
    }
  })

  function generateRandomScouts(numberOfScouts, franchiseId) {
    const specialties = [
      'Offense',
      'Defense',
      'QB',
      'RB',
      'WR',
      'TE',
      'OL',
      'DL',
      'Secondary',
      'LB'
    ]
    const biases = ['Potential', 'Athleticism', 'Intangibles', 'Talent', 'None']
    const conferences = ['SEC', 'ACC', 'Big 10', 'Big 12', 'PAC-12', 'Non-Power-5']

    const scouts = Array.from({ length: numberOfScouts }, () => {
      // portrait should be a random number between 169 and 225
      const portrait = Math.floor(Math.random() * 56) + 169
      const evaluation = Math.floor(Math.random() * 10) + 1
      const reputation = clamp(evaluation + Math.floor(Math.random() * 5) - 2, 1, 10)
      const cost = [50, 75, 100, 200, 300, 450, 600, 750, 900, 1000][reputation - 1]
      const baseXpEval = 100
      const baseXpReputation = 300

      return {
        portrait,
        firstName: generateRandomFirstName(),
        lastName: generateRandomLastName(),
        evaluation,
        reputation,
        specialty: specialties[Math.floor(Math.random() * specialties.length)],
        bias: biases[Math.floor(Math.random() * biases.length)],
        conferenceSpecialty: conferences[Math.floor(Math.random() * conferences.length)],
        cost,
        evalXp: Math.floor(baseXpEval * Math.pow(evaluation - 1, 1.5)),
        evalNextLevel: Math.floor(baseXpEval * Math.pow(evaluation, 1.5)),
        reputationXp: Math.floor(baseXpReputation * Math.pow(reputation - 1, 1.5)),
        reputationNextLevel: Math.floor(baseXpReputation * Math.pow(reputation, 1.5)),
        franchiseId
      }
    })

    return scouts
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max)
  }

  function generateRandomFirstName() {
    const names = [
      "Adam", "Aiden", "Alex", "Alexander", "Andrew", "Anthony", "Asher", "Benjamin", "Blake", "Brandon", 
      "Brayden", "Brian", "Caleb", "Cameron", "Christian", "Christopher", "Connor", "Daniel", "David", "Dylan", 
      "Ethan", "Evan", "Gabriel", "Henry", "Isaac", "Jack", "Jackson", "Jacob", "James", "Jason", 
      "Jayden", "Jeffrey", "John", "Jonathan", "Jordan", "Joseph", "Joshua", "Kevin", "Landon", "Liam", 
      "Logan", "Lucas", "Luke", "Mason", "Matthew", "Michael", "Nathan", "Nathaniel", "Nicholas", "Noah", 
      "Oliver", "Owen", "Ryan", "Samuel", "Sean", "Sebastian", "Thomas", "Timothy", "Tyler", "William", 
      "Zachary", "Aaron", "Adrian", "Alan", "Albert", "Alejandro", "Ali", "Allen", "Andre", "Andy", 
      "Austin", "Barry", "Ben", "Bill", "Bob", "Brad", "Bradley", "Brett", "Bryan", "Carlos", 
      "Chad", "Charles", "Chris", "Cody", "Corey", "Craig", "Dale", "Derek", "Devin", "Donald", 
      "Doug", "Dustin", "Eddie", "Edgar", "Edward", "Eric", "Erik", "Frank", "Gary", "George"
  ]; // Add as many names as you like
    return names[Math.floor(Math.random() * names.length)]
  }

  function generateRandomLastName() {
    const names = [
      "Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor",
      "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson",
      "Clark", "Rodriguez", "Lewis", "Lee", "Walker", "Hall", "Allen", "Young", "Hernandez", "King",
      "Wright", "Lopez", "Hill", "Scott", "Green", "Adams", "Baker", "Gonzalez", "Nelson", "Carter",
      "Mitchell", "Perez", "Roberts", "Turner", "Phillips", "Campbell", "Parker", "Evans", "Edwards", "Collins",
      "Stewart", "Sanchez", "Morris", "Rogers", "Reed", "Cook", "Morgan", "Bell", "Murphy", "Bailey",
      "Rivera", "Cooper", "Richardson", "Cox", "Howard", "Ward", "Torres", "Peterson", "Gray", "Ramirez",
      "James", "Watson", "Brooks", "Kelly", "Sanders", "Price", "Bennett", "Wood", "Barnes", "Ross",
      "Henderson", "Coleman", "Jenkins", "Perry", "Powell", "Long", "Patterson", "Hughes", "Flores", "Washington",
      "Butler", "Simmons", "Foster", "Gonzales", "Bryant", "Alexander", "Russell", "Griffin", "Diaz", "Hayes"
  ]; // Add as many names as you like
    return names[Math.floor(Math.random() * names.length)]
  }
}
