const { ipcMain } = require('electron');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

export function franchiseController() {
  ipcMain.handle('get-franchise', (event, franchiseId) => {
    try {
      console.log('Received get-franchise request');
      // Get franchise from database using Prisma
      const franchise = prisma.franchise.findUnique({
        where: {
          id: franchiseId
        }
      });
      console.log('Prisma franchise result:', franchise);
      return franchise;
    } catch (error) {
      console.error('Error handling get-franchise:', error);
    }
  });
  
  ipcMain.handle('get-franchises', async (event) => {
    try {
      console.log('Received get-franchises request');
      // Get franchises from database using Prisma
      const franchises = await prisma.franchise.findMany();
      console.log('Prisma franchises result:', franchises);
      return franchises;
    } catch (error) {
      console.error('Error handling get-franchises:', error);
    }
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