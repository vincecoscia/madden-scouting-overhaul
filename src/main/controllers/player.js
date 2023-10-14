const { ipcMain } = require('electron');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

export function playerController() {
  ipcMain.handle('get-player', (event, playerId) => {
    try {
      console.log('Received get-player request');
      // Get player from database using Prisma
      const player = prisma.player.findUnique({
        where: {
          id: playerId
        }
      });
      console.log('Prisma player result:', player);
      return player;
    } catch (error) {
      console.error('Error handling get-player:', error);
    }
  });

  ipcMain.handle('get-players', async (event, seasonId) => {
    try {
      console.log('Received get-players request');
      console.log('seasonId:', seasonId);
      // Get players by season from database using Prisma
      const players = await prisma.player.findMany({
        where: {
          seasonId: seasonId
        }
      });
      console.log('Prisma players result:', players);
      return players;
    } catch (error) {
      console.error('Error handling get-players:', error);
    }
  });

  ipcMain.handle('create-players', async (event, players) => {
    try {
      console.log('Received players:', players);
      // Create players in database using Prisma
      const result = await prisma.player.createMany({
        data: players
      });
      console.log('Prisma create result:', result);
      return result;
    } catch (error) {
      console.error('Error handling create-players:', error);
    }
  });
}