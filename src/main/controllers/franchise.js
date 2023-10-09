const { ipcMain } = require('electron');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

export function franchiseController() {
  ipcMain.on('get-franchise', (event, franchiseId) => {
    try {
      console.log('Received franchiseId:', franchiseId);
      event.reply('get-franchise-response', { message: 'Franchise received' });  // Example response
    } catch (error) {
      console.error('Error handling get-franchise:', error);
    }
  });
  

  ipcMain.handle('get-franchises', (event) => {

  });

  ipcMain.on('create-franchise', async (event, franchise) => {
    try {
      console.log('Received franchise:', franchise);
      event.reply('create-franchise-response', { message: 'Franchise received' });  // Example response
      // Create franchise in database using Prisma
      const result = await prisma.franchise.create({
        data: franchise
      });
      console.log('Prisma create result:', result);
    } catch (error) {
      console.error('Error handling create-franchise:', error);
    }
  });

  ipcMain.handle('update-franchise', (event, franchise) => {

  });

  ipcMain.handle('delete-franchise', (event, franchiseId) => {

  });
}