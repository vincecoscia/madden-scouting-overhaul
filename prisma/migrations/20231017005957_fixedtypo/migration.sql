/*
  Warnings:

  - You are about to drop the `DraftPicks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "DraftPicks";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "DraftPick" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "round" INTEGER NOT NULL,
    "pick" INTEGER NOT NULL,
    "currentTeam" TEXT NOT NULL,
    "originalTeam" TEXT NOT NULL,
    "seasonId" TEXT NOT NULL,
    CONSTRAINT "DraftPick_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
