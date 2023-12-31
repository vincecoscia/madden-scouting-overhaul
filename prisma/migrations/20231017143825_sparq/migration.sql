/*
  Warnings:

  - Added the required column `sparq` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Player" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "playerID" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "portrait" INTEGER NOT NULL,
    "lastName" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "college" TEXT NOT NULL,
    "conference" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "overall" INTEGER NOT NULL,
    "sparq" INTEGER NOT NULL,
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
    "proDayThreeConeDrill" INTEGER,
    "proDayTwentyYardShuttle" INTEGER,
    "proDayVerticalJump" INTEGER,
    "proDayFortyYardDash" INTEGER,
    "proDayBenchPress" INTEGER,
    "proDayBroadJump" INTEGER,
    "combineThreeConeDrill" INTEGER,
    "combineTwentyYardShuttle" INTEGER,
    "combineVerticalJump" INTEGER,
    "combineFortyYardDash" INTEGER,
    "combineBenchPress" INTEGER,
    "combineBroadJump" INTEGER,
    "initialDraftRank" INTEGER NOT NULL,
    "trueOverallRanking" INTEGER NOT NULL,
    "combineOverallRanking" INTEGER,
    "productionGrade" INTEGER NOT NULL,
    "seasonId" TEXT,
    "franchiseId" TEXT,
    "scoutingInfoId" TEXT,
    "reportId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Player_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Player_franchiseId_fkey" FOREIGN KEY ("franchiseId") REFERENCES "Franchise" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Player_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Player" ("acceleration", "age", "agility", "awareness", "bcVision", "blockShed", "breakSack", "breakTackle", "carrying", "catch", "catchInTraffic", "changeOfDirection", "college", "combineBenchPress", "combineBroadJump", "combineFortyYardDash", "combineOverallRanking", "combineThreeConeDrill", "combineTwentyYardShuttle", "combineVerticalJump", "conference", "confidence", "contractStatus", "createdAt", "deepRoute", "finesseMoves", "firstName", "franchiseId", "height", "hitPower", "id", "impactBlocking", "initialDraftRank", "injury", "isVisible", "jukeMove", "jumping", "kickAccuracy", "kickPower", "kickReturn", "lastName", "leadBlock", "longSnapping", "manCoverage", "mediumRoute", "motivation1", "motivation2", "motivation3", "overall", "passBlock", "passBlockFinesse", "passBlockPower", "playAction", "playerID", "portrait", "position", "powerMoves", "press", "proDayBenchPress", "proDayBroadJump", "proDayFortyYardDash", "proDayThreeConeDrill", "proDayTwentyYardShuttle", "proDayVerticalJump", "productionGrade", "pursuit", "release", "reportId", "runBlock", "runBlockFinesse", "runBlockPower", "scoutingInfoId", "seasonId", "shortRoute", "spectacularCatch", "speed", "spinMove", "stamina", "stiffArm", "strength", "tackle", "throwAccuracy", "throwAccuracyDeep", "throwAccuracyMid", "throwAccuracyShort", "throwOnTheRun", "throwPower", "throwUnderPressure", "toughness", "traitDevelopment", "trucking", "trueOverallRanking", "updatedAt", "weight", "zoneCoverage") SELECT "acceleration", "age", "agility", "awareness", "bcVision", "blockShed", "breakSack", "breakTackle", "carrying", "catch", "catchInTraffic", "changeOfDirection", "college", "combineBenchPress", "combineBroadJump", "combineFortyYardDash", "combineOverallRanking", "combineThreeConeDrill", "combineTwentyYardShuttle", "combineVerticalJump", "conference", "confidence", "contractStatus", "createdAt", "deepRoute", "finesseMoves", "firstName", "franchiseId", "height", "hitPower", "id", "impactBlocking", "initialDraftRank", "injury", "isVisible", "jukeMove", "jumping", "kickAccuracy", "kickPower", "kickReturn", "lastName", "leadBlock", "longSnapping", "manCoverage", "mediumRoute", "motivation1", "motivation2", "motivation3", "overall", "passBlock", "passBlockFinesse", "passBlockPower", "playAction", "playerID", "portrait", "position", "powerMoves", "press", "proDayBenchPress", "proDayBroadJump", "proDayFortyYardDash", "proDayThreeConeDrill", "proDayTwentyYardShuttle", "proDayVerticalJump", "productionGrade", "pursuit", "release", "reportId", "runBlock", "runBlockFinesse", "runBlockPower", "scoutingInfoId", "seasonId", "shortRoute", "spectacularCatch", "speed", "spinMove", "stamina", "stiffArm", "strength", "tackle", "throwAccuracy", "throwAccuracyDeep", "throwAccuracyMid", "throwAccuracyShort", "throwOnTheRun", "throwPower", "throwUnderPressure", "toughness", "traitDevelopment", "trucking", "trueOverallRanking", "updatedAt", "weight", "zoneCoverage" FROM "Player";
DROP TABLE "Player";
ALTER TABLE "new_Player" RENAME TO "Player";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
