const { ipcMain } = require('electron');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

export function seasonController() {
  ipcMain.handle('get-season', (event, seasonId) => {
    try {
      console.log('Received get-season request');
      // Get season from database using Prisma
      const season = prisma.season.findUnique({
        where: {
          id: seasonId
        }
      });
      console.log('Prisma season result:', season);
      return season;
    } catch (error) {
      console.error('Error handling get-season:', error);
    }
  });
  
  ipcMain.handle('get-seasons', async (event, franchiseId) => {
    try {
      console.log('Received get-seasons request');
      console.log('franchiseId:', franchiseId);
      // Get seasons by franchise from database using Prisma
      const seasons = await prisma.season.findMany({
        where: {
          franchiseId: franchiseId
        }
      });
      console.log('Prisma seasons result:', seasons);
      return seasons;
    } catch (error) {
      console.error('Error handling get-seasons:', error);
    }
  });

  ipcMain.handle('create-season', async (event, season) => {
    try {
      console.log('Received season:', season);
      // Create season in database using Prisma
      const result = await prisma.season.create({
        data: season
      });
      
      // Update franchise updatedAt timestamp to current time

      await prisma.franchise.update({
        where: {
          id: season.franchiseId
        },
        data: {
          updatedAt: new Date()
        }
      });
      console.log('Prisma create result:', result);
      return result;
    } catch (error) {
      console.error('Error handling create-season:', error);
    }
  });

  ipcMain.handle('update-season', (event, season) => {
    try {
      console.log('Received season:', season);
      // Update season in database using Prisma
      const result = prisma.season.update({
        where: {
          id: season.id
        },
        data: season
      });
      console.log('Prisma update result:', result);
      return result;
    } catch (error) {
      console.error('Error handling update-season:', error);
    }
  });

  ipcMain.handle('delete-season', (event, seasonId) => {
    try {
      console.log('Received seasonId:', seasonId);
      // Delete season in database using Prisma
      const result = prisma.season.delete({
        where: {
          id: seasonId
        }
      });
      console.log('Prisma delete result:', result);
      return result;
    } catch (error) {
      console.error('Error handling delete-season:', error);
    }
  });
}