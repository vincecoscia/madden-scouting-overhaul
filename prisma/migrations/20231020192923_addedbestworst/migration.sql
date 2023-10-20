/*
  Warnings:

  - You are about to drop the column `sparqOverall` on the `Report` table. All the data in the column will be lost.
  - You are about to alter the column `avgOverall` on the `Report` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `cOverall` on the `Report` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `cbOverall` on the `Report` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `defenseOverall` on the `Report` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `dtOverall` on the `Report` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `fbOverall` on the `Report` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `fsOverall` on the `Report` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `hbOverall` on the `Report` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `kOverall` on the `Report` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `leOverall` on the `Report` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `lgOverall` on the `Report` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `lolbOverall` on the `Report` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `ltOverall` on the `Report` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `mlbOverall` on the `Report` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `offenseOverall` on the `Report` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `pOverall` on the `Report` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `qbOverall` on the `Report` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `reOverall` on the `Report` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `rgOverall` on the `Report` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `rolbOverall` on the `Report` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `rtOverall` on the `Report` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `ssOverall` on the `Report` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `teOverall` on the `Report` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `wrOverall` on the `Report` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- CreateTable
CREATE TABLE "Best" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "position" TEXT NOT NULL,
    "side" TEXT NOT NULL,
    "seasonId" TEXT NOT NULL,
    CONSTRAINT "Best_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Worst" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "position" TEXT NOT NULL,
    "side" TEXT NOT NULL,
    "seasonId" TEXT NOT NULL,
    CONSTRAINT "Worst_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Report" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "avgOverall" REAL NOT NULL,
    "offenseOverall" REAL NOT NULL,
    "defenseOverall" REAL NOT NULL,
    "qbOverall" REAL NOT NULL,
    "hbOverall" REAL NOT NULL,
    "fbOverall" REAL NOT NULL,
    "wrOverall" REAL NOT NULL,
    "teOverall" REAL NOT NULL,
    "ltOverall" REAL NOT NULL,
    "lgOverall" REAL NOT NULL,
    "cOverall" REAL NOT NULL,
    "rgOverall" REAL NOT NULL,
    "rtOverall" REAL NOT NULL,
    "leOverall" REAL NOT NULL,
    "reOverall" REAL NOT NULL,
    "dtOverall" REAL NOT NULL,
    "lolbOverall" REAL NOT NULL,
    "mlbOverall" REAL NOT NULL,
    "rolbOverall" REAL NOT NULL,
    "cbOverall" REAL NOT NULL,
    "fsOverall" REAL NOT NULL,
    "ssOverall" REAL NOT NULL,
    "kOverall" REAL NOT NULL,
    "pOverall" REAL NOT NULL,
    "seasonId" TEXT NOT NULL,
    "franchiseId" TEXT,
    CONSTRAINT "Report_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Report_franchiseId_fkey" FOREIGN KEY ("franchiseId") REFERENCES "Franchise" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Report" ("avgOverall", "cOverall", "cbOverall", "defenseOverall", "dtOverall", "fbOverall", "franchiseId", "fsOverall", "hbOverall", "id", "kOverall", "leOverall", "lgOverall", "lolbOverall", "ltOverall", "mlbOverall", "offenseOverall", "pOverall", "qbOverall", "reOverall", "rgOverall", "rolbOverall", "rtOverall", "seasonId", "ssOverall", "teOverall", "wrOverall") SELECT "avgOverall", "cOverall", "cbOverall", "defenseOverall", "dtOverall", "fbOverall", "franchiseId", "fsOverall", "hbOverall", "id", "kOverall", "leOverall", "lgOverall", "lolbOverall", "ltOverall", "mlbOverall", "offenseOverall", "pOverall", "qbOverall", "reOverall", "rgOverall", "rolbOverall", "rtOverall", "seasonId", "ssOverall", "teOverall", "wrOverall" FROM "Report";
DROP TABLE "Report";
ALTER TABLE "new_Report" RENAME TO "Report";
CREATE UNIQUE INDEX "Report_seasonId_key" ON "Report"("seasonId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
