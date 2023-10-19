/*
  Warnings:

  - Added the required column `portrait` to the `Scout` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Scout" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "portrait" INTEGER NOT NULL,
    "evaluation" INTEGER NOT NULL,
    "reputation" INTEGER NOT NULL,
    "specialty" TEXT NOT NULL,
    "bias" TEXT NOT NULL,
    "conferenceSpecialty" TEXT NOT NULL,
    "isNationalScout" BOOLEAN NOT NULL DEFAULT false,
    "cost" INTEGER NOT NULL,
    "evalXp" INTEGER NOT NULL,
    "evalNextLevel" INTEGER NOT NULL,
    "hasUpgrade" BOOLEAN NOT NULL DEFAULT false,
    "isMaxEvalLevel" BOOLEAN NOT NULL DEFAULT false,
    "reputationXp" INTEGER NOT NULL,
    "reputationNextLevel" INTEGER NOT NULL,
    "isMaxRepLevel" BOOLEAN NOT NULL DEFAULT false,
    "hours" INTEGER NOT NULL DEFAULT 40,
    "remaining" INTEGER NOT NULL DEFAULT 40,
    "playersScouted" INTEGER NOT NULL DEFAULT 0,
    "franchiseId" TEXT,
    CONSTRAINT "Scout_franchiseId_fkey" FOREIGN KEY ("franchiseId") REFERENCES "Franchise" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Scout" ("bias", "conferenceSpecialty", "cost", "evalNextLevel", "evalXp", "evaluation", "firstName", "franchiseId", "hasUpgrade", "hours", "id", "isMaxEvalLevel", "isMaxRepLevel", "isNationalScout", "lastName", "playersScouted", "remaining", "reputation", "reputationNextLevel", "reputationXp", "specialty") SELECT "bias", "conferenceSpecialty", "cost", "evalNextLevel", "evalXp", "evaluation", "firstName", "franchiseId", "hasUpgrade", "hours", "id", "isMaxEvalLevel", "isMaxRepLevel", "isNationalScout", "lastName", "playersScouted", "remaining", "reputation", "reputationNextLevel", "reputationXp", "specialty" FROM "Scout";
DROP TABLE "Scout";
ALTER TABLE "new_Scout" RENAME TO "Scout";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
