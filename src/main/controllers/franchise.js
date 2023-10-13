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

  ipcMain.handle('create-franchise', async (event, franchise) => {
    try {
      console.log('Received franchise:', franchise);
      // Create franchise in database using Prisma
      const result = await prisma.franchise.create({
        data: franchise
      });
      console.log('Prisma create result:', result);
      return result;
    } catch (error) {
      console.error('Error handling create-franchise:', error);
    }
  });

  ipcMain.handle('update-franchise', (event, franchise) => {
    try {
      console.log('Received franchise:', franchise);
      // Update franchise in database using Prisma
      const result = prisma.franchise.update({
        where: {
          id: franchise.id
        },
        data: franchise
      });
      console.log('Prisma update result:', result);
      return result;
    } catch (error) {
      console.error('Error handling update-franchise:', error);
    }
  });

  ipcMain.handle('delete-franchise', (event, franchiseId) => {
    try {
      console.log('Received franchiseId:', franchiseId);
      // Delete franchise in database using Prisma
      const result = prisma.franchise.delete({
        where: {
          id: franchiseId
        }
      });
      console.log('Prisma delete result:', result);
      return result;
    } catch (error) {
      console.error('Error handling delete-franchise:', error);
    }
  });
}