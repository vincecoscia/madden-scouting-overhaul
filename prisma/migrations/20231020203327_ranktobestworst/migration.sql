/*
  Warnings:

  - You are about to drop the column `side` on the `Worst` table. All the data in the column will be lost.
  - You are about to drop the column `side` on the `Best` table. All the data in the column will be lost.
  - Added the required column `rank` to the `Worst` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rank` to the `Best` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Worst" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "position" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,
    "seasonId" TEXT NOT NULL,
    CONSTRAINT "Worst_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Worst" ("id", "position", "seasonId") SELECT "id", "position", "seasonId" FROM "Worst";
DROP TABLE "Worst";
ALTER TABLE "new_Worst" RENAME TO "Worst";
CREATE TABLE "new_Best" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "position" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,
    "seasonId" TEXT NOT NULL,
    CONSTRAINT "Best_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Best" ("id", "position", "seasonId") SELECT "id", "position", "seasonId" FROM "Best";
DROP TABLE "Best";
ALTER TABLE "new_Best" RENAME TO "Best";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
