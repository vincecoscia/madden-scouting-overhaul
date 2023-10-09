/*
  Warnings:

  - Added the required column `averageOvr` to the `Season` table without a default value. This is not possible if the table is not empty.
  - Added the required column `week` to the `Season` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bias` to the `Scout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `conferenceSpecialty` to the `Scout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cost` to the `Scout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `evaluation` to the `Scout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `repuation` to the `Scout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specialty` to the `Scout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Franchise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Franchise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `acceleration` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `age` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `agility` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `awareness` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bcVision` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `blockShed` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `breakSack` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `breakTackle` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `carrying` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `catch` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `catchInTraffic` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `changeOfDirection` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `college` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `combineBenchPress` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `combineBroadJump` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `combineFortyYardDash` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `combineOverallRanking` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `combineThreeConeDrill` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `combineTwentyYardShuttle` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `combineVerticalJump` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `confidence` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contractStatus` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deepRoute` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `finesseMoves` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `height` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hitPower` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `impactBlocking` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `initialDraftRank` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `injury` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jukeMove` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jumping` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kickAccuracy` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kickPower` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kickReturn` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `leadBlock` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longSnapping` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `manCoverage` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mediumRoute` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `motivation1` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `motivation2` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `motivation3` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `overall` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passBlock` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passBlockFinesse` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passBlockPower` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `playAction` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `playerID` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `powerMoves` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `press` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `proDayBenchPress` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `proDayBroadJump` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `proDayFortyYardDash` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `proDayThreeConeDrill` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `proDayTwentyYardShuttle` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `proDayVerticalJump` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productionGrade` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pursuit` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `release` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `runBlock` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `runBlockFinesse` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `runBlockPower` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortRoute` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spectacularCatch` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `speed` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spinMove` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stamina` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stiffArm` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `strength` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tackle` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `throwAccuracy` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `throwAccuracyDeep` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `throwAccuracyMid` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `throwAccuracyShort` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `throwOnTheRun` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `throwPower` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `throwUnderPressure` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toughness` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `traitDevelopment` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trucking` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trueOverallRanking` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zoneCoverage` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "ScoutingInfo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "hours" INTEGER NOT NULL DEFAULT 0,
    "percentComplete" INTEGER NOT NULL DEFAULT 0,
    "sparq" INTEGER NOT NULL,
    "playerId" TEXT NOT NULL,
    "scoutId" TEXT NOT NULL,
    "height" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "overall" INTEGER NOT NULL,
    "traitDevelopment" TEXT NOT NULL,
    "hitPower" INTEGER NOT NULL,
    "jumping" INTEGER NOT NULL,
    "agility" INTEGER NOT NULL,
    "acceleration" INTEGER NOT NULL,
    "kickPower" INTEGER NOT NULL,
    "kickAccuracy" INTEGER NOT NULL,
    "breakSack" INTEGER NOT NULL,
    "blockShed" INTEGER NOT NULL,
    "bcVision" INTEGER NOT NULL,
    "awareness" INTEGER NOT NULL,
    "catchInTraffic" INTEGER NOT NULL,
    "catch" INTEGER NOT NULL,
    "carrying" INTEGER NOT NULL,
    "breakTackle" INTEGER NOT NULL,
    "deepRoute" INTEGER NOT NULL,
    "mediumRoute" INTEGER NOT NULL,
    "shortRoute" INTEGER NOT NULL,
    "confidence" INTEGER NOT NULL,
    "changeOfDirection" INTEGER NOT NULL,
    "impactBlocking" INTEGER NOT NULL,
    "finesseMoves" INTEGER NOT NULL,
    "powerMoves" INTEGER NOT NULL,
    "jukeMove" INTEGER NOT NULL,
    "injury" INTEGER NOT NULL,
    "kickReturn" INTEGER NOT NULL,
    "manCoverage" INTEGER NOT NULL,
    "longSnapping" INTEGER NOT NULL,
    "leadBlock" INTEGER NOT NULL,
    "press" INTEGER NOT NULL,
    "runBlock" INTEGER NOT NULL,
    "runBlockPower" INTEGER NOT NULL,
    "runBlockFinesse" INTEGER NOT NULL,
    "release" INTEGER NOT NULL,
    "pursuit" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    "spectacularCatch" INTEGER NOT NULL,
    "strength" INTEGER NOT NULL,
    "stiffArm" INTEGER NOT NULL,
    "stamina" INTEGER NOT NULL,
    "spinMove" INTEGER NOT NULL,
    "throwAccuracy" INTEGER NOT NULL,
    "throwAccuracyShort" INTEGER NOT NULL,
    "throwAccuracyMid" INTEGER NOT NULL,
    "throwAccuracyDeep" INTEGER NOT NULL,
    "tackle" INTEGER NOT NULL,
    "throwUnderPressure" INTEGER NOT NULL,
    "throwPower" INTEGER NOT NULL,
    "throwOnTheRun" INTEGER NOT NULL,
    "zoneCoverage" INTEGER NOT NULL,
    "trucking" INTEGER NOT NULL,
    "toughness" INTEGER NOT NULL,
    "playAction" INTEGER NOT NULL,
    "passBlock" INTEGER NOT NULL,
    "passBlockPower" INTEGER NOT NULL,
    "passBlockFinesse" INTEGER NOT NULL,
    "bucketId" TEXT NOT NULL,
    CONSTRAINT "ScoutingInfo_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ScoutingInfo_bucketId_fkey" FOREIGN KEY ("bucketId") REFERENCES "Bucket" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ScoutingInfo_scoutId_fkey" FOREIGN KEY ("scoutId") REFERENCES "Scout" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ScoutComment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "comment" TEXT NOT NULL,
    "scoutingInfoId" TEXT NOT NULL,
    CONSTRAINT "ScoutComment_scoutingInfoId_fkey" FOREIGN KEY ("scoutingInfoId") REFERENCES "ScoutingInfo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "avgOverall" INTEGER NOT NULL,
    "offenseOverall" INTEGER NOT NULL,
    "defenseOverall" INTEGER NOT NULL,
    "sparqOverall" INTEGER NOT NULL,
    "qbOverall" INTEGER NOT NULL,
    "hbOverall" INTEGER NOT NULL,
    "fbOverall" INTEGER NOT NULL,
    "wrOverall" INTEGER NOT NULL,
    "teOverall" INTEGER NOT NULL,
    "ltOverall" INTEGER NOT NULL,
    "lgOverall" INTEGER NOT NULL,
    "cOverall" INTEGER NOT NULL,
    "rgOverall" INTEGER NOT NULL,
    "rtOverall" INTEGER NOT NULL,
    "leOverall" INTEGER NOT NULL,
    "reOverall" INTEGER NOT NULL,
    "dtOverall" INTEGER NOT NULL,
    "lolbOverall" INTEGER NOT NULL,
    "mlbOverall" INTEGER NOT NULL,
    "rolbOverall" INTEGER NOT NULL,
    "cbOverall" INTEGER NOT NULL,
    "fsOverall" INTEGER NOT NULL,
    "ssOverall" INTEGER NOT NULL,
    "kOverall" INTEGER NOT NULL,
    "pOverall" INTEGER NOT NULL,
    "seasonId" TEXT NOT NULL,
    "franchiseId" TEXT,
    CONSTRAINT "Report_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Report_franchiseId_fkey" FOREIGN KEY ("franchiseId") REFERENCES "Franchise" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Bucket" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "position" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Stat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_BucketToStat" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_BucketToStat_A_fkey" FOREIGN KEY ("A") REFERENCES "Bucket" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_BucketToStat_B_fkey" FOREIGN KEY ("B") REFERENCES "Stat" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Season" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "year" INTEGER NOT NULL,
    "week" INTEGER NOT NULL,
    "averageOvr" INTEGER NOT NULL,
    "franchiseId" TEXT NOT NULL,
    CONSTRAINT "Season_franchiseId_fkey" FOREIGN KEY ("franchiseId") REFERENCES "Franchise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Season" ("franchiseId", "id", "year") SELECT "franchiseId", "id", "year" FROM "Season";
DROP TABLE "Season";
ALTER TABLE "new_Season" RENAME TO "Season";
CREATE TABLE "new_Scout" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "evaluation" INTEGER NOT NULL,
    "repuation" INTEGER NOT NULL,
    "specialty" TEXT NOT NULL,
    "bias" TEXT NOT NULL,
    "conferenceSpecialty" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,
    "hours" INTEGER NOT NULL DEFAULT 10,
    "remaining" INTEGER NOT NULL DEFAULT 10,
    "seasonId" TEXT,
    "franchiseId" TEXT,
    CONSTRAINT "Scout_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Scout_franchiseId_fkey" FOREIGN KEY ("franchiseId") REFERENCES "Franchise" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Scout" ("firstName", "id", "lastName", "seasonId") SELECT "firstName", "id", "lastName", "seasonId" FROM "Scout";
DROP TABLE "Scout";
ALTER TABLE "new_Scout" RENAME TO "Scout";
CREATE TABLE "new_Franchise" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "team" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Franchise" ("id", "name", "team") SELECT "id", "name", "team" FROM "Franchise";
DROP TABLE "Franchise";
ALTER TABLE "new_Franchise" RENAME TO "Franchise";
CREATE TABLE "new_Player" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "playerID" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "college" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "overall" INTEGER NOT NULL,
    "traitDevelopment" TEXT NOT NULL,
    "contractStatus" TEXT NOT NULL,
    "motivation1" TEXT NOT NULL,
    "motivation2" TEXT NOT NULL,
    "motivation3" TEXT NOT NULL,
    "hitPower" INTEGER NOT NULL,
    "jumping" INTEGER NOT NULL,
    "agility" INTEGER NOT NULL,
    "acceleration" INTEGER NOT NULL,
    "kickPower" INTEGER NOT NULL,
    "kickAccuracy" INTEGER NOT NULL,
    "breakSack" INTEGER NOT NULL,
    "blockShed" INTEGER NOT NULL,
    "bcVision" INTEGER NOT NULL,
    "awareness" INTEGER NOT NULL,
    "catchInTraffic" INTEGER NOT NULL,
    "catch" INTEGER NOT NULL,
    "carrying" INTEGER NOT NULL,
    "breakTackle" INTEGER NOT NULL,
    "deepRoute" INTEGER NOT NULL,
    "mediumRoute" INTEGER NOT NULL,
    "shortRoute" INTEGER NOT NULL,
    "confidence" INTEGER NOT NULL,
    "changeOfDirection" INTEGER NOT NULL,
    "impactBlocking" INTEGER NOT NULL,
    "finesseMoves" INTEGER NOT NULL,
    "powerMoves" INTEGER NOT NULL,
    "jukeMove" INTEGER NOT NULL,
    "injury" INTEGER NOT NULL,
    "kickReturn" INTEGER NOT NULL,
    "manCoverage" INTEGER NOT NULL,
    "longSnapping" INTEGER NOT NULL,
    "leadBlock" INTEGER NOT NULL,
    "press" INTEGER NOT NULL,
    "runBlock" INTEGER NOT NULL,
    "runBlockPower" INTEGER NOT NULL,
    "runBlockFinesse" INTEGER NOT NULL,
    "release" INTEGER NOT NULL,
    "pursuit" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    "spectacularCatch" INTEGER NOT NULL,
    "strength" INTEGER NOT NULL,
    "stiffArm" INTEGER NOT NULL,
    "stamina" INTEGER NOT NULL,
    "spinMove" INTEGER NOT NULL,
    "throwAccuracy" INTEGER NOT NULL,
    "throwAccuracyShort" INTEGER NOT NULL,
    "throwAccuracyMid" INTEGER NOT NULL,
    "throwAccuracyDeep" INTEGER NOT NULL,
    "tackle" INTEGER NOT NULL,
    "throwUnderPressure" INTEGER NOT NULL,
    "throwPower" INTEGER NOT NULL,
    "throwOnTheRun" INTEGER NOT NULL,
    "zoneCoverage" INTEGER NOT NULL,
    "trucking" INTEGER NOT NULL,
    "toughness" INTEGER NOT NULL,
    "playAction" INTEGER NOT NULL,
    "passBlock" INTEGER NOT NULL,
    "passBlockPower" INTEGER NOT NULL,
    "passBlockFinesse" INTEGER NOT NULL,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "proDayThreeConeDrill" INTEGER NOT NULL,
    "proDayTwentyYardShuttle" INTEGER NOT NULL,
    "proDayVerticalJump" INTEGER NOT NULL,
    "proDayFortyYardDash" INTEGER NOT NULL,
    "proDayBenchPress" INTEGER NOT NULL,
    "proDayBroadJump" INTEGER NOT NULL,
    "combineThreeConeDrill" INTEGER NOT NULL,
    "combineTwentyYardShuttle" INTEGER NOT NULL,
    "combineVerticalJump" INTEGER NOT NULL,
    "combineFortyYardDash" INTEGER NOT NULL,
    "combineBenchPress" INTEGER NOT NULL,
    "combineBroadJump" INTEGER NOT NULL,
    "initialDraftRank" INTEGER NOT NULL,
    "trueOverallRanking" INTEGER NOT NULL,
    "combineOverallRanking" INTEGER NOT NULL,
    "productionGrade" INTEGER NOT NULL,
    "seasonId" TEXT,
    "franchiseId" TEXT,
    "scoutingInfoId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Player_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Player_franchiseId_fkey" FOREIGN KEY ("franchiseId") REFERENCES "Franchise" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Player" ("firstName", "id", "lastName", "seasonId") SELECT "firstName", "id", "lastName", "seasonId" FROM "Player";
DROP TABLE "Player";
ALTER TABLE "new_Player" RENAME TO "Player";
CREATE UNIQUE INDEX "Player_playerID_key" ON "Player"("playerID");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "ScoutingInfo_playerId_key" ON "ScoutingInfo"("playerId");

-- CreateIndex
CREATE UNIQUE INDEX "Report_seasonId_key" ON "Report"("seasonId");

-- CreateIndex
CREATE UNIQUE INDEX "_BucketToStat_AB_unique" ON "_BucketToStat"("A", "B");

-- CreateIndex
CREATE INDEX "_BucketToStat_B_index" ON "_BucketToStat"("B");
