const { ipcMain } = require('electron');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

export function reportController() {
  ipcMain.handle('get-report', (event, data) => {
    const { reportId, seasonId } = data;

    try {
      console.log('Received get-report request');
      // Get report from database using Prisma
      const report = prisma.report.findUnique({
        where: {
          id: reportId
        },
        include: {
          season: true,
          scout: true,
          franchise: true,
          players: true
        }
      });
      console.log('Prisma report result:', report);
      return report;
    } catch (error) {
      console.error('Error handling get-report:', error);
    }
  }
  );
}